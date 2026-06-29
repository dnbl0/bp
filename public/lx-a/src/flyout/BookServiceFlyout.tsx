import { useState } from "react";
import { Flyout } from "../components/Flyout";
import { useFlyout } from "./FlyoutProvider";
import {
  dealers,
  dealersByProximity,
  serviceTimes,
  serviceTypes,
  defaultServiceTypeId,
  transportOptions,
  defaultTransportId,
} from "../data/service";
import { ArrowRight, MapPin } from "../components/icons";
import { DatePicker } from "../components/DatePicker";
import { Radio } from "../components/Radio";
import { DataTable } from "../components/Table";
import { StepIndicator } from "./StepIndicator";
import { Confirmation } from "./Confirmation";

type Step =
  | "type"
  | "dealer"
  | "date"
  | "time"
  | "transport"
  | "confirm"
  | "done";
const ORDER: Step[] = [
  "type",
  "dealer",
  "date",
  "time",
  "transport",
  "confirm",
];
const STEP_LABELS = [
  "Type",
  "Dealer",
  "Date",
  "Time",
  "Transport",
  "Confirm",
] as const;

function fmtDate(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** Pick a sensible date 6 weeks out, on a weekday, formatted as ISO. */
function smartDefaultDate(): string {
  const t = new Date();
  t.setDate(t.getDate() + 42);
  // Nudge to weekday
  const dow = t.getDay();
  if (dow === 0) t.setDate(t.getDate() + 1);
  if (dow === 6) t.setDate(t.getDate() + 2);
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, "0");
  const d = String(t.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function BookServiceFlyout({ open }: { open: boolean }) {
  const { close, payload, preferredDealerId, addBooking } = useFlyout();
  const isSmart = !!payload.smart;
  const [step, setStep] = useState<Step>(isSmart ? "confirm" : "type");
  const [typeId, setTypeId] = useState(defaultServiceTypeId);
  const [dealerId, setDealerId] = useState(preferredDealerId);
  const [changing, setChanging] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");
  const [date, setDate] = useState(isSmart ? smartDefaultDate() : "");
  const [time, setTime] = useState(isSmart ? "8:30am" : "");
  const [transportId, setTransportId] = useState(defaultTransportId);
  const [notes, setNotes] = useState("");

  const dealer = dealers.find((d) => d.id === dealerId) ?? dealers[0];
  const serviceType =
    serviceTypes.find((t) => t.id === typeId) ?? serviceTypes[0];
  const transport =
    transportOptions.find((t) => t.id === transportId) ?? transportOptions[0];
  const vehicleName = payload.vehicleName ?? "your Lexus";

  const idx = ORDER.indexOf(step);
  const goBack = () => {
    if (step === "dealer" && changing) return setChanging(false);
    if (idx > 0) setStep(ORDER[idx - 1]);
  };
  const onBack =
    step !== "done" && (idx > 0 || (step === "dealer" && changing))
      ? goBack
      : undefined;

  /* ---------- success ---------- */
  if (step === "done") {
    return (
      <Flyout open={open} title="Book a service" onClose={close}>
        <Confirmation
          title="Service requested"
          description={
            <>
              We've sent your request to <strong>{dealer.name}</strong>. They'll
              confirm your booking for {vehicleName} by email shortly.
            </>
          }
          onDone={close}
        />
        <DataTable
          className="dtable--flyout"
          rows={[
            { label: "Service", value: serviceType.label },
            { label: "Dealer", value: dealer.name },
            { label: "Date", value: fmtDate(date) },
            { label: "Drop-off time", value: time },
            { label: "Transport", value: transport.label },
          ]}
        />
      </Flyout>
    );
  }

  /* ---------- footer per step ---------- */
  const canContinue =
    step === "type"
      ? !!typeId
      : step === "dealer"
      ? !changing
      : step === "date"
      ? !!date
      : step === "time"
      ? !!time
      : step === "transport"
      ? !!transportId
      : true;
  const footer = (
    <div className="flyout__actions">
      <button
        className="btn btn--primary"
        disabled={!canContinue}
        onClick={() => {
          if (step === "confirm") {
            const [y, m, d] = (date || "").split("-").map(Number);
            const at = y ? new Date(y, (m ?? 1) - 1, d ?? 1).getTime() : Date.now();
            addBooking({
              id: `service-${dealer.id}-${date}-${time}`,
              kind: "service",
              title: `${serviceType.label} · ${dealer.name}`,
              detail: `${vehicleName} · drop-off ${time}`,
              when: fmtDate(date),
              at,
            });
            setStep("done");
          } else setStep(ORDER[idx + 1]);
        }}
      >
        {step === "confirm" ? "Confirm booking" : "Continue"}
      </button>
    </div>
  );

  const list = dealersByProximity.filter(
    (d) =>
      !query ||
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.address.toLowerCase().includes(query.toLowerCase())
  );
  const visible = showAll ? list : list.slice(0, 3);

  const HEAD: Record<string, [string, string]> = {
    type: [
      "Choose a service",
      "Pick the service type your Lexus needs.",
    ],
    dealer: [
      "Select a dealership",
      "Where would you like to get your vehicle serviced?",
    ],
    date: [
      "Select a service date",
      `Choose a day to drop off ${vehicleName} at ${dealer.name}.`,
    ],
    time: [
      "Select a drop-off time",
      date ? `Available times on ${fmtDate(date)}.` : "Please select a time.",
    ],
    transport: [
      "How will you get around?",
      "Choose how you'd like to get to and from the dealer while we have your Lexus.",
    ],
    confirm: [
      "Confirm your booking",
      "Please review the details below before confirming.",
    ],
  };
  const [heading, description] = HEAD[step];

  return (
    <Flyout
      open={open}
      title="Book a service"
      onClose={close}
      onBack={onBack}
      heading={heading}
      description={description}
      footer={footer}
    >
      <StepIndicator current={idx} steps={STEP_LABELS} />

      {/* STEP 0 — service type */}
      {step === "type" && (
        <div className="radiolist">
          {serviceTypes.map((t) => (
            <Radio
              key={t.id}
              name="service-type"
              value={t.id}
              checked={typeId === t.id}
              onChange={setTypeId}
              label={t.label}
              description={`${t.description} · ${t.duration}`}
              trailing={t.priceFrom}
            />
          ))}
        </div>
      )}

      {/* STEP 1 — dealer */}
      {step === "dealer" && (
        <>
          {!changing ? (
            <div className="dealercard">
              <div className="dealercard__top">
                <span className="dealercard__name">{dealer.name}</span>
                <span className="dealercard__price">{dealer.servicePrice}</span>
              </div>
              <p className="dealercard__addr">{dealer.address}</p>
              <button
                className="link-arrow"
                onClick={() => {
                  setChanging(true);
                  setShowAll(false);
                  setQuery("");
                }}
              >
                Select a different dealership <ArrowRight width={15} height={15} />
              </button>
            </div>
          ) : (
            <>
              <label className="field">
                <span className="field__label">Enter postcode or suburb</span>
                <input
                  className="field__input"
                  placeholder="Start typing…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </label>
              <button className="link-arrow fly__loc" onClick={() => setQuery("")}>
                <MapPin width={14} height={14} /> Use current location
              </button>

              <div className="radiolist">
                {visible.map((d) => {
                  const tags: string[] = [];
                  if (d.id === preferredDealerId) tags.push("Preferred");
                  if (d.id === dealersByProximity[0].id) tags.push("Nearest");
                  return (
                    <Radio
                      key={d.id}
                      name="book-dealer"
                      value={d.id}
                      checked={dealerId === d.id}
                      onChange={(id) => {
                        setDealerId(id);
                        setChanging(false);
                      }}
                      label={
                        <span className="dealerlabel">
                          {d.name}
                          {tags.map((t) => (
                            <span key={t} className="dealerlabel__tag">
                              {t}
                            </span>
                          ))}
                        </span>
                      }
                      description={`${d.address} · ${d.distance} away`}
                      trailing={d.servicePrice}
                    />
                  );
                })}
                {list.length === 0 && (
                  <p className="dealerlist__empty">No dealers match “{query}”.</p>
                )}
              </div>
              {!showAll && list.length > 3 && (
                <button className="fly__more" onClick={() => setShowAll(true)}>
                  + Show more options
                </button>
              )}
              <button
                className="fly__more fly__more--cancel"
                onClick={() => setChanging(false)}
              >
                Cancel
              </button>
            </>
          )}
        </>
      )}

      {/* STEP 2 — date */}
      {step === "date" && (
        <DatePicker
          label="Date"
          required
          value={date}
          onChange={setDate}
          helper="Select your preferred service date."
          minDate={new Date()}
        />
      )}

      {/* STEP 3 — time */}
      {step === "time" && (
        <div className="timegrid">
          {serviceTimes.map((t) => (
            <button
              key={t}
              type="button"
              className={`timeslot${time === t ? " is-active" : ""}`}
              aria-pressed={time === t}
              onClick={() => setTime(t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* STEP 4 — transport */}
      {step === "transport" && (
        <div className="radiolist">
          {transportOptions.map((t) => (
            <Radio
              key={t.id}
              name="transport-option"
              value={t.id}
              checked={transportId === t.id}
              onChange={setTransportId}
              label={t.label}
              description={t.description}
            />
          ))}
        </div>
      )}

      {/* STEP 5 — confirm */}
      {step === "confirm" && (
        <>
          {isSmart && (
            <p className="smartnote">
              We pre-filled your booking from what we know — adjust anything
              you'd like, or step back to change.
            </p>
          )}
          <DataTable
            className="dtable--flyout"
            rows={[
              { label: "Vehicle", value: vehicleName },
              { label: "Service", value: serviceType.label },
              { label: "Dealer", value: dealer.name },
              { label: "Address", value: dealer.address },
              { label: "Date", value: fmtDate(date) },
              { label: "Drop-off time", value: time },
              { label: "Transport", value: transport.label },
              { label: "From", value: serviceType.priceFrom },
            ]}
          />
          <label className="field field--notes">
            <span className="field__label">Notes (optional)</span>
            <textarea
              className="field__input field__textarea"
              rows={3}
              placeholder="Anything we should know about? e.g. squeak, warning light…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
        </>
      )}
    </Flyout>
  );
}
