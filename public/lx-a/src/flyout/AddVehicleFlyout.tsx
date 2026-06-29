import { useState } from "react";
import { Flyout } from "../components/Flyout";
import { useFlyout } from "./FlyoutProvider";
import { TextField } from "../components/TextField";
import { Confirmation } from "./Confirmation";

export function AddVehicleFlyout({ open }: { open: boolean }) {
  const { close, addPendingVehicle } = useFlyout();
  const [rego, setRego] = useState("");
  const [vin, setVin] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setRego("");
    setVin("");
    setSubmitted(false);
  };

  const handleClose = () => {
    close();
    setTimeout(reset, 340);
  };

  const canSubmit = rego.trim().length >= 3 && vin.trim().length >= 6;

  const submit = () => {
    if (!canSubmit) return;
    const cleanedVin = vin.trim().toUpperCase();
    addPendingVehicle({
      id: `pending-${cleanedVin.slice(-6).toLowerCase()}`,
      year: "—",
      name: "New Lexus",
      shortName: "New Lexus",
      bodyType: "Awaiting verification",
      image: "assets/vehicle.png",
      vin: cleanedVin,
      rego: rego.trim().toUpperCase(),
      odometer: "—",
      encore: false,
      nextService: null,
      pending: true,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Flyout open={open} title="Add a vehicle" onClose={handleClose}>
        <Confirmation
          title="Vehicle linked"
          description={
            <>
              We've sent your details to Lexus. You'll receive an email
              confirmation once your vehicle is verified — usually within
              one business day.
            </>
          }
          onDone={handleClose}
        />
      </Flyout>
    );
  }

  return (
    <Flyout
      open={open}
      title="Add a vehicle"
      onClose={handleClose}
      heading="Link another Lexus"
      description="Enter your registration and Vehicle Identification Number (VIN) and we'll match it to your account."
      footer={
        <div className="flyout__actions">
          <button
            className="btn btn--primary"
            disabled={!canSubmit}
            onClick={submit}
          >
            Submit for verification
          </button>
        </div>
      }
    >
      <div className="addvehicle__fields">
        <TextField
          label="Registration"
          required
          value={rego}
          onChange={setRego}
          placeholder="e.g. ABC123"
          autoComplete="off"
        />
        <TextField
          label="VIN"
          required
          helper="17 characters, found on your compliance plate or rego papers."
          value={vin}
          onChange={setVin}
          placeholder="JTHX9AAA000000123"
          autoComplete="off"
        />
      </div>
    </Flyout>
  );
}
