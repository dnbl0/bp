import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SettingsFlyout } from "../../flyout/SettingsFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Settings",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Preferences hub for the authenticated My Lexus experience — appearance
controls plus deep-links into the other account flyouts.

### Behaviour

- **Appearance** — three radio options (Dark, Light, Auto) write to
  \`data-theme\` on the document root. Choices persist in \`localStorage\`
  under \`lexus.theme\`, so the palette survives reloads.
- **Text size** — Default / Large / Extra large radios scale all text via
  \`data-text-size\`, persisted under \`lexus.textSize\` (12% and 25% bumps).
- **Preferences rows** — tappable rows open sibling flyouts: Preferred dealer
  (shows the current dealer name), Personal details, and Payment methods.
  Each replaces the Settings flyout with the chosen surface.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Appearance and text-size groups use real radio inputs via \`<Radio>\`,
  so arrow-key navigation and grouped labelling work natively.
- Preference rows are \`<button>\` elements with descriptive labels and a
  trailing call-to-action ("Change", "Edit", "Manage").
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
    open("settings", {});
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Settings flyout opens automatically — interact with it on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <SettingsFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
