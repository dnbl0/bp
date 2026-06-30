import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as c}from"./index-ClcD9ViR.js";import{P as p,u as l}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const F={title:"Flyouts/Payment methods",parameters:{layout:"fullscreen",docs:{description:{component:`
Card wallet for the member — list, manage and add the cards used for Encore
experiences, valet and service payments.

### Behaviour

- **Card list** — each saved card shows its detected brand, masked
  \`•••• last4\` and expiry. Cards seed from the provider's \`payments\` into
  local draft state; an empty wallet shows a friendly placeholder.
- **Primary card** — exactly one card is primary. "Make primary" promotes a
  card; removing the primary auto-promotes the next remaining card so one
  always stays primary.
- **Add a card** — "+ Add a card" reveals an inline form. The card number is
  grouped live (4-4-4-4, or Amex 4-6-5), the brand is detected from the first
  digits, and expiry is masked to \`MM/YY\`. "Add card" enables only once the
  number length and expiry validate.
- **Save / Cancel** — "Save changes" commits the wallet via \`setPayments\`
  and closes; "Cancel" discards edits.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Remove buttons carry an \`aria-label\` naming the card ("Remove card
  ending 1234").
- The add-card inputs set \`inputMode="numeric"\` and \`autoComplete\`
  (\`cc-number\`, \`cc-exp\`) for correct keyboards and autofill.
        `.trim()}}}};function u(){const{open:a}=l();return c.useEffect(()=>{a("payment-methods",{})},[a]),t.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Payment methods flyout opens automatically — interact with it on the right."})}const e={name:"Open by default",render:()=>t.jsx(u,{})},r={name:"Static preview",render:()=>t.jsx(p,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var s,o,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var i,d,m;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <PaymentMethodsFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const O=["Default","StaticPreview"];export{e as Default,r as StaticPreview,O as __namedExportsOrder,F as default};
