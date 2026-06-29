import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "../../components/DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Primitives/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Single-date picker with a popover calendar. Used in the service booking
flow.

### Keyboard interactions

- **Arrow Left / Right** — move one day.
- **Arrow Up / Down** — move one week.
- **PageUp / PageDown** — move one month (Shift = year).
- **Home / End** — jump to start / end of current month.
- **Enter / Space** — pick the focused day.
- **Escape** — close the popover.

### Affordances

- **Today** link in the popover header jumps the view to the current month.
- Today's cell carries \`aria-current="date"\`.
- Selected date carries \`aria-selected\`.

### Boundaries

Pass \`minDate\` to disable past selections (used in service booking — you
can't book a service in the past).

### Specs

- Closed input: 46px tall.
- Popover: 16px padding, \`--radius-md\`, \`--shadow-md\`.
- Day cells: 1:1 aspect ratio, pill radius on hover/select.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

function Controlled() {
  const [v, setV] = useState("");
  return (
    <div style={{ width: 340 }}>
      <DatePicker
        label="Service date"
        required
        value={v}
        onChange={setV}
        helper="Click the field, then use the arrow keys to navigate."
        minDate={new Date()}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <Controlled />,
};

export const WithMinDate: Story = {
  name: "With minDate (today)",
  render: () => <Controlled />,
  parameters: {
    docs: {
      description: {
        story:
          "Set `minDate={new Date()}` to disable past dates. Disabled cells are visually dimmed and skipped by arrow-key navigation.",
      },
    },
  },
};
