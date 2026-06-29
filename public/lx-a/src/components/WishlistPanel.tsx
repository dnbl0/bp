import { Carousel } from "./Carousel";
import { Car, ChevronRight, ArrowRight } from "./icons";
import { formatPrice, type WishlistVehicle } from "../data/configurator";
import { useFlyout } from "../flyout/FlyoutProvider";

function WishMini({ w }: { w: WishlistVehicle }) {
  return (
    <article className="wmini">
      <div className="wmini__media">
        <img src={w.image} alt={w.name} />
      </div>
      <div className="wmini__body">
        <p className="wmini__model">{w.modelName}</p>
        <h4 className="wmini__name">{w.name}</h4>
        <div className="wmini__foot">
          <span className="wmini__colours" aria-hidden="true">
            <span className="wmini__dot" style={{ background: w.exteriorHex }} />
            <span className="wmini__dot" style={{ background: w.interiorHex }} />
          </span>
          <span className="wmini__price">{formatPrice(w.price)}</span>
        </div>
      </div>
    </article>
  );
}

/**
 * Dashboard side-rail panel (limited account) — surfaces saved Build & Price
 * configurations. Carousels when more than one is wishlisted, with a button to
 * jump to the full wishlist.
 */
export function WishlistPanel({ onView }: { onView: () => void }) {
  const { wishlist, open: openFlyout } = useFlyout();
  const multi = wishlist.length > 1;

  return (
    <aside className="vpanel" data-reveal>
      <div className="vpanel__labelrow">
        <h2 className="eyebrow vpanel__label">Your Wishlist</h2>
        {wishlist.length > 0 && (
          <span className="wishpanel__count">{wishlist.length} saved</span>
        )}
      </div>

      {wishlist.length === 0 ? (
        <article className="card wishpanel__empty">
          <p className="wishpanel__emptytext">
            Build and price a Lexus to start your wishlist.
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => openFlyout("build-price")}
          >
            <Car width={16} height={16} /> Build &amp; Price
          </button>
        </article>
      ) : (
        <>
          {multi ? (
            <Carousel
              items={wishlist}
              getKey={(w) => w.id}
              perView={1}
              peek={40}
              ariaLabel="Your wishlist"
              renderItem={(w) => <WishMini w={w} />}
            />
          ) : (
            <WishMini w={wishlist[0]} />
          )}
          <button
            type="button"
            className="btn btn--ghost wishpanel__view"
            onClick={onView}
          >
            View wishlist <ArrowRight width={16} height={16} />
          </button>
        </>
      )}

      <article className="fuel">
        <div className="fuel__icon">
          <ChevronRight width={20} height={20} />
        </div>
        <div>
          <h4 className="fuel__title">Compare the range</h4>
          <p className="fuel__detail">
            Configure another grade, colour and trim in minutes.
          </p>
        </div>
      </article>
    </aside>
  );
}
