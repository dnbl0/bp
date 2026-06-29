import type { Meta, StoryObj } from "@storybook/react";
import { StepIndicator } from "../../flyout/StepIndicator";

const meta: Meta<typeof StepIndicator> = {
  title: "Patterns/StepIndicator",
  component: StepIndicator,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Linear-flow progress indicator used at the top of multi-step flyouts. Drives
the Book a Service wizard.

### Anatomy

- Label line: "Step N of M · Current label" in muted uppercase.
- Segmented track: one segment per step; completed segments tint solid \`--fg\`,
  pending segments fall back to \`--elevation-inset\`.

### Props

- \`current\` — 0-indexed step.
- \`steps\` — array of step labels (3–6 ideal range).

### Accessibility

- Whole element carries \`aria-label\` summarising progress.
- Track itself is \`role="presentation"\` — the label line is the meaningful
  status text.
        `.trim(),
      },
    },
  },
  argTypes: {
    current: { control: { type: "number", min: 0, max: 5 } },
  },
};

export default meta;
type Story = StoryObj<typeof StepIndicator>;

const STEPS = ["Type", "Dealer", "Date", "Time", "Transport", "Confirm"];

export const Default: Story = {
  args: { current: 0, steps: STEPS },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <StepIndicator {...args} />
    </div>
  ),
};

export const Midway: Story = {
  args: { current: 2, steps: STEPS },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <StepIndicator {...args} />
    </div>
  ),
};

export const Last: Story = {
  args: { current: 5, steps: STEPS },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <StepIndicator {...args} />
    </div>
  ),
};
