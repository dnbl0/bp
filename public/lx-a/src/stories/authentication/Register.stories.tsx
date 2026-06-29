import type { Meta, StoryObj } from "@storybook/react";
import { RegisterScreen } from "../../components/auth/RegisterScreen";

const meta: Meta<typeof RegisterScreen> = {
  title: "Authentication/RegisterScreen",
  component: RegisterScreen,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Account creation. Per-field validation + live password-strength helper (weak / fair / good / strong) + Terms acceptance.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RegisterScreen>;

export const Default: Story = {
  render: () => <RegisterScreen onRegistered={() => {}} onBack={() => {}} />,
};
