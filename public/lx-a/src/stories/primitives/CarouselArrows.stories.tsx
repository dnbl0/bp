import type { Meta, StoryObj } from "@storybook/react";
import { CarouselArrows } from "../../components/CarouselArrows";

const meta: Meta<typeof CarouselArrows> = {
  title: "Primitives/Carousel arrows",
  component: CarouselArrows,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The shared prev/next control used by every carousel in the app (offers, the
vehicle panel, …). Two round \`.roundbtn--sm\` buttons sit next to each other,
right-aligned within their container.

### Props

- \`canPrev\` / \`canNext\` — booleans that enable each direction. When false,
  the matching button is \`disabled\` so you can't page past the ends.
- \`onPrev\` / \`onNext\` — click handlers for each direction.
- \`prevLabel\` / \`nextLabel\` — \`aria-label\`s for the buttons. Default to
  *Previous* / *Next*.
- \`className\` — appended to the \`.carousel-nav\` wrapper for layout overrides.

### Accessibility

- Real \`<button type="button">\` elements carrying an \`aria-label\` (the
  ChevronLeft / ChevronRight icons are presentational).
- The \`disabled\` attribute is driven by \`canPrev\` / \`canNext\`, so screen
  readers and keyboard users get the same end-of-range feedback as the visual
  greying.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CarouselArrows>;

const noop = () => {};

export const Default: Story = {
  name: "Both enabled",
  render: () => (
    <CarouselArrows canPrev canNext onPrev={noop} onNext={noop} />
  ),
};

export const AtStart: Story = {
  name: "At start — previous disabled",
  render: () => (
    <CarouselArrows canPrev={false} canNext onPrev={noop} onNext={noop} />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "On the first item `canPrev` is false, disabling the previous arrow.",
      },
    },
  },
};

export const AtEnd: Story = {
  name: "At end — next disabled",
  render: () => (
    <CarouselArrows canPrev canNext={false} onPrev={noop} onNext={noop} />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "On the last item `canNext` is false, disabling the next arrow.",
      },
    },
  },
};
