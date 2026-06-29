// ──────────────────────────────────────────────────────────────────────────
// AgentBookingForm — the booking steps, surfaced *inline* in the concierge.
//
// Instead of opening a flyout/page, the agent renders this interactive,
// multi-step form right in the thread. It reuses the same data and writes the
// exact same Booking the real flyout/pages would, so the result lands in
// Upcoming identically — the member just never leaves the conversation.
// ──────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useFlyout } from "../../flyout/FlyoutProvider";
import {
  dealers,
  dealersByProximity,
  serviceTimes,
  serviceTypes,
  defaultServiceTypeId,
  transportOptions,
  defaultTransportId,
} from "../../data/service";
import { valetRegions } from "../../data/valet";
import type { Booking } from "../../data/bookings";
import { Radio } from "../Radio";
import { DatePicker } from "../DatePicker";
import { StepIndicator } from "../../flyout/StepIndicator";
import { Confirmation } from "../../flyout/Confirmation";

type Flow = "service" | "valet" | "lounge";

const DAY = 86_400_000;

function isoToDmy(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
function longDate(at: number) {
  return new Date(at).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AgentBookingForm({
  flow,
  vehicleName,
}: {
  flow: Flow;
  vehicleName?: string;
}) {
  if (flow === "service") return <ServiceForm vehicleName={vehicleName} />;
  if (flow === "valet") return <ValetForm />;
  return <LoungeForm />;
}

/** Inline confirmation shown once a booking is written. */
function Booked({ booking }: { booking: Booking }) {
  const { open } = useFlyout();
  return (
    <div className="agent-bf agent-bf--done">
      <Confirmation
        title="Booking confirmed"
        description={
          <>
            {booking.title}
            <br />
            {booking.detail}
          </>
        }
        meta={booking.when}
        onDone={() => open("upcoming", {})}
      />
    </div>
  );
}

function Actions({
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="agent-bf__actions">
      {onBack && (
        <button type="button" className="btn btn--ghost btn--sm" onClick={onBack}>
          Back
        </button>
      )}
      <button
        type="button"
        className="btn btn--primary btn--sm"
        disabled={nextDisabled}
        onClick={onNext}
      >
        {nextLabel}
      </button>
    </div>
  );
}

// ── Service: type → dealer → date → time → transport → confirm ───────────────

const SERVICE_STEPS = [
  "Type",
  "Dealer",
  "Date",
  "Time",
  "Transport",
  "Confirm",
] as const;

function ServiceForm({ vehicleName }: { vehicleName?: string }) {
  const { addBooking, preferredDealerId } = useFlyout();
  const [idx, setIdx] = useState(0);
  const [typeId, setTypeId] = useState(defaultServiceTypeId);
  const [dealerId, setDealerId] = useState(preferredDealerId);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [transportId, setTransportId] = useState(defaultTransportId);
  const [done, setDone] = useState<Booking | null>(null);

  const serviceType = serviceTypes.find((t) => t.id === typeId) ?? serviceTypes[0];
  const dealer = dealers.find((d) => d.id === dealerId) ?? dealers[0];
  const transport = transportOptions.find((o) => o.id === transportId);
  const vName = vehicleName ?? "your Lexus";

  if (done) return <Booked booking={done} />;

  const isConfirm = idx === SERVICE_STEPS.length - 1;
  const canContinue =
    idx === 2 ? !!date : idx === 3 ? !!time : true; // type/dealer/transport pre-set

  const submit = () => {
    const [y, m, d] = date.split("-").map(Number);
    const at = y ? new Date(y, (m ?? 1) - 1, d ?? 1).getTime() : Date.now();
    const booking: Booking = {
      id: `service-${dealer.id}-${date}-${time}`,
      kind: "service",
      title: `${serviceType.label} · ${dealer.name}`,
      detail: `${vName} · drop-off ${time}`,
      when: isoToDmy(date),
      at,
    };
    addBooking(booking);
    setDone(booking);
  };

  return (
    <div className="agent-bf">
      <StepIndicator current={idx} steps={SERVICE_STEPS} />
      <div className={`agent-bf__body${idx === 2 ? " agent-bf__body--date" : ""}`}>
        {idx === 0 &&
          serviceTypes.map((t) => (
            <Radio
              key={t.id}
              name="agent-svc-type"
              value={t.id}
              checked={typeId === t.id}
              onChange={setTypeId}
              label={t.label}
              description={`${t.priceFrom} · ${t.duration}`}
              framed
            />
          ))}
        {idx === 1 &&
          dealersByProximity.map((d) => (
            <Radio
              key={d.id}
              name="agent-svc-dealer"
              value={d.id}
              checked={dealerId === d.id}
              onChange={setDealerId}
              label={d.name}
              description={d.address}
              framed
            />
          ))}
        {idx === 2 && (
          <DatePicker value={date} onChange={setDate} minDate={new Date()} />
        )}
        {idx === 3 && (
          <div className="agent-bf__times">
            {serviceTimes.map((t) => (
              <button
                key={t}
                type="button"
                className={`agent-bf__time${time === t ? " is-on" : ""}`}
                aria-pressed={time === t}
                onClick={() => setTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}
        {idx === 4 &&
          transportOptions.map((o) => (
            <Radio
              key={o.id}
              name="agent-svc-transport"
              value={o.id}
              checked={transportId === o.id}
              onChange={setTransportId}
              label={o.label}
              description={o.description}
              framed
            />
          ))}
        {isConfirm && (
          <dl className="agent-bf__summary">
            <div>
              <dt>Service</dt>
              <dd>{serviceType.label}</dd>
            </div>
            <div>
              <dt>Vehicle</dt>
              <dd>{vName}</dd>
            </div>
            <div>
              <dt>Dealer</dt>
              <dd>{dealer.name}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{isoToDmy(date)}</dd>
            </div>
            <div>
              <dt>Drop-off</dt>
              <dd>{time}</dd>
            </div>
            <div>
              <dt>Transport</dt>
              <dd>{transport?.label}</dd>
            </div>
          </dl>
        )}
      </div>
      <Actions
        onBack={idx > 0 ? () => setIdx((i) => i - 1) : undefined}
        onNext={() => (isConfirm ? submit() : setIdx((i) => i + 1))}
        nextLabel={isConfirm ? "Confirm booking" : "Continue"}
        nextDisabled={!canContinue}
      />
    </div>
  );
}

// ── Valet: choose a location → reserve ───────────────────────────────────────

function ValetForm() {
  const { addBooking } = useFlyout();
  const [locId, setLocId] = useState("");
  const [done, setDone] = useState<Booking | null>(null);
  const selected =
    valetRegions.flatMap((r) => r.locations).find((l) => l.id === locId) ?? null;

  if (done) return <Booked booking={done} />;

  const submit = () => {
    if (!selected) return;
    const at = Date.now() + 2 * DAY;
    const booking: Booking = {
      id: `valet-${selected.id}`,
      kind: "valet",
      title: `Valet parking · ${selected.name}`,
      detail: `${selected.brand} · ${selected.address.split(",")[0]}`,
      when: longDate(at),
      at,
    };
    addBooking(booking);
    setDone(booking);
  };

  return (
    <div className="agent-bf">
      <h4 className="agent-bf__head">Choose a valet location</h4>
      <div className="agent-bf__body">
        {valetRegions.map((r) => (
          <div key={r.state} className="agent-bf__group">
            <p className="agent-bf__grouphead">{r.state}</p>
            {r.locations.map((l) => (
              <Radio
                key={l.id}
                name="agent-valet-loc"
                value={l.id}
                checked={locId === l.id}
                onChange={setLocId}
                label={l.name}
                description={`${l.brand} · ${l.address.split(",")[0]}`}
                framed
              />
            ))}
          </div>
        ))}
      </div>
      <Actions
        onNext={submit}
        nextLabel="Reserve valet"
        nextDisabled={!selected}
      />
    </div>
  );
}

// ── Lounge: confirm → issue ──────────────────────────────────────────────────

function LoungeForm() {
  const { addBooking } = useFlyout();
  const [done, setDone] = useState<Booking | null>(null);

  if (done) return <Booked booking={done} />;

  const submit = () => {
    const at = Date.now() + 90 * DAY;
    const booking: Booking = {
      id: `lounge-${Date.now()}`,
      kind: "lounge",
      title: "Airport Lounge e-certificate",
      detail: "DragonPass · valid for 90 days",
      when: longDate(at),
      at,
    };
    addBooking(booking);
    setDone(booking);
  };

  return (
    <div className="agent-bf">
      <h4 className="agent-bf__head">Airport lounge e-certificate</h4>
      <p className="agent-bf__note">
        Issues one DragonPass airport lounge visit, valid for 90 days from today.
        It'll appear in your upcoming list.
      </p>
      <Actions onNext={submit} nextLabel="Issue e-certificate" />
    </div>
  );
}
