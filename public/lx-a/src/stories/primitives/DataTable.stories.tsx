import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../../components/Table";

const meta: Meta<typeof DataTable> = {
  title: "Primitives/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Two-column key/value display. Used across vehicle summary, flyout
confirmations and lounge / valet booking detail.

### Semantics

Renders as \`<dl>\` with \`<dt>\` / \`<dd>\` pairs — assistive tech announces
them as definition pairs.

### Anatomy

- \`label\` (left, muted) and \`value\` (right).
- Optional \`action\` button next to the label (Edit / Learn more / Show more).
- Rows separated by 1px borders. Use \`.dtable--flyout\` to add a top and
  bottom border for the in-flyout context.

### Responsive

Below 480px, rows collapse to a single stacked column so long addresses or
dealer names don't get crushed.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => (
    <DataTable
      rows={[
        { label: "VIN", value: "JTJYARBZ000000456" },
        { label: "Registration", value: "ABC123" },
        { label: "Odometer", value: "28,910 km" },
      ]}
    />
  ),
};

export const WithActions: Story = {
  name: "With row actions",
  render: () => (
    <DataTable
      rows={[
        { label: "VIN", value: "JTJYARBZ000000456" },
        {
          label: "Registration",
          value: "ABC123",
          action: (
            <button type="button" className="dtable__action">
              Edit
            </button>
          ),
        },
        { label: "Odometer", value: "28,910 km" },
        {
          label: "Connected Vehicle",
          value: "No",
          action: (
            <button type="button" className="dtable__action">
              Learn more
            </button>
          ),
        },
      ]}
    />
  ),
};

export const InsideFlyout: Story = {
  name: "Inside a flyout",
  render: () => (
    <div
      style={{
        maxWidth: 380,
        padding: 24,
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <DataTable
        className="dtable--flyout"
        rows={[
          { label: "Vehicle", value: "2024 NX 450h+ F Sport" },
          { label: "Service", value: "Logbook service" },
          { label: "Dealer", value: "Lexus City Melbourne" },
          { label: "Address", value: "501 Swanston St, Melbourne VIC 3000" },
          { label: "Date", value: "12/08/2026" },
          { label: "Drop-off time", value: "8:30am" },
        ]}
      />
    </div>
  ),
};
