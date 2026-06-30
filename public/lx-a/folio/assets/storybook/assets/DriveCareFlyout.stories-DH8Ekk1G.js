import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as m}from"./index-ClcD9ViR.js";import{D as p,u}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const I={title:"Flyouts/DriveCare",parameters:{layout:"fullscreen",docs:{description:{component:`
A "Learn more" content flyout for **DriveCare**, the 24-hour roadside
assistance included with every Encore membership. Built on the reusable
\`<InfoFlyout>\` shell, so it inherits the standard title / heading /
description / body layout.

### Behaviour

- **Coverage summary** — a \`<DataTable>\` lays out the essentials: nationwide
  24/7 cover, the call-out scenarios (flat battery, tyre, lockout, fuel
  run-out), complimentary towing to the nearest Lexus dealer, and the hotline
  number.
- **Primary action** — *Call 1800 023 009* sets \`window.location.href\` to a
  \`tel:\` link so a tap dials straight from a phone.
- **Safety note** — a closing note reminds the member to call 000 first for
  life-threatening emergencies; DriveCare coordinates the rest.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The ghost *Close* action is provided automatically by \`<InfoFlyout>\`
  alongside the primary call button.
        `.trim()}}}};function d(){const{open:o}=u();return m.useEffect(()=>{o("drivecare")},[o]),r.jsx("p",{style:{color:"var(--fg-muted)"},children:"The DriveCare flyout opens automatically — view it on the right."})}const e={name:"Open by default",render:()=>r.jsx(d,{})},t={name:"Static preview",render:()=>r.jsx(p,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var a,s,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var n,l,c;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <DriveCareFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const P=["Default","StaticPreview"];export{e as Default,t as StaticPreview,P as __namedExportsOrder,I as default};
