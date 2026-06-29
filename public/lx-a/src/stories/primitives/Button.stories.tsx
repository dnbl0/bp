import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "../../components/icons";

const meta: Meta<HTMLButtonElement> = {
  title: "Primitives/Button",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The button system is class-based. Apply \`.btn\` plus a variant.

### Variants

- \`.btn--primary\` — the page's single most important action. Solid surface,
  inverted text. One per view.
- \`.btn--ghost\` — secondary action with an outline. Pair with primary.
- \`.btn--pill\` — rounded utility button, used in the top nav for Quick Book
  and the search hint.

### Sizing

Default height is 48px. Pill is 40px. \`.btn--primary\` accepts a \`disabled\`
attribute and grey-tones automatically.

### Accessibility

- Real \`<button type="button">\` elements; \`type="submit"\` only inside a
  \`<form>\`.
- Focus-visible ring is the accent outline + 2px offset, applied centrally
  in \`global.css\`.
- For icon-only buttons, always provide \`aria-label\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => (
    <button type="button" className="btn btn--primary">
      Book a service
    </button>
  ),
};

export const Ghost: Story = {
  render: () => (
    <button type="button" className="btn btn--ghost">
      Stay signed in
    </button>
  ),
};

export const Pill: Story = {
  render: () => (
    <button type="button" className="btn btn--pill">
      Quick Book
    </button>
  ),
};

export const PrimaryDisabled: Story = {
  name: "Primary — disabled",
  render: () => (
    <button type="button" className="btn btn--primary" disabled>
      Submit for verification
    </button>
  ),
};

export const WithTrailingIcon: Story = {
  name: "With trailing icon",
  render: () => (
    <button type="button" className="btn btn--primary">
      Smart book <ArrowRight width={16} height={16} />
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons compose with the icon set. Use the trailing icon for forward motion (continue, smart book, open) and remember the icon gap is already 10px.",
      },
    },
  },
};

export const Pair: Story = {
  name: "Primary + ghost pair",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 12,
        background: "var(--surface)",
        padding: 16,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)",
      }}
    >
      <button type="button" className="btn btn--primary">
        Confirm booking
      </button>
      <button type="button" className="btn btn--ghost">
        Cancel
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Standard footer pattern across every flyout: primary action on the left, ghost cancel on the right.",
      },
    },
  },
};

export const LinkArrow: Story = {
  name: "Link arrow",
  render: () => (
    <button type="button" className="link-arrow">
      All Encore benefits <ArrowRight width={16} height={16} />
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`.link-arrow` is the uppercase tracked link that pairs an arrow with a label. Used for section CTAs (All Encore benefits, View all). On hover the icon translates 4px to signal forward motion.",
      },
    },
  },
};
