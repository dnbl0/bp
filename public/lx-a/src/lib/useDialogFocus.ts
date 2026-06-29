import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal a11y for an always-mounted dialog (panel toggled via `open`): Esc to
 * close, Tab/Shift-Tab focus trap within `containerRef`, body scroll-lock,
 * initial focus on open, and focus restore to the trigger on close.
 *
 * Mirrors the pattern in components/Flyout.tsx so both share one behaviour.
 */
export function useDialogFocus({
  open,
  onClose,
  containerRef,
  initialFocusRef,
  focusDelay = 360,
}: {
  open: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLElement>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  focusDelay?: number;
}) {
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Esc + Tab trap + scroll-lock, only while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab" && containerRef.current) {
        const nodes =
          containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        const focusable = Array.from(nodes).filter(
          (n) => !n.hasAttribute("aria-hidden") && n.offsetParent !== null
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (active && !containerRef.current.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, containerRef]);

  // Capture + restore focus across the open/close transition.
  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      const t = window.setTimeout(
        () => initialFocusRef?.current?.focus(),
        focusDelay
      );
      return () => window.clearTimeout(t);
    }
    // Closing — restore focus to the trigger once it's interactive again.
    const el = returnFocusRef.current;
    returnFocusRef.current = null;
    if (el) {
      const raf = requestAnimationFrame(() => el.focus?.());
      return () => cancelAnimationFrame(raf);
    }
  }, [open, initialFocusRef, focusDelay]);
}
