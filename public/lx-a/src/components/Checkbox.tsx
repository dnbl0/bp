import { Check } from "./icons";

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className={`checkbox${checked ? " is-checked" : ""}`}>
      <input
        type="checkbox"
        className="checkbox__native"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checkbox__box" aria-hidden="true">
        <Check width={13} height={13} />
      </span>
      <span className="checkbox__label">{label}</span>
    </label>
  );
}
