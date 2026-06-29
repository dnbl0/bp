import type { Meta, StoryObj } from "@storybook/react";
import { PointsSparkline } from "../../components/PointsSparkline";

const meta: Meta<typeof PointsSparkline> = {
  title: "Visualisation/PointsSparkline",
  component: PointsSparkline,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Compact points-earned sparkline on the Profile Encore Membership card.

### Anatomy

- Gradient area fill (currentColor 32% → 0%).
- 1.4px stroke line.
- End-point emphasised, prior months smaller.
- Caption row: "Month · N pts earned" left, delta vs start of series right.

### Props

- \`data\` — array of numbers (defaults to a sample 12-month series).
- \`height\` — number, default 72.

### Tinting

The whole SVG inherits \`currentColor\` from the parent. We tint it clay
(\`--ld-color-lexus-clay-400\`) to track tier identity. Drop it in any other
context and it will tint with whatever the parent's color is.

### Accessibility

- Wrapped in \`<figure role="figure">\` with an \`aria-label\` summarising the
  series.
- \`<figcaption>\` carries the textual data so SR users get the headline.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PointsSparkline>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        width: 360,
        padding: 16,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        color: "var(--ld-color-lexus-clay-400)",
      }}
    >
      <PointsSparkline />
    </div>
  ),
};

export const ShorterSeries: Story = {
  name: "Custom series",
  render: () => (
    <div
      style={{
        width: 360,
        padding: 16,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        color: "var(--accent)",
      }}
    >
      <PointsSparkline data={[100, 240, 180, 320, 420, 380, 510]} />
    </div>
  ),
};
