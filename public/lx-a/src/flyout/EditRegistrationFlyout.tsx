import { useState } from "react";
import { Flyout } from "../components/Flyout";
import { TextField } from "../components/TextField";
import { useToast } from "../components/Toast";
import { useFlyout } from "./FlyoutProvider";

export function EditRegistrationFlyout({ open }: { open: boolean }) {
  const { close, payload, setRego } = useFlyout();
  const { toast } = useToast();
  const vehicleId = payload.vehicleId ?? "";
  const [value, setValue] = useState(payload.rego ?? "");
  const [touched, setTouched] = useState(false);

  const cleaned = value.trim().toUpperCase();
  const valid = cleaned.length >= 3 && cleaned.length <= 8;
  const error =
    touched && !valid
      ? "Enter a valid registration (3–8 characters)."
      : undefined;

  const save = () => {
    if (!valid) {
      setTouched(true);
      return;
    }
    if (vehicleId) setRego(vehicleId, cleaned);
    close();
    toast("Registration updated", { description: cleaned });
  };

  return (
    <Flyout
      open={open}
      title="Registration"
      onClose={close}
      heading="Edit registration"
      description={
        payload.vehicleName
          ? `Update the registration plate on record for your ${payload.vehicleName}.`
          : "Update the registration plate on record for this vehicle."
      }
      footer={
        <div className="flyout__actions">
          <button className="btn btn--primary" onClick={save}>
            Save changes
          </button>
          <button className="btn btn--ghost" onClick={close}>
            Cancel
          </button>
        </div>
      }
    >
      <TextField
        label="Registration"
        required
        value={value}
        onChange={(v) => setValue(v)}
        error={error}
        helper="As shown on your number plate, without spaces."
        placeholder="e.g. ABC123"
        autoComplete="off"
        autoCapitalize="characters"
      />
    </Flyout>
  );
}
