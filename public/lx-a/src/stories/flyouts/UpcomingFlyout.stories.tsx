import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { UpcomingFlyout } from "../../flyout/UpcomingFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Upcoming",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Agenda of the member's upcoming events — service bookings, valet visits and
lounge access — sorted by what's next.

### Behaviour

- **Event list** — renders the provider's \`bookings\`. Each item shows a
  kind badge (labelled via \`bookingKindLabel\` and colour-coded by kind), a
  "when" timestamp, the title and a short detail line.
- **Cancel** — every event has a Cancel control that removes it from the
  agenda via \`removeBooking\`.
- **Empty state** — with nothing scheduled, the flyout shows a prompt to
  book a service or redeem a benefit.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Cancel buttons carry an \`aria-label\` naming the event ("Cancel
  {title}"), so the action target is unambiguous to screen readers.
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
    open("upcoming", {});
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Upcoming flyout opens automatically — interact with it on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <UpcomingFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
