import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Flyout } from "../../components/Flyout";

const meta: Meta<typeof Flyout> = {
  title: "Patterns/Flyout",
  component: Flyout,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Right-anchored slide-out panel — the workhorse pattern for the entire
authenticated experience.

### What it handles

- Enter / exit animation (\`--ease-emphasized\` over \`--dur-3\`).
- Scrim with blur, click-to-close.
- Esc-to-close and body-scroll lock.
- Focus trap (Tab cycles inside; Shift+Tab too).
- Initial focus on the close button.
- Focus restore on close (returns focus to the launcher).
- Optional Go-back affordance.
- Standard header / body / footer layout.

### Props

- \`open\` — boolean, drives the animation.
- \`title\` — header text (uppercase tracked).
- \`heading\` — large in-body title.
- \`description\` — supporting copy.
- \`footer\` — sticky footer slot (typically a primary + ghost action pair).
- \`onClose\` / \`onBack\` — required close handler; optional back handler.

### Accessibility

- \`role="dialog"\` \`aria-modal="true"\`.
- \`aria-labelledby\` when \`heading\` is provided, falls back to \`aria-label\`
  with the title.
- Focus trap and restore are built in — no caller-side work needed.

### Specs

- Width: \`min(400px, 100vw)\`.
- Full \`100dvh\` height (no chrome on iOS).
- Shadow: \`var(--shadow-lg)\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flyout>;

function Demo({
  title,
  heading,
  description,
  withFooter = true,
}: {
  title: string;
  heading: string;
  description: string;
  withFooter?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="btn btn--primary"
        onClick={() => setOpen(true)}
      >
        Open flyout
      </button>
      <Flyout
        open={open}
        title={title}
        heading={heading}
        description={description}
        onClose={() => setOpen(false)}
        footer={
          withFooter ? (
            <div className="flyout__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setOpen(false)}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          ) : undefined
        }
      >
        <p style={{ margin: 0, color: "var(--fg-muted)" }}>
          Body content goes here. The flyout handles focus trap, scroll-lock,
          Esc-to-close and focus restore automatically.
        </p>
      </Flyout>
    </>
  );
}

export const Default: Story = {
  render: () => (
    <Demo
      title="Settings"
      heading="Preferences"
      description="Tailor how My Lexus looks and how we reach you."
    />
  ),
};

export const NoFooter: Story = {
  name: "Without footer",
  render: () => (
    <Demo
      title="Manuals & resources"
      heading="2024 NX 450h+ manuals"
      description="Operating guides, warranty and connected-services help."
      withFooter={false}
    />
  ),
};
