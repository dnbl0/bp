import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ManualsFlyout } from "../../flyout/ManualsFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Manuals & resources",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A curated list of operating guides, warranty information and connected-services
help for a vehicle. The heading is vehicle-specific when a name is supplied in
the payload, otherwise it falls back to "Manuals & resources".

### Behaviour

- **Resource list** — each item shows a title, description and a
  \`format · size\` meta line (e.g. *PDF · 4.2 MB*, *Video · 6 min*).
- **Format-aware action** — the trailing link adapts its verb to the resource
  format: *Watch* for video, *Read* for web, *Download* otherwise, each with a
  trailing arrow icon.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Each action carries an explicit \`aria-label\` ("Open {title}") so its purpose
  is clear out of visual context.
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
    open("manuals", { vehicleName: "NX 450h+ F Sport" });
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Manuals & resources flyout opens automatically — browse the resources on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <ManualsFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
