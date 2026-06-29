import { InfoFlyout } from "./InfoFlyout";
import { DataTable } from "../components/Table";
import { useFlyout } from "./FlyoutProvider";

export function LoanCarFlyout({ open }: { open: boolean }) {
  const { open: openFlyout, close } = useFlyout();
  return (
    <InfoFlyout
      open={open}
      title="Service loan car"
      heading="A Lexus while we have yours"
      description="Stay on the move while your vehicle is in for service — pick up a complimentary loan car or have one delivered."
      primaryAction={{
        label: "Book a service",
        onClick: () => {
          close();
          openFlyout("book-service");
        },
      }}
    >
      <DataTable
        className="dtable--flyout"
        rows={[
          { label: "Vehicle", value: "Late-model Lexus from the loan fleet" },
          { label: "Duration", value: "Same day for minor / overnight for major service" },
          { label: "Delivery", value: "Available within 25 km of your preferred dealer" },
          { label: "Eligibility", value: "Encore Platinum members, by request" },
        ]}
      />
      <p className="fly__note">
        Subject to availability — choose your transport option when you book a
        service.
      </p>
    </InfoFlyout>
  );
}
