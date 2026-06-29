import { useState, type ReactNode } from "react";
import { Flyout } from "../components/Flyout";
import { TextField } from "../components/TextField";
import { useToast } from "../components/Toast";
import { useFlyout } from "./FlyoutProvider";
import { Confirmation } from "./Confirmation";
import { Check } from "../components/icons";

type Step = "intro" | "verify" | "set" | "done";

/** Member email, read from the editable personal details. */
function memberEmail(rows: { label: string; value: string }[]) {
  const r = rows.find((x) => x.label.toLowerCase().includes("email"));
  return r ? r.value : "your email address";
}

/** Password rules — each tested live against the entered password. */
const RULES: { label: string; test: (p: string) => boolean }[] = [
  { label: "Use between 8 and 16 characters", test: (p) => p.length >= 8 && p.length <= 16 },
  { label: "Use at least 1 uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Use at least 1 lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "Use at least 1 number", test: (p) => /[0-9]/.test(p) },
];

export function ChangePasswordFlyout({ open }: { open: boolean }) {
  const { close, personal } = useFlyout();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("intro");
  const [code, setCode] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");

  const email = memberEmail(personal);
  const allMet = RULES.every((r) => r.test(pw));
  const canSet = allMet && confirm.length > 0 && confirm === pw;

  const onBack =
    step === "verify"
      ? () => setStep("intro")
      : step === "set"
      ? () => setStep("verify")
      : undefined;

  /* ---------- success ---------- */
  if (step === "done") {
    return (
      <Flyout open={open} title="Change password" onClose={close}>
        <Confirmation
          title="Password updated"
          description="Your password has been changed. Use it next time you sign in to My Lexus."
          onDone={close}
        />
      </Flyout>
    );
  }

  /* ---------- footers ---------- */
  let footer: ReactNode = null;
  if (step === "intro") {
    footer = (
      <div className="flyout__actions">
        <button
          className="btn btn--primary"
          onClick={() => {
            setStep("verify");
            toast("Verification code sent", {
              description: `We've sent a one-time code to ${email}.`,
            });
          }}
        >
          Change password
        </button>
        <button className="btn btn--ghost" onClick={close}>
          Cancel
        </button>
      </div>
    );
  } else if (step === "verify") {
    footer = (
      <div className="flyout__actions">
        <button
          className="btn btn--primary"
          disabled={!code.trim()}
          onClick={() => setStep("set")}
        >
          Verify
        </button>
      </div>
    );
  } else if (step === "set") {
    footer = (
      <div className="flyout__actions">
        <button
          className="btn btn--primary"
          disabled={!canSet}
          onClick={() => {
            toast("Password updated", {
              description: "Your new password has been saved.",
            });
            setStep("done");
          }}
        >
          Set new password
        </button>
      </div>
    );
  }

  /* ---------- per-step heading ---------- */
  const HEAD: Record<Exclude<Step, "done">, [string, string]> = {
    intro: [
      "Change your password",
      "To keep your account secure, we'll email you a one-time code to confirm it's you before you set a new password.",
    ],
    verify: [
      "Verify email address",
      `To keep your account secure we require you to verify your email. A one-time verification code has been sent to ${email}. This code will expire in 5 minutes.`,
    ],
    set: ["Set a new password", "Choose a new password for your account."],
  };
  const [heading, description] = HEAD[step];

  return (
    <Flyout
      open={open}
      title="Change password"
      onClose={close}
      onBack={onBack}
      heading={heading}
      description={description}
      footer={footer}
    >
      {/* STEP — intro: show masked current password */}
      {step === "intro" && (
        <div className="field">
          <span className="field__label">Password</span>
          <div className="pwmask">••••••••</div>
        </div>
      )}

      {/* STEP — verify one-time code */}
      {step === "verify" && (
        <>
          <TextField
            label="One time code"
            value={code}
            onChange={setCode}
            placeholder="Enter your code"
            inputMode="numeric"
            autoFocus
          />
          <button
            className="link-arrow fly__resend"
            type="button"
            onClick={() =>
              toast("Code resent", {
                description: `We've sent a new code to ${email}.`,
              })
            }
          >
            Didn't receive a code? Resend code
          </button>
        </>
      )}

      {/* STEP — set new password + live rules */}
      {step === "set" && (
        <>
          <TextField
            label="Set new password"
            type="password"
            value={pw}
            onChange={setPw}
            placeholder="Enter your new password"
            autoComplete="new-password"
            autoFocus
          />
          <p className="pwrules__head">Passwords should have</p>
          <ul className="pwrules">
            {RULES.map((r) => {
              const met = r.test(pw);
              return (
                <li
                  key={r.label}
                  className={`pwrule${met ? " is-met" : ""}`}
                >
                  <span className="pwrule__icon" aria-hidden="true">
                    {met && <Check width={13} height={13} />}
                  </span>
                  {r.label}
                </li>
              );
            })}
          </ul>
          <TextField
            label="Confirm password"
            type="password"
            value={confirm}
            onChange={setConfirm}
            placeholder="Confirm your new password"
            autoComplete="new-password"
            error={
              confirm.length > 0 && confirm !== pw
                ? "Passwords don't match."
                : undefined
            }
          />
        </>
      )}
    </Flyout>
  );
}
