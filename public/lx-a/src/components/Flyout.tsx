import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, X } from "./icons";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Right-anchored slide-out flyout.
 * Self-managing: enter/exit animation, delayed unmount, Esc-to-close,
 * body scroll-lock, focus trap, and focus restore on close.
 */
export function Flyout({
  open,
  title,
  onClose,
  onBack,
  heading,
  description,
  footer,
  children,
  wide = false,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  onBack?: () => void;
  heading?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  /** Wider panel for richer flows (e.g. the Build & Price configurator). */
  wide?: boolean;
}) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // enter / exit lifecycle
  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), 320);
    return () => window.clearTimeout(t);
  }, [open]);

  // Esc + scroll-lock only while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
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
        if (e.shiftKey && active === first) {
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
  }, [open, onClose]);

  // Initial focus once the panel has animated in
  useEffect(() => {
    if (shown && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [shown]);

  // Restore focus on full unmount
  useEffect(() => {
    if (!mounted && returnFocusRef.current) {
      returnFocusRef.current.focus?.();
      returnFocusRef.current = null;
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className={`flyout-root${shown ? " is-open" : ""}`}>
      <div className="scrim flyout__scrim" onClick={onClose} />
      <aside
        ref={panelRef}
        className={`flyout${wide ? " flyout--wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={heading ? headingId : undefined}
        aria-label={heading ? undefined : title}
      >
        <header className="flyout__head">
          <h2 className="flyout__title">{title}</h2>
          <button
            ref={closeBtnRef}
            className="flyout__close"
            onClick={onClose}
            aria-label="Close"
          >
            <X width={18} height={18} />
          </button>
        </header>

        <div className="flyout__body">
          {onBack && (
            <button className="fly__goback" onClick={onBack}>
              <ChevronLeft width={16} height={16} /> Go back
            </button>
          )}
          {heading && (
            <h3 id={headingId} className="fly__heading">
              {heading}
            </h3>
          )}
          {description && <p className="fly__desc">{description}</p>}
          {children}
        </div>

        {footer && <footer className="flyout__foot">{footer}</footer>}
      </aside>
    </div>
  );
}
