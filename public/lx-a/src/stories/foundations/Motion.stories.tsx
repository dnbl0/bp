import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Motion",
  parameters: {
    docs: {
      description: {
        component: `
Motion is restrained — there is one signature curve (\`--ease-emphasized\`)
that handles meaningful state changes (flyouts opening, primary CTAs, hero
reveals). Other curves are used for narrower roles.

### Eases

- \`--ease-emphasized\` — meaningful state change (flyout, panel reveal).
- \`--ease-decelerate\` — content entering the viewport.
- \`--ease-standard\` — everyday hover/focus baseline.
- \`--ease-sharp\` — toggles and snaps.

### Durations

- \`--dur-1\` 140ms · sharp affordances.
- \`--dur-2\` 240ms · default.
- \`--dur-3\` 360ms · flyout, section change.
- \`--dur-4\` 560ms · showcase reveals (hero, celebration).

### Accessibility

All animations respect \`prefers-reduced-motion: reduce\` — the section fade,
the carousel slide, the typing indicator, and the reveal-in stagger all
collapse to none.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

function MotionTile({
  token,
  label,
}: {
  token: string;
  label: string;
}) {
  return (
    <div className="sb-tile">
      <span className="sb-tile__label">{label}</span>
      <code className="sb-tile__value">{token}</code>
      <div
        className="sb-tile__preview"
        style={{ minHeight: 56, position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-pill)",
            background: "var(--accent)",
            animation: `previewMotion 2.2s var(${token}) infinite`,
          }}
        />
      </div>
      <style>{`
        @keyframes previewMotion {
          0%, 10% { transform: translateX(0); }
          50%     { transform: translateX(140px); }
          90%, 100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export const Eases: Story = {
  name: "Eases",
  render: () => (
    <div className="sb-grid">
      <MotionTile token="--ease-emphasized" label="Emphasized" />
      <MotionTile token="--ease-decelerate" label="Decelerate" />
      <MotionTile token="--ease-standard" label="Standard" />
      <MotionTile token="--ease-sharp" label="Sharp" />
    </div>
  ),
};

export const Durations: Story = {
  name: "Durations",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 480 }}>
      {[
        { t: "--dur-1", ms: "140ms", use: "Sharp affordances · toggle snap" },
        { t: "--dur-2", ms: "240ms", use: "Hover, focus, baseline" },
        { t: "--dur-3", ms: "360ms", use: "Flyout, section change" },
        { t: "--dur-4", ms: "560ms", use: "Showcase reveal" },
      ].map(({ t, ms, use }) => (
        <div
          key={t}
          style={{
            display: "grid",
            gridTemplateColumns: "140px 60px 1fr",
            gap: 16,
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <code className="sb-tile__value">{t}</code>
          <span style={{ color: "var(--fg-muted)", fontSize: 12 }}>{ms}</span>
          <span style={{ color: "var(--fg)", fontSize: 13 }}>{use}</span>
        </div>
      ))}
    </div>
  ),
};

export const RevealInStagger: Story = {
  name: "Reveal-in stagger",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        maxWidth: 540,
      }}
      key={Math.random()}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="reveal-in"
          style={
            {
              ["--reveal-i" as keyof React.CSSProperties]: i,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: 16,
              fontSize: "var(--ld-s-typography-body2-font-size)",
              color: "var(--fg)",
            } as React.CSSProperties
          }
        >
          Item {i + 1}
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Apply `.reveal-in` and set `--reveal-i` per child to stagger their entry by 60ms × index. Honours `prefers-reduced-motion`.",
      },
    },
  },
};
