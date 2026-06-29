import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ConciergeFlyout } from "../../flyout/ConciergeFlyout";
import { useFlyout } from "../../flyout/FlyoutProvider";

const meta: Meta = {
  title: "Concierge/Concierge flyout",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Real conversation surface — not a single-message form. Combines a header
card with live status, two channels (phone + callback), topic shortcuts, a
persistent message thread with auto-reply, and a composer with Enter-to-send.

### Behaviour

- **Live status** — green pip and "Available now" copy between 7am–10pm AET.
  Outside hours, switches to "Away until 7am" copy and a muted pip.
- **Channels** — \`tel:\` link for an immediate call; "Request a callback"
  expands an inline time-window picker.
- **Topics** — six chips pre-fill the composer with an example prompt and
  tag the message for routing.
- **Thread** — persisted in \`localStorage\`. Sending a message inserts your
  bubble, shows a 3-dot typing indicator, then a topic-aware concierge reply.
- **Keyboard** — Enter sends, Shift+Enter newlines.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Typing indicator has \`aria-label="Concierge is typing"\`.
- Bubble timestamps display absolute times so SR users hear the date.
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
    open("concierge");
  }, [open]);
  return (
    <p style={{ color: "var(--fg-muted)" }}>
      The Concierge flyout opens automatically — interact with it on the right.
    </p>
  );
}

export const Default: Story = {
  name: "Open by default",
  render: () => <Opener />,
};

export const StaticPreview: Story = {
  name: "Static preview",
  render: () => <ConciergeFlyout open />,
  parameters: {
    docs: {
      description: {
        story:
          "Static render that bypasses the open/close animation, useful for visual regression review.",
      },
    },
  },
};
