import { useState } from "react";
import { AuthLayout } from "./AuthLayout";
import { TextField } from "../TextField";
import { Checkbox } from "../Checkbox";
import { ChevronLeft } from "../icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterScreen({
  onRegistered,
  onBack,
}: {
  onRegistered: () => void;
  onBack: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const passwordStrength = (() => {
    if (!password) return null;
    const score =
      (password.length >= 8 ? 1 : 0) +
      (/[A-Z]/.test(password) ? 1 : 0) +
      (/[0-9]/.test(password) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
    if (score <= 1) return "weak";
    if (score === 2) return "fair";
    if (score === 3) return "good";
    return "strong";
  })();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = "Enter your first name.";
    if (!lastName.trim()) next.lastName = "Enter your last name.";
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (password.length < 8)
      next.password = "Use at least 8 characters for your password.";
    if (confirm !== password) next.confirm = "Passwords don't match.";
    if (!agree) next.agree = "Please accept the Terms to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setFormError("Please fix the highlighted fields and try again.");
      return;
    }
    setFormError(null);
    onRegistered();
  };

  return (
    <AuthLayout>
      <button className="crumb auth__back" onClick={onBack}>
        <ChevronLeft width={15} height={15} /> Back to log in
      </button>
      <h1 className="auth__title">Create your account</h1>
      <p className="auth__sub">
        Join Encore to access your vehicle, benefits and service history in one
        place.
      </p>

      {formError && (
        <div className="auth__alert" role="alert">
          {formError}
        </div>
      )}

      <form className="auth__fields" onSubmit={submit} noValidate>
        <div className="auth__pair">
          <TextField
            label="First name"
            required
            value={firstName}
            onChange={(v) => {
              setFirstName(v);
              if (errors.firstName) setErrors((e) => ({ ...e, firstName: "" }));
            }}
            error={errors.firstName || undefined}
            autoComplete="given-name"
          />
          <TextField
            label="Last name"
            required
            value={lastName}
            onChange={(v) => {
              setLastName(v);
              if (errors.lastName) setErrors((e) => ({ ...e, lastName: "" }));
            }}
            error={errors.lastName || undefined}
            autoComplete="family-name"
          />
        </div>
        <TextField
          label="Email"
          required
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (errors.email) setErrors((e) => ({ ...e, email: "" }));
          }}
          error={errors.email || undefined}
          autoComplete="email"
        />
        <TextField
          label="Password"
          required
          type="password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (errors.password) setErrors((e) => ({ ...e, password: "" }));
          }}
          error={errors.password || undefined}
          helper={
            passwordStrength && !errors.password
              ? `Strength: ${passwordStrength}`
              : "At least 8 characters, with a number or symbol for best results."
          }
          autoComplete="new-password"
        />
        <TextField
          label="Confirm password"
          required
          type="password"
          value={confirm}
          onChange={(v) => {
            setConfirm(v);
            if (errors.confirm) setErrors((e) => ({ ...e, confirm: "" }));
          }}
          error={errors.confirm || undefined}
          autoComplete="new-password"
        />

        <div className="auth__terms">
          <Checkbox
            checked={agree}
            onChange={(v) => {
              setAgree(v);
              if (errors.agree) setErrors((e) => ({ ...e, agree: "" }));
            }}
            label="I agree to the Encore Terms and Privacy Notice."
          />
          {errors.agree && (
            <span className="tfield__error">{errors.agree}</span>
          )}
        </div>

        <button type="submit" className="btn btn--primary auth__submit">
          Create account
        </button>
      </form>
    </AuthLayout>
  );
}
