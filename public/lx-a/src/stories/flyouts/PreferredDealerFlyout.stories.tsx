import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PreferredDealerFlyout } from "../../flyout/PreferredDealerFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Preferred dealer",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Dealer picker for setting the member's preferred service centre — searchable,
proximity-ordered and tagged for context.

### Behaviour

- **Search** — a suburb / postcode field filters dealers by name or address
  in real time. "Use current location" clears the query to fall back to the
  proximity-ordered list.
- **List ordering** — dealers come from \`dealersByProximity\`. While not
  filtering, the currently saved preferred dealer is pinned to the top so the
  member can see today's choice at a glance.
- **Tags** — the saved dealer is flagged "Current" and the closest dealer is
  flagged "Nearest" inline on the label.
- **Selection / Save** — radios pick a dealer into local state; "Save
  preferred dealer" commits via \`setPreferredDealerId\` and closes. An empty
  filter shows a "No dealers match" message.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The dealer list uses real radio inputs via \`<Radio>\`, so it reads as a
  single grouped choice with arrow-key navigation.
- Each option's description announces the address and distance away.
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
    open("preferred-dealer", {});
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Preferred dealer flyout opens automatically — interact with it on the
      right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <PreferredDealerFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
