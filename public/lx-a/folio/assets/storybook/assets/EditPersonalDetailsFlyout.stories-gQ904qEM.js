import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as c}from"./index-ClcD9ViR.js";import{b as l,u as m}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const U={title:"Flyouts/Personal details",parameters:{layout:"fullscreen",docs:{description:{component:`
Multi-step flow for updating the member's contact details, backed by the
shared personal-details record. Mirrors the Figma "Update your details" flyout.

### Behaviour

- **Select an option** — a framed radio list (Update name and address /
  Update email address / Update phone number). "Continue" is disabled until
  a choice is made.
- **Name & address** — first name, last name and postal address fields,
  seeded from the current record; "Save changes" commits via \`setPersonal\`.
- **Email / phone** — enter the new value, then a one-time-code step
  ("we emailed / texted you a code"). Any code passes in the prototype;
  verifying commits the change.
- **Confirmation** — each branch ends on the shared \`<Confirmation>\` panel
  plus a toast.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- "Go back" steps the flow backwards (code → form → select); each field is a
  labelled \`<TextField>\`.
- The primary action lives in the persistent flyout footer.
        `.trim()}}}};function u(){const{open:a}=m();return c.useEffect(()=>{a("edit-personal",{})},[a]),r.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Personal details flyout opens automatically — interact with it on the right."})}const e={name:"Open by default",render:()=>r.jsx(u,{})},t={name:"Static preview",render:()=>r.jsx(l,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var o,s,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var n,d,p;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <EditPersonalDetailsFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const k=["Default","StaticPreview"];export{e as Default,t as StaticPreview,k as __namedExportsOrder,U as default};
