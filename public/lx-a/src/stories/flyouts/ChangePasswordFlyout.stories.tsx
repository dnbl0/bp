import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChangePasswordFlyout } from "../../flyout/ChangePasswordFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Change password",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Three-step "Change your password" flow, rebuilt from the Figma designs.

### Behaviour

- **Intro** — shows the masked current password and explains we'll email a
  one-time code. "Change password" sends the code and advances.
- **Verify** — enter the one-time code sent to the member's email
  (any code passes in the prototype). A "Resend code" link re-triggers the
  send toast.
- **Set a new password** — new password field with a live "Passwords should
  have" checklist (8–16 characters, uppercase, lowercase, number) whose ticks
  turn green as each rule is met, plus a confirm field that flags a mismatch.
  "Set new password" enables only when every rule passes and both fields match.
- **Confirmation** — ends on the shared \`<Confirmation>\` panel plus a toast.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- "Go back" steps the flow backwards; the rules list is presentational and
  the matching error is announced via the \`<TextField>\` error.
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
    open("change-password", {});
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Change password flyout opens automatically — interact with it on the
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
  render: () => <ChangePasswordFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
