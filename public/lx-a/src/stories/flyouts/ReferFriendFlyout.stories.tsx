import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReferFriendFlyout } from "../../flyout/ReferFriendFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Refer a friend",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A referral form flyout — invite a friend to test drive a Lexus so you both
earn a complimentary concierge dining experience. Built directly on
\`<Flyout>\` (not \`<InfoFlyout>\`) because it carries its own validated form
and success state.

### Behaviour

- **Form** — two required \`<TextField>\`s (friend's name, friend's email) plus
  an optional personal-note textarea.
- **Validation** — *Send invitation* checks the name is non-empty and the
  email matches a basic pattern; inline errors clear as you type. Only when
  both pass does the flyout flip to its sent state.
- **Confirmation** — on success the body swaps to a \`<Confirmation>\` that
  names the friend and explains you'll both be eligible for the dining
  experience once they take delivery.
- **Reset on close** — closing clears the name, email, note, errors and sent
  state ~340ms later (after the exit animation), so reopening starts fresh.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Required fields are marked and errors are associated with their inputs via
  \`<TextField>\`.
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
    open("refer-friend");
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Refer a friend flyout opens automatically — fill it in on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <ReferFriendFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
