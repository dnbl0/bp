import{j as a}from"./jsx-runtime-BYYWji4R.js";import{r as u}from"./index-ClcD9ViR.js";import{D as c}from"./DatePicker-CzmVSzMy.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-CO6p2nHe.js";const f={title:"Primitives/DatePicker",component:c,parameters:{layout:"padded",docs:{description:{component:`
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
        `.trim()}}}};function p(){const[l,m]=u.useState("");return a.jsx("div",{style:{width:"100%",maxWidth:340,margin:"0 auto"},children:a.jsx(c,{label:"Service date",required:!0,value:l,onChange:m,helper:"Click the field, then use the arrow keys to navigate.",minDate:new Date})})}const e={render:()=>a.jsx(p,{})},t={name:"With minDate (today)",render:()=>a.jsx(p,{}),parameters:{docs:{description:{story:"Set `minDate={new Date()}` to disable past dates. Disabled cells are visually dimmed and skipped by arrow-key navigation."}}}};var r,o,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => <Controlled />
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var n,i,d;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "With minDate (today)",
  render: () => <Controlled />,
  parameters: {
    docs: {
      description: {
        story: "Set \`minDate={new Date()}\` to disable past dates. Disabled cells are visually dimmed and skipped by arrow-key navigation."
      }
    }
  }
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const k=["Default","WithMinDate"];export{e as Default,t as WithMinDate,k as __namedExportsOrder,f as default};
