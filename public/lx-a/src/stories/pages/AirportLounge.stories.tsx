import type { Meta, StoryObj } from "@storybook/react";
import { AirportLounge } from "../../components/AirportLounge";

const meta: Meta<typeof AirportLounge> = {
  title: "Pages/AirportLounge",
  component: AirportLounge,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof AirportLounge>;

export const Default: Story = {
  render: () => <AirportLounge onBack={() => {}} />,
};
