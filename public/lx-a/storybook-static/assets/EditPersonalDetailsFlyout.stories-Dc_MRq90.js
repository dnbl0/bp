import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as d}from"./index-ClcD9ViR.js";import{a as p,u as m}from"./FlyoutProvider-P9Q0XqON.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-DqULDr2a.js";import"./icons-DC4KyQ6f.js";import"./Radio-5Lqa9hyu.js";import"./TextField-DZx8ztRo.js";import"./Confirmation-CgcDxs0V.js";import"./Table-Cl5q1-NJ.js";import"./DatePicker-DdS7sv6N.js";import"./StepIndicator-xww0QFSC.js";const D={title:"Flyouts/Personal details",parameters:{layout:"fullscreen",docs:{description:{component:`
Edit form for the member's contact and account information — name, email,
mobile and licence — backed by the shared personal-details record.

### Behaviour

- **Fields** — one \`<TextField>\` per row, seeded from the provider's
  \`personal\` record into local draft state. Edits are buffered locally and
  only committed on save.
- **Smart input types** — labels containing "email" render an
  \`type="email"\` field, "mobile" / "phone" render \`type="tel"\`, and
  everything else stays plain text — giving the right mobile keyboard.
- **Save / Cancel** — "Save changes" writes the draft back via
  \`setPersonal\` and closes; "Cancel" discards edits and closes.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Each field is a labelled \`<TextField>\`, so screen readers announce the
  field name with its current value.
- Actions live in the persistent flyout footer, keeping the primary
  "Save changes" button reachable without scrolling.
        `.trim()}}}};function u(){const{open:a}=m();return d.useEffect(()=>{a("edit-personal",{})},[a]),r.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Personal details flyout opens automatically — interact with it on the right."})}const e={name:"Open by default",render:()=>r.jsx(u,{})},t={name:"Static preview",render:()=>r.jsx(p,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var o,s,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var i,l,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <EditPersonalDetailsFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const T=["Default","StaticPreview"];export{e as Default,t as StaticPreview,T as __namedExportsOrder,D as default};
