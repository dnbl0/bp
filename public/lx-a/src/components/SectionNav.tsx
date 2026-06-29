import { navTabs, type Section } from "../data/dashboard";

export function SectionNav({
  active,
  onChange,
  labels,
}: {
  active: Section;
  onChange: (s: Section) => void;
  /** Per-account label overrides keyed by section (e.g. My Lexus → Wishlist). */
  labels?: Partial<Record<Section, string>>;
}) {
  return (
    <div className="secnav">
      <div className="shell secnav__inner">
        <nav className="secnav__tabs" aria-label="Account sections">
          {navTabs.map((t) => (
            <button
              key={t.value}
              className={`secnav__tab${t.value === active ? " is-active" : ""}`}
              onClick={() => onChange(t.value)}
              aria-current={t.value === active ? "page" : undefined}
            >
              {labels?.[t.value] ?? t.label}
            </button>
          ))}
        </nav>
        <span className="secnav__logo encmark" aria-label="Encore Platinum">
          <span className="encmark__main">ENCORE</span>
          <span className="encmark__sub">PLATINUM</span>
        </span>
      </div>
    </div>
  );
}
