import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ServiceHistoryFlyout } from "../../flyout/ServiceHistoryFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Service history",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A filterable, expandable log of a vehicle's services. The heading reflects the
vehicle name from the payload, and a footer action jumps straight into the
*Book a service* flyout for the same vehicle.

### Behaviour

- **Segmented tabs** — *All*, *Upcoming* and *Completed* filter the records.
  Implemented as an ARIA tablist with roving \`tabIndex\`.
- **Records** — each entry shows title, status pill, service interval, date and
  dealer. Records with detail are expandable.
- **Expanded detail** — reveals odometer, advisor and total cost, a
  *Work performed* list and, when present, a *Parts replaced* list. Only one
  record is open at a time.
- **Empty state** — shows a "No … services" message when a filter has no
  matches.
- **Footer** — *Book a service* opens the booking flyout, passing the vehicle
  name through.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Tabs support Arrow / Home / End keyboard navigation and expose
  \`aria-selected\` + \`aria-controls\`.
- Each expandable record is a button with \`aria-expanded\` / \`aria-controls\`,
  and the revealed body is a labelled \`role="region"\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function Opener() {
  const { open } = useFlyout();
  useEffect(() => {
    open("service-history", { vehicleName: "NX 450h+ F Sport" });
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Service history flyout opens automatically — filter and expand records on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <ServiceHistoryFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
