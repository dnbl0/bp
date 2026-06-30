import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as p}from"./index-ClcD9ViR.js";import{E as d,u as m}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const O={title:"Flyouts/Interests",parameters:{layout:"fullscreen",docs:{description:{component:`
Multi-select chip picker for the member's interests — used to tailor offers
and experiences across My Lexus.

### Behaviour

- **Chips** — every tag from the master \`allInterests\` list renders as a
  toggleable chip. Selection seeds from the provider's saved \`interests\`.
- **Toggle** — tapping a chip adds or removes it from the local draft; the
  \`is-on\` class reflects the live selected state.
- **Stable ordering** — on save the selection is re-projected through the
  master list order via \`setInterests\`, so the saved set always displays
  in a consistent sequence regardless of click order.
- **Save / Cancel** — "Save interests" commits and closes; "Cancel"
  discards the draft and closes.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Chips use \`role="checkbox"\` with \`aria-checked\`, so the multi-select
  nature is announced and each chip is individually togglable from the
  keyboard.
- Save / Cancel actions sit in the persistent flyout footer.
        `.trim()}}}};function u(){const{open:s}=m();return p.useEffect(()=>{s("edit-interests",{})},[s]),r.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Interests flyout opens automatically — interact with it on the right."})}const e={name:"Open by default",render:()=>r.jsx(u,{})},t={name:"Static preview",render:()=>r.jsx(d,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var o,a,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var n,c,l;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <EditInterestsFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(l=(c=t.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const D=["Default","StaticPreview"];export{e as Default,t as StaticPreview,D as __namedExportsOrder,O as default};
