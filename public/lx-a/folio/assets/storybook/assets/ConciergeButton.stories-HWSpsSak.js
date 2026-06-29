import{j as e}from"./jsx-runtime-BYYWji4R.js";import{C as n}from"./ConciergeButton-CKYxwFvV.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-DC4KyQ6f.js";import"./FlyoutProvider-P9Q0XqON.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-DqULDr2a.js";import"./Radio-5Lqa9hyu.js";import"./TextField-DZx8ztRo.js";import"./Confirmation-CgcDxs0V.js";import"./Table-Cl5q1-NJ.js";import"./DatePicker-DdS7sv6N.js";import"./StepIndicator-xww0QFSC.js";import"./vehicles-BaCw3toR.js";import"./notifications-Cjmw1YQT.js";import"./dashboard-Cb8hRV_-.js";import"./valet-B1TJxLs_.js";import"./lounge-1r1YjYL8.js";import"./relativeTime-DJMNEcqn.js";const A={title:"Concierge/Floating button",component:n,parameters:{layout:"fullscreen",docs:{description:{component:`
Persistent floating affordance that opens the Concierge flyout. Lives at
the bottom-right of the viewport on every authenticated screen.

### Behaviour

- Hides when any flyout is open (\`is-hidden\` state) so it never sits beneath
  a scrim.
- Collapses to a circular icon-only button below 640px to save thumb-space.
- Uses the tier gradient as background and clay glow as elevation.

### Accessibility

- Always announces as "Open concierge" via \`aria-label\`.
- When hidden it's \`aria-hidden\` and removed from the tab order.
        `.trim()}}}},t={render:()=>e.jsxs("div",{style:{minHeight:"60vh",position:"relative"},children:[e.jsx("p",{style:{color:"var(--fg-muted)"},children:"Look bottom-right — the Concierge button is fixed to the viewport."}),e.jsx(n,{})]})};var o,r,i;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div style={{
    minHeight: "60vh",
    position: "relative"
  }}>
      <p style={{
      color: "var(--fg-muted)"
    }}>
        Look bottom-right — the Concierge button is fixed to the viewport.
      </p>
      <ConciergeButton />
    </div>
}`,...(i=(r=t.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const D=["Default"];export{t as Default,D as __namedExportsOrder,A as default};
