import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Opacity",
  parameters: {
    docs: {
      description: {
        component: `
The Lexus DS opacity tokens, \`--ld-s-opacity-*\`:

- \`--ld-s-opacity-disabled\` (0.5) — the standard dim for disabled controls.
- \`--ld-s-opacity-overlay\` (0.8) — heavy overlay / dialog scrim coverage.

These drive component-level tokens (e.g. \`--ld-c-form-disabled\` and
\`--ld-c-input-border-disabled\` both resolve to the disabled value).
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const mono = 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

const TOKENS = [
  { token: "--ld-s-opacity-disabled", v: "0.5", note: "Disabled controls" },
  { token: "--ld-s-opacity-overlay", v: "0.8", note: "Overlay / scrim" },
];

export const Tokens: Story = {
  name: "Opacity tokens",
  render: () => (
    <div className="sb-row" style={{ gap: 24 }}>
      {TOKENS.map((t) => (
        <div key={t.token} className="sb-stack" style={{ gap: 8, width: 200 }}>
          <div
            style={{
              position: "relative",
              height: 110,
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "1px solid var(--border-strong)",
              background:
                "repeating-conic-gradient(var(--surface-raised) 0% 25%, var(--surface) 0% 50%) 50% / 20px 20px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--accent)",
                opacity: `var(${t.token})`,
              }}
            />
          </div>
          <span style={{ fontSize: 13, color: "var(--fg)" }}>
            {t.note} · {t.v}
          </span>
          <code style={{ fontFamily: mono, fontSize: 11, color: "var(--fg-muted)" }}>
            {t.token}
          </code>
        </div>
      ))}
    </div>
  ),
};

export const DisabledInContext: Story = {
  name: "Disabled, in context",
  render: () => (
    <div className="sb-row" style={{ gap: 16 }}>
      <button
        type="button"
        style={{
          padding: "10px 20px",
          background: "var(--accent)",
          color: "var(--fg-on-accent)",
          border: "none",
          borderRadius: "var(--radius-sm)",
          fontSize: 13,
        }}
      >
        Enabled
      </button>
      <button
        type="button"
        disabled
        style={{
          padding: "10px 20px",
          background: "var(--accent)",
          color: "var(--fg-on-accent)",
          border: "none",
          borderRadius: "var(--radius-sm)",
          fontSize: 13,
          opacity: "var(--ld-s-opacity-disabled)",
          cursor: "not-allowed",
        }}
      >
        Disabled · opacity-disabled
      </button>
    </div>
  ),
};
