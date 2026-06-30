import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as d}from"./index-ClcD9ViR.js";import{B as l,u as m}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const F={title:"Flyouts/Book a service",parameters:{layout:"fullscreen",docs:{description:{component:`
Multi-step booking wizard that walks a customer from service type through to a
confirmed dealer request. A \`<StepIndicator>\` tracks progress across the six
ordered steps: **Type → Dealer → Date → Time → Transport → Confirm**.

### Behaviour

- **Smart pre-fill** — when opened with \`{ smart: true }\`, the flyout jumps
  straight to **Confirm** with a sensible weekday date ~6 weeks out, an 8:30am
  drop-off and the preferred dealer already chosen. A "we pre-filled this"
  note invites the customer to step back and adjust.
- **Type** — radio list of service types with duration and "from" pricing.
- **Dealer** — shows the preferred dealer as a card; "Select a different
  dealership" reveals a postcode/suburb search with "Use current location",
  proximity-sorted results tagged *Preferred* / *Nearest*, and a *Show more*
  expander.
- **Date** — a \`<DatePicker>\` constrained to today onward.
- **Time** — a grid of available drop-off slots.
- **Transport** — radio list (loan car, drop-off, wait, etc.).
- **Confirm** — a \`<DataTable>\` summary plus an optional notes textarea.
  *Confirm booking* records the booking via \`addBooking\` and shows a success
  \`<Confirmation>\` with the booked details.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The back affordance appears contextually and also unwinds the inline dealer
  search before stepping back.
- The *Continue* / *Confirm booking* action is disabled until the current
  step is satisfied.
        `.trim()}}}};function u(){const{open:o}=m();return d.useEffect(()=>{o("book-service",{vehicleName:"NX 450h+ F Sport",smart:!0})},[o]),t.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Book a service flyout opens automatically — step through it on the right."})}const e={name:"Open by default",render:()=>t.jsx(u,{})},r={name:"Static preview",render:()=>t.jsx(l,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var a,s,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var n,p,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <BookServiceFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(c=(p=r.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const O=["Default","StaticPreview"];export{e as Default,r as StaticPreview,O as __namedExportsOrder,F as default};
