import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoanCarFlyout } from "../../flyout/LoanCarFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Service loan car",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A "Learn more" content flyout for the **service loan car** programme — a
complimentary Lexus to keep members moving while their vehicle is in for
service. Built on the reusable \`<InfoFlyout>\` shell.

### Behaviour

- **Programme summary** — a \`<DataTable>\` covers the loan vehicle (a
  late-model Lexus from the loan fleet), duration (same day for minor /
  overnight for major service), delivery (within 25 km of the preferred
  dealer), and eligibility (Encore Platinum members, by request).
- **Primary action** — *Book a service* closes this flyout and immediately
  opens the \`"book-service"\` flyout via \`useFlyout\`, so the member can
  choose their transport option in the booking flow.
- **Availability note** — a closing note flags that the loan car is subject to
  availability.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The ghost *Close* action is provided automatically by \`<InfoFlyout>\`
  alongside the primary booking action.
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
    open("loan-car");
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Service loan car flyout opens automatically — view it on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <LoanCarFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
