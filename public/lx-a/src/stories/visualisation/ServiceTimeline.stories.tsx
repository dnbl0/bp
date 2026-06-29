import type { Meta, StoryObj } from "@storybook/react";
import { ServiceTimeline } from "../../components/ServiceTimeline";
import { vehicles } from "../../data/vehicles";

const meta: Meta<typeof ServiceTimeline> = {
  title: "Visualisation/ServiceTimeline",
  component: ServiceTimeline,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Horizontal timeline of past and upcoming services for a single vehicle.
Surfaced on the Vehicle Detail → Service tab.

### Reading the chart

- A horizontal rail anchored to past dates on the left and the next upcoming
  service on the right.
- Past services are filled dark dots; upcoming uses tier-clay tone with a soft
  glow.
- A dashed accent line marks **Today**, with a small label.
- Hover (or focus) any dot to reveal a card with date, title and dealer.

### Accessibility

- The rail carries \`role="img"\` and \`aria-label="Service timeline"\`.
- Hovered detail cards aren't keyboard-focusable today — keyboard users see
  the same data in the **Service history** flyout (linked from the Maintenance
  card on the Service tab).

### Layout

- 220px rail height.
- Inline 24px margin so detail cards don't clip on smaller widths.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ServiceTimeline>;

export const NX450h: Story = {
  name: "NX 450h+ (with upcoming)",
  render: () => {
    const v = vehicles.find((x) => x.id === "nx450h") ?? vehicles[0];
    return <ServiceTimeline vehicle={v} />;
  },
};

export const UX300e: Story = {
  name: "UX 300e (no upcoming)",
  render: () => {
    const v = vehicles.find((x) => x.id === "ux300e") ?? vehicles[0];
    return <ServiceTimeline vehicle={v} />;
  },
};
