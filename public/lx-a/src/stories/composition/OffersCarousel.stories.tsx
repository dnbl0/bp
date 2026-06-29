import type { Meta, StoryObj } from "@storybook/react";
import { OffersCarousel } from "../../components/OffersCarousel";

const meta: Meta<typeof OffersCarousel> = {
  title: "Composition/OffersCarousel",
  component: OffersCarousel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Responsive offers carousel. Renders 3 cards per page on desktop, 2 on
tablet, 1 on phones — page count and current page reflow when the
breakpoint changes.

### Interactions

- **Touch swipe** — drag the track during pan, snap on release (threshold:
  18% of viewport width or 80px, whichever is smaller).
- **Keyboard** — ← / → on the carousel container (when focused).
- **Pointer** — round prev/next buttons with disabled states at edges, plus
  page-position dots.

### Accessibility

- The carousel container is \`role="region"\` with
  \`aria-roledescription="carousel"\` and \`aria-label="Exclusive offers"\`.
- Non-active pages are \`aria-hidden\`.
- Slide track honours \`prefers-reduced-motion\` and drops the transition.

### Specs

- Viewport clips, track translates by 100% per page.
- Card grid: 3-column 16:10 \`.ocard\` tiles, gap \`--space-6\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OffersCarousel>;

export const Default: Story = {
  render: () => <OffersCarousel onExploreAll={() => {}} />,
};
