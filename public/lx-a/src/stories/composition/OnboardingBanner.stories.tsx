import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingBanner } from "../../components/OnboardingBanner";
import { accounts } from "../../data/accounts";

const meta: Meta<typeof OnboardingBanner> = {
  title: "Composition/OnboardingBanner",
  component: OnboardingBanner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Anniversary / welcome moment surfaced once per identifier — anniversary year
or first-visit welcome. Tier-tinted (Platinum clay), dismissible, persists
the dismissal in localStorage.

### When it shows

- \`years >= 1\` → "N years with Encore" anniversary copy.
- \`years < 1\` → "Welcome to Encore" first-visit copy.

### Accessibility

- \`role="status"\` so SR users hear it on first render.
- Dismiss button has \`aria-label="Dismiss"\` and a focus ring on the icon.
- Animation honours \`prefers-reduced-motion\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingBanner>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 920 }}>
      <OnboardingBanner member={accounts.owner.member} />
    </div>
  ),
};
