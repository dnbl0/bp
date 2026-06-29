import type { Meta, StoryObj } from "@storybook/react";
import * as Icons from "../../components/icons";

const meta: Meta = {
  title: "Foundations/Icons",
  parameters: {
    docs: {
      description: {
        component: `
Every icon ships as inline SVG with \`stroke="currentColor"\` so tint follows
the consuming element. Pass \`width\` and \`height\` to scale (default 18×18).

### Usage rules

- **Sizes:** 12, 14, 16, 18, 20px. Don't size in-between.
- **Tint:** never hardcode — let the consuming element drive colour.
- **Pair with text:** add an \`aria-label\` on the parent button or wrap the
  icon in an \`<span aria-hidden="true">\` if a sibling text label is
  already announced.
- **Decorative-only:** \`aria-hidden\` on the SVG or its wrapper.

### Adding an icon

Add a new \`export const Name = (p: I) => …\` to
\`src/components/icons.tsx\` using the shared \`base()\` defaults. Reuse the
24×24 viewbox so existing sizing assumptions hold.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const ICON_NAMES = Object.keys(Icons).filter(
  (k) => k[0] === k[0].toUpperCase() && k !== "default"
);

export const Library: Story = {
  name: "Library",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 12,
      }}
    >
      {ICON_NAMES.map((name) => {
        const Icon = (Icons as unknown as Record<string, React.ComponentType<{ width?: number; height?: number }>>)[name];
        if (typeof Icon !== "function") return null;
        return (
          <div key={name} className="sb-tile" style={{ alignItems: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                display: "grid",
                placeItems: "center",
                background: "var(--elevation-inset)",
                borderRadius: "var(--radius-pill)",
                color: "var(--fg)",
              }}
            >
              <Icon width={20} height={20} />
            </div>
            <span className="sb-tile__label" style={{ textAlign: "center" }}>
              {name}
            </span>
          </div>
        );
      })}
    </div>
  ),
};

export const Sizes: Story = {
  name: "Sizing",
  render: () => (
    <div className="sb-row" style={{ alignItems: "center" }}>
      {[12, 14, 16, 18, 20].map((s) => (
        <div key={s} className="sb-stack" style={{ alignItems: "center" }}>
          <Icons.ArrowRight width={s} height={s} />
          <span style={{ fontSize: 12, color: "var(--fg-muted)" }}>{s}px</span>
        </div>
      ))}
    </div>
  ),
};
