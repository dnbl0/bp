import { useState } from "react";
import { Flyout } from "../components/Flyout";
import { Confirmation } from "./Confirmation";
import { StepIndicator } from "./StepIndicator";
import { useFlyout } from "./FlyoutProvider";
import { Check, BookOpen, Phone, Calendar, ChevronRight } from "../components/icons";
import { dealersByProximity } from "../data/service";
import {
  models,
  modelById,
  formatPrice,
  selectionTotal,
  buildWishlistVehicle,
  type ConfigModel,
  type Selection,
} from "../data/configurator";

const STEPS = ["Model", "Grade", "Enhancements", "Colour & trim", "Summary"] as const;

const HEADINGS: { title: string; desc: string }[] = [
  { title: "Select a model", desc: "Choose the Lexus you'd like to build." },
  { title: "Select a grade", desc: "Compare grades and pick the one that suits you." },
  { title: "Add enhancements", desc: "Tailor your build with optional packs. You can skip this step." },
  { title: "Choose colour & trim", desc: "Select an exterior paint and interior upholstery." },
  { title: "Your build", desc: "Review your configuration and choose what to do next." },
];

export function BuildPriceFlyout({ open }: { open: boolean }) {
  const { close, addToWishlist } = useFlyout();
  const [step, setStep] = useState(0);
  const [modelId, setModelId] = useState<string | null>(null);
  const [gradeId, setGradeId] = useState<string | null>(null);
  const [enhIds, setEnhIds] = useState<string[]>([]);
  const [extId, setExtId] = useState<string | null>(null);
  const [intId, setIntId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const model = modelId ? modelById(modelId) : undefined;

  const reset = () => {
    setStep(0);
    setModelId(null);
    setGradeId(null);
    setEnhIds([]);
    setExtId(null);
    setIntId(null);
    setSaved(false);
    setActionMsg(null);
  };
  const handleClose = () => {
    close();
    setTimeout(reset, 340);
  };

  // Picking a model seeds sensible defaults so later steps are always valid.
  const pickModel = (m: ConfigModel) => {
    setModelId(m.id);
    setGradeId(null);
    setEnhIds([]);
    setExtId(m.exterior[0].id);
    setIntId(m.interior[0].id);
  };

  const toggleEnh = (id: string) =>
    setEnhIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const selection: Selection | null =
    model && gradeId
      ? {
          model,
          grade: model.grades.find((g) => g.id === gradeId)!,
          enhancements: model.enhancements.filter((e) => enhIds.includes(e.id)),
          exterior: model.exterior.find((c) => c.id === extId) ?? model.exterior[0],
          interior: model.interior.find((t) => t.id === intId) ?? model.interior[0],
        }
      : null;

  const canContinue =
    step === 0 ? !!modelId : step === 1 ? !!gradeId : true;

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => {
    setActionMsg(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const save = () => {
    if (!selection) return;
    addToWishlist(buildWishlistVehicle(selection, Date.now()));
    setSaved(true);
  };

  if (saved && selection) {
    return (
      <Flyout open={open} title="Build & Price" onClose={handleClose}>
        <Confirmation
          title="Added to your wishlist"
          description={
            <>
              Your {selection.grade.name} has been saved to your wishlist. You'll
              find it in your garage, ready to revisit or share with a dealer.
            </>
          }
          meta={`${selection.exterior.name} · ${selection.interior.name} · ${formatPrice(
            selectionTotal(selection)
          )}`}
          onDone={handleClose}
        />
      </Flyout>
    );
  }

  const footer =
    step < 4 ? (
      <div className="flyout__actions">
        <button
          className="btn btn--primary"
          disabled={!canContinue}
          onClick={goNext}
        >
          {step === 2 && enhIds.length === 0 ? "Skip" : "Continue"}
        </button>
      </div>
    ) : undefined;

  return (
    <Flyout
      open={open}
      title="Build & Price"
      onClose={handleClose}
      onBack={step > 0 ? goBack : undefined}
      footer={footer}
      wide
    >
      <StepIndicator current={step} steps={STEPS} />
      <h3 className="fly__heading">{HEADINGS[step].title}</h3>
      <p className="fly__desc">{HEADINGS[step].desc}</p>

      {/* Step 0 — model */}
      {step === 0 && (
        <div className="bp__models">
          {models.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`bp__model${modelId === m.id ? " is-active" : ""}`}
              onClick={() => pickModel(m)}
              aria-pressed={modelId === m.id}
            >
              <img className="bp__modelimg" src={m.image} alt={m.fullName} />
              <span className="bp__modelname">{m.fullName}</span>
              <span className="bp__modeltype">{m.bodyType}</span>
              <span className="bp__modelprice">From {formatPrice(m.priceFrom)}</span>
            </button>
          ))}
        </div>
      )}

      {/* Step 1 — grade (compare) */}
      {step === 1 && model && (
        <div className="bp__grades">
          {model.grades.length > 1 && (
            <p className="bp__comparenote">
              Comparing {model.grades.length} {model.name} grades
            </p>
          )}
          {model.grades.map((g) => {
            const active = gradeId === g.id;
            return (
              <button
                key={g.id}
                type="button"
                className={`bp__grade${active ? " is-active" : ""}`}
                onClick={() => setGradeId(g.id)}
                aria-pressed={active}
              >
                <span className="bp__gradetop">
                  <span className="bp__gradename">
                    {g.name}
                    {g.fSport && <span className="bp__fsport">F SPORT</span>}
                  </span>
                  <span className="bp__gradeprice">{formatPrice(g.price)}</span>
                </span>
                <span className="bp__gradespecs">
                  <span><b>{g.drivetrain}</b></span>
                  <span>{g.power}</span>
                  <span>{g.economy}</span>
                </span>
                <span className="bp__gradehl">
                  {g.highlights.map((h) => (
                    <span key={h} className="bp__gradehlitem">
                      <Check width={13} height={13} /> {h}
                    </span>
                  ))}
                </span>
                <span className="bp__radio" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      )}

      {/* Step 2 — enhancements */}
      {step === 2 && model && (
        <div className="bp__enh">
          {model.enhancements.map((e) => {
            const on = enhIds.includes(e.id);
            return (
              <button
                key={e.id}
                type="button"
                className={`bp__enhitem${on ? " is-active" : ""}`}
                onClick={() => toggleEnh(e.id)}
                aria-pressed={on}
              >
                <span className={`bp__check${on ? " is-on" : ""}`} aria-hidden="true">
                  {on && <Check width={14} height={14} />}
                </span>
                <span className="bp__enhbody">
                  <span className="bp__enhname">{e.name}</span>
                  <span className="bp__enhdesc">{e.description}</span>
                </span>
                <span className="bp__enhprice">+{formatPrice(e.price)}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Step 3 — colour & trim */}
      {step === 3 && model && (
        <div className="bp__ct">
          <div className="bp__ctgroup">
            <p className="bp__ctlabel">
              Exterior ·{" "}
              <span className="bp__ctsel">
                {model.exterior.find((c) => c.id === extId)?.name}
              </span>
            </p>
            <div className="bp__swatches">
              {model.exterior.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`bp__swatch${extId === c.id ? " is-active" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => setExtId(c.id)}
                  title={`${c.name}${c.price ? ` (+${formatPrice(c.price)})` : ""}`}
                  aria-label={c.name}
                  aria-pressed={extId === c.id}
                />
              ))}
            </div>
            {(() => {
              const c = model.exterior.find((x) => x.id === extId);
              return c ? (
                <p className="bp__ctmeta">
                  {c.finish}
                  {c.price ? ` · +${formatPrice(c.price)}` : " · No cost"}
                </p>
              ) : null;
            })()}
          </div>

          <div className="bp__ctgroup">
            <p className="bp__ctlabel">
              Interior ·{" "}
              <span className="bp__ctsel">
                {model.interior.find((t) => t.id === intId)?.name}
              </span>
            </p>
            <div className="bp__swatches">
              {model.interior.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`bp__swatch${intId === t.id ? " is-active" : ""}`}
                  style={{ background: t.hex }}
                  onClick={() => setIntId(t.id)}
                  title={t.name}
                  aria-label={t.name}
                  aria-pressed={intId === t.id}
                />
              ))}
            </div>
            {(() => {
              const t = model.interior.find((x) => x.id === intId);
              return t ? <p className="bp__ctmeta">{t.material}</p> : null;
            })()}
          </div>
        </div>
      )}

      {/* Step 4 — summary */}
      {step === 4 && selection && (
        <div className="bp__summary">
          <div className="bp__overview">
            <img
              className="bp__ovimg"
              src={selection.model.image}
              alt={selection.model.fullName}
            />
            <div className="bp__ovhead">
              <p className="bp__ovmodel">{selection.model.fullName}</p>
              <p className="bp__ovgrade">
                {selection.grade.name}
                {selection.grade.fSport && <span className="bp__fsport">F SPORT</span>}
              </p>
            </div>
          </div>

          <dl className="bp__specs">
            <div><dt>Drivetrain</dt><dd>{selection.grade.drivetrain}</dd></div>
            <div>
              <dt>Exterior</dt>
              <dd>
                <span className="bp__dot" style={{ background: selection.exterior.hex }} />
                {selection.exterior.name}
              </dd>
            </div>
            <div>
              <dt>Interior</dt>
              <dd>
                <span className="bp__dot" style={{ background: selection.interior.hex }} />
                {selection.interior.name}
              </dd>
            </div>
            {selection.enhancements.length > 0 && (
              <div>
                <dt>Enhancements</dt>
                <dd>{selection.enhancements.map((e) => e.name).join(", ")}</dd>
              </div>
            )}
          </dl>

          <div className="bp__total">
            <span>Estimated total</span>
            <span className="bp__totalval">{formatPrice(selectionTotal(selection))}</span>
          </div>
          <p className="bp__disclaimer">
            Indicative price excludes on-road costs. A dealer will confirm final
            drive-away pricing.
          </p>

          {actionMsg && (
            <p className="bp__actionmsg">
              <Check width={15} height={15} /> {actionMsg}
            </p>
          )}

          <div className="bp__actions">
            <button
              className="bp__action"
              onClick={() =>
                setActionMsg(
                  `Test drive request sent for the ${selection.grade.name}. A dealer will be in touch.`
                )
              }
            >
              <Calendar width={18} height={18} /> Book a test drive
            </button>
            {selection.model.brochure ? (
              <a
                className="bp__action"
                href={`assets/eBrochures/${selection.model.brochure}_ebrochure.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen width={18} height={18} /> Download eBrochure
              </a>
            ) : (
              <button
                className="bp__action"
                onClick={() =>
                  setActionMsg(
                    `The ${selection.model.name} eBrochure will be emailed to you shortly.`
                  )
                }
              >
                <BookOpen width={18} height={18} /> Download eBrochure
              </button>
            )}
            <button
              className="bp__action"
              onClick={() => {
                const d = dealersByProximity[0];
                setActionMsg(
                  `Nearest dealer: ${d.name}, ${d.address} (${d.distance}). Call 1800 023 009.`
                );
              }}
            >
              <Phone width={18} height={18} /> Contact nearest dealer
            </button>
          </div>

          <button className="btn btn--primary bp__save" onClick={save}>
            Add to wishlist <ChevronRight width={16} height={16} />
          </button>
        </div>
      )}
    </Flyout>
  );
}
