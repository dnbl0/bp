import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as l}from"./index-ClcD9ViR.js";import{f as u,u as d}from"./FlyoutProvider-8hBwW8GN.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./icons-CO6p2nHe.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";const z={title:"Flyouts/Settings",parameters:{layout:"fullscreen",docs:{description:{component:`
Preferences hub for the authenticated My Lexus experience — appearance
controls plus deep-links into the other account flyouts.

### Behaviour

- **Appearance** — three radio options (Dark, Light, Auto) write to
  \`data-theme\` on the document root. Choices persist in \`localStorage\`
  under \`lexus.theme\`, so the palette survives reloads.
- **Text size** — Default / Large / Extra large radios scale all text via
  \`data-text-size\`, persisted under \`lexus.textSize\` (12% and 25% bumps).
- **Preferences rows** — tappable rows open sibling flyouts: Preferred dealer
  (shows the current dealer name), Personal details, and Payment methods.
  Each replaces the Settings flyout with the chosen surface.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Appearance and text-size groups use real radio inputs via \`<Radio>\`,
  so arrow-key navigation and grouped labelling work natively.
- Preference rows are \`<button>\` elements with descriptive labels and a
  trailing call-to-action ("Change", "Edit", "Manage").
        `.trim()}}}};function m(){const{open:a}=d();return l.useEffect(()=>{a("settings",{})},[a]),r.jsx("p",{style:{color:"var(--fg-muted)"},children:"The Settings flyout opens automatically — interact with it on the right."})}const e={name:"Open by default",render:()=>r.jsx(m,{})},t={name:"Static preview",render:()=>r.jsx(u,{open:!0}),parameters:{docs:{description:{story:"Static render that bypasses the open/close animation, useful for visual regression review."}}}};var s,o,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Open by default",
  render: () => <Opener />
}`,...(n=(o=e.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var i,p,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Static preview",
  render: () => <SettingsFlyout open />,
  parameters: {
    docs: {
      description: {
        story: "Static render that bypasses the open/close animation, useful for visual regression review."
      }
    }
  }
}`,...(c=(p=t.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const A=["Default","StaticPreview"];export{e as Default,t as StaticPreview,A as __namedExportsOrder,z as default};
