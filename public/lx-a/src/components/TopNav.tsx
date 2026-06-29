import { useEffect, useRef, useState } from "react";
import {
  Lexus,
  Bell,
  ChevronDown,
  User,
  Car,
  Settings,
  Logout,
  Menu,
  X,
  Search,
} from "./icons";
import { notifications as initialNotifications } from "../data/notifications";
import { navTabs, type Section } from "../data/dashboard";
import { useFlyout } from "../flyout/FlyoutProvider";

const primaryLinks = ["Models", "Buy", "Own", "Discover"];

export function TopNav({
  member,
  switchLabel,
  canBookService = true,
  activeSection,
  sectionLabels,
  onNavigateSection,
  onSignOut,
  onSwitchAccount,
  onNavigateProfile,
  onNavigateVehicles,
  onNavigateBenefits,
  onNavigateLounge,
}: {
  member: {
    firstName: string;
    lastName: string;
    initials: string;
    email: string;
    tier: string;
    program: string;
  };
  switchLabel: string;
  canBookService?: boolean;
  /** Active account section — highlights the matching item in the mobile menu. */
  activeSection?: Section;
  /** Per-account label overrides for the section items (e.g. My Lexus → Wishlist). */
  sectionLabels?: Partial<Record<Section, string>>;
  /** Navigate to an account section (mirrors the secondary SectionNav). */
  onNavigateSection?: (s: Section) => void;
  onSignOut?: () => void;
  onSwitchAccount?: () => void;
  onNavigateProfile?: () => void;
  onNavigateVehicles?: () => void;
  onNavigateBenefits?: () => void;
  onNavigateLounge?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [notes, setNotes] = useState(
    canBookService ? initialNotifications : []
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);
  const { open: openFlyout } = useFlyout();
  const unread = notes.filter((n) => n.unread).length;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (ref.current && !ref.current.contains(t)) setOpen(false);
      if (bellRef.current && !bellRef.current.contains(t)) setBellOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    setNotes(canBookService ? initialNotifications : []);
  }, [canBookService]);

  const openBell = () => setBellOpen((o) => !o);
  const markAllRead = () =>
    setNotes((ns) => ns.map((n) => ({ ...n, unread: false })));

  const handleNoteClick = (kind: (typeof initialNotifications)[number]["kind"]) => {
    setBellOpen(false);
    if (kind === "service" && canBookService) openFlyout("book-service");
    else if (kind === "lounge") onNavigateLounge?.();
    else if (kind === "offer") onNavigateBenefits?.();
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const initials = member.initials;
  const fullName = `${member.firstName} ${member.lastName}`;

  return (
    <header className="topnav">
      <div className="shell topnav__inner">
        <button
          type="button"
          className="iconbtn topnav__burger"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu />
        </button>

        <a className="topnav__logo" href="#" aria-label="Lexus home">
          <Lexus width={104} />
        </a>

        <nav className="topnav__links" aria-label="Primary">
          {primaryLinks.map((l) => (
            <a key={l} href="#" className="topnav__link">
              {l}
            </a>
          ))}
        </nav>

        <div className="topnav__actions">
          <div className="account" ref={bellRef}>
            <button
              className="iconbtn"
              aria-label={
                unread
                  ? `Notifications, ${unread} unread`
                  : "Notifications"
              }
              aria-expanded={bellOpen}
              onClick={openBell}
            >
              <Bell />
              {unread > 0 && <span className="iconbtn__dot" />}
            </button>
            {bellOpen && (
              <div
                className="scrim notepop__scrim"
                onClick={() => setBellOpen(false)}
              />
            )}
            {bellOpen && (
              <div className="notepop" role="dialog" aria-label="Notifications">
                <header className="notepop__head">
                  <h3 className="notepop__title">Notifications</h3>
                  <div className="notepop__actions">
                    {unread > 0 && (
                      <button
                        type="button"
                        className="notepop__clear"
                        onClick={markAllRead}
                      >
                        Mark all read
                      </button>
                    )}
                    {notes.length > 0 && (
                      <button
                        type="button"
                        className="notepop__clear"
                        onClick={() => setNotes([])}
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </header>
                {notes.length === 0 ? (
                  <p className="notepop__empty">You're all caught up.</p>
                ) : (
                  <ul className="notepop__list">
                    {notes.map((n) => (
                      <li key={n.id}>
                        <button
                          type="button"
                          className={`notepop__item${
                            n.unread ? " is-unread" : ""
                          }`}
                          onClick={() => handleNoteClick(n.kind)}
                        >
                          <p className="notepop__itemtitle">
                            {n.unread && (
                              <span
                                className="notepop__unread"
                                aria-label="Unread"
                              />
                            )}
                            {n.title}
                          </p>
                          <p className="notepop__itembody">{n.body}</p>
                          <p className="notepop__itemtime">{n.time}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            className="topnav__search"
            aria-label="Open search"
            onClick={() => {
              const evt = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
                ctrlKey: true,
                bubbles: true,
              });
              document.dispatchEvent(evt);
            }}
          >
            <Search width={16} height={16} />
            Search
          </button>

          <div className="account" ref={ref}>
            <button
              className="account__trigger"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
            >
              <span className="avatar">{initials}</span>
              <ChevronDown
                width={14}
                height={14}
                className={`account__caret${open ? " is-open" : ""}`}
              />
            </button>

            {open && (
              <div className="account__menu">
                <div className="account__head">
                  <span className="avatar avatar--lg">{initials}</span>
                  <div>
                    <div className="account__name">{fullName}</div>
                    <div className="account__email">{member.email}</div>
                  </div>
                </div>
                <div className="account__chip">
                  {member.program} · {member.tier}
                </div>
                <nav className="account__list">
                  <button
                    className="account__item"
                    onClick={() => {
                      setOpen(false);
                      onNavigateProfile?.();
                    }}
                  >
                    <User width={16} height={16} /> Profile
                  </button>
                  <button
                    className="account__item"
                    onClick={() => {
                      setOpen(false);
                      onNavigateVehicles?.();
                    }}
                  >
                    <Car width={16} height={16} /> My vehicles
                  </button>
                  <button
                    className="account__item"
                    onClick={() => {
                      setOpen(false);
                      onSwitchAccount?.();
                    }}
                  >
                    <User width={16} height={16} /> {switchLabel}
                  </button>
                  <button
                    className="account__item"
                    onClick={() => {
                      setOpen(false);
                      openFlyout("settings");
                    }}
                  >
                    <Settings width={16} height={16} /> Settings
                  </button>
                </nav>
                <button
                  className="account__item account__item--foot"
                  onClick={() => {
                    setOpen(false);
                    onSignOut?.();
                  }}
                >
                  <Logout width={16} height={16} /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobilenav" role="dialog" aria-modal="true" aria-label="Menu">
          <div
            className="scrim mobilenav__scrim"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="mobilenav__panel">
            <header className="mobilenav__head">
              <Lexus width={92} />
              <button
                type="button"
                className="iconbtn"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X />
              </button>
            </header>
            <nav className="mobilenav__list" aria-label="Account sections">
              {navTabs.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={`mobilenav__item${
                    t.value === activeSection ? " is-active" : ""
                  }`}
                  aria-current={t.value === activeSection ? "page" : undefined}
                  onClick={() => {
                    setMobileOpen(false);
                    onNavigateSection?.(t.value);
                  }}
                >
                  {sectionLabels?.[t.value] ?? t.label}
                </button>
              ))}
            </nav>
            <nav className="mobilenav__list mobilenav__list--secondary" aria-label="Lexus">
              {primaryLinks.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="mobilenav__item"
                  onClick={() => setMobileOpen(false)}
                >
                  {l}
                </a>
              ))}
            </nav>
            <div className="mobilenav__footer">
              <button
                type="button"
                className="btn btn--primary mobilenav__cta"
                disabled={!canBookService}
                onClick={() => {
                  setMobileOpen(false);
                  if (canBookService) openFlyout("book-service");
                }}
              >
                {canBookService ? "Quick Book" : "Booking unavailable"}
              </button>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
