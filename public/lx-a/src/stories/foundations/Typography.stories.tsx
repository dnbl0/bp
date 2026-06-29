import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: {
    docs: {
      description: {
        component: `
Two faces. **Cormorant Garamond** (\`--ld-s-typography-heading1-font-family\`) handles editorial
headings — hero titles, page titles, vehicle hero. **Nobel** (\`--ld-s-typography-body1-font-family\`,
with Futura PT fallbacks) handles everything else. A constrained type ramp
keeps the product coherent.

### Pairing rules

- Editorial headings (\`hero__title\`, \`page-title\`, \`vhero__title\`,
  \`onboard__title\`, \`today__title\`) — Cormorant, **mixed case**, zero
  tracking, weight 300–400.
- Eyebrows, chips, button labels — Nobel, **uppercase**, with a value from the
  tracking scale (1.0px → 2.4px).
- Body copy — Nobel, sentence case, line-height 1.5–1.7.

### Tokens

- **Text scale:** \`--ld-s-typography-label2-font-size\` (10) → \`--ld-s-typography-heading1-font-size\` (52).
- **Tracking scale:** \`--ld-s-typography-heading6-letter-spacing\` → \`--ld-s-typography-label1-letter-spacing\`.

Avoid one-off literals; if you need an in-between size, propose it in the
token file.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const RAMP: { token: string; px: string; label: string }[] = [
  { token: "--ld-s-typography-heading1-font-size", px: "52px", label: "Hero" },
  { token: "--ld-s-typography-heading1-font-size", px: "46px", label: "Page title" },
  { token: "--ld-s-typography-heading2-font-size", px: "40px", label: "Vehicle hero" },
  { token: "--ld-s-typography-heading3-font-size", px: "30px", label: "Display M" },
  { token: "--ld-s-typography-heading4-font-size", px: "26px", label: "Display S" },
  { token: "--ld-s-typography-heading5-font-size", px: "22px", label: "Display XS" },
  { token: "--ld-s-typography-heading6-font-size", px: "20px", label: "Display 2XS" },
  { token: "--ld-s-typography-body1-font-size", px: "18px", label: "Lede / module head" },
  { token: "--ld-s-typography-body2-font-size", px: "15px", label: "Card head" },
  { token: "--ld-s-typography-caption1-font-size", px: "14px", label: "Body" },
  { token: "--ld-s-typography-banner-font-size", px: "13px", label: "Secondary body" },
  { token: "--ld-s-typography-price1-font-size", px: "12px", label: "Caption / chip" },
  { token: "--ld-s-typography-label1-font-size", px: "11px", label: "Eyebrow" },
  { token: "--ld-s-typography-label2-font-size", px: "10px", label: "Micro label" },
];

export const TypeRamp: Story = {
  name: "Type ramp",
  render: () => (
    <div className="sb-stack">
      {RAMP.map(({ token, px, label }) => (
        <div
          key={token}
          style={{
            display: "grid",
            gridTemplateColumns: "180px 80px 1fr",
            gap: 16,
            alignItems: "baseline",
            paddingBottom: 12,
            borderBottom: "1px solid var(--border)",
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
              fontFamily: "var(--ld-s-typography-body1-font-family)",
              fontSize: `var(${token})`,
              color: "var(--fg-strong)",
            }}
          >
            {label} — the Lexus moves you forward
          </span>
        </div>
      ))}
    </div>
  ),
};

export const DisplayFace: Story = {
  name: "Display face",
  render: () => (
    <div className="sb-stack">
      <p
        style={{
          fontFamily: "var(--ld-s-typography-heading1-font-family)",
          fontWeight: "var(--ld-s-typography-body1-font-weight)",
          fontSize: "var(--ld-s-typography-heading1-font-size)",
          letterSpacing: 0,
          lineHeight: 1.05,
          margin: 0,
          color: "var(--fg-strong)",
        }}
      >
        Good morning,{" "}
        <span style={{ fontStyle: "italic" }}>Susan</span>
      </p>
      <p
        style={{
          fontFamily: "var(--ld-s-typography-heading1-font-family)",
          fontWeight: "var(--ld-s-typography-label2-font-weight)",
          fontSize: "var(--ld-s-typography-heading1-font-size)",
          letterSpacing: 0,
          margin: 0,
          color: "var(--fg-strong)",
        }}
      >
        Encore Benefits
      </p>
      <p
        style={{
          fontFamily: "var(--ld-s-typography-heading1-font-family)",
          fontWeight: "var(--ld-s-typography-body1-font-weight)",
          fontSize: "var(--ld-s-typography-heading2-font-size)",
          letterSpacing: 0,
          margin: 0,
          color: "var(--fg-strong)",
        }}
      >
        2024 NX 450h+ F Sport
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cormorant Garamond reads best in **mixed case** at large sizes. Don't apply `text-transform: uppercase` to display headings.",
      },
    },
  },
};

export const BodyFace: Story = {
  name: "Body face",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 640 }}>
      <p style={{ margin: 0, fontSize: "var(--ld-s-typography-caption1-font-size)" }}>
        Body copy uses Nobel (with Futura PT, Avenir Next and Helvetica
        fallbacks). Line-height sits at 1.5–1.7 for paragraph content,
        tightening to 1.3 for compact UI text.
      </p>
      <p style={{ margin: 0, fontSize: "var(--ld-s-typography-body2-font-size)", color: "var(--fg-muted)" }}>
        Secondary body — captions, helper text, table values. One step down
        from the base size, with the same line-height.
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "var(--ld-s-typography-label1-font-size)",
          letterSpacing: "var(--ld-s-typography-label1-letter-spacing)",
          textTransform: "uppercase",
          color: "var(--fg-muted)",
        }}
      >
        Eyebrow — pairs with display headings to label a section
      </p>
    </div>
  ),
};

export const Accessibility: Story = {
  name: "Accessibility",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 720 }}>
      <p style={{ margin: 0, fontSize: "var(--ld-s-typography-caption1-font-size)" }}>
        <strong>Line length:</strong> body paragraphs cap at ~640px (~75ch) to
        keep lines comfortably scannable.
      </p>
      <p style={{ margin: 0, fontSize: "var(--ld-s-typography-caption1-font-size)" }}>
        <strong>Minimum sizes:</strong> 10px (\`--ld-s-typography-label2-font-size\`) is reserved for
        uppercase, tracked micro-labels with high contrast against surface.
        Don't use it for sentence case copy.
      </p>
      <p style={{ margin: 0, fontSize: "var(--ld-s-typography-caption1-font-size)" }}>
        <strong>Text-size preference:</strong> users can scale all text via
        Settings → Text size. The root font-size grows 12.5% or 25% and every
        token-driven size inherits.
      </p>
      <p style={{ margin: 0, fontSize: "var(--ld-s-typography-caption1-font-size)" }}>
        <strong>Display face & screen readers:</strong> Cormorant Garamond is
        used purely visually. Headings remain real \`h1\`/\`h2\` elements.
      </p>
    </div>
  ),
};
