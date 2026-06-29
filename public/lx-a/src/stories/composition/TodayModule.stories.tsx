import type { Meta, StoryObj } from "@storybook/react";
import { TodayModule } from "../../components/TodayModule";
import { accounts } from "../../data/accounts";

const meta: Meta<typeof TodayModule> = {
  title: "Composition/TodayModule",
  component: TodayModule,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Slim status strip surfacing **next service** and **upcoming events**. Lives
in the dashboard sidebar — narrow column, vertical stack.

### Cells

- **Lead (next service)** — accent-tinted background, relative time chip,
  Smart book CTA that opens the booking flyout pre-filled.
- **Upcoming** — count of scheduled events with the next event's date.
  Routes to the Upcoming flyout when there's one or more.

### Empty states

- No next service due → "No services due" + a normal Book a service button.
- No upcoming events → "Nothing scheduled", CTA hidden.

### Specs

- Cell min-height 64px, padding \`--space-3 / --space-4\`.
- Icon: 32px pill with elevation-inset background.
- Stack gap: \`--space-3\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TodayModule>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <TodayModule
        onOpenVehicle={() => {}}
        vehicles={accounts.owner.vehicles}
      />
    </div>
  ),
};
