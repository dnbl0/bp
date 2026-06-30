import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as l}from"./index-ClcD9ViR.js";import{c,u as m}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const I={title:"Flyouts/Edit registration",parameters:{layout:"fullscreen",docs:{description:{component:`
A focused single-field editor for updating the registration plate held against
a vehicle. The description names the vehicle when supplied in the payload.

### Behaviour

- **Single field** — a \`<TextField>\` seeded with the current registration from
  the payload, auto-capitalised, with helper text "As shown on your number
  plate, without spaces."
- **Validation** — the value is trimmed and upper-cased; valid plates are
  3–8 characters. An inline error ("Enter a valid registration (3–8
  characters).") appears only after the field is touched / a save is attempted.
- **Save** — *Save changes* commits the cleaned value via \`setRego\` for the
  payload's \`vehicleId\` and closes the flyout. Invalid input marks the field
  touched and keeps the flyout open.
- **Cancel** — dismisses without saving.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The error message is wired to the field via \`<TextField>\`, so screen readers
  announce it when validation fails.
        `.trim()}}}};function u(){const{open:a}=m();return l.useEffect(()=>{a("edit-registration",{vehicleId:"nx450h",vehicleName:"NX 450h+ F Sport",rego:"ABC123"})},[a]),r.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Edit registration flyout opens automatically — edit the plate on the right."})}const e={name:"Open by default",render:()=>r.jsx(u,{})},t={name:"Static preview",render:()=>r.jsx(c,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var i,o,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var n,p,d;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <EditRegistrationFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const R=["Default","StaticPreview"];export{e as Default,t as StaticPreview,R as __namedExportsOrder,I as default};
