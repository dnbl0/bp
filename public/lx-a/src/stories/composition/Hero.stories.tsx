import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "../../components/Hero";
import { accounts } from "../../data/accounts";

const meta: Meta<typeof Hero> = {
  title: "Composition/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
The dashboard hero — full-bleed image, time-of-day greeting and Encore tier
eyebrow. Sits at the very top of the authenticated dashboard.

### Time-of-day variants

The hero applies a \`hero--{band}\` class based on the user's local time:
\`morning\`, \`afternoon\`, \`evening\`, \`night\`. Each band tints a
\`mix-blend-mode: soft-light\` overlay above the scrim — warm amber morning,
cool blue afternoon, sunset peach evening, deep blue night.

### Parallax

The background image translates by \`scrollY * 0.2\` via \`requestAnimationFrame\`
when the user scrolls. Honours \`prefers-reduced-motion\`.

### Accessibility

- The background \`<img>\` carries empty \`alt\` (decorative).
- Greeting is real \`<h1>\` so SR users land on a proper page title.
- Tier-mark is wrapped in a span so the gradient text-clipping doesn't
  break SR announcement.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  render: () => <Hero member={accounts.owner.member} />,
};
