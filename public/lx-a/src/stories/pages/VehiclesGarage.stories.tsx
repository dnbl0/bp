import type { Meta, StoryObj } from "@storybook/react";
import { VehiclesGarage } from "../../components/VehiclesGarage";
import { accounts } from "../../data/accounts";

const meta: Meta<typeof VehiclesGarage> = {
  title: "Pages/VehiclesGarage",
  component: VehiclesGarage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Garage page — linked vehicles + pending-verification cards + Add a vehicle entry point.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VehiclesGarage>;

export const Default: Story = {
  render: () => (
    <VehiclesGarage onSelect={() => {}} vehicles={accounts.owner.vehicles} />
  ),
};
