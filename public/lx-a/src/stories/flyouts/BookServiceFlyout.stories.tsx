import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BookServiceFlyout } from "../../flyout/BookServiceFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Book a service",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Multi-step booking wizard that walks a customer from service type through to a
confirmed dealer request. A \`<StepIndicator>\` tracks progress across the six
ordered steps: **Type → Dealer → Date → Time → Transport → Confirm**.

### Behaviour

- **Smart pre-fill** — when opened with \`{ smart: true }\`, the flyout jumps
  straight to **Confirm** with a sensible weekday date ~6 weeks out, an 8:30am
  drop-off and the preferred dealer already chosen. A "we pre-filled this"
  note invites the customer to step back and adjust.
- **Type** — radio list of service types with duration and "from" pricing.
- **Dealer** — shows the preferred dealer as a card; "Select a different
  dealership" reveals a postcode/suburb search with "Use current location",
  proximity-sorted results tagged *Preferred* / *Nearest*, and a *Show more*
  expander.
- **Date** — a \`<DatePicker>\` constrained to today onward.
- **Time** — a grid of available drop-off slots.
- **Transport** — radio list (loan car, drop-off, wait, etc.).
- **Confirm** — a \`<DataTable>\` summary plus an optional notes textarea.
  *Confirm booking* records the booking via \`addBooking\` and shows a success
  \`<Confirmation>\` with the booked details.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The back affordance appears contextually and also unwinds the inline dealer
  search before stepping back.
- The *Continue* / *Confirm booking* action is disabled until the current
  step is satisfied.
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
    open("book-service", { vehicleName: "NX 450h+ F Sport", smart: true });
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Book a service flyout opens automatically — step through it on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <BookServiceFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
