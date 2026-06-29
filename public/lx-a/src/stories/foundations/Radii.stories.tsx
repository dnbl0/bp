import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Radii",
  parameters: {
    docs: {
      description: {
        component: `
Border radius is the Lexus Design System scale, exposed as
\`--ld-s-border-radius-*\` (none · small · medium · extra-medium · large ·
extra-large · rounded). It runs tight — 3px to 8px — plus a \`rounded\` pill.

The prototype's legacy aliases map onto it, so existing code keeps working:

- \`--radius-sm\` → \`--ld-s-border-radius-small\` (3px) — inputs, kbd, tight frames.
- \`--radius-md\` → \`--ld-s-border-radius-medium\` (5px) — cards, popovers, the dominant container shape.
- \`--radius-lg\` → \`--ld-s-border-radius-extra-large\` (8px) — modals, command palette.
- \`--radius-pill\` → \`--ld-s-border-radius-rounded\` (999px) — chips, avatars, round buttons, segmented tabs.

Prefer the \`--ld-s-border-radius-*\` tokens directly in new work. If a corner
radius doesn't land on the scale, the component shape probably needs a rethink
(the one sanctioned exception is the chat bubble's bespoke 14px).
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const SCALE = [
  { token: "--ld-s-border-radius-none", label: "none · 0" },
  { token: "--ld-s-border-radius-small", label: "small · 3px", alias: "--radius-sm" },
  { token: "--ld-s-border-radius-medium", label: "medium · 5px", alias: "--radius-md" },
  { token: "--ld-s-border-radius-extra-medium", label: "extra-medium · 6px" },
  { token: "--ld-s-border-radius-large", label: "large · 7px" },
  { token: "--ld-s-border-radius-extra-large", label: "extra-large · 8px", alias: "--radius-lg" },
  { token: "--ld-s-border-radius-rounded", label: "rounded · 999px", alias: "--radius-pill" },
];

const mono = 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

export const Scale: Story = {
  name: "The scale",
  render: () => (
    <div className="sb-row" style={{ flexWrap: "wrap", gap: 24 }}>
      {SCALE.map((s) => (
        <div key={s.token} className="sb-stack" style={{ gap: 8, width: 150 }}>
          <div
            style={{
              width: 150,
              height: 90,
              background: "var(--surface-raised)",
              border: "1px solid var(--border-strong)",
              borderRadius: `var(${s.token})`,
            }}
          />
          <span style={{ fontSize: 12, color: "var(--fg)" }}>{s.label}</span>
          <code style={{ fontFamily: mono, fontSize: 11, color: "var(--fg-muted)" }}>
            {s.token}
          </code>
          {s.alias && (
            <code style={{ fontFamily: mono, fontSize: 11, color: "var(--fg-dim)" }}>
              alias {s.alias}
            </code>
          )}
        </div>
      ))}
    </div>
  ),
};

export const InContext: Story = {
  name: "On real shapes",
  render: () => (
    <div className="sb-row" style={{ gap: 16, alignItems: "flex-start" }}>
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
        Button · small
      </button>
      <div
        style={{
          padding: "var(--space-5)",
          width: 200,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          color: "var(--fg-muted)",
          fontSize: 13,
        }}
      >
        Card surface · medium
      </div>
      <span
        style={{
          padding: "6px 14px",
          background: "var(--surface-raised)",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-pill)",
          color: "var(--fg)",
          fontSize: 12,
        }}
      >
        Chip · rounded
      </span>
    </div>
  ),
};
