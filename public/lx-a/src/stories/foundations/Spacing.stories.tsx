import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Spacing",
  parameters: {
    docs: {
      description: {
        component: `
Spacing is the Lexus Design System dimension scale. Two families:

- \`--ld-s-dim-static-*\` — fixed steps (none, 4xs→5xl: 0, 4, 8, 12, 16, 24,
  32, 40, 48, 64, 80, 96, 120px). The everyday gap/padding scale.
- \`--ld-s-dim-scaled-*\` — the responsive set (least→most + beyond-most) the
  DS uses for fluid layout.

The prototype's \`--space-1\`…\`--space-11\` aliases map onto the static scale
(plus \`--space-5\` → \`scaled-less\` for 20px), so every existing gap, padding
and margin already resolves to a DS primitive — no visual change. Prefer the
\`--ld-s-dim-*\` tokens directly in new work.

### How to choose

- 4–8 px (\`4xs/3xs\`) — inline gaps inside a single control.
- 12–16 px (\`2xs/xs\`) — gaps between sibling text + adjacent elements.
- 20–24 px (\`scaled-less\`/\`s\`) — internal card padding.
- 32–40 px (\`m/l\`) — section padding.
- 48–120 px (\`xl\`→\`5xl\`) — page-level rhythm.

### Anti-pattern

Hard-coded paddings like \`padding: 18px;\`. If a value doesn't fit, prefer the
nearest token; only propose a new one if the new value comes up in three+
places.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const STATIC = [
  { token: "--ld-s-dim-static-none", px: "0" },
  { token: "--ld-s-dim-static-4xs", px: "4px" },
  { token: "--ld-s-dim-static-3xs", px: "8px" },
  { token: "--ld-s-dim-static-2xs", px: "12px" },
  { token: "--ld-s-dim-static-xs", px: "16px" },
  { token: "--ld-s-dim-static-s", px: "24px" },
  { token: "--ld-s-dim-static-m", px: "32px" },
  { token: "--ld-s-dim-static-l", px: "40px" },
  { token: "--ld-s-dim-static-xl", px: "48px" },
  { token: "--ld-s-dim-static-2xl", px: "64px" },
  { token: "--ld-s-dim-static-3xl", px: "80px" },
  { token: "--ld-s-dim-static-4xl", px: "96px" },
  { token: "--ld-s-dim-static-5xl", px: "120px" },
];

const SCALED = [
  { token: "--ld-s-dim-scaled-none", px: "0" },
  { token: "--ld-s-dim-scaled-least", px: "8px" },
  { token: "--ld-s-dim-scaled-even-less", px: "16px" },
  { token: "--ld-s-dim-scaled-less", px: "20px" },
  { token: "--ld-s-dim-scaled-default", px: "24px" },
  { token: "--ld-s-dim-scaled-more", px: "32px" },
  { token: "--ld-s-dim-scaled-even-more", px: "40px" },
  { token: "--ld-s-dim-scaled-most", px: "48px" },
  { token: "--ld-s-dim-scaled-beyond-most", px: "64px" },
];

const SPACES = [
  { token: "--space-1", px: "4px" },
  { token: "--space-2", px: "8px" },
  { token: "--space-3", px: "12px" },
  { token: "--space-4", px: "16px" },
  { token: "--space-5", px: "20px" },
  { token: "--space-6", px: "24px" },
  { token: "--space-7", px: "32px" },
  { token: "--space-8", px: "40px" },
  { token: "--space-9", px: "48px" },
  { token: "--space-10", px: "64px" },
  { token: "--space-11", px: "80px" },
];

function Ruler({ rows }: { rows: { token: string; px: string }[] }) {
  return (
    <div className="sb-stack" style={{ maxWidth: 760 }}>
      {rows.map(({ token, px }) => (
        <div
          key={token}
          style={{
            display: "grid",
            gridTemplateColumns: "230px 50px 1fr",
            alignItems: "center",
            gap: 16,
          }}
        >
          <code
            style={{
              fontFamily:
                'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
              fontSize: 12,
              color: "var(--fg-muted)",
            }}
          >
            {token}
          </code>
          <span style={{ color: "var(--fg-muted)", fontSize: 12 }}>{px}</span>
          <span
            style={{
              display: "block",
              height: 18,
              width: `var(${token})`,
              background: "var(--accent)",
              borderRadius: 2,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export const StaticScale: Story = {
  name: "Static dimension scale",
  render: () => <Ruler rows={STATIC} />,
  parameters: {
    docs: {
      description: {
        story:
          "`--ld-s-dim-static-*` — the fixed-step DS scale. The default choice for gaps, padding and margins.",
      },
    },
  },
};

export const ScaledScale: Story = {
  name: "Scaled dimension scale",
  render: () => <Ruler rows={SCALED} />,
  parameters: {
    docs: {
      description: {
        story:
          "`--ld-s-dim-scaled-*` — the responsive set the DS reserves for fluid layout.",
      },
    },
  },
};

export const Scale: Story = {
  name: "Legacy --space aliases",
  parameters: {
    docs: {
      description: {
        story:
          "The prototype's `--space-*` aliases, each resolving to a DS dimension primitive (identical values — no visual change).",
      },
    },
  },
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 720 }}>
      {SPACES.map(({ token, px }) => (
        <div
          key={token}
          style={{
            display: "grid",
            gridTemplateColumns: "160px 60px 1fr",
            alignItems: "center",
            gap: 16,
          }}
        >
          <code
            style={{
              fontFamily:
                'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
              fontSize: 12,
              color: "var(--fg-muted)",
            }}
          >
            {token}
          </code>
          <span style={{ color: "var(--fg-muted)", fontSize: 12 }}>{px}</span>
          <span
            style={{
              display: "block",
              height: 18,
              width: `var(${token})`,
              background: "var(--accent)",
              borderRadius: 2,
            }}
          />
        </div>
      ))}
    </div>
  ),
};

export const UsageExamples: Story = {
  name: "Usage in practice",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 520 }}>
      <article
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
        }}
      >
        <span
          style={{
            fontSize: "var(--ld-s-typography-label1-font-size)",
            letterSpacing: "var(--ld-s-typography-label1-letter-spacing)",
            textTransform: "uppercase",
            color: "var(--fg-muted)",
          }}
        >
          Card · padding space-6 · gap space-3
        </span>
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--ld-s-typography-heading1-font-family)",
            fontWeight: "var(--ld-s-typography-label2-font-weight)",
            fontSize: "var(--ld-s-typography-heading6-font-size)",
            color: "var(--fg-strong)",
          }}
        >
          Spacing in context
        </h3>
        <p style={{ margin: 0, fontSize: "var(--ld-s-typography-body2-font-size)", color: "var(--fg-muted)" }}>
          Internal card padding sits at <code>--space-6</code>. Stacked siblings
          inside use <code>--space-3</code> for breathing room without becoming
          loose.
        </p>
      </article>
    </div>
  ),
};
