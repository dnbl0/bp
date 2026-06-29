import { timeBasedGreeting, timeBand } from "../data/dashboard";

export interface HeroCta {
  label: string;
  onClick?: () => void;
}

export interface HeroMarketing {
  eyebrow: string;
  title: string;
  lead: string;
  ctas: HeroCta[];
}

/** Lexus-style hero CTA group — two buttons sharing the row (`Hero_heroButton`),
 *  the first filled (primary), the rest outlined. */
function HeroCtas({ ctas }: { ctas: HeroCta[] }) {
  return (
    <div className="hero__ctas">
      {ctas.map((c, i) => (
        <button
          key={c.label}
          type="button"
          className={`btn ${i === 0 ? "btn--primary" : "btn--ghost"} hero__cta`}
          onClick={c.onClick}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

export function Hero({
  member,
  image = "assets/hero.png",
  marketing,
  ctas,
}: {
  member: {
    firstName: string;
    tier: string;
    program: string;
  };
  image?: string;
  marketing?: HeroMarketing;
  /** CTAs for the greeting (Encore/owner) hero — ignored in marketing mode,
   *  which carries its own `marketing.ctas`. */
  ctas?: HeroCta[];
}) {
  const band = timeBand();

  return (
    <section
      className={`hero hero--${band}${marketing ? " hero--marketing" : ""}`}
    >
      <img className="hero__bg" src={image} alt="" />
      <div className="hero__scrim" />
      <div className="hero__wash" aria-hidden="true" />
      <div className="shell hero__content">
        {/* Lexus senkei (inari) brand line. */}
        <span className="hero__senkei" aria-hidden="true" />
        {marketing ? (
          <>
            <p className="hero__eyebrow">{marketing.eyebrow}</p>
            <h1 className="hero__title">{marketing.title}</h1>
            <p className="hero__lead">{marketing.lead}</p>
            <HeroCtas ctas={marketing.ctas} />
          </>
        ) : (
          <>
            <h1 className="hero__title">
              {timeBasedGreeting()},<br />
              <span className="hero__name">{member.firstName}</span>
            </h1>
            {ctas && ctas.length > 0 && <HeroCtas ctas={ctas} />}
          </>
        )}
      </div>
    </section>
  );
}
