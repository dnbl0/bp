import { useEffect, useState } from "react";
import { AuthLayout } from "./AuthLayout";
import { TextField } from "../TextField";
import { Checkbox } from "../Checkbox";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen({
  onLogin,
  onRegister,
  onForgotPassword,
  onSkip,
}: {
  onLogin: () => void;
  onRegister: () => void;
  onForgotPassword: () => void;
  onSkip?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stay, setStay] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [capsOn, setCapsOn] = useState(false);

  // Caps Lock detection while focus is on the password field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLInputElement | null;
      if (tgt?.getAttribute("autocomplete") === "current-password") {
        setCapsOn(e.getModifierState?.("CapsLock") ?? false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("keyup", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keyup", onKey);
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let invalid = false;
    if (!email.trim()) {
      setEmailError("Enter your email address.");
      invalid = true;
    } else if (!EMAIL_RE.test(email.trim())) {
      setEmailError("Enter a valid email address.");
      invalid = true;
    } else {
      setEmailError(null);
    }
    if (!password) {
      setPwError("Enter your password.");
      invalid = true;
    } else {
      setPwError(null);
    }
    if (invalid) {
      setFormError(null);
      return;
    }
    // Demo "wrong" password to show the form-level error state.
    if (password.toLowerCase() === "wrong") {
      setFormError("Wrong email and password combination.");
      setPwError("Check your password and try again.");
      return;
    }
    setFormError(null);
    onLogin();
  };

  return (
    <AuthLayout>
      <h1 className="auth__title">Encore log in</h1>
      <p className="auth__sub">
        Don't have an account?{" "}
        <button type="button" className="auth__register" onClick={onRegister}>
          Register here
        </button>
      </p>

      {formError && (
        <div className="auth__alert" role="alert">
          {formError}
        </div>
      )}

      <form className="auth__fields" onSubmit={submit} noValidate>
        <TextField
          label="Email"
          required
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (emailError) setEmailError(null);
            if (formError) setFormError(null);
          }}
          error={emailError ?? undefined}
        />
        <TextField
          label="Password"
          required
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (pwError) setPwError(null);
            if (formError) setFormError(null);
          }}
          error={pwError ?? undefined}
          helper={capsOn ? "Caps Lock is on." : undefined}
        />

        <div className="auth__row">
          <Checkbox checked={stay} onChange={setStay} label="Stay logged in" />
          <button
            type="button"
            className="auth__link"
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="btn btn--primary auth__submit">
          Log in
        </button>
      </form>

      {onSkip && (
        <button type="button" className="auth__skip" onClick={onSkip}>
          View dashboard (skip login)
        </button>
      )}
    </AuthLayout>
  );
}
