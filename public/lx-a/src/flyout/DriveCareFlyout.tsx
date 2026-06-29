import { InfoFlyout } from "./InfoFlyout";
import { DataTable } from "../components/Table";

export function DriveCareFlyout({ open }: { open: boolean }) {
  return (
    <InfoFlyout
      open={open}
      title="DriveCare"
      heading="24-hour roadside assistance"
      description="Included with every Encore membership — wherever the road takes you."
      primaryAction={{
        label: "Call 1800 023 009",
        onClick: () => {
          window.location.href = "tel:+611800023009";
        },
      }}
    >
      <DataTable
        className="dtable--flyout"
        rows={[
          { label: "Coverage", value: "Australia-wide, 24/7" },
          { label: "Call out", value: "Flat battery, tyre, lockout, fuel run-out" },
          { label: "Towing", value: "To the nearest Lexus dealer at no charge" },
          { label: "Phone", value: "1800 023 009, option 2" },
        ]}
      />
      <p className="fly__note">
        For life-threatening emergencies, always call 000 first. DriveCare
        coordinates the rest.
      </p>
    </InfoFlyout>
  );
}
