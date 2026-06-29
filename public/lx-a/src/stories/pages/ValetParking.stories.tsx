import type { Meta, StoryObj } from "@storybook/react";
import { ValetParking } from "../../components/ValetParking";

const meta: Meta<typeof ValetParking> = {
  title: "Pages/ValetParking",
  component: ValetParking,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ValetParking>;

export const Default: Story = {
  render: () => <ValetParking onBack={() => {}} />,
};
