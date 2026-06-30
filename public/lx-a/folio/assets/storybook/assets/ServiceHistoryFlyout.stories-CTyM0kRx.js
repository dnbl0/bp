import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as p}from"./index-ClcD9ViR.js";import{S as d,u as m}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const I={title:"Flyouts/Service history",parameters:{layout:"fullscreen",docs:{description:{component:`
A filterable, expandable log of a vehicle's services. The heading reflects the
vehicle name from the payload, and a footer action jumps straight into the
*Book a service* flyout for the same vehicle.

### Behaviour

- **Segmented tabs** — *All*, *Upcoming* and *Completed* filter the records.
  Implemented as an ARIA tablist with roving \`tabIndex\`.
- **Records** — each entry shows title, status pill, service interval, date and
  dealer. Records with detail are expandable.
- **Expanded detail** — reveals odometer, advisor and total cost, a
  *Work performed* list and, when present, a *Parts replaced* list. Only one
  record is open at a time.
- **Empty state** — shows a "No … services" message when a filter has no
  matches.
- **Footer** — *Book a service* opens the booking flyout, passing the vehicle
  name through.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Tabs support Arrow / Home / End keyboard navigation and expose
  \`aria-selected\` + \`aria-controls\`.
- Each expandable record is a button with \`aria-expanded\` / \`aria-controls\`,
  and the revealed body is a labelled \`role="region"\`.
        `.trim()}}}};function u(){const{open:o}=m();return p.useEffect(()=>{o("service-history",{vehicleName:"NX 450h+ F Sport"})},[o]),t.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Service history flyout opens automatically — filter and expand records on the right."})}const e={name:"Open by default",render:()=>t.jsx(u,{})},r={name:"Static preview",render:()=>t.jsx(d,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var a,s,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var n,c,l;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <ServiceHistoryFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(l=(c=r.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const R=["Default","StaticPreview"];export{e as Default,r as StaticPreview,R as __namedExportsOrder,I as default};
