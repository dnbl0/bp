import{j as o}from"./jsx-runtime-BYYWji4R.js";import{r as c}from"./index-ClcD9ViR.js";import{L as p,u}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const P={title:"Flyouts/Service loan car",parameters:{layout:"fullscreen",docs:{description:{component:`
A "Learn more" content flyout for the **service loan car** programme — a
complimentary Lexus to keep members moving while their vehicle is in for
service. Built on the reusable \`<InfoFlyout>\` shell.

### Behaviour

- **Programme summary** — a \`<DataTable>\` covers the loan vehicle (a
  late-model Lexus from the loan fleet), duration (same day for minor /
  overnight for major service), delivery (within 25 km of the preferred
  dealer), and eligibility (Encore Platinum members, by request).
- **Primary action** — *Book a service* closes this flyout and immediately
  opens the \`"book-service"\` flyout via \`useFlyout\`, so the member can
  choose their transport option in the booking flow.
- **Availability note** — a closing note flags that the loan car is subject to
  availability.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The ghost *Close* action is provided automatically by \`<InfoFlyout>\`
  alongside the primary booking action.
        `.trim()}}}};function d(){const{open:t}=u();return c.useEffect(()=>{t("loan-car")},[t]),o.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Service loan car flyout opens automatically — view it on the right."})}const e={name:"Open by default",render:()=>o.jsx(d,{})},r={name:"Static preview",render:()=>o.jsx(p,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var a,i,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(s=(i=e.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var n,l,m;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <LoanCarFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const A=["Default","StaticPreview"];export{e as Default,r as StaticPreview,A as __namedExportsOrder,P as default};
