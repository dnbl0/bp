import type { Meta, StoryObj } from "@storybook/react";
import { ConciergeButton } from "../../components/ConciergeButton";

const meta: Meta<typeof ConciergeButton> = {
  title: "Concierge/Floating button",
  component: ConciergeButton,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Persistent floating affordance that opens the Concierge flyout. Lives at
the bottom-right of the viewport on every authenticated screen.

### Behaviour

- Hides when any flyout is open (\`is-hidden\` state) so it never sits beneath
  a scrim.
- Collapses to a circular icon-only button below 640px to save thumb-space.
- Uses the tier gradient as background and clay glow as elevation.

### Accessibility

- Always announces as "Open concierge" via \`aria-label\`.
- When hidden it's \`aria-hidden\` and removed from the tab order.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConciergeButton>;

export const Default: Story = {
  render: () => (
    <div style={{ minHeight: "60vh", position: "relative" }}>
      <p style={{ color: "var(--fg-muted)" }}>
        Look bottom-right — the Concierge button is fixed to the viewport.
      </p>
      <ConciergeButton />
    </div>
  ),
};
