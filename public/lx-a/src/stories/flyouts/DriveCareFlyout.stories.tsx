import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DriveCareFlyout } from "../../flyout/DriveCareFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/DriveCare",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A "Learn more" content flyout for **DriveCare**, the 24-hour roadside
assistance included with every Encore membership. Built on the reusable
\`<InfoFlyout>\` shell, so it inherits the standard title / heading /
description / body layout.

### Behaviour

- **Coverage summary** — a \`<DataTable>\` lays out the essentials: nationwide
  24/7 cover, the call-out scenarios (flat battery, tyre, lockout, fuel
  run-out), complimentary towing to the nearest Lexus dealer, and the hotline
  number.
- **Primary action** — *Call 1800 023 009* sets \`window.location.href\` to a
  \`tel:\` link so a tap dials straight from a phone.
- **Safety note** — a closing note reminds the member to call 000 first for
  life-threatening emergencies; DriveCare coordinates the rest.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The ghost *Close* action is provided automatically by \`<InfoFlyout>\`
  alongside the primary call button.
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
    open("drivecare");
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The DriveCare flyout opens automatically — view it on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <DriveCareFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
