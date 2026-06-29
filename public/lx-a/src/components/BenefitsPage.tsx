import { ArrowRight, ChevronRight } from "./icons";
import {
  lifestyleOffers,
  serviceExperience,
  discoverEncore,
} from "../data/benefits";
import { type Benefit } from "../data/dashboard";
import { valetRedemptions } from "../data/valet";
import { lounge } from "../data/lounge";
import { useFlyout } from "../flyout/FlyoutProvider";

const onDemandRedemptions = 2;
const REDEMPTIONS: Record<string, number> = {
  "on-demand": onDemandRedemptions,
  valet: valetRedemptions,
  lounge: lounge.redemptions,
};

export function BenefitsPage({
  onBack,
  onOpenBenefit,
  benefits,
  memberProgram,
  memberTier,
  canRedeemEncore = true,
  restrictionsCopy,
  onExploreOffers,
  theme = "dark",
}: {
  onBack: () => void;
  onOpenBenefit: (id: "valet" | "lounge") => void;
  benefits: Benefit[];
  memberProgram: string;
  memberTier: string;
  canRedeemEncore?: boolean;
  restrictionsCopy?: string;
  onExploreOffers?: () => void;
  theme?: "light" | "dark";
}) {
  const { open: openFlyout } = useFlyout();
  return (
    <div className={`benefitspage${theme === "light" ? " theme-light" : ""}`}>
      <header className="pagehead pagehead--bordered">
        <div className="shell">
          <p className="eyebrow eyebrow--muted">
            <span className="tick" /> Lexus Encore
          </p>
          <div className="pagehead__titlerow">
            <h1 className="page-title">Encore Benefits</h1>
            <span className={`benefitspage__tier${theme === "light" ? " benefitspage__tier--light" : ""}`}>
              {memberProgram} · {memberTier}
            </span>
          </div>
        </div>
      </header>

      <div className="shell benefitspage__grid">
        <div className="benefitspage__main">
          {!canRedeemEncore && (
            <section className="card benefitspage__locked">
              <h2 className="card__title">Encore access is limited</h2>
              <p className="profile__hint">
                {restrictionsCopy ??
                  "Upgrade to a paid Encore membership to redeem benefits."}
              </p>
            </section>
          )}

          {/* Lifestyle benefits */}
          <section>
            <header className="section-head">
              <h2 className="eyebrow">Encore Benefits</h2>
            </header>
            <div className="benefits__grid">
              {benefits.map((b) => {
                const target =
                  b.id === "valet"
                    ? "valet"
                    : b.id === "lounge"
                    ? "lounge"
                    : null;
                const open = target ? () => onOpenBenefit(target) : undefined;
                return (
                  <article
                    key={b.id}
                    className={`bcard${open && canRedeemEncore ? " bcard--action" : ""}`}
                    onClick={canRedeemEncore ? open : undefined}
                    role={open && canRedeemEncore ? "button" : undefined}
                    tabIndex={open && canRedeemEncore ? 0 : undefined}
                    onKeyDown={
                      open && canRedeemEncore
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") open();
                          }
                        : undefined
                    }
                  >
                    <div className="bcard__media">
                      <img src={b.image} alt={b.title} loading="lazy" />
                      {canRedeemEncore && (
                        <span className="bcard__redeem">
                          {REDEMPTIONS[b.id]} left
                        </span>
                      )}
                    </div>
                    <div className="bcard__body">
                      <div className="bcard__group">
                        <h3 className="bcard__title">{b.title}</h3>
                        <p className="bcard__text">{b.body}</p>
                      </div>
                      <span className="link-arrow bcard__cta">
                        {!canRedeemEncore
                          ? "Join Encore"
                          : b.id === "valet"
                          ? "Book now"
                          : b.id === "lounge"
                          ? "Redeem"
                          : "Learn more"}{" "}
                        <ChevronRight width={16} height={16} />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Exclusive offers */}
          <section>
            <header className="section-head">
              <h2 className="eyebrow">Exclusive Offers</h2>
              {onExploreOffers && (
                <button
                  type="button"
                  className="link-arrow"
                  onClick={onExploreOffers}
                >
                  Explore all <ArrowRight width={16} height={16} />
                </button>
              )}
            </header>
            <div className="offers__grid">
              {lifestyleOffers.map((o) => (
                <article key={o.id} className="ocard">
                  <div className="ocard__media">
                    <img
                      src={o.image}
                      alt={`${o.brand}, ${o.location}`}
                      loading="lazy"
                    />
                    {canRedeemEncore && (
                      <span className="ocard__redeem">
                        {o.redemptions} redemption{o.redemptions === 1 ? "" : "s"}{" "}
                        left
                      </span>
                    )}
                  </div>
                  <div className="ocard__body">
                    <h3 className="ocard__brand">{o.brand}</h3>
                    <p className="ocard__loc">{o.location}</p>
                    <span className="link-arrow ocard__cta" aria-hidden="true">
                      Find out more <ArrowRight width={16} height={16} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Service experience */}
          <section className="service">
            <header className="section-head">
              <h2 className="eyebrow">Lexus Service Experience</h2>
            </header>
            <div className="service__grid">
              {serviceExperience.map((s) => {
                const target =
                  s.id === "drivecare"
                    ? ("drivecare" as const)
                    : s.id === "loan-car"
                    ? ("loan-car" as const)
                    : s.id === "connected"
                    ? ("connect" as const)
                    : null;
                const open =
                  target && canRedeemEncore
                    ? () => openFlyout(target)
                    : undefined;
                return (
                  <article
                    key={s.id}
                    className={`scard${open ? " scard--action" : ""}`}
                    role={open ? "button" : undefined}
                    tabIndex={open ? 0 : undefined}
                    onClick={open}
                    onKeyDown={
                      open
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") open();
                          }
                        : undefined
                    }
                  >
                    <h3 className="scard__title">{s.title}</h3>
                    <p className="scard__body">{s.body}</p>
                    <span className="link-arrow scard__cta" aria-hidden="true">
                      Find out more <ArrowRight width={16} height={16} />
                    </span>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        {/* Discover Encore sidebar */}
        <aside className="benefitspage__side">
          <h2 className="eyebrow eyebrow--muted discover__label">
            {discoverEncore.kicker}
          </h2>
          <article className="discover">
            <div className="discover__media">
              <img src={discoverEncore.image} alt="" />
            </div>
            <div className="discover__body">
              <h3 className="discover__title">{discoverEncore.title}</h3>
              <p className="discover__text">{discoverEncore.body}</p>
              <button
                type="button"
                className="btn btn--ghost discover__cta"
                disabled={!canRedeemEncore}
                onClick={() => canRedeemEncore && openFlyout("refer-friend")}
              >
                {canRedeemEncore ? discoverEncore.cta : "Join Encore"}{" "}
                <ArrowRight width={15} height={15} />
              </button>
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
}
