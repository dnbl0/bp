import type { Meta, StoryObj } from "@storybook/react";
import { VehiclePanel } from "../../components/VehicleCard";
import { accounts } from "../../data/accounts";

const meta: Meta<typeof VehiclePanel> = {
  title: "Composition/VehiclePanel",
  component: VehiclePanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Sidebar card showing the member's vehicle(s). When more than one vehicle is
linked, a slim carousel surfaces with prev/next round controls.

### Behaviour

- The active vehicle defaults to the first linked vehicle.
- Manage button invokes \`onManage(id)\` so the parent can route to the
  vehicle detail screen.

### Specs

- Vehicle render at 86% width on a radial backdrop — matches the rest of
  the vehicle-render family.
- Encore "Verified" chip when \`encore: true\`.
- Sits in the dashboard \`.dash__side\` next to the OffersCarousel.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VehiclePanel>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 380 }}>
      <VehiclePanel onManage={() => {}} vehicles={accounts.owner.vehicles} />
    </div>
  ),
};
