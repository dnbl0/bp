import { useState } from "react";
import { Flyout } from "../components/Flyout";
import { useFlyout } from "./FlyoutProvider";
import { Confirmation } from "./Confirmation";

const FEATURES = [
  {
    title: "Live vehicle health",
    body: "See fuel, battery, tyre pressure and service-alert status anytime.",
  },
  {
    title: "Remote start & lock",
    body: "Pre-cool the cabin, lock the doors or sound the horn from your phone.",
  },
  {
    title: "Find my Lexus",
    body: "Locate your vehicle on a map at the airport, shopping centre or in a strange suburb.",
  },
  {
    title: "Safety & SOS",
    body: "Automatic crash notification connects you to the Lexus Customer Assistance Centre.",
  },
];

export function ConnectFlyout({ open }: { open: boolean }) {
  const { close, payload } = useFlyout();
  const [paired, setPaired] = useState(false);

  const vehicleName = payload.vehicleName ?? "your Lexus";

  if (paired) {
    return (
      <Flyout open={open} title="Connected services" onClose={close}>
        <Confirmation
          title="Pairing started"
          description={
            <>
              We've sent a one-time pairing code to your email. Open the Lexus
              app on your phone, sign in and enter the code to finish connecting{" "}
              <strong>{vehicleName}</strong>.
            </>
          }
          onDone={close}
        />
      </Flyout>
    );
  }

  return (
    <Flyout
      open={open}
      title="Connected services"
      onClose={close}
      heading="Connect your Lexus"
      description={`Unlock remote control, live vehicle health and Encore safety services for ${vehicleName}.`}
      footer={
        <div className="flyout__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setPaired(true)}
          >
            Pair vehicle
          </button>
          <button type="button" className="btn btn--ghost" onClick={close}>
            Maybe later
          </button>
        </div>
      }
    >
      <ul className="connectlist">
        {FEATURES.map((f) => (
          <li key={f.title} className="connectlist__item">
            <span className="connectlist__dot" aria-hidden="true" />
            <div>
              <h3 className="connectlist__title">{f.title}</h3>
              <p className="connectlist__body">{f.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="fly__note">
        Included with every Encore Platinum membership for the first 3 years.
      </p>
    </Flyout>
  );
}
