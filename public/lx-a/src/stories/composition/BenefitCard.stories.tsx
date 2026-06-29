import type { Meta, StoryObj } from "@storybook/react";
import { BenefitCard } from "../../components/BenefitCard";
import { benefits } from "../../data/dashboard";

const meta: Meta<typeof BenefitCard> = {
  title: "Composition/BenefitCard",
  component: BenefitCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Encore benefit tile shown in the dashboard grid and the BenefitsPage.

### Two modes

- **Interactive** — pass \`onClick\` and the card becomes a tab-stop \`role="button"\`,
  shows a chevron CTA, and lifts on hover.
- **Static** — omit \`onClick\` and the card is non-interactive, surfacing a
  muted "Learn more" label (no anchor).

### Accessibility

- Interactive cards announce as buttons. Keyboard activation via Enter / Space.
- Focus ring uses the accent outline at \`outline-offset: 2px\`.
- The image carries the benefit title as alt text.

### Specs

- Aspect ratio 16:10 media, \`--radius-md\` corners.
- Body padding: \`--space-6\` (22px historically).
- Hover lifts the card 4px and scales media 1.05× over 600ms.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BenefitCard>;

const valet = benefits.find((b) => b.id === "valet")!;
const onDemand = benefits.find((b) => b.id === "on-demand")!;

export const Interactive: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <BenefitCard benefit={valet} ctaLabel="Book now" onClick={() => {}} />
    </div>
  ),
};

export const Static: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <BenefitCard benefit={onDemand} />
    </div>
  ),
};

export const ThreeUp: Story = {
  name: "Three-up grid",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
        maxWidth: 1080,
      }}
    >
      {benefits.map((b) => (
        <BenefitCard
          key={b.id}
          benefit={b}
          ctaLabel={b.id === "valet" ? "Book now" : "Redeem"}
          onClick={b.id !== "on-demand" ? () => {} : undefined}
        />
      ))}
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
