import type { ResultCard } from "../../lib/agent/tools";
import { useFlyout } from "../../flyout/FlyoutProvider";
import { AgentBookingForm } from "./AgentBookingForm";
import { Calendar, Car, Phone, MapPin, ArrowRight, BookOpen } from "../icons";

/**
 * Renders the structured payload a tool returns as a rich, on-brand card
 * beneath its step. Presentational — actions route through the flyout context.
 */
export function AgentResultCard({ card }: { card: ResultCard }) {
  const { open } = useFlyout();

  // Interactive booking flow, surfaced inline in the concierge thread.
  if (card.kind === "booking-flow") {
    return <AgentBookingForm flow={card.flow} vehicleName={card.vehicleName} />;
  }

  if (card.kind === "booking") {
    return (
      <div className="agent-card agent-card--booking">
        <span className="agent-card__icon" aria-hidden="true">
          <Calendar width={16} height={16} />
        </span>
        <div className="agent-card__body">
          <h4 className="agent-card__title">{card.title}</h4>
          <p className="agent-card__meta">{card.detail}</p>
          <p className="agent-card__when">{card.when}</p>
        </div>
        {card.deepLink && (
          <button
            type="button"
            className="agent-card__link"
            onClick={() => open(card.deepLink!, { returnTo: "concierge" })}
          >
            Review details <ArrowRight width={14} height={14} />
          </button>
        )}
      </div>
    );
  }

  if (card.kind === "vehicle") {
    return (
      <div className="agent-card">
        <h4 className="agent-card__title">
          <Car width={15} height={15} /> {card.name}
        </h4>
        <dl className="agent-card__rows">
          {card.rows.map((r) => (
            <div key={r.label} className="agent-card__row">
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  if (card.kind === "details") {
    return (
      <div className="agent-card">
        <h4 className="agent-card__title">{card.title}</h4>
        <dl className="agent-card__rows">
          {card.rows.map((r) => (
            <div key={r.label} className="agent-card__row">
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  if (card.kind === "benefits") {
    return (
      <div className="agent-card agent-card--benefits">
        <div className="agent-card__tier">
          <span className="agent-card__tierbadge">{card.tier}</span>
          <span className="agent-card__points">{card.points} pts</span>
        </div>
        <ul className="agent-card__list">
          {card.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (card.kind === "offers") {
    return (
      <div className="agent-card agent-card--offers">
        {card.items.map((o) => (
          <div key={o.id} className="agent-offer">
            <div
              className="agent-offer__img"
              style={{ backgroundImage: `url(${o.image})` }}
              aria-hidden="true"
            />
            <div className="agent-offer__text">
              <p className="agent-offer__brand">{o.brand}</p>
              <p className="agent-offer__loc">
                <MapPin width={12} height={12} /> {o.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (card.kind === "manual") {
    return (
      <div className="agent-card agent-card--manual">
        <h4 className="agent-card__title">
          <BookOpen width={15} height={15} /> {card.title}
        </h4>
        {card.section && <p className="agent-card__meta">{card.section}</p>}
        {card.body && <p className="agent-card__body">{card.body}</p>}
        {card.topics && card.topics.length > 0 && (
          <ul className="agent-card__chips">
            {card.topics.map((t) => (
              <li key={t} className="agent-card__chip">
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className="agent-card__links">
          {card.links.map((l) => (
            <a
              key={l.url + l.label}
              className="agent-card__link"
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label} <ArrowRight width={14} height={14} />
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (card.kind === "history") {
    return (
      <div className="agent-card">
        <ul className="agent-card__history">
          {card.rows.map((r) => (
            <li key={r.title}>
              <span className="agent-card__histtitle">{r.title}</span>
              <span className="agent-card__histmeta">{r.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // contact
  return (
    <div className="agent-card agent-card--contact">
      <span className="agent-card__icon" aria-hidden="true">
        <Phone width={16} height={16} />
      </span>
      <div className="agent-card__body">
        <h4 className="agent-card__title">{card.name}</h4>
        <p className="agent-card__meta">{card.note}</p>
        <a className="agent-card__call" href={`tel:+61${card.phone.replace(/\D/g, "").slice(1)}`}>
          Call {card.phone}
        </a>
      </div>
    </div>
  );
}
