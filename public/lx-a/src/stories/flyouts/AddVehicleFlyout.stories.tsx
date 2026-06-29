import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AddVehicleFlyout } from "../../flyout/AddVehicleFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Add a vehicle",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A short form for linking another Lexus to the account by registration and VIN.
It takes no payload — the customer enters everything.

### Behaviour

- **Fields** — *Registration* and *VIN* \`<TextField>\`s, both required, with the
  VIN carrying helper text ("17 characters, found on your compliance plate or
  rego papers.").
- **Submit gate** — *Submit for verification* stays disabled until the
  registration is ≥3 characters and the VIN ≥6.
- **Submit** — adds a pending, unverified vehicle via \`addPendingVehicle\`
  (upper-cased values, a placeholder image and \`pending: true\`), then shows a
  success \`<Confirmation>\` ("Vehicle linked") noting verification usually
  completes within one business day.
- **Reset on close** — closing clears the fields after the exit animation, so
  the form is fresh next time it opens.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The submit button's disabled state communicates the incomplete form to
  assistive tech.
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
    open("add-vehicle", {});
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Add a vehicle flyout opens automatically — fill in the details on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <AddVehicleFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
