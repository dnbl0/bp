import type { Meta, StoryObj } from "@storybook/react";
import {
  WestfieldMark,
  ChadstoneMark,
  DragonPassMark,
} from "../../components/partnerLogos";

const meta: Meta = {
  title: "Composition/Partner Logos",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Stylised partner wordmarks rendered inline as SVG. They ship with the
bundle (no network requests) and tint via \`currentColor\`, so they invert
correctly in light theme.

### Usage

- Westfield / Chadstone — valet location cards on the Valet screen.
- DragonPass — lounge feature card on the AirportLounge screen.
- All accept \`width\` (number); height scales proportionally.

### Accessibility

- Each carries a proper \`role="img"\` and \`aria-label\` with the partner name.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const All: Story = {
  name: "All marks",
  render: () => (
    <div className="sb-row" style={{ alignItems: "center", gap: 40 }}>
      <div className="sb-stack">
        <WestfieldMark width={170} />
        <code className="sb-tile__value">WestfieldMark</code>
      </div>
      <div className="sb-stack">
        <ChadstoneMark width={168} />
        <code className="sb-tile__value">ChadstoneMark</code>
      </div>
      <div className="sb-stack">
        <DragonPassMark width={156} />
        <code className="sb-tile__value">DragonPassMark</code>
      </div>
    </div>
  ),
};
