import { useState } from "react";
import { AuthLayout } from "./AuthLayout";
import { TextField } from "../TextField";
import { ChevronLeft, Check } from "../icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ResetScreen({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setSent(true);
  };

  if (sent) {
    return (
      <AuthLayout>
        <button className="crumb auth__back" onClick={onBack}>
          <ChevronLeft width={15} height={15} /> Back to log in
        </button>
        <span className="auth__tick">
          <Check width={26} height={26} />
        </span>
        <h1 className="auth__title">Check your inbox</h1>
        <p className="auth__sub">
          If an Encore account exists for <strong>{email}</strong>, we've sent a
          link to reset your password. It's valid for the next 30 minutes.
        </p>
        <button
          type="button"
          className="btn btn--ghost auth__submit"
          onClick={onBack}
        >
          Return to log in
        </button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <button className="crumb auth__back" onClick={onBack}>
        <ChevronLeft width={15} height={15} /> Back to log in
      </button>
      <h1 className="auth__title">Reset your password</h1>
      <p className="auth__sub">
        Enter the email address on your account and we'll send you a link to set
        a new password.
      </p>

      <form className="auth__fields" onSubmit={submit} noValidate>
        <TextField
          label="Email"
          required
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (error) setError(null);
          }}
          error={error ?? undefined}
          autoComplete="email"
        />
        <button type="submit" className="btn btn--primary auth__submit">
          Send reset link
        </button>
      </form>
    </AuthLayout>
  );
}
