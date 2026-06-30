import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as p}from"./index-ClcD9ViR.js";import{d as m,u}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const P={title:"Flyouts/Encore vehicle info",parameters:{layout:"fullscreen",docs:{description:{component:`
A "Learn more" content flyout that explains what an **Encore Vehicle** is —
eligible new and demonstrator L-Series & F-model vehicles automatically enrol
in Lexus Encore. Built on the reusable \`<InfoFlyout>\` shell.

### Behaviour

- **Tier list** — a clay-dotted \`connectlist\` walks through the three Encore
  tiers: **Silver** (DriveCare roadside assistance and partner offers),
  **Gold** (airport lounge passes and concierge experiences), and
  **Platinum** (valet parking, lifestyle escapes and the full service loan
  car programme).
- **Primary action** — *Done* simply closes the flyout via \`useFlyout\`.
- **Eligibility note** — a closing note clarifies that tier eligibility is set
  at purchase and reflected in the member's profile.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The decorative tier dots are \`aria-hidden\`; each tier's name is a real
  heading paired with its description.
        `.trim()}}}};function d(){const{open:o}=u();return p.useEffect(()=>{o("encore-info")},[o]),t.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Encore vehicle info flyout opens automatically — view it on the right."})}const e={name:"Open by default",render:()=>t.jsx(d,{})},r={name:"Static preview",render:()=>t.jsx(m,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var i,a,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var n,c,l;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <EncoreInfoFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(l=(c=r.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const L=["Default","StaticPreview"];export{e as Default,r as StaticPreview,L as __namedExportsOrder,P as default};
