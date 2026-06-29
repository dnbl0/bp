import type { Meta, StoryObj } from "@storybook/react";
import { CommandPalette } from "../../components/CommandPalette";
import { accounts } from "../../data/accounts";

const meta: Meta<typeof CommandPalette> = {
  title: "Search/Command palette",
  component: CommandPalette,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Global search palette. Hit **⌘K** (or **Ctrl+K**) anywhere to open.

### What it searches

- Sections (Dashboard, My Lexus, Encore, Profile).
- Vehicles by name + rego.
- Benefits.
- Manuals (Owner's manual, warranty, EV battery care…).
- Dealers by name + address.
- Service history records.
- Actions (Book a service, Open concierge, Refer a friend, Settings,
  Upcoming, Add a vehicle).

### Keyboard

- **↑ / ↓** navigate.
- **Enter** select.
- **Esc** close.
- **⌘K / Ctrl+K** open/close from anywhere.

### Accessibility

- \`role="dialog"\` \`aria-modal="true"\` with focus on the input on open.
- Results list uses \`role="listbox"\` and each item \`role="option"\` with
  \`aria-selected\`.
- Body scroll is locked while open.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

export const Default: Story = {
  render: () => (
    <div>
      <p style={{ color: "var(--fg-muted)", padding: 24 }}>
        Press <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd> to open the command palette.
      </p>
      <CommandPalette
        onNavigate={() => {}}
        onOpenVehicle={() => {}}
        vehicles={accounts.owner.vehicles}
        benefits={accounts.owner.encoreBenefits}
      />
    </div>
  ),
};
