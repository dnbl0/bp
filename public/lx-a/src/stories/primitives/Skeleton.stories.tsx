import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../../components/Skeleton";
import { DashboardSkeleton } from "../../components/DashboardSkeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Shimmer placeholder for content that's loading. Use to preserve layout while
data is in flight — never as a permanent decoration.

### Props

- \`width\` — number (px) or any CSS length. Default 100%.
- \`height\` — number (px) or any CSS length. Default 1em.
- \`radius\` — number (px). Default 4.

### Accessibility

- Each \`Skeleton\` is \`aria-hidden\`. Wrap the loading region in a container
  with \`aria-busy="true"\` and a brief \`aria-label\` (see DashboardSkeleton).
- The shimmer is disabled under \`prefers-reduced-motion: reduce\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Block: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Skeleton width="45%" height={12} />
      <Skeleton width="100%" height={10} style={{ marginTop: 8 }} />
      <Skeleton width="85%" height={10} style={{ marginTop: 6 }} />
      <Skeleton width="38%" height={10} style={{ marginTop: 6 }} />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div
      style={{
        width: 280,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
      }}
    >
      <Skeleton width="100%" height={160} radius={0} />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <Skeleton width="60%" height={12} />
        <Skeleton width="100%" height={10} />
        <Skeleton width="80%" height={10} />
      </div>
    </div>
  ),
};

export const Dashboard: Story = {
  name: "Full dashboard skeleton",
  render: () => <DashboardSkeleton />,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Composed skeleton that mirrors the authenticated dashboard layout — the screen the user sees in the brief moment after login.",
      },
    },
  },
};
