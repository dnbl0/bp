import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "../../components/Radio";

const meta: Meta<typeof Radio> = {
  title: "Primitives/Radio",
  component: Radio,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Framed radio option. Matches the Figma \`Comp/input/radio\` component.

### Anatomy

- 20px ring + 12px dot.
- Title (\`Subtitle1\` weight).
- Optional secondary description.
- Optional trailing value (e.g. price).

### States

\`unchecked\`, \`hover\`, \`checked\`, \`error\`, \`disabled\`, \`focus\` —
all mirrored from the Figma source.

### Accessibility

- Real \`<input type="radio">\` (hidden) with \`name\` grouping.
- The label wrapper sits in the tab order; Tab moves between groups, arrow
  keys move within a group (native behaviour).
- Focus ring appears around the ring icon when keyboard-focused.

### Usage

Use \`framed={true}\` (default) for prominent choices like dealer pickers and
the service-type picker. Set \`framed={false}\` for inline lists.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Group: Story = {
  name: "Group of options",
  render: () => {
    const Demo = () => {
      const [v, setV] = useState("logbook");
      const opts = [
        {
          id: "logbook",
          label: "Logbook service",
          description: "Manufacturer-scheduled · Same-day pickup",
          trailing: "$85.00*",
        },
        {
          id: "minor",
          label: "Minor service",
          description: "Oil, filters and a 60-point check · 3–4 hours",
          trailing: "$295.00*",
        },
        {
          id: "major",
          label: "Major service",
          description: "Full inspection with brake fluid · Overnight",
          trailing: "$595.00*",
        },
      ];
      return (
        <div className="radiolist" style={{ maxWidth: 420 }}>
          {opts.map((o) => (
            <Radio
              key={o.id}
              name="service-type"
              value={o.id}
              checked={v === o.id}
              onChange={setV}
              label={o.label}
              description={o.description}
              trailing={o.trailing}
            />
          ))}
        </div>
      );
    };
    return <Demo />;
  },
};

export const ErrorState: Story = {
  name: "Error",
  render: () => (
    <div className="radiolist" style={{ maxWidth: 420 }}>
      <Radio
        name="t"
        value="a"
        checked={false}
        onChange={() => {}}
        label="Option A"
        error
        description="This selection has a problem."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="radiolist" style={{ maxWidth: 420 }}>
      <Radio
        name="t"
        value="a"
        checked={false}
        onChange={() => {}}
        label="Currently unavailable"
        disabled
      />
    </div>
  ),
};
