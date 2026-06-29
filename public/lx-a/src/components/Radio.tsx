import type { ReactNode } from "react";

/**
 * Radio option — matches Figma `Comp/input/radio` (node 55:71903).
 * Anatomy: 20px ring + 12px dot, title (Subtitle1), optional description
 * (Body2) and trailing value (Total). States: unselected, hover, selected,
 * error, disabled, focus — mirroring the component's variant props.
 */
export function Radio({
  name,
  value,
  checked,
  onChange,
  label,
  description,
  trailing,
  framed = true,
  error = false,
  disabled = false,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: ReactNode;
  description?: ReactNode;
  trailing?: ReactNode;
  framed?: boolean;
  error?: boolean;
  disabled?: boolean;
}) {
  const cls = [
    "radio",
    framed ? "radio--framed" : "",
    checked ? "is-checked" : "",
    error ? "is-error" : "",
    disabled ? "is-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={cls}>
      <input
        type="radio"
        className="radio__native"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
      />
      <span className="radio__icon" aria-hidden="true">
        <span className="radio__dot" />
      </span>
      <span className="radio__content">
        <span className="radio__label">{label}</span>
        {description && <span className="radio__desc">{description}</span>}
      </span>
      {trailing && <span className="radio__trailing">{trailing}</span>}
    </label>
  );
}
