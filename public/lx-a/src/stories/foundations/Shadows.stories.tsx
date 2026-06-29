import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundations/Shadows",
  parameters: {
    docs: {
      description: {
        component: `
Elevation is intentionally restrained. **\`box-shadow\`** tokens cover floating
surfaces; a parallel **\`drop-shadow\`** ramp covers vehicle render images so
they sit on the page with photographic depth.

### Box shadow

- \`--shadow-sm\` — quiet elevation, hovered chips.
- \`--shadow-md\` — popovers, account menu, notifications, account flyout.
- \`--shadow-lg\` — full flyout panel (right-anchored shadow).

### Drop shadow (vehicle renders)

- \`--shadow-render-sm\` — VehicleCard side panel.
- \`--shadow-render-md\` — Garage cards.
- \`--shadow-render-lg\` — VehicleDetail hero.

Don't write a one-off \`box-shadow: …rgba(…)\` literal. If a level is missing,
propose a new token.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const BOX = [
  { token: "--shadow-sm", label: "Small" },
  { token: "--shadow-md", label: "Medium" },
  { token: "--shadow-lg", label: "Large (flyout)" },
];

export const BoxShadows: Story = {
  name: "Box shadows",
  render: () => (
    <div
      className="sb-row"
      style={{
        gap: 24,
        padding: 32,
        background: "var(--canvas-raised)",
      }}
    >
      {BOX.map((s) => (
        <div key={s.token} className="sb-stack" style={{ gap: 8 }}>
          <div
            style={{
              width: 220,
              height: 120,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              boxShadow: `var(${s.token})`,
            }}
          />
          <code
            style={{
              fontFamily:
                'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
              fontSize: 12,
              color: "var(--fg-muted)",
            }}
          >
            {s.token}
          </code>
          <span style={{ fontSize: 12, color: "var(--fg)" }}>{s.label}</span>
        </div>
      ))}
    </div>
  ),
};

const RENDER = [
  { token: "--shadow-render-sm", label: "Side panel" },
  { token: "--shadow-render-md", label: "Garage card" },
  { token: "--shadow-render-lg", label: "Vehicle hero" },
];

export const VehicleRenderShadows: Story = {
  name: "Vehicle render shadows",
  render: () => (
    <div className="sb-row" style={{ gap: 24 }}>
      {RENDER.map((s) => (
        <div key={s.token} className="sb-stack" style={{ gap: 8 }}>
          <div
            style={{
              width: 220,
              height: 130,
              display: "grid",
              placeItems: "center",
              background:
                "radial-gradient(ellipse at 50% 80%, var(--surface-raised) 0%, var(--surface) 70%)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <img
              src="/assets/vehicle.png"
              alt=""
              style={{
                width: "82%",
                filter: `var(${s.token})`,
              }}
            />
          </div>
          <code
            style={{
              fontFamily:
                'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
              fontSize: 12,
              color: "var(--fg-muted)",
            }}
          >
            {s.token}
          </code>
          <span style={{ fontSize: 12, color: "var(--fg)" }}>{s.label}</span>
        </div>
      ))}
    </div>
  ),
};
