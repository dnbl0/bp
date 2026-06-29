import { useState } from "react";
import { ChevronLeft, ChevronDown, ArrowRight } from "./icons";
import { Flyout } from "./Flyout";
import { Confirmation } from "../flyout/Confirmation";
import { DataTable } from "./Table";
import { DragonPassMark } from "./partnerLogos";
import { usePersistedState } from "../lib/usePersistedState";
import { useFlyout } from "../flyout/FlyoutProvider";
import {
  lounge,
  loungeStats,
  loungeSteps,
  loungeFaqs,
} from "../data/lounge";

export function AirportLounge({ onBack }: { onBack: () => void }) {
  const { addBooking } = useFlyout();
  const [remaining, setRemaining] = usePersistedState(
    "lexus.lounge.remaining",
    lounge.redemptions
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showRedeem, setShowRedeem] = useState(false);
  const [redeemed, setRedeemed] = useState(false);

  const redeem = () => {
    if (remaining <= 0) return;
    setRemaining((r) => r - 1);
    setRedeemed(true);
    const at = Date.now() + 90 * 86_400_000;
    addBooking({
      id: `lounge-${Date.now()}`,
      kind: "lounge",
      title: "Airport Lounge e-certificate",
      detail: "DragonPass · valid for 90 days",
      when: new Date(at).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      at,
    });
  };

  const openTerms = () => {
    const terms = loungeFaqs.findIndex((f) =>
      /terms/i.test(f.q)
    );
    setOpenFaq(terms === -1 ? 0 : terms);
    document
      .getElementById("lounge-faq")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="lounge">
      <header className="pagehead pagehead--bordered">
        <div className="shell">
          <button className="crumb" onClick={onBack}>
            <ChevronLeft width={15} height={15} /> Go back
          </button>
          <div className="pagehead__titlerow">
            <h1 className="page-title">{lounge.title}</h1>
            <div
              className="redeem-badge"
              aria-live="polite"
              aria-label={`${remaining} lounge redemptions remaining`}
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

      <div className="shell lounge__grid">
        <div className="lounge__main">
          {/* Intro */}
          <section className="lounge__intro">
            <h2 className="lounge__subtitle">{lounge.subtitle}</h2>
            <p className="lounge__desc">{lounge.description}</p>
            <div className="lounge__stats">
              {loungeStats.map((s) => (
                <div key={s.label} className="stat">
                  <span className="stat__value">{s.value}</span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Feature / redeem card */}
          <section className="feature">
            <div className="feature__media">
              <img src={lounge.image} alt="" />
            </div>
            <div className="feature__body">
              <DragonPassMark width={148} className="feature__partner" />
              <h3 className="feature__title">{lounge.feature.title}</h3>
              <p className="feature__text">{lounge.feature.body}</p>
              <div className="feature__actions">
                <button
                  className="btn btn--primary"
                  onClick={() => {
                    setShowRedeem(true);
                    setRedeemed(false);
                  }}
                >
                  {lounge.feature.primaryCta}
                </button>
                <button
                  type="button"
                  className="link-arrow"
                  onClick={openTerms}
                >
                  {lounge.feature.secondaryCta}{" "}
                  <ArrowRight width={16} height={16} />
                </button>
              </div>
            </div>
          </section>

          {/* More information / FAQ */}
          <section className="faq" id="lounge-faq">
            <header className="section-head">
              <h2 className="eyebrow">More information</h2>
            </header>
            <div className="faq__list">
              {loungeFaqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className={`faq__item${open ? " is-open" : ""}`}>
                    <button
                      className="faq__q"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                    >
                      <span>{f.q}</span>
                      <ChevronDown
                        width={18}
                        height={18}
                        className="faq__chev"
                      />
                    </button>
                    {open && <p className="faq__a">{f.a}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* How to purchase or redeem */}
        <aside className="valet__side">
          <h2 className="howto__title">How to purchase or redeem</h2>
          <ol className="howto__steps">
            {loungeSteps.map((s, i) => (
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

      {/* Redeem flyout */}
      <Flyout
        open={showRedeem}
        title="Airport lounge"
        heading={redeemed ? undefined : "Redeem lounge access"}
        description={
          redeemed
            ? undefined
            : "Confirm to issue an e-certificate for one airport lounge visit via the DragonPass network. Valid for 90 days."
        }
        onClose={() => setShowRedeem(false)}
        footer={
          !redeemed ? (
            <div className="flyout__actions">
              <button
                className="btn btn--primary"
                onClick={redeem}
                disabled={remaining <= 0}
              >
                {remaining <= 0 ? "No redemptions left" : "Confirm redemption"}
              </button>
            </div>
          ) : undefined
        }
      >
        {!redeemed ? (
          <>
            <DataTable
              className="dtable--flyout"
              rows={[
                { label: "Benefit", value: "Lounge Access" },
                { label: "Network", value: "DragonPass · 800+" },
                { label: "Redemptions remaining", value: remaining },
              ]}
            />
          </>
        ) : (
          <Confirmation
            title="E-certificate issued"
            description="Your lounge pass has been sent to your email and added to the Lexus Encore App. Present it with your boarding pass and passport at the lounge."
            meta={`${remaining} redemption${remaining === 1 ? "" : "s"} remaining`}
            onDone={() => setShowRedeem(false)}
          />
        )}
      </Flyout>
    </div>
  );
}
