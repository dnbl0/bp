import { Flyout } from "../components/Flyout";
import { useFlyout } from "./FlyoutProvider";
import { bookingKindLabel } from "../data/bookings";
import { X } from "../components/icons";

export function UpcomingFlyout({ open }: { open: boolean }) {
  const { close, bookings, removeBooking } = useFlyout();

  return (
    <Flyout
      open={open}
      title="Upcoming"
      onClose={close}
      heading="Your upcoming events"
      description="Service bookings, valet visits and lounge access — sorted by what's next."
    >
      {bookings.length === 0 ? (
        <p className="dealerlist__empty">
          Nothing scheduled. Book a service or redeem a benefit to see it here.
        </p>
      ) : (
        <ul className="upcoming">
          {bookings.map((b) => (
            <li key={b.id} className="upcoming__item">
              <div className="upcoming__row">
                <span className={`upcoming__kind upcoming__kind--${b.kind}`}>
                  {bookingKindLabel[b.kind]}
                </span>
                <span className="upcoming__when">{b.when}</span>
              </div>
              <h3 className="upcoming__title">{b.title}</h3>
              <p className="upcoming__detail">{b.detail}</p>
              <button
                type="button"
                className="upcoming__cancel"
                aria-label={`Cancel ${b.title}`}
                onClick={() => removeBooking(b.id)}
              >
                <X width={14} height={14} /> Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </Flyout>
  );
}
