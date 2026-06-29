import { ChevronLeft, ChevronRight } from "./icons";

/**
 * Shared prev/next control for every carousel (offers, vehicle panel, …).
 * Arrows sit next to each other, right-aligned within their container, and
 * each disables when there's nothing further in that direction.
 */
export function CarouselArrows({
  canPrev,
  canNext,
  onPrev,
  onNext,
  prevLabel = "Previous",
  nextLabel = "Next",
  className = "",
}: {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}) {
  return (
    <div className={`carousel-nav ${className}`.trim()}>
      <button
        type="button"
        className="roundbtn roundbtn--sm"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label={prevLabel}
      >
        <ChevronLeft width={15} height={15} />
      </button>
      <button
        type="button"
        className="roundbtn roundbtn--sm"
        onClick={onNext}
        disabled={!canNext}
        aria-label={nextLabel}
      >
        <ChevronRight width={15} height={15} />
      </button>
    </div>
  );
}
