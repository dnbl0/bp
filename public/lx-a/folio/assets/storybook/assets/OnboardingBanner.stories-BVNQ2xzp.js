import{j as r}from"./jsx-runtime-BYYWji4R.js";import{O as t}from"./OnboardingBanner-DTl15lW1.js";import{a as n}from"./accounts-BIvvDVsT.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-CO6p2nHe.js";import"./usePersistedState-Bg2-979L.js";import"./dashboard-PpIkkDYV.js";import"./vehicles-Dg4r7W26.js";import"./profile-D1_2poo4.js";const h={title:"Composition/OnboardingBanner",component:t,parameters:{layout:"padded",docs:{description:{component:`
Anniversary / welcome moment surfaced once per identifier — anniversary year
or first-visit welcome. Tier-tinted (Platinum clay), dismissible, persists
the dismissal in localStorage.

### When it shows

- \`years >= 1\` → "N years with Encore" anniversary copy.
- \`years < 1\` → "Welcome to Encore" first-visit copy.

### Accessibility

- \`role="status"\` so SR users hear it on first render.
- Dismiss button has \`aria-label="Dismiss"\` and a focus ring on the icon.
- Animation honours \`prefers-reduced-motion\`.
        `.trim()}}}},e={render:()=>r.jsx("div",{style:{maxWidth:920},children:r.jsx(t,{member:n.owner.member})})};var o,s,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 920
  }}>
      <OnboardingBanner member={accounts.owner.member} />
    </div>
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const v=["Default"];export{e as Default,v as __namedExportsOrder,h as default};
