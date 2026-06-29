import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "../../components/TextField";

const meta: Meta<typeof TextField> = {
  title: "Primitives/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A label + input pair. Used across auth, profile edit, payments and any
flyout that takes text. Password type adds a reveal toggle.

### Props

- \`label\` — visible field label (sentence case).
- \`required\` — appends a red asterisk to the label.
- \`type\` — \`text | email | password | tel\`.
- \`helper\` — gentle hint shown under the field.
- \`error\` — overrides helper, switches border to error red, sets \`aria-invalid\`.
- \`autoComplete\` — pass the right value so password managers can fill.

### Accessibility

- The input is associated with the label via the wrapping \`<label>\`.
- Password reveal toggle has \`aria-label\` that flips between
  "Show password" and "Hide password".
- Caps-Lock detection in LoginScreen surfaces via \`helper\`.

### Tokens

- Border default: \`--border-strong\`.
- Border focus: \`--fg-muted\`.
- Border error: \`--error-border\`.
        `.trim(),
      },
    },
  },
  args: {
    label: "Email",
    required: true,
    type: "email",
    placeholder: "Email address",
    helper: undefined,
    error: undefined,
  },
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "tel"] },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

function Controlled(args: React.ComponentProps<typeof TextField>) {
  const [v, setV] = useState(args.value as string);
  return (
    <div style={{ width: 360 }}>
      <TextField {...args} value={v} onChange={setV} />
    </div>
  );
}

export const Default: Story = {
  render: (args) => <Controlled {...args} value="" />,
};

export const WithHelper: Story = {
  name: "With helper",
  args: {
    label: "VIN",
    helper: "17 characters, found on your compliance plate or rego papers.",
    type: "text",
    placeholder: "JTHX9AAA000000123",
  },
  render: (args) => <Controlled {...args} value="" />,
};

export const WithError: Story = {
  name: "With error",
  args: {
    label: "Email",
    type: "email",
    error: "Enter a valid email address.",
    value: "susan@",
  },
  render: (args) => <Controlled {...args} />,
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Password",
    autoComplete: "current-password",
    helper: "Use at least 8 characters with a number or symbol.",
  },
  render: (args) => <Controlled {...args} value="" />,
  parameters: {
    docs: {
      description: {
        story:
          "Password fields gain a reveal eye toggle. The toggle's `aria-label` flips between 'Show password' and 'Hide password'.",
      },
    },
  },
};
