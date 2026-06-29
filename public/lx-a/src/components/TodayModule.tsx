import { ArrowRight, Calendar, Car } from "./icons";
import { useFlyout } from "../flyout/FlyoutProvider";
import type { Vehicle } from "../data/vehicles";
import { relativeFromNow } from "../lib/relativeTime";

/**
 * Slim horizontal "today" strip. Sits between the Hero (which carries the
 * greeting) and the Dashboard grid. Surfaces next-service relative time and
 * upcoming bookings count, with a single Smart book primary CTA.
 */
export function TodayModule({
  onOpenVehicle,
  vehicles,
  canBookService = true,
}: {
  onOpenVehicle: (id: string) => void;
  vehicles: Vehicle[];
  canBookService?: boolean;
}) {
  const { open: openFlyout, bookings, preferredDealerId } = useFlyout();
  const selectedVehicle = vehicles[0] ?? null;

  const dueRel = selectedVehicle?.nextService
    ? relativeFromNow(selectedVehicle.nextService)
    : null;
  const upcomingCount = bookings.length;

  const bookSmart = () =>
    openFlyout("book-service", {
      vehicleName: selectedVehicle
        ? `${selectedVehicle.year} ${selectedVehicle.name}`
        : "your Lexus",
      smart: true,
      preferredDealerId,
    });

  return (
    <section className="today" aria-label="Today" data-reveal>
      {/* Service */}
      {canBookService && (
        <div className="today__cell today__cell--lead">
          <span className="today__icon" aria-hidden="true">
            <Car width={18} height={18} />
          </span>
          <div className="today__text">
            <p className="today__label">Next service</p>
            <p className="today__value">
              {selectedVehicle?.nextService ? (
                <>
                  <span className="today__primary">{dueRel ?? "Upcoming"}</span>
                  <span className="today__secondary">
                    {" · "}
                    {selectedVehicle.nextService.split(" · ")[0]}
                  </span>
                </>
              ) : selectedVehicle ? (
                <span className="today__primary">No services due</span>
              ) : (
                <span className="today__primary">No Lexus linked</span>
              )}
            </p>
          </div>
          {selectedVehicle?.nextService ? (
            <button
              type="button"
              className="btn btn--primary today__cta"
              onClick={bookSmart}
            >
              Smart book
            </button>
          ) : selectedVehicle ? (
            <button
              type="button"
              className="link-arrow today__link"
              onClick={() => onOpenVehicle(selectedVehicle.id)}
            >
              View vehicle <ArrowRight width={14} height={14} />
            </button>
          ) : null}
        </div>
      )}

      {/* Upcoming */}
      <div className="today__cell">
        <span className="today__icon" aria-hidden="true">
          <Calendar width={18} height={18} />
        </span>
        <div className="today__text">
          <p className="today__label">Upcoming</p>
          <p className="today__value">
            <span className="today__primary">
              {upcomingCount === 0
                ? "Nothing scheduled"
                : `${upcomingCount} ${
                    upcomingCount === 1 ? "event" : "events"
                  }`}
            </span>
            {bookings[0] && (
              <span className="today__secondary"> · next {bookings[0].when}</span>
            )}
          </p>
        </div>
        {upcomingCount > 0 && (
          <button
            type="button"
            className="link-arrow today__link"
            onClick={() => openFlyout("upcoming")}
          >
            View all <ArrowRight width={14} height={14} />
          </button>
        )}
      </div>
    </section>
  );
}
