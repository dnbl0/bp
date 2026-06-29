import { useState } from "react";
import { ChevronLeft, ArrowRight, Check } from "./icons";
import { Flyout } from "./Flyout";
import { Confirmation } from "../flyout/Confirmation";
import { DataTable } from "./Table";
import { usePersistedState } from "../lib/usePersistedState";
import { useFlyout } from "../flyout/FlyoutProvider";
import {
  valetRegions,
  valetSteps,
  valetIntro,
  valetRedemptions,
  type ValetLocation,
} from "../data/valet";

import { WestfieldMark, ChadstoneMark } from "./partnerLogos";

function PartnerLogo({ brand }: { brand: ValetLocation["brand"] }) {
  if (brand === "Chadstone") {
    return (
      <div className="plogo plogo--chadstone">
        <ChadstoneMark width={150} />
      </div>
    );
  }
  return (
    <div className="plogo plogo--westfield">
      <WestfieldMark width={156} />
    </div>
  );
}

export function ValetParking({ onBack }: { onBack: () => void }) {
  const { addBooking } = useFlyout();
  const [remaining, setRemaining] = usePersistedState(
    "lexus.valet.remaining",
    valetRedemptions
  );
  const [redeemedIds, setRedeemedIds] = usePersistedState<string[]>(
    "lexus.valet.redeemed",
    []
  );
  const redeemed = new Set(redeemedIds);
  const [selected, setSelected] = useState<ValetLocation | null>(null);
  const [justBooked, setJustBooked] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const open = (loc: ValetLocation) => {
    setSelected(loc);
    setJustBooked(false);
    setBookOpen(true);
  };
  const close = () => setBookOpen(false);

  const alreadyBooked = !!selected && redeemed.has(selected.id);
  const canBook = !!selected && remaining > 0 && !alreadyBooked;

  const redeem = () => {
    if (!canBook || !selected) return;
    setRemaining((r) => r - 1);
    setRedeemedIds((ids) =>
      ids.includes(selected.id) ? ids : [...ids, selected.id]
    );
    const at = Date.now() + 2 * 86_400_000;
    addBooking({
      id: `valet-${selected.id}`,
      kind: "valet",
      title: `Valet parking · ${selected.name}`,
      detail: `${selected.brand} · ${selected.address.split(",")[0]}`,
      when: new Date(at).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      at,
    });
    setJustBooked(true);
  };

  return (
    <div className="valet">
      <header className="pagehead pagehead--bordered">
        <div className="shell">
          <button className="crumb" onClick={onBack}>
            <ChevronLeft width={15} height={15} /> Go back
          </button>
          <div className="pagehead__titlerow">
            <h1 className="page-title">Valet Parking</h1>
            <div
              className="redeem-badge"
              aria-live="polite"
              aria-label={`${remaining} valet redemptions remaining`}
            >
              <span className="redeem-badge__num">{remaining}</span>
              <span className="redeem-badge__label">
                Redemptions
                <br />
                remaining
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="shell valet__grid">
        <div className="valet__main">
          {valetRegions.map((region) => (
            <section key={region.state} className="region">
              <h2 className="region__title">{region.state}</h2>
              <div className="region__grid">
                {region.locations.map((loc) => {
                  const isRedeemed = redeemed.has(loc.id);
                  return (
                    <article key={loc.id} className="lcard">
                      <div className="lcard__logo">
                        <PartnerLogo brand={loc.brand} />
                      </div>
                      <div className="lcard__body">
                        <div className="lcard__titlerow">
                          <h3 className="lcard__name">{loc.name}</h3>
                          {isRedeemed && (
                            <span className="lcard__redeemed">
                              <Check width={12} height={12} /> Booked
                            </span>
                          )}
                        </div>
                        <p className="lcard__note">{loc.note}</p>
                        <button
                          className="link-arrow lcard__cta"
                          onClick={() => open(loc)}
                        >
                          View details <ArrowRight width={16} height={16} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* How does it work */}
        <aside className="valet__side">
          <h2 className="howto__title">How does it work?</h2>
          <p className="howto__intro">{valetIntro}</p>
          <ol className="howto__steps">
            {valetSteps.map((s, i) => (
              <li
                key={s.title}
                className={`step${i === 0 ? " step--active" : ""}`}
              >
                <span className="step__num">{i + 1}.</span>
                <div>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      {/* Location detail / booking flyout */}
      <Flyout
        open={bookOpen}
        title="Valet parking"
        onClose={close}
        heading={selected && !justBooked ? selected.name : undefined}
        description={selected && !justBooked ? selected.note : undefined}
        footer={
          selected && !justBooked ? (
            <div className="flyout__actions">
              <button
                className="btn btn--primary"
                onClick={redeem}
                disabled={!canBook}
              >
                {alreadyBooked
                  ? "Already booked"
                  : remaining <= 0
                  ? "No redemptions left"
                  : "Book valet here"}
              </button>
            </div>
          ) : undefined
        }
      >
        {selected &&
          (!justBooked ? (
            <>
              <div className="fly__logo">
                <PartnerLogo brand={selected.brand} />
              </div>
              <DataTable
                className="dtable--flyout"
                rows={[
                  { label: "Address", value: selected.address },
                  { label: "Valet hours", value: selected.hours },
                  { label: "Redemptions remaining", value: remaining },
                ]}
              />
            </>
          ) : (
            <Confirmation
              title="Booking confirmed"
              description={
                <>
                  Valet parking confirmed at <strong>{selected.name}</strong>.
                  Just arrive and the friendly staff will park your Lexus.
                </>
              }
              meta={`${remaining} redemption${remaining === 1 ? "" : "s"} remaining`}
              onDone={close}
            />
          ))}
      </Flyout>
    </div>
  );
}
