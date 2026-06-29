import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "./icons";

/**
 * One carousel for the whole app. A scroll-snapping track that always reveals a
 * peek of the next item (so it's obvious there's more), with a single control
 * row of `‹ • • • ›` — prev arrow, page dots, next arrow.
 *
 * `perView` is the number of items fully visible per page (callers compute the
 * responsive value); the next item peeks in beside them.
 */
export function Carousel<T>({
  items,
  renderItem,
  getKey,
  perView = 3,
  peek = 56,
  gap = 24,
  ariaLabel,
  className = "",
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey: (item: T, index: number) => string | number;
  perView?: number;
  peek?: number;
  gap?: number;
  ariaLabel?: string;
  className?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  // Whether the track can still scroll left / right — drives the edge fade so
  // it only softens the side that actually has a peeking item.
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const overflow = items.length > perView;
  const per = Math.min(perView, Math.max(1, items.length));
  const peekPx = overflow ? peek : 0;
  const pageCount = overflow ? Math.ceil(items.length / perView) : 1;

  // Scroll offset for the start of each page, item-aligned and clamped to the
  // end so the last (possibly partial) page rests against the right edge.
  // page→scroll and scroll→page share these targets so the dots stay in sync.
  const pageTargets = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return [0];
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const targets: number[] = [];
    for (let p = 0; p < pageCount; p++) {
      const child = el.children[
        Math.min(p * perView, items.length - 1)
      ] as HTMLElement | undefined;
      targets.push(Math.min(child ? child.offsetLeft : 0, max));
    }
    return targets;
  }, [pageCount, perView, items.length]);

  const syncPage = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const targets = pageTargets();
    const sl = el.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    targets.forEach((t, i) => {
      const d = Math.abs(t - sl);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setPage((prev) => (prev === nearest ? prev : nearest));

    const maxScroll = el.scrollWidth - el.clientWidth;
    setAtStart(sl <= 1);
    setAtEnd(sl >= maxScroll - 1);
  }, [pageTargets]);

  const scrollToPage = (p: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const clamped = Math.min(Math.max(p, 0), pageCount - 1);
    el.scrollTo({ left: pageTargets()[clamped], behavior: "smooth" });
  };

  // Keep the active page valid + aligned when the responsive perView changes.
  useLayoutEffect(() => {
    syncPage();
  }, [syncPage]);

  useEffect(() => {
    if (page > pageCount - 1) scrollToPage(pageCount - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToPage(Math.min(page + 1, pageCount - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToPage(Math.max(page - 1, 0));
    }
  };

  return (
    <div className={`carousel ${className}`.trim()}>
      <div
        ref={viewportRef}
        className="carousel__viewport"
        style={
          {
            "--per": per,
            "--peek": `${peekPx}px`,
            "--gap": `${gap}px`,
            "--fade-start": `${atStart ? 0 : peekPx}px`,
            "--fade-end": `${atEnd ? 0 : peekPx}px`,
          } as React.CSSProperties
        }
        onScroll={syncPage}
        onKeyDown={overflow ? onKey : undefined}
        tabIndex={overflow ? 0 : undefined}
        role={overflow ? "group" : undefined}
        aria-roledescription={overflow ? "carousel" : undefined}
        aria-label={ariaLabel}
      >
        {items.map((item, i) => (
          <div className="carousel__item" key={getKey(item, i)}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="carousel__controls">
          <button
            type="button"
            className="roundbtn roundbtn--sm"
            onClick={() => scrollToPage(page - 1)}
            disabled={page === 0}
            aria-label="Previous"
          >
            <ChevronLeft width={15} height={15} />
          </button>
          <div className="dots" role="tablist">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`dot${i === page ? " is-active" : ""}`}
                aria-label={`Go to page ${i + 1} of ${pageCount}`}
                aria-current={i === page || undefined}
                onClick={() => scrollToPage(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="roundbtn roundbtn--sm"
            onClick={() => scrollToPage(page + 1)}
            disabled={page === pageCount - 1}
            aria-label="Next"
          >
            <ChevronRight width={15} height={15} />
          </button>
        </div>
      )}
    </div>
  );
}
