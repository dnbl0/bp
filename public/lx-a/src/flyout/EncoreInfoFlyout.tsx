import { InfoFlyout } from "./InfoFlyout";
import { useFlyout } from "./FlyoutProvider";

const TIERS = [
  {
    name: "Encore Silver",
    body: "Entry tier with DriveCare roadside assistance and exclusive offers from partner brands.",
  },
  {
    name: "Encore Gold",
    body: "Adds airport lounge passes and selected concierge experiences.",
  },
  {
    name: "Encore Platinum",
    body: "Top tier with valet parking, lifestyle escapes and the full service loan car programme.",
  },
];

export function EncoreInfoFlyout({ open }: { open: boolean }) {
  const { close } = useFlyout();
  return (
    <InfoFlyout
      open={open}
      title="Encore Vehicle"
      heading="What 'Encore Vehicle' means"
      description="Eligible new and demonstrator L-Series & F-model vehicles automatically enrol in Lexus Encore — Australia's longest-running luxury ownership programme."
      primaryAction={{
        label: "Done",
        onClick: close,
      }}
    >
      <ul className="connectlist">
        {TIERS.map((t) => (
          <li key={t.name} className="connectlist__item">
            <span
              className="connectlist__dot connectlist__dot--clay"
              aria-hidden="true"
            />
            <div>
              <h3 className="connectlist__title">{t.name}</h3>
              <p className="connectlist__body">{t.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="fly__note">
        Tier eligibility is set at the time of purchase and reflected in your
        profile.
      </p>
    </InfoFlyout>
  );
}
