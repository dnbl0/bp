import type { Meta, StoryObj } from "@storybook/react";
import { TopNav } from "../../components/TopNav";
import { accounts } from "../../data/accounts";

const meta: Meta = {
  title: "Patterns/Notifications popover",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Bell-icon popover in the top nav. Surfaces timely items (service due, lounge
expiry, new offer) and routes each one to its destination.

### Behaviour

- Click the bell to open. Outside click + Esc close it.
- **Mark all read** appears only when there are unread items.
- **Clear all** removes everything from the list.
- Each item is a real \`<button>\` — Enter activates and routes the user to
  the relevant section/flyout.
- Unread items show a small accent dot before the title and bump the title
  weight to \`--fg-strong\`.

### Accessibility

- The bell button announces unread count via \`aria-label\`
  ("Notifications, 2 unread").
- Popover is \`role="dialog"\` with \`aria-label="Notifications"\`.
- Focus stays in the bell trigger when opened; SR users hear titles and
  bodies as buttons.

### Spec

- 340px width, max-height 420px with scroll.
- \`--shadow-md\`, \`--radius-md\`, popover sits 14px below the bell.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const InContext: Story = {
  name: "In the top nav",
  render: () => (
    <div>
      <p style={{ color: "var(--fg-muted)" }}>
        Click the bell icon at the top-right of the nav to open the popover.
      </p>
      <TopNav member={accounts.owner.member} switchLabel={accounts.owner.switchLabel} />
    </div>
  ),
};
