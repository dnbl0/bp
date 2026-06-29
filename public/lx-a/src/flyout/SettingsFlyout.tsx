import { useEffect } from "react";
import { Flyout } from "../components/Flyout";
import { useFlyout } from "./FlyoutProvider";
import { Radio } from "../components/Radio";
import { usePersistedState } from "../lib/usePersistedState";
import { dealers } from "../data/service";

type TextSize = "default" | "large" | "xl";
type Theme = "auto" | "dark" | "light";

export function SettingsFlyout({ open }: { open: boolean }) {
  const { close, open: openFlyout, preferredDealerId } = useFlyout();
  const [textSize, setTextSize] = usePersistedState<TextSize>(
    "lexus.textSize",
    "default"
  );
  const [theme, setTheme] = usePersistedState<Theme>("lexus.theme", "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-text-size", textSize);
  }, [textSize]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const preferredDealer =
    dealers.find((d) => d.id === preferredDealerId) ?? dealers[0];

  return (
    <Flyout
      open={open}
      title="Settings"
      onClose={close}
      heading="Preferences"
      description="Tailor how My Lexus looks, how we reach you and where you service your vehicle."
    >
      <h3 className="settings__subhead">Appearance</h3>
      <div className="radiolist">
        {(["dark", "light", "auto"] as const).map((t) => (
          <Radio
            key={t}
            name="theme"
            value={t}
            checked={theme === t}
            onChange={(v) => setTheme(v as Theme)}
            label={t === "dark" ? "Dark" : t === "light" ? "Light" : "Auto"}
            description={
              t === "dark"
                ? "Always use the dark Encore palette."
                : t === "light"
                ? "Switch to the warm smoke palette."
                : "Match your device's system preference."
            }
          />
        ))}
      </div>

      <h3 className="settings__subhead settings__subhead--gap">Text size</h3>
      <div className="radiolist">
        {(["default", "large", "xl"] as const).map((size) => (
          <Radio
            key={size}
            name="text-size"
            value={size}
            checked={textSize === size}
            onChange={(v) => setTextSize(v as TextSize)}
            label={
              size === "default"
                ? "Default"
                : size === "large"
                ? "Large"
                : "Extra large"
            }
            description={
              size === "default"
                ? "Standard sizing — designed for most screens."
                : size === "large"
                ? "Increases all text by 12% for easier reading."
                : "Increases all text by 25% — useful in bright light."
            }
          />
        ))}
      </div>

      <h3 className="settings__subhead settings__subhead--gap">Preferences</h3>
      <ul className="settings__list">
        <li>
          <button
            type="button"
            className="settings__row"
            onClick={() => openFlyout("preferred-dealer")}
          >
            <div>
              <span className="settings__row-label">Preferred dealer</span>
              <span className="settings__row-value">{preferredDealer.name}</span>
            </div>
            <span className="settings__row-cta">Change</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="settings__row"
            onClick={() => openFlyout("edit-personal")}
          >
            <div>
              <span className="settings__row-label">Personal details</span>
              <span className="settings__row-value">
                Name, email, mobile, licence
              </span>
            </div>
            <span className="settings__row-cta">Edit</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="settings__row"
            onClick={() => openFlyout("payment-methods")}
          >
            <div>
              <span className="settings__row-label">Payment methods</span>
              <span className="settings__row-value">
                Cards saved for Encore experiences
              </span>
            </div>
            <span className="settings__row-cta">Manage</span>
          </button>
        </li>
      </ul>

      <h3 className="settings__subhead settings__subhead--gap">Security</h3>
      <ul className="settings__list">
        <li>
          <button
            type="button"
            className="settings__row"
            onClick={() => openFlyout("change-password")}
          >
            <div>
              <span className="settings__row-label">Password</span>
              <span className="settings__row-value">••••••••</span>
            </div>
            <span className="settings__row-cta">Change</span>
          </button>
        </li>
      </ul>
    </Flyout>
  );
}
