import { useState, type ReactNode } from "react";
import { Flyout } from "../components/Flyout";
import { TextField } from "../components/TextField";
import { Radio } from "../components/Radio";
import { useToast } from "../components/Toast";
import { useFlyout } from "./FlyoutProvider";
import { Confirmation } from "./Confirmation";

type Choice = "name" | "email" | "phone";
type Step =
  | "select"
  | "name"
  | "email"
  | "phone"
  | "email-code"
  | "phone-code"
  | "done";

const OPTIONS: { id: Choice; label: string }[] = [
  { id: "name", label: "Update name and address" },
  { id: "email", label: "Update email address" },
  { id: "phone", label: "Update phone number" },
];

/** Read a personal-detail value by its label (case-insensitive contains). */
function rowValue(rows: { label: string; value: string }[], match: string) {
  const r = rows.find((x) => x.label.toLowerCase().includes(match));
  return r ? r.value : "";
}

const EMAIL_RE = /.+@.+\..+/;

export function EditPersonalDetailsFlyout({ open }: { open: boolean }) {
  const { close, personal, setPersonal } = useFlyout();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("select");
  const [choice, setChoice] = useState<Choice | null>(null);

  // Seed name/address from current details.
  const currentName = rowValue(personal, "name");
  const [firstName, setFirstName] = useState(currentName.split(" ")[0] ?? "");
  const [lastName, setLastName] = useState(
    currentName.split(" ").slice(1).join(" ")
  );
  const [address, setAddress] = useState(rowValue(personal, "address"));
  const currentEmail = rowValue(personal, "email");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [code, setCode] = useState("");

  /* ---------- email step validation ---------- */
  const emailValid = EMAIL_RE.test(newEmail.trim());
  const emailIsNew =
    newEmail.trim().toLowerCase() !== currentEmail.trim().toLowerCase();
  const emailsMatch =
    confirmEmail.length === 0 ||
    confirmEmail.trim().toLowerCase() === newEmail.trim().toLowerCase();
  const canSubmitEmail =
    emailValid && emailIsNew && confirmEmail.length > 0 && emailsMatch;

  /** Send the one-time code to the new address and advance to verify. */
  const sendEmailCode = () => {
    setCode("");
    setStep("email-code");
    toast("Verification code sent", {
      description: `We've sent a one-time code to ${newEmail.trim()}.`,
    });
  };

  /** Patch personal rows by label and persist. */
  const patch = (updates: Record<string, string>) =>
    setPersonal(
      personal.map((r) => {
        const key = Object.keys(updates).find((k) =>
          r.label.toLowerCase().includes(k)
        );
        return key ? { ...r, value: updates[key] } : r;
      })
    );

  const finish = (kind: Choice) => {
    setCode("");
    if (kind === "name") {
      patch({
        name: `${firstName} ${lastName}`.trim(),
        address,
      });
      toast("Details updated", {
        description: "Your name and address have been saved.",
      });
    } else if (kind === "email") {
      patch({ email: newEmail.trim() });
      toast("Email address updated", {
        description: `Your email address is now ${newEmail.trim()}.`,
      });
    } else {
      patch({ mobile: newPhone });
      toast("Mobile number updated", {
        description: "Your new mobile number has been saved.",
      });
    }
    setStep("done");
  };

  /* ---------- back navigation ---------- */
  const onBack =
    step === "select" || step === "done"
      ? undefined
      : () => {
          if (step === "email-code") setStep("email");
          else if (step === "phone-code") setStep("phone");
          else setStep("select");
        };

  /* ---------- success ---------- */
  if (step === "done") {
    const doneCopy: Record<Choice, { title: string; desc: string }> = {
      name: {
        title: "Details updated",
        desc: "Your name and postal address have been saved to your account.",
      },
      email: {
        title: "Email address updated",
        desc: `Your sign-in email is now ${newEmail.trim()}. Use it next time you sign in to My Lexus.`,
      },
      phone: {
        title: "Mobile number updated",
        desc: "We've updated the mobile number on your account.",
      },
    };
    const c = doneCopy[choice ?? "name"];
    return (
      <Flyout open={open} title="Personal details" onClose={close}>
        <Confirmation title={c.title} description={c.desc} onDone={close} />
      </Flyout>
    );
  }

  /* ---------- footer per step ---------- */
  let footer: ReactNode = null;
  if (step === "select") {
    footer = (
      <div className="flyout__actions">
        <button
          className="btn btn--primary"
          disabled={!choice}
          onClick={() => choice && setStep(choice)}
        >
          Continue
        </button>
        <button className="btn btn--ghost" onClick={close}>
          Cancel
        </button>
      </div>
    );
  } else if (step === "name") {
    footer = (
      <div className="flyout__actions">
        <button
          className="btn btn--primary"
          disabled={!firstName.trim() || !lastName.trim() || !address.trim()}
          onClick={() => finish("name")}
        >
          Save changes
        </button>
      </div>
    );
  } else if (step === "email") {
    footer = (
      <div className="flyout__actions">
        <button
          className="btn btn--primary"
          disabled={!canSubmitEmail}
          onClick={sendEmailCode}
        >
          Continue
        </button>
        <button className="btn btn--ghost" onClick={close}>
          Cancel
        </button>
      </div>
    );
  } else if (step === "phone") {
    footer = (
      <div className="flyout__actions">
        <button
          className="btn btn--primary"
          disabled={newPhone.replace(/\D/g, "").length < 8}
          onClick={() => setStep("phone-code")}
        >
          Continue
        </button>
      </div>
    );
  } else if (step === "email-code" || step === "phone-code") {
    footer = (
      <div className="flyout__actions">
        <button
          className="btn btn--primary"
          disabled={!code.trim()}
          onClick={() => finish(step === "email-code" ? "email" : "phone")}
        >
          Verify and continue
        </button>
      </div>
    );
  }

  /* ---------- heading per step ---------- */
  const HEAD: Record<Exclude<Step, "done">, [string, string]> = {
    select: ["Update your details", "Select what you'd like to change."],
    name: [
      "Update name and address",
      "Update the name and postal address on your account.",
    ],
    email: [
      "Update email address",
      "Enter the new email address you'd like to use. We'll send a one-time code there to confirm it's yours.",
    ],
    phone: ["Update phone number", "Enter your new mobile number."],
    "email-code": [
      "Verify your new email address",
      `To confirm it's yours, enter the one-time code we sent to ${newEmail.trim()}. This code expires in 5 minutes.`,
    ],
    "phone-code": [
      "We texted you a code",
      `Enter the code we sent to ${newPhone}. The code expires in 5 minutes.`,
    ],
  };
  const [heading, description] = HEAD[step];

  return (
    <Flyout
      open={open}
      title="Personal details"
      onClose={close}
      onBack={onBack}
      heading={heading}
      description={description}
      footer={footer}
    >
      {/* STEP — select option */}
      {step === "select" && (
        <div className="radiolist">
          {OPTIONS.map((o) => (
            <Radio
              key={o.id}
              name="detail-choice"
              value={o.id}
              checked={choice === o.id}
              onChange={(v) => setChoice(v as Choice)}
              label={o.label}
            />
          ))}
        </div>
      )}

      {/* STEP — name + address */}
      {step === "name" && (
        <>
          <TextField label="First name" value={firstName} onChange={setFirstName} />
          <TextField label="Last name" value={lastName} onChange={setLastName} />
          <TextField
            label="Postal address"
            value={address}
            onChange={setAddress}
          />
        </>
      )}

      {/* STEP — new email + confirm */}
      {step === "email" && (
        <>
          {currentEmail && (
            <div className="field">
              <span className="field__label">Current email address</span>
              <div className="field__static">{currentEmail}</div>
            </div>
          )}
          <TextField
            label="New email address"
            type="email"
            value={newEmail}
            onChange={setNewEmail}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            autoFocus
            error={
              newEmail.length > 0 && !emailValid
                ? "Enter a valid email address."
                : newEmail.length > 0 && !emailIsNew
                ? "This is already your email address."
                : undefined
            }
          />
          <TextField
            label="Confirm new email address"
            type="email"
            value={confirmEmail}
            onChange={setConfirmEmail}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            error={!emailsMatch ? "Email addresses don't match." : undefined}
          />
        </>
      )}

      {/* STEP — new phone */}
      {step === "phone" && (
        <TextField
          label="New mobile number"
          type="tel"
          value={newPhone}
          onChange={setNewPhone}
          placeholder="0400 000 000"
          autoFocus
        />
      )}

      {/* STEP — verify code (email or phone) */}
      {(step === "email-code" || step === "phone-code") && (
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
                description: `We've sent a new code to ${
                  step === "email-code" ? newEmail : newPhone
                }.`,
              })
            }
          >
            Didn't receive a code? Resend code
          </button>
        </>
      )}
    </Flyout>
  );
}
