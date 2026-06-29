import type { Meta, StoryObj } from "@storybook/react";
import { ResetScreen } from "../../components/auth/ResetScreen";

const meta: Meta<typeof ResetScreen> = {
  title: "Authentication/ResetScreen",
  component: ResetScreen,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Forgot-password flow — email entry → submit-to-confirmation. Confirmation state surfaces 'Check your inbox' with the masked email + a return-to-login CTA.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResetScreen>;

export const Default: Story = {
  render: () => <ResetScreen onBack={() => {}} />,
};
