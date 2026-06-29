import { serviceHistory } from "../data/service";
import type { Vehicle } from "../data/vehicles";

/**
 * Vertical service timeline — the upcoming service then every completed service
 * on record, each as a row on a connected rail. Reads top-to-bottom (upcoming
 * first) and stays legible at any width, unlike a packed horizontal axis.
 */
function cleanDate(label: string): string {
  return label.replace(/^(Due|Completed)\s+/i, "").trim();
}

export function ServiceTimeline({ vehicle }: { vehicle: Vehicle }) {
  if (serviceHistory.length === 0) return null;

  return (
    <section className="card stimeline">
      <header className="stimeline__head">
        <h2 className="card__title card__title--flush">Service timeline</h2>
        <span className="stimeline__odo">{vehicle.odometer}</span>
      </header>
      <p className="stimeline__lede">
        Every service on record for {vehicle.shortName}, and what's coming up
        next.
      </p>

      <ol className="stimeline__list">
        {serviceHistory.map((r) => {
          const up = r.status === "upcoming";
          return (
            <li key={r.id} className={`stitem${up ? " stitem--up" : ""}`}>
              <span className="stitem__marker" aria-hidden="true" />
              <div className="stitem__body">
                <div className="stitem__top">
                  <p className="stitem__title">{r.title}</p>
                  <span
                    className={`stitem__status${
                      up ? " stitem__status--up" : ""
                    }`}
                  >
                    {up ? "Upcoming" : "Completed"}
                  </span>
                </div>
                <p className="stitem__interval">{r.interval}</p>
                <p className="stitem__meta">
                  <span className="stitem__date">{cleanDate(r.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{r.dealer}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
