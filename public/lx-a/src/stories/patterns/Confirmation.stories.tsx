import type { Meta, StoryObj } from "@storybook/react";
import { Confirmation } from "../../flyout/Confirmation";

const meta: Meta<typeof Confirmation> = {
  title: "Patterns/Confirmation",
  component: Confirmation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Shared success panel used at the end of every flyout flow — booking,
valet, lounge redemption, add-vehicle, refer-a-friend, concierge message.

### Anatomy

- Centred green tick (60px pill, success-tinted background).
- Title — what just happened.
- Description — what the user should expect next.
- Optional meta — small chip-like line ("2 redemptions remaining").
- Single ghost "Done" CTA that calls \`onDone\`.

### When to use

Use this at the end of any positive flow. It keeps the celebration moment
consistent and saves designers from re-inventing a success screen each
time.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Confirmation>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 380, padding: 24 }}>
      <Confirmation
        title="Booking confirmed"
        description={
          <>
            Valet parking confirmed at <strong>Westfield Bondi Junction</strong>.
            Just arrive and the friendly staff will park your Lexus.
          </>
        }
        meta="2 redemptions remaining"
        onDone={() => {}}
      />
    </div>
  ),
};

export const WithoutMeta: Story = {
  name: "Without meta",
  render: () => (
    <div style={{ maxWidth: 380, padding: 24 }}>
      <Confirmation
        title="Invitation sent"
        description={
          <>
            We've emailed <strong>Alex</strong> a personal Encore test-drive
            invitation.
          </>
        }
        onDone={() => {}}
      />
    </div>
  ),
};
