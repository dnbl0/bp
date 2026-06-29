import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ConnectFlyout } from "../../flyout/ConnectFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Connect your Lexus",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A marketing-led onboarding flyout that sells the value of connected services
and kicks off device pairing. The description names the vehicle from the
payload when available.

### Behaviour

- **Feature list** — four highlights (live vehicle health, remote start & lock,
  Find my Lexus, safety & SOS), each rendered with a dot marker, title and
  body copy.
- **Encore note** — a footnote that the services are included with Encore
  Platinum for the first 3 years.
- **Pair vehicle** — switches to a success \`<Confirmation>\` ("Pairing
  started") explaining that a one-time code has been emailed and to finish in
  the Lexus app.
- **Maybe later** — dismisses the flyout without pairing.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Decorative dot markers are hidden from assistive tech via \`aria-hidden\`.
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
    open("connect", { vehicleName: "NX 450h+ F Sport" });
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Connect your Lexus flyout opens automatically — explore pairing on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <ConnectFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
