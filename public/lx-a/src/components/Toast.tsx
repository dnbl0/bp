import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, X, Bell } from "./icons";

export type ToastVariant = "success" | "error" | "info";

export interface ToastOptions {
  description?: string;
  variant?: ToastVariant;
  duration?: number; // ms before auto-dismiss; 0 = sticky
}

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
  leaving: boolean;
}

interface ToastContextValue {
  toast: (title: string, opts?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ICONS: Record<ToastVariant, ReactNode> = {
  success: <Check width={16} height={16} />,
  error: <X width={16} height={16} />,
  info: <Bell width={16} height={16} />,
};

const DEFAULT_DURATION = 4200;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);
  const timers = useRef<Map<number, number>>(new Map());

  const remove = useCallback((id: number) => {
    // play the exit animation, then unmount
    setToasts((list) =>
      list.map((t) => (t.id === id ? { ...t, leaving: true } : t))
    );
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id));
    }, 260);
  }, []);

  const toast = useCallback(
    (title: string, opts: ToastOptions = {}) => {
      const id = ++nextId.current;
      const variant = opts.variant ?? "success";
      const duration = opts.duration ?? DEFAULT_DURATION;
      setToasts((list) => [
        ...list,
        { id, title, description: opts.description, variant, leaving: false },
      ]);
      if (duration > 0) {
        const handle = window.setTimeout(() => remove(id), duration);
        timers.current.set(id, handle);
      }
    },
    [remove]
  );

  const dismiss = (id: number) => {
    const handle = timers.current.get(id);
    if (handle) window.clearTimeout(handle);
    timers.current.delete(id);
    remove(id);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toaster" role="region" aria-label="Notifications">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast toast--${t.variant}${
              t.leaving ? " is-leaving" : ""
            }`}
            role="status"
            aria-live="polite"
          >
            <span className="toast__icon" aria-hidden="true">
              {ICONS[t.variant]}
            </span>
            <div className="toast__body">
              <p className="toast__title">{t.title}</p>
              {t.description && (
                <p className="toast__desc">{t.description}</p>
              )}
            </div>
            <button
              className="toast__close"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
            >
              <X width={15} height={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
