import type { Meta, StoryObj } from "@storybook/react";
import { VehicleDetail } from "../../components/VehicleDetail";
import { vehicles } from "../../data/vehicles";

const meta: Meta<typeof VehicleDetail> = {
  title: "Pages/VehicleDetail",
  component: VehicleDetail,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Vehicle detail screen with the tabbed Overview / Service / Connected / Warranty layout, a vehicle hero, and the Quick Actions side-rail.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VehicleDetail>;

export const NX450h: Story = {
  name: "NX 450h+ (Encore)",
  render: () => {
    const v = vehicles.find((x) => x.id === "nx450h") ?? vehicles[0];
    return <VehicleDetail vehicle={v} onBack={() => {}} />;
  },
};

export const UX300e: Story = {
  name: "UX 300e",
  render: () => {
    const v = vehicles.find((x) => x.id === "ux300e") ?? vehicles[0];
    return <VehicleDetail vehicle={v} onBack={() => {}} />;
  },
};
