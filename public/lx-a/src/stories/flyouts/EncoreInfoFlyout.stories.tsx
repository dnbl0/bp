import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EncoreInfoFlyout } from "../../flyout/EncoreInfoFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Encore vehicle info",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A "Learn more" content flyout that explains what an **Encore Vehicle** is —
eligible new and demonstrator L-Series & F-model vehicles automatically enrol
in Lexus Encore. Built on the reusable \`<InfoFlyout>\` shell.

### Behaviour

- **Tier list** — a clay-dotted \`connectlist\` walks through the three Encore
  tiers: **Silver** (DriveCare roadside assistance and partner offers),
  **Gold** (airport lounge passes and concierge experiences), and
  **Platinum** (valet parking, lifestyle escapes and the full service loan
  car programme).
- **Primary action** — *Done* simply closes the flyout via \`useFlyout\`.
- **Eligibility note** — a closing note clarifies that tier eligibility is set
  at purchase and reflected in the member's profile.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The decorative tier dots are \`aria-hidden\`; each tier's name is a real
  heading paired with its description.
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
    open("encore-info");
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Encore vehicle info flyout opens automatically — view it on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <EncoreInfoFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
