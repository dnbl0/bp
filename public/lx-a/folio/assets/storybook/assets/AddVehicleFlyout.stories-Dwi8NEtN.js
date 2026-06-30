import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as d}from"./index-ClcD9ViR.js";import{A as l,u as m}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const E={title:"Flyouts/Add a vehicle",parameters:{layout:"fullscreen",docs:{description:{component:`
A short form for linking another Lexus to the account by registration and VIN.
It takes no payload — the customer enters everything.

### Behaviour

- **Fields** — *Registration* and *VIN* \`<TextField>\`s, both required, with the
  VIN carrying helper text ("17 characters, found on your compliance plate or
  rego papers.").
- **Submit gate** — *Submit for verification* stays disabled until the
  registration is ≥3 characters and the VIN ≥6.
- **Submit** — adds a pending, unverified vehicle via \`addPendingVehicle\`
  (upper-cased values, a placeholder image and \`pending: true\`), then shows a
  success \`<Confirmation>\` ("Vehicle linked") noting verification usually
  completes within one business day.
- **Reset on close** — closing clears the fields after the exit animation, so
  the form is fresh next time it opens.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The submit button's disabled state communicates the incomplete form to
  assistive tech.
        `.trim()}}}};function u(){const{open:i}=m();return d.useEffect(()=>{i("add-vehicle",{})},[i]),r.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Add a vehicle flyout opens automatically — fill in the details on the right."})}const e={name:"Open by default",render:()=>r.jsx(u,{})},t={name:"Static preview",render:()=>r.jsx(l,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var o,s,a;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var n,c,p;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <AddVehicleFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const N=["Default","StaticPreview"];export{e as Default,t as StaticPreview,N as __namedExportsOrder,E as default};
