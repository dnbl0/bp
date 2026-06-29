import { useState } from "react";
import { Flyout } from "../components/Flyout";
import { TextField } from "../components/TextField";
import { useFlyout } from "./FlyoutProvider";
import { Confirmation } from "./Confirmation";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ReferFriendFlyout({ open }: { open: boolean }) {
  const { close } = useFlyout();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [sent, setSent] = useState(false);

  const reset = () => {
    setName("");
    setEmail("");
    setNote("");
    setErrors({});
    setSent(false);
  };

  const handleClose = () => {
    close();
    setTimeout(reset, 340);
  };

  if (sent) {
    return (
      <Flyout open={open} title="Refer a friend" onClose={handleClose}>
        <Confirmation
          title="Invitation sent"
          description={
            <>
              We've emailed <strong>{name}</strong> a personal Encore test-drive
              invitation. You'll both be eligible for the concierge dining
              experience once they take delivery.
            </>
          }
          onDone={handleClose}
        />
      </Flyout>
    );
  }

  const submit = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Enter your friend's name.";
    if (!EMAIL_RE.test(email.trim()))
      next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <Flyout
      open={open}
      title="Refer a friend"
      onClose={handleClose}
      heading="Share the Encore experience"
      description="Invite a friend to test drive a Lexus. When they do, you both receive a complimentary concierge dining experience."
      footer={
        <div className="flyout__actions">
          <button type="button" className="btn btn--primary" onClick={submit}>
            Send invitation
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleClose}>
            Cancel
          </button>
        </div>
      }
    >
      <div className="addvehicle__fields">
        <TextField
          label="Friend's name"
          required
          value={name}
          onChange={(v) => {
            setName(v);
            if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
          }}
          error={errors.name}
          placeholder="Alex Mason"
          autoComplete="off"
        />
        <TextField
          label="Friend's email"
          required
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
          }}
          error={errors.email}
          placeholder="alex@example.com"
          autoComplete="off"
        />
        <label className="field field--notes">
          <span className="field__label">Personal note (optional)</span>
          <textarea
            className="field__input field__textarea"
            rows={3}
            placeholder="Add a personal touch to your invitation…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
      </div>
    </Flyout>
  );
}
