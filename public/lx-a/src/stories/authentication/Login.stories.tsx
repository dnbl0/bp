import type { Meta, StoryObj } from "@storybook/react";
import { LoginScreen } from "../../components/auth/LoginScreen";

const meta: Meta<typeof LoginScreen> = {
  title: "Authentication/LoginScreen",
  component: LoginScreen,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
First-touch entry to My Lexus. Two-column shell — form on the left, lifestyle
image on the right.

### Validation

- **Email** is checked against \`^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$\` on submit.
- **Password** must be present.
- **Demo error trigger**: type the password \`wrong\` to see the form-level
  alert state.

### Caps Lock

When focus is in the password field, Caps-Lock detection surfaces via the
field's helper text ("Caps Lock is on.").
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginScreen>;

export const Default: Story = {
  render: () => (
    <LoginScreen
      onLogin={() => {}}
      onRegister={() => {}}
      onForgotPassword={() => {}}
    />
  ),
};
