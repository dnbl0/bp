import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EditRegistrationFlyout } from "../../flyout/EditRegistrationFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Edit registration",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A focused single-field editor for updating the registration plate held against
a vehicle. The description names the vehicle when supplied in the payload.

### Behaviour

- **Single field** — a \`<TextField>\` seeded with the current registration from
  the payload, auto-capitalised, with helper text "As shown on your number
  plate, without spaces."
- **Validation** — the value is trimmed and upper-cased; valid plates are
  3–8 characters. An inline error ("Enter a valid registration (3–8
  characters).") appears only after the field is touched / a save is attempted.
- **Save** — *Save changes* commits the cleaned value via \`setRego\` for the
  payload's \`vehicleId\` and closes the flyout. Invalid input marks the field
  touched and keeps the flyout open.
- **Cancel** — dismisses without saving.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The error message is wired to the field via \`<TextField>\`, so screen readers
  announce it when validation fails.
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
    open("edit-registration", {
      vehicleId: "nx450h",
      vehicleName: "NX 450h+ F Sport",
      rego: "ABC123",
    });
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Edit registration flyout opens automatically — edit the plate on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <EditRegistrationFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
