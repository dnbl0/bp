import type { Meta, StoryObj } from "@storybook/react";
import { AuthLayout } from "../../components/auth/AuthLayout";

const meta = {
  title: "Authentication/AuthLayout",
  component: AuthLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
The shared shell for every authentication screen — the full public Lexus top
nav, an optional "Close" affordance, a left form panel (\`children\`) and a
right lifestyle image (\`image\`). \`LoginScreen\`, \`RegisterScreen\` and
\`ResetScreen\` all compose this, as does \`AuthPlaceholder\`.
        `.trim(),
      },
    },
  },
  argTypes: {
    image: { control: "text" },
    onClose: { action: "close" },
  },
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleForm = (
  <>
    <p className="auth__eyebrow">
      <span className="tick" /> Encore
    </p>
    <h1 className="auth__title">Welcome back</h1>
    <p className="auth__sub">
      Sign in to manage your vehicles, bookings and Encore benefits.
    </p>
  </>
);

export const Default: Story = {
  name: "Shell with content",
  args: {
    children: SampleForm,
    image: "/assets/auth-login.jpg",
  },
};

export const WithClose: Story = {
  name: "With close affordance",
  args: {
    children: SampleForm,
    image: "/assets/auth-login.jpg",
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "Passing `onClose` reveals the close link — used when auth is entered as a modal flow rather than a destination.",
      },
    },
  },
};
