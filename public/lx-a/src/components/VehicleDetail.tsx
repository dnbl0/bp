import { useRef, useState } from "react";
import { ChevronLeft, ArrowRight, Check, Car } from "./icons";
import { accordionSections, type Vehicle } from "../data/vehicles";
import { useFlyout } from "../flyout/FlyoutProvider";
import { DataTable, type TableRow } from "./Table";
import { relativeFromNow } from "../lib/relativeTime";
import { ServiceTimeline } from "./ServiceTimeline";
import { DrivingReport } from "./DrivingReport";

type Tab = "overview" | "report" | "service" | "warranty";
const TABS: { value: Tab; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "report", label: "Your driving report" },
  { value: "service", label: "Service" },
  { value: "warranty", label: "Warranty" },
];

export function VehicleDetail({
  vehicle,
  onBack,
  initialTab = "overview",
}: {
  vehicle: Vehicle;
  onBack: () => void;
  initialTab?: Tab;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { open: openFlyout, regoOverrides } = useFlyout();
  const rego = regoOverrides[vehicle.id] ?? vehicle.rego;

  const editButton = (text: string, onClick: () => void) => (
    <button type="button" className="dtable__action linkbtn" onClick={onClick}>
      {text}
    </button>
  );
  const label = `${vehicle.year} ${vehicle.name}`;
  const bookService = () => openFlyout("book-service", { vehicleName: label });
  const viewHistory = () =>
    openFlyout("service-history", { vehicleName: label });
  const choosePreferredDealer = () => openFlyout("preferred-dealer");

  const summaryRows: TableRow[] = [
    { label: "VIN", value: vehicle.vin },
    {
      label: "Registration",
      value: rego,
      action: editButton("Edit", () =>
        openFlyout("edit-registration", {
          vehicleId: vehicle.id,
          vehicleName: label,
          rego,
        })
      ),
    },
    { label: "Odometer", value: vehicle.odometer },
    {
      label: "Encore Vehicle",
      value: vehicle.encore ? "Yes" : "No",
      action: vehicle.encore
        ? undefined
        : editButton("Learn more", () => openFlyout("encore-info")),
    },
    {
      label: "Manuals and resources",
      value: "Owner's manual, warranty & guides",
      action: editButton("Show more", () =>
        openFlyout("manuals", { vehicleName: label })
      ),
    },
  ];

  const moveTo = (i: number) => {
    const next = (i + TABS.length) % TABS.length;
    setTab(TABS[next].value);
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

  const sectionByKey = (key: string) =>
    accordionSections.find((s) => s.key === key);

  return (
    <div className="vdetail">
      <header className="pagehead pagehead--flush vdetail__head">
        {/* Hero — fills the full header; the crumb sits at its top. */}
        <section className="vhero">
          <div className="shell">
            <button className="crumb" onClick={onBack}>
              <ChevronLeft width={15} height={15} /> Your vehicles
            </button>
          </div>
          <div className="shell vhero__inner">
            <div className="vhero__media">
              <img src={vehicle.image} alt={vehicle.name} />
            </div>
            <div className="vhero__info">
              <p className="eyebrow eyebrow--muted">
                <span className="tick" /> Your vehicle
              </p>
              <h1 className="vhero__title">
                {vehicle.year} {vehicle.name}
              </h1>
              <p className="vhero__type">{vehicle.bodyType}</p>
              <div className="vhero__chips">
                {vehicle.encore && (
                  <span className="chip chip--ok">
                    <Check width={12} height={12} /> Encore verified
                  </span>
                )}
              </div>
              <button
                className="btn btn--primary vhero__cta"
                onClick={bookService}
              >
                Book a service
              </button>
            </div>
          </div>
        </section>
      </header>

      {/* Tab bar */}
      <div className="shell vtabs__wrap">
        <div className="vtabs" role="tablist" aria-label="Vehicle sections">
          {TABS.map((t, i) => {
            const active = t.value === tab;
            return (
              <button
                key={t.value}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`vtab-${t.value}`}
                aria-selected={active}
                aria-controls={`vpanel-${t.value}`}
                tabIndex={active ? 0 : -1}
                className={`vtabs__tab${active ? " is-active" : ""}`}
                onClick={() => setTab(t.value)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="shell vdetail__grid"
        role="tabpanel"
        id={`vpanel-${tab}`}
        aria-labelledby={`vtab-${tab}`}
      >
        <div className="vdetail__main">
          {tab === "overview" && (
            <section className="card vsum">
              <h2 className="card__title">Vehicle summary</h2>
              <DataTable rows={summaryRows} />
            </section>
          )}

          {tab === "report" && <DrivingReport vehicle={vehicle} />}

          {tab === "service" && (
            <>
              <ServiceTimeline vehicle={vehicle} />
              <section className="card maint">
                <h2 className="card__title">Maintenance</h2>
                <div className="maint__next">
                  <span className="maint__icon">
                    <Car width={22} height={22} />
                  </span>
                  <div>
                    <p className="maint__label">Next service</p>
                    <p className="maint__value">
                      {vehicle.nextService ??
                        "You have no upcoming services due"}
                    </p>
                    {vehicle.nextService &&
                      (() => {
                        const rel = relativeFromNow(vehicle.nextService);
                        return rel ? <p className="maint__rel">{rel}</p> : null;
                      })()}
                  </div>
                </div>
                <div className="maint__actions">
                  <button className="link-arrow" onClick={viewHistory}>
                    View service history{" "}
                    <ArrowRight width={16} height={16} />
                  </button>
                  <button className="btn btn--ghost" onClick={bookService}>
                    Book a service
                  </button>
                </div>
              </section>
              {sectionByKey("recalls") && (
                <section className="card vaccord vaccord--static">
                  <h2 className="card__title">
                    {sectionByKey("recalls")!.title}
                  </h2>
                  <div className="vaccord__body">
                    {sectionByKey("recalls")!.items.map((it) => (
                      <div key={it.q} className="vaccord__item">
                        <h3 className="vaccord__q">{it.q}</h3>
                        <p className="vaccord__a">{it.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {sectionByKey("customer") && (
                <section className="card vaccord vaccord--static">
                  <h2 className="card__title">
                    {sectionByKey("customer")!.title}
                  </h2>
                  <div className="vaccord__body">
                    {sectionByKey("customer")!.items.map((it) => (
                      <div key={it.q} className="vaccord__item">
                        <h3 className="vaccord__q">{it.q}</h3>
                        <p className="vaccord__a">{it.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {tab === "warranty" && sectionByKey("warranty") && (
            <section className="card vaccord vaccord--static">
              <h2 className="card__title">{sectionByKey("warranty")!.title}</h2>
              <div className="vaccord__body">
                {sectionByKey("warranty")!.items.map((it) => (
                  <div key={it.q} className="vaccord__item">
                    <h3 className="vaccord__q">{it.q}</h3>
                    <p className="vaccord__a">{it.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Side rail */}
        <aside className="vdetail__side">
          <div className="card vquick">
            <h2 className="card__title">Quick actions</h2>
            <button className="vquick__link" onClick={viewHistory}>
              Service history <ArrowRight width={15} height={15} />
            </button>
            <button className="vquick__link" onClick={choosePreferredDealer}>
              Preferred dealer <ArrowRight width={15} height={15} />
            </button>
            <button
              className="vquick__link"
              onClick={() => openFlyout("manuals", { vehicleName: label })}
            >
              Manuals &amp; resources <ArrowRight width={15} height={15} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
