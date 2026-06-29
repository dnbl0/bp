import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GROUPS } from "./componentTokens.data";

const meta: Meta = {
  title: "Foundations/Component tokens",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The Lexus Design System **component-contract layer**, \`--ld-c-*\` — the CSS
the brief supplied. These are the tokens a DS component consumes; each
resolves onto the \`--ld-s-*\` foundation (which in turn resolves onto the raw
brand scales). The full three-tier chain is:

> **brand primitive → \`--ld-s-*\` system → \`--ld-c-*\` component**

All ${GROUPS.reduce((n, g) => n + g.tokens.length, 0)} tokens are declared at
\`:root\` so they're available app-wide (the DS scopes them to component
classes). The table below resolves every one to its computed value live in
the browser — flip the **Theme** toolbar to see colour-backed tokens change.

> Note: \`--ld-c-spinner-size\` is carried verbatim from the DS export, where
> it ships as a malformed \`calc\` expression. It's inert (unused) and kept
> faithful rather than "corrected".
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const mono = 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

/** True when a resolved value looks like a colour we can show as a chip. */
function isColour(v: string) {
  const s = v.trim().toLowerCase();
  return (
    s.startsWith("#") ||
    s.startsWith("rgb") ||
    s.startsWith("hsl") ||
    /\b(solid|dashed)\b/.test(s) // border shorthands carry a colour
  );
}

function Row({ token }: { token: string }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue(token)
      .trim();
    setValue(v || "—");
  }, [token]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "24px minmax(280px, 1fr) minmax(160px, 1fr)",
        alignItems: "center",
        gap: 12,
        padding: "5px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          border: "1px solid var(--border-strong)",
          background: isColour(value) ? `var(${token})` : "transparent",
        }}
      />
      <code style={{ fontFamily: mono, fontSize: 12, color: "var(--fg)" }}>
        {token}
      </code>
      <code style={{ fontFamily: mono, fontSize: 12, color: "var(--fg-muted)" }}>
        {value}
      </code>
    </div>
  );
}

function GroupTable({ group, tokens }: { group: string; tokens: string[] }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <header className="sb-section-head">
        <h3>
          {group}{" "}
          <span style={{ color: "var(--fg-dim)", fontWeight: "var(--ld-s-typography-label2-font-weight)" }}>
            · {tokens.length}
          </span>
        </h3>
      </header>
      <div style={{ maxWidth: 760 }}>
        {tokens.map((t) => (
          <Row key={t} token={t} />
        ))}
      </div>
    </section>
  );
}

export const Reference: Story = {
  name: "All component tokens",
  render: () => (
    <div>
      {GROUPS.map((g) => (
        <GroupTable key={g.group} group={g.group} tokens={g.tokens} />
      ))}
    </div>
  ),
};

export const ByGroup: Story = {
  name: "Border-radius contract",
  render: () => {
    const g = GROUPS.find((x) => x.group === "border-radius")!;
    return <GroupTable group={g.group} tokens={g.tokens} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "A single group in isolation — `--ld-c-border-radius-*`, the component aliases over the `--ld-s-border-radius-*` scale.",
      },
    },
  },
};
