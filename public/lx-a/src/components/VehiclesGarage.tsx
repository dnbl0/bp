import { Car, ChevronRight } from "./icons";
import { VehicleCard } from "./VehicleCard";
import type { Vehicle } from "../data/vehicles";
import { formatPrice } from "../data/configurator";
import { useFlyout } from "../flyout/FlyoutProvider";

export function VehiclesGarage({
  onSelect,
  vehicles,
  canAddVehicle = true,
  wishlistMode = false,
}: {
  onSelect: (v: Vehicle) => void;
  vehicles: Vehicle[];
  canAddVehicle?: boolean;
  /** Limited account: shows saved Build & Price configurations instead of
      owned vehicles, and a Build & Price entry point. */
  wishlistMode?: boolean;
}) {
  const { open: openFlyout, pendingVehicles, wishlist, removeFromWishlist } =
    useFlyout();

  if (wishlistMode) {
    return (
      <div className="garage">
        <header className="pagehead pagehead--bordered">
          <div className="shell">
            <p className="eyebrow eyebrow--muted">
              <span className="tick" /> Wishlist
            </p>
            <div className="pagehead__titlerow">
              <h1 className="page-title">Your Wishlist</h1>
              <div className="garage__headright">
                <span className="garage__count">
                  {wishlist.length} {wishlist.length === 1 ? "build" : "builds"} saved
                </span>
                <button
                  type="button"
                  className="btn btn--ghost btn--pill garage__add"
                  onClick={() => openFlyout("build-price")}
                >
                  <Car width={16} height={16} /> Build &amp; Price
                </button>
              </div>
            </div>
          </div>
        </header>

        {wishlist.length === 0 ? (
          <div className="shell garage__empty">
            <p className="garage__emptyhead">Your wishlist is empty.</p>
            <p className="garage__emptybody">
              Build and price a Lexus to save it here. Compare grades, choose your
              colour and trim, then add it to your wishlist to revisit any time.
            </p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => openFlyout("build-price")}
            >
              Build &amp; Price a Lexus
            </button>
          </div>
        ) : (
          <div className="shell garage__grid garage__grid--wish">
            {wishlist.map((w) => (
              <article key={w.id} className="wcard">
                <div className="wcard__media">
                  <img src={w.image} alt={w.name} />
                </div>
                <div className="wcard__body">
                  <p className="wcard__model">{w.modelName}</p>
                  <h3 className="wcard__name">{w.name}</h3>
                  <p className="wcard__type">{w.bodyType}</p>
                  <dl className="wcard__meta">
                    <div>
                      <dt>Exterior</dt>
                      <dd>
                        <span
                          className="wcard__dot"
                          style={{ background: w.exteriorHex }}
                        />
                        {w.exteriorName}
                      </dd>
                    </div>
                    <div>
                      <dt>Interior</dt>
                      <dd>
                        <span
                          className="wcard__dot"
                          style={{ background: w.interiorHex }}
                        />
                        {w.interiorName}
                      </dd>
                    </div>
                  </dl>
                  {w.enhancements.length > 0 && (
                    <p className="wcard__enh">
                      {w.enhancements.length} enhancement
                      {w.enhancements.length > 1 ? "s" : ""} added
                    </p>
                  )}
                  <div className="wcard__foot">
                    <span className="wcard__price">{formatPrice(w.price)}</span>
                    <button
                      type="button"
                      className="wcard__remove"
                      onClick={() => removeFromWishlist(w.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <button
                    type="button"
                    className="link-arrow wcard__cta"
                    onClick={() => openFlyout("build-price")}
                  >
                    Build another <ChevronRight width={16} height={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  }

  const allVehicles = [...vehicles, ...pendingVehicles];

  return (
    <div className="garage">
      <header className="pagehead pagehead--bordered">
        <div className="shell">
          <p className="eyebrow eyebrow--muted">
            <span className="tick" /> My Lexus
          </p>
          <div className="pagehead__titlerow">
            <h1 className="page-title">Your Vehicles</h1>
            <div className="garage__headright">
              <span className="garage__count">
                {allVehicles.length}{" "}
                {allVehicles.length === 1 ? "vehicle" : "vehicles"} linked
              </span>
              <button
                type="button"
                className="btn btn--ghost btn--pill garage__add"
                disabled={!canAddVehicle}
                onClick={() => canAddVehicle && openFlyout("add-vehicle")}
              >
                <Car width={16} height={16} /> Add a vehicle
              </button>
            </div>
          </div>
        </div>
      </header>

      {allVehicles.length === 0 && (
        <div className="shell garage__empty">
          <p className="garage__emptyhead">No vehicles linked yet.</p>
          <p className="garage__emptybody">
            {canAddVehicle
              ? "Link your first Lexus to unlock service booking, Encore benefits and connected-vehicle features."
              : "This account doesn't have Lexus ownership access. Switch back to your owner account to manage vehicles."}
          </p>
        </div>
      )}

      <div className="shell garage__grid">
        {allVehicles.map((v) => {
          const isPending = !!v.pending;
          return (
            <VehicleCard
              key={v.id}
              vehicle={v}
              title={`${v.year !== "—" ? `${v.year} ` : ""}${v.name}`}
              ctaLabel="View vehicle"
              onClick={isPending ? undefined : () => onSelect(v)}
              pending={isPending}
              badge={isPending ? { label: "Pending", pending: true } : undefined}
              extraMeta={[
                { label: "Odometer", value: v.odometer },
                {
                  label: "Next service",
                  value: v.nextService ? v.nextService.split(" · ")[0] : "—",
                },
              ]}
            />
          );
        })}
      </div>
    </div>
  );
}
