import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as l}from"./index-ClcD9ViR.js";import{e as p,u as m}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const k={title:"Flyouts/Preferred dealer",parameters:{layout:"fullscreen",docs:{description:{component:`
Dealer picker for setting the member's preferred service centre — searchable,
proximity-ordered and tagged for context.

### Behaviour

- **Search** — a suburb / postcode field filters dealers by name or address
  in real time. "Use current location" clears the query to fall back to the
  proximity-ordered list.
- **List ordering** — dealers come from \`dealersByProximity\`. While not
  filtering, the currently saved preferred dealer is pinned to the top so the
  member can see today's choice at a glance.
- **Tags** — the saved dealer is flagged "Current" and the closest dealer is
  flagged "Nearest" inline on the label.
- **Selection / Save** — radios pick a dealer into local state; "Save
  preferred dealer" commits via \`setPreferredDealerId\` and closes. An empty
  filter shows a "No dealers match" message.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- The dealer list uses real radio inputs via \`<Radio>\`, so it reads as a
  single grouped choice with arrow-key navigation.
- Each option's description announces the address and distance away.
        `.trim()}}}};function u(){const{open:a}=m();return l.useEffect(()=>{a("preferred-dealer",{})},[a]),t.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Preferred dealer flyout opens automatically — interact with it on the right."})}const e={name:"Open by default",render:()=>t.jsx(u,{})},r={name:"Static preview",render:()=>t.jsx(p,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var o,s,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var n,d,c;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <PreferredDealerFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(c=(d=r.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const T=["Default","StaticPreview"];export{e as Default,r as StaticPreview,T as __namedExportsOrder,k as default};
