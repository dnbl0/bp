import { ArrowRight } from "./icons";
import { Carousel } from "./Carousel";
import { offers } from "../data/dashboard";
import { useMediaQuery } from "../lib/useMediaQuery";

export function OffersCarousel({
  onExploreAll,
}: {
  onExploreAll?: () => void;
}) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1080px)");
  const perView = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section className="offers" data-reveal>
      <header className="section-head">
        <h2 className="eyebrow">Exclusive Offers</h2>
        {onExploreAll && (
          <button type="button" className="link-arrow" onClick={onExploreAll}>
            Explore all <ArrowRight width={16} height={16} />
          </button>
        )}
      </header>

      <Carousel
        items={offers}
        getKey={(o) => o.id}
        perView={perView}
        ariaLabel="Exclusive offers"
        renderItem={(o) => (
          <article className="ocard">
            <div className="ocard__media">
              <img
                src={o.image}
                alt={`${o.brand} ${o.location}`}
                loading="lazy"
              />
              <span className="ocard__tag">Offer</span>
            </div>
            <div className="ocard__body">
              <h3 className="ocard__brand">{o.brand}</h3>
              <p className="ocard__loc">{o.location}</p>
              <span className="link-arrow ocard__cta" aria-hidden="true">
                Find out more <ArrowRight width={16} height={16} />
              </span>
            </div>
          </article>
        )}
      />
    </section>
  );
}
