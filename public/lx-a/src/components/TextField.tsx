import { useId, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "./icons";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  helper?: string;
  error?: string;
  type?: "text" | "email" | "password" | "tel";
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type"
>;

export function TextField({
  label,
  value,
  onChange,
  required = false,
  helper,
  error,
  type = "text",
  ...rest
}: Props) {
  const [reveal, setReveal] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && reveal ? "text" : type;
  const describedById = useId();
  const hasMessage = !!error || !!helper;

  return (
    <label className={`field tfield${error ? " is-error" : ""}`}>
      <span className="field__label">
        {label}
        {required && <span className="field__req"> *</span>}
      </span>
      <span className="tfield__box">
        <input
          {...rest}
          className="tfield__input"
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={hasMessage ? describedById : undefined}
        />
        {isPassword && (
          <button
            type="button"
            className="tfield__toggle"
            onClick={() => setReveal((r) => !r)}
            aria-label={reveal ? "Hide password" : "Show password"}
          >
            {reveal ? <EyeOff width={18} height={18} /> : <Eye width={18} height={18} />}
          </button>
        )}
      </span>
      {error ? (
        <span id={describedById} className="tfield__error" role="alert">
          {error}
        </span>
      ) : helper ? (
        <span id={describedById} className="tfield__helper">
          {helper}
        </span>
      ) : null}
    </label>
  );
}
