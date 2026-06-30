import{j as s}from"./jsx-runtime-BYYWji4R.js";import{r as d}from"./index-ClcD9ViR.js";import{C as m,u as l}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const E={title:"Flyouts/Change password",parameters:{layout:"fullscreen",docs:{description:{component:`
Three-step "Change your password" flow, rebuilt from the Figma designs.

### Behaviour

- **Intro** — shows the masked current password and explains we'll email a
  one-time code. "Change password" sends the code and advances.
- **Verify** — enter the one-time code sent to the member's email
  (any code passes in the prototype). A "Resend code" link re-triggers the
  send toast.
- **Set a new password** — new password field with a live "Passwords should
  have" checklist (8–16 characters, uppercase, lowercase, number) whose ticks
  turn green as each rule is met, plus a confirm field that flags a mismatch.
  "Set new password" enables only when every rule passes and both fields match.
- **Confirmation** — ends on the shared \`<Confirmation>\` panel plus a toast.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- "Go back" steps the flow backwards; the rules list is presentational and
  the matching error is announced via the \`<TextField>\` error.
        `.trim()}}}};function u(){const{open:t}=l();return d.useEffect(()=>{t("change-password",{})},[t]),s.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Change password flyout opens automatically — interact with it on the right."})}const e={name:"Open by default",render:()=>s.jsx(u,{})},r={name:"Static preview",render:()=>s.jsx(m,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var a,o,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var i,p,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <ChangePasswordFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(c=(p=r.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const T=["Default","StaticPreview"];export{e as Default,r as StaticPreview,T as __namedExportsOrder,E as default};
