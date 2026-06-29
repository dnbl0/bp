import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EditInterestsFlyout } from "../../flyout/EditInterestsFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Flyouts/Interests",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Multi-select chip picker for the member's interests — used to tailor offers
and experiences across My Lexus.

### Behaviour

- **Chips** — every tag from the master \`allInterests\` list renders as a
  toggleable chip. Selection seeds from the provider's saved \`interests\`.
- **Toggle** — tapping a chip adds or removes it from the local draft; the
  \`is-on\` class reflects the live selected state.
- **Stable ordering** — on save the selection is re-projected through the
  master list order via \`setInterests\`, so the saved set always displays
  in a consistent sequence regardless of click order.
- **Save / Cancel** — "Save interests" commits and closes; "Cancel"
  discards the draft and closes.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Chips use \`role="checkbox"\` with \`aria-checked\`, so the multi-select
  nature is announced and each chip is individually togglable from the
  keyboard.
- Save / Cancel actions sit in the persistent flyout footer.
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
    open("edit-interests", {});
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Interests flyout opens automatically — interact with it on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <EditInterestsFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
