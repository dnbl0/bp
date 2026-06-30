import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as b}from"./index-ClcD9ViR.js";import{F as d}from"./Flyout-D4L2FAUu.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-CO6p2nHe.js";const j={title:"Patterns/Flyout",component:d,parameters:{layout:"padded",docs:{description:{component:`
Right-anchored slide-out panel — the workhorse pattern for the entire
authenticated experience.

### What it handles

- Enter / exit animation (\`--ease-emphasized\` over \`--dur-3\`).
- Scrim with blur, click-to-close.
- Esc-to-close and body-scroll lock.
- Focus trap (Tab cycles inside; Shift+Tab too).
- Initial focus on the close button.
- Focus restore on close (returns focus to the launcher).
- Optional Go-back affordance.
- Standard header / body / footer layout.

### Props

- \`open\` — boolean, drives the animation.
- \`title\` — header text (uppercase tracked).
- \`heading\` — large in-body title.
- \`description\` — supporting copy.
- \`footer\` — sticky footer slot (typically a primary + ghost action pair).
- \`onClose\` / \`onBack\` — required close handler; optional back handler.

### Accessibility

- \`role="dialog"\` \`aria-modal="true"\`.
- \`aria-labelledby\` when \`heading\` is provided, falls back to \`aria-label\`
  with the title.
- Focus trap and restore are built in — no caller-side work needed.

### Specs

- Width: \`min(400px, 100vw)\`.
- Full \`100dvh\` height (no chrome on iOS).
- Shadow: \`var(--shadow-lg)\`.
        `.trim()}}}};function u({title:p,heading:h,description:m,withFooter:f=!0}){const[y,o]=b.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",className:"btn btn--primary",onClick:()=>o(!0),children:"Open flyout"}),e.jsx(d,{open:y,title:p,heading:h,description:m,onClose:()=>o(!1),footer:f?e.jsxs("div",{className:"flyout__actions",children:[e.jsx("button",{type:"button",className:"btn btn--primary",onClick:()=>o(!1),children:"Confirm"}),e.jsx("button",{type:"button",className:"btn btn--ghost",onClick:()=>o(!1),children:"Cancel"})]}):void 0,children:e.jsx("p",{style:{margin:0,color:"var(--fg-muted)"},children:"Body content goes here. The flyout handles focus trap, scroll-lock, Esc-to-close and focus restore automatically."})})]})}const t={render:()=>e.jsx(u,{title:"Settings",heading:"Preferences",description:"Tailor how My Lexus looks and how we reach you."})},r={name:"Without footer",render:()=>e.jsx(u,{title:"Manuals & resources",heading:"2024 NX 450h+ manuals",description:"Operating guides, warranty and connected-services help.",withFooter:!1})};var a,s,n;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <Demo title="Settings" heading="Preferences" description="Tailor how My Lexus looks and how we reach you." />
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var i,l,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Without footer",
  render: () => <Demo title="Manuals & resources" heading="2024 NX 450h+ manuals" description="Operating guides, warranty and connected-services help." withFooter={false} />
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const v=["Default","NoFooter"];export{t as Default,r as NoFooter,v as __namedExportsOrder,j as default};
