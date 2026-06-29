import { useRef, useState } from "react";
import { Flyout } from "../components/Flyout";
import { useFlyout } from "./FlyoutProvider";
import { serviceHistory } from "../data/service";
import { ChevronDown } from "../components/icons";

const TABS = ["All", "Upcoming", "Completed"] as const;
type Tab = (typeof TABS)[number];

export function ServiceHistoryFlyout({ open }: { open: boolean }) {
  const { close, open: openFlyout, payload } = useFlyout();
  const [tab, setTab] = useState<Tab>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const records = serviceHistory.filter((r) =>
    tab === "All"
      ? true
      : tab === "Upcoming"
      ? r.status === "upcoming"
      : r.status === "completed"
  );

  const moveTo = (i: number) => {
    const next = (i + TABS.length) % TABS.length;
    setTab(TABS[next]);
    tabRefs.current[next]?.focus();
  };

  const onTabKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      moveTo(idx + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      moveTo(idx - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      moveTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      moveTo(TABS.length - 1);
    }
  };

  return (
    <Flyout
      open={open}
      title="Service history"
      onClose={close}
      heading={payload.vehicleName ?? "Your vehicle"}
      description="View your upcoming and completed services."
      footer={
        <div className="flyout__actions">
          <button
            className="btn btn--primary"
            onClick={() =>
              openFlyout("book-service", { vehicleName: payload.vehicleName })
            }
          >
            Book a service
          </button>
        </div>
      }
    >
      <div className="segtabs" role="tablist" aria-label="Filter services">
        {TABS.map((t, i) => {
          const active = t === tab;
          return (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`segtab-${t}`}
              aria-selected={active}
              aria-controls={`segpanel-${t}`}
              tabIndex={active ? 0 : -1}
              className={`segtab${active ? " is-active" : ""}`}
              onClick={() => setTab(t)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {t}
            </button>
          );
        })}
      </div>

      <ul
        className="history"
        role="tabpanel"
        id={`segpanel-${tab}`}
        aria-labelledby={`segtab-${tab}`}
      >
        {records.map((r) => {
          const isOpen = openId === r.id;
          const expandable = !!r.detail;
          return (
            <li
              key={r.id}
              className={`hrec${isOpen ? " is-open" : ""}${
                expandable ? " hrec--expandable" : ""
              }`}
            >
              {expandable ? (
                <button
                  type="button"
                  className="hrec__head"
                  aria-expanded={isOpen}
                  aria-controls={`hrec-body-${r.id}`}
                  onClick={() => setOpenId(isOpen ? null : r.id)}
                >
                  <span className="hrec__headmain">
                    <span className="hrec__row">
                      <h3 className="hrec__title">{r.title}</h3>
                      <span className={`pill pill--${r.status}`}>
                        {r.status === "upcoming" ? "Upcoming" : "Completed"}
                      </span>
                    </span>
                    <p className="hrec__interval">{r.interval}</p>
                    <p className="hrec__meta">
                      {r.date} · {r.dealer}
                    </p>
                  </span>
                  <ChevronDown
                    width={18}
                    height={18}
                    className={`hrec__chev${isOpen ? " is-open" : ""}`}
                  />
                </button>
              ) : (
                <div className="hrec__head hrec__head--static">
                  <span className="hrec__headmain">
                    <span className="hrec__row">
                      <h3 className="hrec__title">{r.title}</h3>
                      <span className={`pill pill--${r.status}`}>
                        {r.status === "upcoming" ? "Upcoming" : "Completed"}
                      </span>
                    </span>
                    <p className="hrec__interval">{r.interval}</p>
                    <p className="hrec__meta">
                      {r.date} · {r.dealer}
                    </p>
                  </span>
                </div>
              )}

              {expandable && isOpen && (
                <div
                  id={`hrec-body-${r.id}`}
                  className="hrec__body"
                  role="region"
                >
                  <dl className="hrec__facts">
                    <div>
                      <dt>Odometer</dt>
                      <dd>{r.detail!.odometer}</dd>
                    </div>
                    <div>
                      <dt>Advisor</dt>
                      <dd>{r.detail!.advisor}</dd>
                    </div>
                    <div>
                      <dt>Total</dt>
                      <dd>{r.detail!.cost}</dd>
                    </div>
                  </dl>
                  <h4 className="hrec__subhead">Work performed</h4>
                  <ul className="hrec__list">
                    {r.detail!.workPerformed.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                  {r.detail!.partsReplaced && r.detail!.partsReplaced.length > 0 && (
                    <>
                      <h4 className="hrec__subhead">Parts replaced</h4>
                      <ul className="hrec__list">
                        {r.detail!.partsReplaced.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </li>
          );
        })}
        {records.length === 0 && (
          <li className="dealerlist__empty">No {tab.toLowerCase()} services.</li>
        )}
      </ul>
    </Flyout>
  );
}
