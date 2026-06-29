import type { Meta, StoryObj } from "@storybook/react";
import { InfoFlyout } from "../../flyout/InfoFlyout";

const meta: Meta = {
  title: "Flyouts/Info flyout (generic)",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
The reusable **"Learn more" building block** that other content flyouts
compose. Unlike the kind-driven flyouts, \`<InfoFlyout>\` is not registered
with the \`FlyoutProvider\` by a \`FlyoutKind\` — it's a generic shell you render
directly with content.

### Props

- \`open\` — controls visibility.
- \`title\` — the flyout's header label.
- \`heading\` — the large content heading.
- \`description\` — optional supporting line under the heading.
- \`children\` — the body slot; the caller decides what goes here (tables,
  lists, paragraphs).
- \`primaryAction\` — optional \`{ label, onClick }\`. When supplied, the footer
  shows a primary button next to a ghost *Close*. When omitted, no footer
  renders and the flyout is dismissed via its header close control.

### Where it's used

DriveCare, Service loan car and Encore vehicle info all wrap \`<InfoFlyout>\`,
passing their own title, heading, description, body and primary action. This
keeps every "learn more" surface visually and behaviourally consistent.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Close is always reachable: via the primary/ghost footer pair when an action
  is present, and via the header close control regardless.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "With primary action",
  render: () => (
    <InfoFlyout
      open
      title="About Encore"
      heading="Membership, elevated"
      description="A short supporting line that frames the content below."
      primaryAction={{ label: "Got it", onClick: () => {} }}
    >
      <p style={{ color: "var(--fg-muted)" }}>
        Example body content goes here. Callers pass tables, lists or
        paragraphs into the body slot.
      </p>
    </InfoFlyout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The standard configuration: a primary action paired with a ghost Close in the footer.",
      },
    },
  },
};

export const NoPrimaryAction: Story = {
  name: "Without primary action",
  render: () => (
    <InfoFlyout
      open
      title="About Encore"
      heading="Membership, elevated"
      description="With no primaryAction, the footer is omitted entirely."
    >
      <p style={{ color: "var(--fg-muted)" }}>
        Without a primary action there is no footer — the flyout is dismissed
        using the header close control.
      </p>
    </InfoFlyout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Omitting `primaryAction` removes the footer; dismissal relies on the header close control.",
      },
    },
  },
};
