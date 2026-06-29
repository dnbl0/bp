import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as m}from"./index-ClcD9ViR.js";import{C as l,u}from"./FlyoutProvider-P9Q0XqON.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-DqULDr2a.js";import"./icons-DC4KyQ6f.js";import"./Radio-5Lqa9hyu.js";import"./TextField-DZx8ztRo.js";import"./Confirmation-CgcDxs0V.js";import"./Table-Cl5q1-NJ.js";import"./DatePicker-DdS7sv6N.js";import"./StepIndicator-xww0QFSC.js";const P={title:"Flyouts/Connect your Lexus",parameters:{layout:"fullscreen",docs:{description:{component:`
A marketing-led onboarding flyout that sells the value of connected services
and kicks off device pairing. The description names the vehicle from the
payload when available.

### Behaviour

- **Feature list** — four highlights (live vehicle health, remote start & lock,
  Find my Lexus, safety & SOS), each rendered with a dot marker, title and
  body copy.
- **Encore note** — a footnote that the services are included with Encore
  Platinum for the first 3 years.
- **Pair vehicle** — switches to a success \`<Confirmation>\` ("Pairing
  started") explaining that a one-time code has been emailed and to finish in
  the Lexus app.
- **Maybe later** — dismisses the flyout without pairing.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Decorative dot markers are hidden from assistive tech via \`aria-hidden\`.
        `.trim()}}}};function d(){const{open:o}=u();return m.useEffect(()=>{o("connect",{vehicleName:"NX 450h+ F Sport"})},[o]),r.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Connect your Lexus flyout opens automatically — explore pairing on the right."})}const e={name:"Open by default",render:()=>r.jsx(d,{})},t={name:"Static preview",render:()=>r.jsx(l,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var a,i,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(s=(i=e.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,c,p;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <ConnectFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const L=["Default","StaticPreview"];export{e as Default,t as StaticPreview,L as __namedExportsOrder,P as default};
