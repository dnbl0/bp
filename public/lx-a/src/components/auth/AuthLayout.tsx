import type { ReactNode } from "react";
import { Lexus, Search, X } from "../icons";

const NAV_LINKS = ["Models", "Buy", "Own", "Discover"];

/**
 * Shared shell for authentication screens — full public top nav, a "Close"
 * link, a left form panel and a right lifestyle image.
 */
export function AuthLayout({
  children,
  image = "assets/auth-login.jpg",
  onClose,
}: {
  children: ReactNode;
  image?: string;
  onClose?: () => void;
}) {
  return (
    <div className="auth">
      <header className="authnav">
        <a className="authnav__brand" href="#" aria-label="Lexus home">
          <Lexus width={118} />
        </a>
        <nav className="authnav__links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="authnav__link">
              {l}
            </a>
          ))}
          <button className="authnav__icon" aria-label="Search">
            <Search width={18} height={18} />
          </button>
          <span className="authnav__divider" />
          <a href="#" className="authnav__link authnav__login">
            Log in
          </a>
        </nav>
      </header>

      <div className="auth__body">
        <div className="auth__formcol">
          <button className="auth__close" onClick={onClose} type="button">
            <span className="auth__close-x" aria-hidden="true">
              <X width={12} height={12} />
            </span>
            Close
          </button>
          <div className="auth__form">{children}</div>
        </div>
        <div className="auth__media">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
}
