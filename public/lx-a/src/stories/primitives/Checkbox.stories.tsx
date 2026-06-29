import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../../components/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Compact custom-styled checkbox with a real, focusable native input. Used in
login (Stay logged in), register (Terms), and pattern flyouts.

### Accessibility

- Native \`<input type="checkbox">\` retained for assistive tech and form
  semantics; focus ring shows on \`:focus-visible\` via the visual proxy.
- The visible box is \`aria-hidden\`; the label text is read by SR users.
- Click or press Space to toggle; Enter does **not** toggle in a form to
  avoid accidental submission.

### Specs

- 20×20 box, \`--radius-sm\`, 1.5px border.
- Checked: background \`--fg\`, tick uses \`--fg-on-accent\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

function Controlled({ label = "Stay logged in", initial = false }: {
  label?: string;
  initial?: boolean;
}) {
  const [v, setV] = useState(initial);
  return <Checkbox checked={v} onChange={setV} label={label} />;
}

export const Unchecked: Story = {
  render: () => <Controlled />,
};

export const Checked: Story = {
  render: () => <Controlled initial={true} />,
};

export const LongLabel: Story = {
  name: "Long label",
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Controlled
        label="I agree to the Encore Terms and Privacy Notice."
        initial={true}
      />
    </div>
  ),
};
