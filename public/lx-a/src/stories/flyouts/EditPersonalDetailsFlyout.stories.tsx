import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EditPersonalDetailsFlyout } from "../../flyout/EditPersonalDetailsFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Personal details",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Multi-step flow for updating the member's contact details, backed by the
shared personal-details record. Mirrors the Figma "Update your details" flyout.

### Behaviour

- **Select an option** — a framed radio list (Update name and address /
  Update email address / Update phone number). "Continue" is disabled until
  a choice is made.
- **Name & address** — first name, last name and postal address fields,
  seeded from the current record; "Save changes" commits via \`setPersonal\`.
- **Email / phone** — enter the new value, then a one-time-code step
  ("we emailed / texted you a code"). Any code passes in the prototype;
  verifying commits the change.
- **Confirmation** — each branch ends on the shared \`<Confirmation>\` panel
  plus a toast.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- "Go back" steps the flow backwards (code → form → select); each field is a
  labelled \`<TextField>\`.
- The primary action lives in the persistent flyout footer.
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
    open("edit-personal", {});
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Personal details flyout opens automatically — interact with it on the
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
  render: () => <EditPersonalDetailsFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
