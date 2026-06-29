import type { Meta, StoryObj } from "@storybook/react";
import { AuthPlaceholder } from "../../components/auth/AuthPlaceholder";

const meta = {
  title: "Authentication/AuthPlaceholder",
  component: AuthPlaceholder,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A "coming soon" auth screen — wraps \`AuthLayout\` with a back link, Encore
eyebrow, a title and roadmap copy. Used for auth entry points whose full
design hasn't landed yet, so navigation stays intact during the prototype.
        `.trim(),
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    onBack: { action: "back" },
  },
} satisfies Meta<typeof AuthPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Forgot your password?",
    onBack: () => {},
  },
};
