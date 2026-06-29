import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "./icons";

const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const fmtDisplay = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

/** 42-cell (6-week) grid, Monday-first, with leading/trailing month days. */
function buildGrid(view: Date) {
  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // Mon = 0
  const cells: { date: Date; current: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(year, month, 1 - firstDow + i);
    cells.push({ date, current: date.getMonth() === month });
  }
  return cells;
}

export function DatePicker({
  value,
  onChange,
  label = "Date",
  required = false,
  helper,
  placeholder = "DD/MM/YYYY",
  minDate,
}: {
  value: string;
  onChange: (iso: string) => void;
  label?: string;
  required?: boolean;
  helper?: string;
  placeholder?: string;
  minDate?: Date;
}) {
  const [open, setOpen] = useState(false);
  const initial = value ? fromISO(value) : new Date();
  const [view, setView] = useState<Date>(initial);
  const [focusDate, setFocusDate] = useState<Date>(initial);
  const ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
    };
  }, [open]);

  // Sync the keyboard cursor onto the focused cell whenever it changes
  useEffect(() => {
    if (!open || !gridRef.current) return;
    const iso = toISO(focusDate);
    const el = gridRef.current.querySelector<HTMLButtonElement>(
      `button[data-date="${iso}"]`
    );
    el?.focus();
  }, [focusDate, open, view]);

  const selected = value ? fromISO(value) : null;
  const cells = buildGrid(view);
  const minFloor = minDate
    ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
    : null;
  const disabled = (d: Date) => !!minFloor && d < minFloor;

  const pick = (d: Date) => {
    if (disabled(d)) return;
    onChange(toISO(d));
    setView(new Date(d.getFullYear(), d.getMonth(), 1));
    setFocusDate(d);
    setOpen(false);
  };
  const shift = (n: number) =>
    setView((v) => new Date(v.getFullYear(), v.getMonth() + n, 1));

  const moveFocus = (next: Date) => {
    if (minFloor && next < minFloor) next = minFloor;
    setFocusDate(next);
    if (
      next.getMonth() !== view.getMonth() ||
      next.getFullYear() !== view.getFullYear()
    ) {
      setView(new Date(next.getFullYear(), next.getMonth(), 1));
    }
  };

  const jumpToToday = () => {
    const t = new Date();
    setView(new Date(t.getFullYear(), t.getMonth(), 1));
    setFocusDate(t);
  };

  const onGridKey = (e: React.KeyboardEvent) => {
    const f = focusDate;
    let next: Date | null = null;
    switch (e.key) {
      case "ArrowLeft":
        next = new Date(f.getFullYear(), f.getMonth(), f.getDate() - 1);
        break;
      case "ArrowRight":
        next = new Date(f.getFullYear(), f.getMonth(), f.getDate() + 1);
        break;
      case "ArrowUp":
        next = new Date(f.getFullYear(), f.getMonth(), f.getDate() - 7);
        break;
      case "ArrowDown":
        next = new Date(f.getFullYear(), f.getMonth(), f.getDate() + 7);
        break;
      case "Home":
        next = startOfMonth(f);
        break;
      case "End":
        next = endOfMonth(f);
        break;
      case "PageUp":
        next = new Date(
          f.getFullYear(),
          f.getMonth() - (e.shiftKey ? 12 : 1),
          f.getDate()
        );
        break;
      case "PageDown":
        next = new Date(
          f.getFullYear(),
          f.getMonth() + (e.shiftKey ? 12 : 1),
          f.getDate()
        );
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        pick(f);
        return;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        return;
      default:
        return;
    }
    if (next) {
      e.preventDefault();
      moveFocus(next);
    }
  };

  return (
    <div className="field datepicker" ref={ref}>
      <span className="field__label">
        {label}
        {required && <span className="field__req"> *</span>}
      </span>

      <button
        type="button"
        className={`datepicker__input${open ? " is-open" : ""}`}
        onClick={() =>
          setOpen((o) => {
            if (!o) setFocusDate(selected ?? view);
            return !o;
          })
        }
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={value ? "" : "datepicker__placeholder"}>
          {value ? fmtDisplay(value) : placeholder}
        </span>
        <Calendar width={18} height={18} />
      </button>

      {helper && <p className="datepicker__helper">{helper}</p>}

      {open && (
        <div className="datepicker__pop" role="dialog" aria-label="Choose date">
          <div className="cal__head">
            <button
              type="button"
              className="cal__nav"
              onClick={() => shift(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft width={16} height={16} />
            </button>
            <span className="cal__month" aria-live="polite">
              {MONTHS[view.getMonth()]} {view.getFullYear()}
            </span>
            <button
              type="button"
              className="cal__nav"
              onClick={() => shift(1)}
              aria-label="Next month"
            >
              <ChevronRight width={16} height={16} />
            </button>
          </div>

          <button
            type="button"
            className="cal__today"
            onClick={jumpToToday}
            disabled={!!minFloor && new Date() < minFloor}
          >
            Today
          </button>

          <div className="cal__grid cal__grid--head" aria-hidden="true">
            {WEEKDAYS.map((d) => (
              <span key={d} className="cal__dow">
                {d}
              </span>
            ))}
          </div>

          <div
            ref={gridRef}
            className="cal__grid"
            role="grid"
            onKeyDown={onGridKey}
          >
            {cells.map(({ date, current }, i) => {
              const isSel = selected && sameDay(date, selected);
              const isToday = sameDay(date, today);
              const isDisabled = disabled(date);
              const isCursor = sameDay(date, focusDate);
              return (
                <button
                  key={i}
                  type="button"
                  role="gridcell"
                  data-date={toISO(date)}
                  disabled={isDisabled}
                  tabIndex={isCursor ? 0 : -1}
                  aria-selected={!!isSel}
                  aria-current={isToday ? "date" : undefined}
                  className={[
                    "cal__day",
                    current ? "" : "cal__day--muted",
                    isSel ? "is-selected" : "",
                    isToday && !isSel ? "is-today" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => pick(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
