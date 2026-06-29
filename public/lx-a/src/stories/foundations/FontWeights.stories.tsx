import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Font weights",
  parameters: {
    docs: {
      description: {
        component: `
The Lexus Design System ships three weights, carried by each typography
style's \`*-font-weight\` token:

- **300 (book)** — \`--ld-s-typography-body1-font-weight\`; body copy and most
  Nobel display text.
- **400 (regular)** — \`--ld-s-typography-label2-font-weight\`; labels and
  slightly firmer headings.
- **700 (bold)** — \`--ld-s-typography-label1-font-weight\`; uppercase labels /
  emphasis.

These are the only weights in the system — all UI text routes through one of
these typography tokens.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const mono = 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

const WEIGHTS = [
  {
    token: "--ld-s-typography-body1-font-weight",
    n: 300,
    note: "Book — body & display",
  },
  {
    token: "--ld-s-typography-label2-font-weight",
    n: 400,
    note: "Regular — labels",
  },
  {
    token: "--ld-s-typography-label1-font-weight",
    n: 700,
    note: "Bold — emphasis",
  },
];

export const Weights: Story = {
  name: "DS weights",
  render: () => (
    <div className="sb-stack" style={{ gap: 24, maxWidth: 720 }}>
      {WEIGHTS.map((w) => (
        <div key={w.token} className="sb-stack" style={{ gap: 4 }}>
          <span
            style={{
              fontFamily: "var(--ld-s-typography-heading1-font-family)",
              fontWeight: `var(${w.token})` as React.CSSProperties["fontWeight"],
              fontSize: 30,
              color: "var(--fg-strong)",
            }}
          >
            Lexus Encore — {w.note}
          </span>
          <code style={{ fontFamily: mono, fontSize: 12, color: "var(--fg-muted)" }}>
            {w.token} · {w.n}
          </code>
        </div>
      ))}
    </div>
  ),
};
