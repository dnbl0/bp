import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as l}from"./index-ClcD9ViR.js";import{M as u,u as m}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const P={title:"Flyouts/Manuals & resources",parameters:{layout:"fullscreen",docs:{description:{component:`
A curated list of operating guides, warranty information and connected-services
help for a vehicle. The heading is vehicle-specific when a name is supplied in
the payload, otherwise it falls back to "Manuals & resources".

### Behaviour

- **Resource list** — each item shows a title, description and a
  \`format · size\` meta line (e.g. *PDF · 4.2 MB*, *Video · 6 min*).
- **Format-aware action** — the trailing link adapts its verb to the resource
  format: *Watch* for video, *Read* for web, *Download* otherwise, each with a
  trailing arrow icon.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Each action carries an explicit \`aria-label\` ("Open {title}") so its purpose
  is clear out of visual context.
        `.trim()}}}};function d(){const{open:a}=m();return l.useEffect(()=>{a("manuals",{vehicleName:"NX 450h+ F Sport"})},[a]),t.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Manuals & resources flyout opens automatically — browse the resources on the right."})}const e={name:"Open by default",render:()=>t.jsx(d,{})},r={name:"Static preview",render:()=>t.jsx(u,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var o,s,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var n,c,p;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <ManualsFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const R=["Default","StaticPreview"];export{e as Default,r as StaticPreview,R as __namedExportsOrder,P as default};
