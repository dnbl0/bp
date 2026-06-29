import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Tracking",
  parameters: {
    docs: {
      description: {
        component: `
A small letter-spacing scale used wherever text is uppercased — eyebrows,
chips, button labels, micro-labels. Match the value to the size:

- 10–11px text → \`--ld-s-typography-label1-letter-spacing\` or stronger.
- 12px text → \`--ld-s-typography-label1-letter-spacing\` or \`--ld-s-typography-heading5-letter-spacing\`.
- 14px+ uppercase → \`--ld-s-typography-label2-letter-spacing\` or \`--ld-s-typography-heading6-letter-spacing\`.

Never tracked: editorial display headings (Cormorant). The serif handles its
own spacing.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const TRACK = [
  { token: "--ld-s-typography-heading6-letter-spacing", value: "0.4px" },
  { token: "--ld-s-typography-label2-letter-spacing", value: "1px" },
  { token: "--ld-s-typography-label1-letter-spacing", value: "1.4px" },
  { token: "--ld-s-typography-heading5-letter-spacing", value: "1.6px" },
  { token: "--ld-s-typography-label1-letter-spacing", value: "2px" },
  { token: "--ld-s-typography-label1-letter-spacing", value: "2.4px" },
];

export const Scale: Story = {
  name: "Scale",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 720 }}>
      {TRACK.map(({ token, value }) => (
        <div
          key={token}
          style={{
            display: "grid",
            gridTemplateColumns: "220px 60px 1fr",
            gap: 16,
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <code className="sb-tile__value">{token}</code>
          <span style={{ color: "var(--fg-muted)", fontSize: 12 }}>
            {value}
          </span>
          <span
            style={{
              fontSize: "var(--ld-s-typography-body2-font-size)",
              textTransform: "uppercase",
              color: "var(--fg-strong)",
              letterSpacing: `var(${token})`,
            }}
          >
            Encore Platinum
          </span>
        </div>
      ))}
    </div>
  ),
};
