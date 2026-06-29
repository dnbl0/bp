import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "./icons";
import type { Vehicle } from "../data/vehicles";
import { dealers, serviceHistory } from "../data/service";
import { manualResources } from "../data/manuals";
import type { Benefit } from "../data/dashboard";
import { useFlyout, type FlyoutKind } from "../flyout/FlyoutProvider";

type Section = "Dashboard" | "My Lexus" | "Encore" | "Profile";

interface Result {
  id: string;
  group: "Quick actions" | "Sections" | "Vehicles" | "Benefits" | "Manuals" | "Dealers" | "Service history" | "Actions";
  label: string;
  meta?: string;
  run: () => void;
}

export function CommandPalette({
  onNavigate,
  onOpenVehicle,
  vehicles,
  benefits,
  canBookService = true,
  canUseConcierge = true,
  canAddVehicle = true,
  canRedeemEncore = true,
}: {
  onNavigate: (section: Section) => void;
  onOpenVehicle: (id: string) => void;
  vehicles: Vehicle[];
  benefits: Benefit[];
  canBookService?: boolean;
  canUseConcierge?: boolean;
  canAddVehicle?: boolean;
  canRedeemEncore?: boolean;
}) {
  const { open: openFlyout } = useFlyout();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQ("");
      setCursor(0);
      window.setTimeout(() => inputRef.current?.focus(), 20);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const close = () => setOpen(false);
  const route = (fn: () => void) => {
    close();
    window.setTimeout(fn, 50);
  };

  const allResults = useMemo<Result[]>(() => {
    const r: Result[] = [];
    // Sections
    (["Dashboard", "My Lexus", "Encore", "Profile"] as Section[]).forEach(
      (s) =>
        r.push({
          id: `sec-${s}`,
          group: "Sections",
          label: s,
          run: () => route(() => onNavigate(s)),
        })
    );
    // Vehicles
    vehicles.forEach((v) =>
      r.push({
        id: `veh-${v.id}`,
        group: "Vehicles",
        label: `${v.year} ${v.name}`,
        meta: `${v.bodyType} · ${v.rego}`,
        run: () => route(() => onOpenVehicle(v.id)),
      })
    );
    // Benefits
    benefits.forEach((b) =>
      r.push({
        id: `ben-${b.id}`,
        group: "Benefits",
        label: b.title,
        meta: b.kicker,
        run: () => route(() => onNavigate("Encore")),
      })
    );
    // Manuals
    manualResources.forEach((m) =>
      r.push({
        id: `man-${m.id}`,
        group: "Manuals",
        label: m.title,
        meta: `${m.format} · ${m.size}`,
        run: () => route(() => openFlyout("manuals")),
      })
    );
    // Dealers
    dealers.forEach((d) =>
      r.push({
        id: `deal-${d.id}`,
        group: "Dealers",
        label: d.name,
        meta: d.address,
        run: () => route(() => openFlyout("preferred-dealer")),
      })
    );
    // Service history
    serviceHistory.forEach((s) =>
      r.push({
        id: `srv-${s.id}`,
        group: "Service history",
        label: `${s.title} · ${s.interval}`,
        meta: s.date,
        run: () => route(() => openFlyout("service-history")),
      })
    );
    // Actions
    const action = (label: string, kind: FlyoutKind) =>
      r.push({
        id: `act-${kind}`,
        group: "Actions",
        label,
        run: () => route(() => openFlyout(kind)),
      });
    if (canBookService) action("Book a service", "book-service");
    if (canUseConcierge) action("Open concierge", "concierge");
    action("Refer a friend", "refer-friend");
    action("Open settings", "settings");
    action("Show upcoming", "upcoming");
    if (canAddVehicle) action("Add a vehicle", "add-vehicle");
    return r;
  }, [onNavigate, onOpenVehicle, openFlyout, vehicles, benefits, canBookService, canUseConcierge, canAddVehicle]);

  // Empty-state shortlist: only the quick actions/links that make sense for
  // THIS account holder, in priority order, rather than every section + item.
  const quickActions = useMemo<Result[]>(() => {
    const out: Result[] = [];
    const add = (id: string, label: string, run: () => void, meta?: string) =>
      out.push({ id, group: "Quick actions", label, meta, run });
    const primary = vehicles[0];

    if (canBookService)
      add("q-book", "Book a service", () =>
        route(() => openFlyout("book-service"))
      );
    if (canUseConcierge)
      add("q-concierge", "Open concierge", () =>
        route(() => openFlyout("concierge"))
      );
    if (primary)
      add("q-vehicles", "Manage your vehicles", () =>
        route(() => onNavigate("My Lexus"))
      );
    if (canBookService)
      add("q-upcoming", "Upcoming bookings", () =>
        route(() => openFlyout("upcoming"))
      );
    if (canAddVehicle && !primary)
      add("q-add", "Add a vehicle", () =>
        route(() => openFlyout("add-vehicle"))
      );
    if (benefits.length)
      add(
        "q-encore",
        canRedeemEncore ? "Encore benefits" : "Discover Encore",
        () => route(() => onNavigate("Encore"))
      );
    add("q-profile", "Profile & settings", () =>
      route(() => onNavigate("Profile"))
    );

    return out.slice(0, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    vehicles,
    benefits,
    canBookService,
    canUseConcierge,
    canAddVehicle,
    canRedeemEncore,
    openFlyout,
    onNavigate,
  ]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    // Empty state: the account-relevant quick actions, nothing more.
    if (!needle) return quickActions;
    // While searching, cap each group so a broad match can't flood the panel.
    const matches = allResults.filter(
      (r) =>
        r.label.toLowerCase().includes(needle) ||
        (r.meta?.toLowerCase().includes(needle) ?? false) ||
        r.group.toLowerCase().includes(needle)
    );
    const perGroup = new Map<Result["group"], number>();
    const capped: Result[] = [];
    for (const r of matches) {
      const n = perGroup.get(r.group) ?? 0;
      if (n >= 5) continue;
      perGroup.set(r.group, n + 1);
      capped.push(r);
    }
    return capped;
  }, [allResults, quickActions, q]);

  // Group results for display.
  const grouped = useMemo(() => {
    const map = new Map<Result["group"], Result[]>();
    filtered.forEach((r) => {
      const arr = map.get(r.group) ?? [];
      arr.push(r);
      map.set(r.group, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    setCursor(0);
  }, [q]);

  if (!open) return null;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[cursor]?.run();
    }
  };

  return (
    <div className="cmdk" role="dialog" aria-modal="true" aria-label="Search">
      <div className="cmdk__scrim" onClick={close} />
      <div className="cmdk__panel">
        <div className="cmdk__inputrow">
          <Search width={18} height={18} />
          <input
            ref={inputRef}
            type="text"
            className="cmdk__input"
            aria-label="Search My Lexus"
            placeholder="Search My Lexus…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
          />
          <button
            type="button"
            className="cmdk__close"
            aria-label="Close"
            onClick={close}
          >
            <X width={16} height={16} />
          </button>
        </div>
        <div className="cmdk__results" role="listbox">
          {filtered.length === 0 ? (
            <p className="cmdk__empty">No matches for "{q}".</p>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group} className="cmdk__group">
                <p className="cmdk__grouphead">{group}</p>
                {items.map((r) => {
                  const i = filtered.indexOf(r);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      role="option"
                      aria-selected={i === cursor}
                      className={`cmdk__item${
                        i === cursor ? " is-active" : ""
                      }`}
                      onMouseEnter={() => setCursor(i)}
                      onClick={r.run}
                    >
                      <span className="cmdk__itemlabel">{r.label}</span>
                      {r.meta && (
                        <span className="cmdk__itemmeta">{r.meta}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <footer className="cmdk__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>Esc</kbd> close
          </span>
        </footer>
      </div>
    </div>
  );
}
