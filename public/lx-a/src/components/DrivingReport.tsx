import { drivingReportFor } from "../data/driving";
import type { Vehicle } from "../data/vehicles";

/**
 * Monthly driving report for a vehicle — a consumption hero, a month-over-month
 * comparison, and a distance / trips / driving-time breakdown.
 */
export function DrivingReport({ vehicle }: { vehicle: Vehicle }) {
  const r = drivingReportFor(vehicle.id);
  const { consumption: c } = r;
  const max = Math.max(c.current.value, c.previous.value) || 1;
  const months = [
    { ...c.current, current: true },
    { ...c.previous, current: false },
  ];

  return (
    <section className="card dreport">
      <div className="dreport__hero">
        <div className="dreport__herotext">
          <p className="dreport__period">{r.period}</p>
          <p className="dreport__metric">{c.value}</p>
          <p className="dreport__metriclabel">
            {c.label}
            <span className="dreport__unit">({c.unit})</span>
          </p>
        </div>
        <img
          className="dreport__car"
          src={vehicle.image}
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="dreport__compare">
        <div className="dreport__bars">
          {months.map((m) => (
            <div className="dreport__barrow" key={m.label}>
              <span className="dreport__barlabel">{m.label}</span>
              <span className="dreport__bartrack">
                <span
                  className={`dreport__barfill${
                    m.current ? " dreport__barfill--current" : ""
                  }`}
                  style={{ width: `${(m.value / max) * 100}%` }}
                />
              </span>
              <span className="dreport__barvalue">{m.value}</span>
            </div>
          ))}
        </div>
        <p
          className={`dreport__delta${
            c.improved ? " dreport__delta--good" : ""
          }`}
        >
          {c.deltaNote}
        </p>
      </div>

      <dl className="dreport__stats">
        {r.stats.map((s) => (
          <div className="dreport__stat" key={s.label}>
            <div className="dreport__statmain">
              <dt className="dreport__statlabel">{s.label}</dt>
              <dd className="dreport__statvalue">
                {s.value}
                {s.unit && <span className="dreport__statunit"> {s.unit}</span>}
              </dd>
            </div>
            <p className="dreport__statnote">{s.note}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
