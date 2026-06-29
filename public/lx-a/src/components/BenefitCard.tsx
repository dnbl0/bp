import type { CSSProperties } from "react";
import { ChevronRight } from "./icons";
import type { Benefit } from "../data/dashboard";

export function BenefitCard({
  benefit,
  onClick,
  ctaLabel = "Book now",
  revealIndex,
}: {
  benefit: Benefit;
  onClick?: () => void;
  ctaLabel?: string;
  /** Position in the grid — drives the staggered scroll-reveal delay. */
  revealIndex?: number;
}) {
  const interactive = !!onClick;
  return (
    <article
      className={`bcard${interactive ? " bcard--action" : ""}`}
      data-reveal={revealIndex === undefined ? undefined : ""}
      style={
        revealIndex === undefined
          ? undefined
          : ({ "--reveal-i": revealIndex } as CSSProperties)
      }
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick!();
            }
          : undefined
      }
    >
      <div className="bcard__media">
        <img src={benefit.image} alt={benefit.title} loading="lazy" />
      </div>
      <div className="bcard__body">
        <div className="bcard__group">
          <h3 className="bcard__title">{benefit.title}</h3>
          <p className="bcard__text">{benefit.body}</p>
        </div>
        {interactive && (
          <span className="link-arrow bcard__cta">
            {ctaLabel} <ChevronRight width={16} height={16} />
          </span>
        )}
      </div>
    </article>
  );
}
