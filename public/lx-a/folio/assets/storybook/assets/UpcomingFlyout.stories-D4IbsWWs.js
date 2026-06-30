import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as p}from"./index-ClcD9ViR.js";import{U as l,u}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const C={title:"Flyouts/Upcoming",parameters:{layout:"fullscreen",docs:{description:{component:`
Agenda of the member's upcoming events — service bookings, valet visits and
lounge access — sorted by what's next.

### Behaviour

- **Event list** — renders the provider's \`bookings\`. Each item shows a
  kind badge (labelled via \`bookingKindLabel\` and colour-coded by kind), a
  "when" timestamp, the title and a short detail line.
- **Cancel** — every event has a Cancel control that removes it from the
  agenda via \`removeBooking\`.
- **Empty state** — with nothing scheduled, the flyout shows a prompt to
  book a service or redeem a benefit.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Cancel buttons carry an \`aria-label\` naming the event ("Cancel
  {title}"), so the action target is unambiguous to screen readers.
        `.trim()}}}};function d(){const{open:o}=u();return p.useEffect(()=>{o("upcoming",{})},[o]),r.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Upcoming flyout opens automatically — interact with it on the right."})}const e={name:"Open by default",render:()=>r.jsx(d,{})},t={name:"Static preview",render:()=>r.jsx(l,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var a,s,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var i,c,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <UpcomingFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const A=["Default","StaticPreview"];export{e as Default,t as StaticPreview,A as __namedExportsOrder,C as default};
