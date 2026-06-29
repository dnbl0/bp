import type { ReactNode } from "react";
import { Check, ArrowRight, Flame } from "./icons";
import { Carousel } from "./Carousel";
import { fuelOffer } from "../data/dashboard";
import type { Vehicle } from "../data/vehicles";

/**
 * The single vehicle card used across the app (dashboard panel + garage).
 * Core = Encore head, car render on a gradient stage, model/body/rego meta,
 * with optional extras (status chip, corner badge, extra meta rows, footer
 * action, pending state) so it covers every context consistently.
 */
export function VehicleCard({
  vehicle: v,
  title,
  ctaLabel = "Manage vehicle",
  onClick,
  badge,
  extraMeta,
  footerExtra,
  pending = false,
}: {
  vehicle: Vehicle;
  title?: string;
  ctaLabel?: string;
  onClick?: () => void;
  badge?: { label: string; pending?: boolean };
  extraMeta?: { label: string; value: string }[];
  footerExtra?: ReactNode;
  pending?: boolean;
}) {
  const interactive = !!onClick && !pending;

  return (
    <article
      className={[
        "vcard",
        pending ? "vcard--pending" : "",
        interactive ? "vcard--interactive" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick!();
              }
            }
          : undefined
      }
      aria-disabled={pending || undefined}
    >
      <header className="vcard__head">
        <span className="vcard__program">Encore</span>
        {pending ? (
          <span className="chip">Verification in progress</span>
        ) : (
          <span className="vcard__status">
            {v.encore && (
              <span className="vcard__verified">
                <Check width={13} height={13} /> Verified
              </span>
            )}
          </span>
        )}
      </header>

      <div className="vcard__media">
        <img src={v.image} alt={v.name} />
        {badge && (
          <span
            className={`vcard__badge${
              badge.pending ? " vcard__badge--pending" : ""
            }`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <div className="vcard__meta">
        <h3 className="vcard__model">{title ?? v.shortName}</h3>
        <p className="vcard__body">{v.bodyType}</p>
        {extraMeta ? (
          <dl className="vcard__extrameta">
            <div>
              <dt>Rego</dt>
              <dd>{v.rego}</dd>
            </div>
            {extraMeta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="vcard__rego">{v.rego}</p>
        )}
      </div>

      {pending ? (
        <p className="vcard__pendingnote">
          We'll email you once Lexus has verified the VIN — usually within one
          business day.
        </p>
      ) : (
        <div className="vcard__footer">
          <span
            className="link-arrow vcard__cta"
            aria-hidden={interactive || undefined}
          >
            {ctaLabel} <ArrowRight width={16} height={16} />
          </span>
          {footerExtra}
        </div>
      )}
    </article>
  );
}

export function VehiclePanel({
  onManage,
  vehicles,
  canBookService = true,
}: {
  onManage?: (id: string) => void;
  vehicles: Vehicle[];
  canBookService?: boolean;
}) {
  const multi = vehicles.length > 1;

  return (
    <aside className="vpanel" data-reveal>
      <div className="vpanel__labelrow">
        <h2 className="eyebrow vpanel__label">
          {multi ? "Your Vehicles" : "Your Vehicle"}
        </h2>
      </div>

      {vehicles.length === 0 ? (
        <article className="vcard">
          <p className="vpanel__lede">
            You don't have a Lexus linked on this account.
          </p>
          <p className="vpanel__lede">
            Vehicle management and owner-only experiences appear once a Lexus is
            linked.
          </p>
        </article>
      ) : (
        <Carousel
          items={vehicles}
          getKey={(v) => v.id}
          perView={1}
          peek={44}
          ariaLabel="Your vehicles"
          renderItem={(v) => (
            <VehicleCard
              vehicle={v}
              ctaLabel="Manage vehicle"
              onClick={() => onManage?.(v.id)}
            />
          )}
        />
      )}

      {canBookService && (
        <article className="fuel">
          <div className="fuel__icon">
            <Flame width={20} height={20} />
          </div>
          <div>
            <h4 className="fuel__title">{fuelOffer.headline}</h4>
            <p className="fuel__detail">{fuelOffer.detail}</p>
          </div>
        </article>
      )}
    </aside>
  );
}
