import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Colour",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The Lexus palette is dark-first. The dark theme uses Lexus deepblue surfaces
with smoke text and an ochre accent; the light theme inverts to warm smoke
surfaces with deepblue text. Semantic tokens (\`--surface\`, \`--fg\`,
\`--border\`) are the right level to consume from in components — they
re-point in light theme automatically.

Under the semantic layer sits the **Lexus DS colour system**
(\`--ld-s-color-*\` — accent, canvas, elevation, foreground, utility), itself
anchored to the raw brand scales. So the chain is **brand scale →
\`--ld-s-color-*\` → app semantic**, one source of truth. See the "DS colour
system" story for that middle layer.

Use the **Theme** toolbar switch to flip palettes and verify in both.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function Swatch({
  name,
  token,
  hex,
}: {
  name: string;
  token: string;
  hex?: string;
}) {
  return (
    <div className="sb-swatch">
      <div
        className="sb-swatch__chip"
        style={{ background: `var(${token})` }}
      />
      <div>
        <div className="sb-swatch__name">{name}</div>
        <div className="sb-swatch__value">{token}</div>
        {hex && <div className="sb-swatch__value">{hex}</div>}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 32 }}>
      <header className="sb-section-head">
        <h3>{title}</h3>
      </header>
      <div className="sb-grid">{children}</div>
    </section>
  );
}

export const SemanticTokens: Story = {
  name: "Semantic tokens",
  render: () => (
    <div>
      <Section title="Surfaces">
        <Swatch name="canvas" token="--canvas" />
        <Swatch name="canvas-raised" token="--canvas-raised" />
        <Swatch name="surface" token="--surface" />
        <Swatch name="surface-raised" token="--surface-raised" />
        <Swatch name="surface-hover" token="--surface-hover" />
        <Swatch name="elevation-inset" token="--elevation-inset" />
      </Section>
      <Section title="Text">
        <Swatch name="fg" token="--fg" />
        <Swatch name="fg-strong" token="--fg-strong" />
        <Swatch name="fg-muted" token="--fg-muted" />
        <Swatch name="fg-dim" token="--fg-dim" />
        <Swatch name="fg-on-accent" token="--fg-on-accent" />
      </Section>
      <Section title="Accent & state">
        <Swatch name="accent" token="--accent" />
        <Swatch name="accent-bright" token="--accent-bright" />
        <Swatch name="accent-electrified" token="--accent-electrified" />
        <Swatch name="accent-warm" token="--accent-warm" />
        <Swatch name="success" token="--success" />
        <Swatch name="warning" token="--warning" />
        <Swatch name="error" token="--error" />
        <Swatch name="error-border" token="--error-border" />
      </Section>
      <Section title="Borders & overlays">
        <Swatch name="border" token="--border" />
        <Swatch name="border-strong" token="--border-strong" />
        <Swatch name="border-tier" token="--border-tier" />
        <Swatch name="overlay-hover" token="--overlay-hover" />
      </Section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Semantic tokens — the right level to consume from product code. Theme-aware.",
      },
    },
  },
};

export const DSColourSystem: Story = {
  name: "DS colour system",
  render: () => (
    <div>
      <Section title="Accent — primary">
        {["darker", "default", "lighter", "disabled"].map((s) => (
          <Swatch
            key={s}
            name={`accent-primary-${s}`}
            token={`--ld-s-color-accent-primary-${s}`}
          />
        ))}
      </Section>
      <Section title="Accent — secondary">
        {["darker", "default", "lighter"].map((s) => (
          <Swatch
            key={s}
            name={`accent-secondary-${s}`}
            token={`--ld-s-color-accent-secondary-${s}`}
          />
        ))}
      </Section>
      <Section title="Canvas">
        {["darker", "default", "lighter"].map((s) => (
          <Swatch key={s} name={`canvas-${s}`} token={`--ld-s-color-canvas-${s}`} />
        ))}
      </Section>
      <Section title="Elevation — inset">
        {["darker", "default", "lighter"].map((s) => (
          <Swatch
            key={s}
            name={`elevation-inset-${s}`}
            token={`--ld-s-color-elevation-inset-${s}`}
          />
        ))}
      </Section>
      <Section title="Elevation — raised">
        {["darker", "default", "lighter"].map((s) => (
          <Swatch
            key={s}
            name={`elevation-raised-${s}`}
            token={`--ld-s-color-elevation-raised-${s}`}
          />
        ))}
      </Section>
      <Section title="Foreground">
        <Swatch name="foreground-default" token="--ld-s-color-foreground-default" />
        <Swatch name="foreground-on-accent" token="--ld-s-color-foreground-on-accent" />
      </Section>
      <Section title="Utility">
        <Swatch name="utility-success-default" token="--ld-s-color-utility-success-default" />
        <Swatch name="utility-success-darker" token="--ld-s-color-utility-success-darker" />
        <Swatch name="utility-error-default" token="--ld-s-color-utility-error-default" />
        <Swatch name="utility-error-lighter" token="--ld-s-color-utility-error-lighter" />
        <Swatch name="utility-modifiers-midlight" token="--ld-s-color-utility-modifiers-midlight" />
      </Section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The Lexus DS colour system (`--ld-s-color-*`). The app's semantic tokens resolve onto these; these in turn resolve onto the raw brand scales. Note: the DS export ships dark-theme values, so these don't flip with the theme switch — consume the app semantic tokens for theme-aware colour.",
      },
    },
  },
};

export const TierIdentity: Story = {
  name: "Tier identity (Platinum)",
  render: () => (
    <div className="sb-row">
      <div
        className="sb-swatch"
        style={{
          background: "var(--tier-gradient)",
          color: "var(--ld-color-lexus-deepblue-900)",
          boxShadow: "var(--tier-glow)",
        }}
      >
        <div className="sb-swatch__name">tier-gradient</div>
        <div className="sb-swatch__value">--tier-gradient</div>
      </div>
      <div className="sb-swatch">
        <div
          className="sb-swatch__chip"
          style={{ background: "var(--tier-clay)" }}
        />
        <div className="sb-swatch__name">tier-clay</div>
        <div className="sb-swatch__value">--tier-clay</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Reserved for Encore Platinum surfaces — tier chip, hero tier-mark, anniversary banner, concierge avatar.",
      },
    },
  },
};

export const BrandScales: Story = {
  name: "Brand scales (raw)",
  render: () => (
    <div>
      <Section title="Smoke">
        {["100", "300", "500", "700"].map((s) => (
          <Swatch
            key={s}
            name={`smoke-${s}`}
            token={`--ld-color-lexus-smoke-${s}`}
          />
        ))}
      </Section>
      <Section title="Deepblue">
        {[
          "50", "100", "300", "400", "500", "600", "700", "800", "900",
        ].map((s) => (
          <Swatch
            key={s}
            name={`deepblue-${s}`}
            token={`--ld-color-lexus-deepblue-${s}`}
          />
        ))}
      </Section>
      <Section title="Accent">
        <Swatch name="ochre-400" token="--ld-color-lexus-ochre-400" />
        <Swatch name="ochre-500" token="--ld-color-lexus-ochre-500" />
        <Swatch name="inari-500" token="--ld-color-lexus-inari-500" />
        <Swatch name="clay-400" token="--ld-color-lexus-clay-400" />
      </Section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Raw brand-scale tokens. **Don't** consume these directly — they don't flip in light theme. Use the semantic tokens instead.",
      },
    },
  },
};

export const Scrims: Story = {
  name: "Canvas scrims",
  render: () => (
    <div className="sb-row" style={{ gap: 12 }}>
      {[
        ["--canvas-scrim-strong", "0.85"],
        ["--canvas-scrim", "0.7"],
        ["--canvas-scrim-soft", "0.45"],
      ].map(([token, alpha]) => (
        <div
          key={token}
          style={{
            width: 220,
            height: 140,
            position: "relative",
            backgroundImage: 'url("/assets/hero.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid var(--border-strong)",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              background: `var(${token})`,
            }}
          />
          <span
            style={{
              position: "relative",
              padding: 12,
              display: "block",
              color: "var(--fg-strong)",
              fontFamily: "var(--ld-s-typography-body1-font-family)",
              fontSize: 12,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
            }}
          >
            {token}
            <br />α {alpha}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Scrims sit over hero imagery and the canvas. The three-step set keeps depth consistent — strong for hero overlap, base for full-cover, soft for shallow gradients.",
      },
    },
  },
};
