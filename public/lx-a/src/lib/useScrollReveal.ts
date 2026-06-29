import { useEffect } from "react";

/**
 * Scroll-reveal: gently fades and rises `[data-reveal]` elements in as they
 * scroll into view, once. Re-scans whenever `key` changes, so route/section
 * swaps that mount fresh DOM are picked up.
 *
 * Restraint by design — content is only hidden after this hook marks the
 * document `reveal-ready`, so a slow or failed JS load never leaves the page
 * blank, and `prefers-reduced-motion` reveals everything immediately.
 */
export function useScrollReveal(key?: unknown) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)")
    );
    if (targets.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        }
      },
      // Trip slightly before the element is fully on-screen so the motion
      // resolves as it settles into view, not after.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);
}
