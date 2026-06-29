import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as l}from"./index-ClcD9ViR.js";import{R as m,u as d}from"./FlyoutProvider-P9Q0XqON.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-DqULDr2a.js";import"./icons-DC4KyQ6f.js";import"./Radio-5Lqa9hyu.js";import"./TextField-DZx8ztRo.js";import"./Confirmation-CgcDxs0V.js";import"./Table-Cl5q1-NJ.js";import"./DatePicker-DdS7sv6N.js";import"./StepIndicator-xww0QFSC.js";const T={title:"Flyouts/Refer a friend",parameters:{layout:"fullscreen",docs:{description:{component:`
A referral form flyout — invite a friend to test drive a Lexus so you both
earn a complimentary concierge dining experience. Built directly on
\`<Flyout>\` (not \`<InfoFlyout>\`) because it carries its own validated form
and success state.

### Behaviour

- **Form** — two required \`<TextField>\`s (friend's name, friend's email) plus
  an optional personal-note textarea.
- **Validation** — *Send invitation* checks the name is non-empty and the
  email matches a basic pattern; inline errors clear as you type. Only when
  both pass does the flyout flip to its sent state.
- **Confirmation** — on success the body swaps to a \`<Confirmation>\` that
  names the friend and explains you'll both be eligible for the dining
  experience once they take delivery.
- **Reset on close** — closing clears the name, email, note, errors and sent
  state ~340ms later (after the exit animation), so reopening starts fresh.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Required fields are marked and errors are associated with their inputs via
  \`<TextField>\`.
        `.trim()}}}};function u(){const{open:o}=d();return l.useEffect(()=>{o("refer-friend")},[o]),r.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Refer a friend flyout opens automatically — fill it in on the right."})}const e={name:"Open by default",render:()=>r.jsx(u,{})},t={name:"Static preview",render:()=>r.jsx(m,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var a,n,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var i,c,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <ReferFriendFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const q=["Default","StaticPreview"];export{e as Default,t as StaticPreview,q as __namedExportsOrder,T as default};
