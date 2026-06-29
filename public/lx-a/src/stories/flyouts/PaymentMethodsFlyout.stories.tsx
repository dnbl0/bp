import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PaymentMethodsFlyout } from "../../flyout/PaymentMethodsFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Payment methods",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Card wallet for the member — list, manage and add the cards used for Encore
experiences, valet and service payments.

### Behaviour

- **Card list** — each saved card shows its detected brand, masked
  \`•••• last4\` and expiry. Cards seed from the provider's \`payments\` into
  local draft state; an empty wallet shows a friendly placeholder.
- **Primary card** — exactly one card is primary. "Make primary" promotes a
  card; removing the primary auto-promotes the next remaining card so one
  always stays primary.
- **Add a card** — "+ Add a card" reveals an inline form. The card number is
  grouped live (4-4-4-4, or Amex 4-6-5), the brand is detected from the first
  digits, and expiry is masked to \`MM/YY\`. "Add card" enables only once the
  number length and expiry validate.
- **Save / Cancel** — "Save changes" commits the wallet via \`setPayments\`
  and closes; "Cancel" discards edits.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Remove buttons carry an \`aria-label\` naming the card ("Remove card
  ending 1234").
- The add-card inputs set \`inputMode="numeric"\` and \`autoComplete\`
  (\`cc-number\`, \`cc-exp\`) for correct keyboards and autofill.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function Opener() {
  const { open } = useFlyout();
  useEffect(() => {
    open("payment-methods", {});
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Payment methods flyout opens automatically — interact with it on the
      right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <PaymentMethodsFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
