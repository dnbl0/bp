import{j as t}from"./jsx-runtime-BYYWji4R.js";import{B as i}from"./BenefitCard-DKq2KvRn.js";import{b as o}from"./dashboard-Cb8hRV_-.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-DC4KyQ6f.js";const w={title:"Composition/BenefitCard",component:i,parameters:{layout:"centered",docs:{description:{component:`
Encore benefit tile shown in the dashboard grid and the BenefitsPage.

### Two modes

- **Interactive** — pass \`onClick\` and the card becomes a tab-stop \`role="button"\`,
  shows a chevron CTA, and lifts on hover.
- **Static** — omit \`onClick\` and the card is non-interactive, surfacing a
  muted "Learn more" label (no anchor).

### Accessibility

- Interactive cards announce as buttons. Keyboard activation via Enter / Space.
- Focus ring uses the accent outline at \`outline-offset: 2px\`.
- The image carries the benefit title as alt text.

### Specs

- Aspect ratio 16:10 media, \`--radius-md\` corners.
- Body padding: \`--space-6\` (22px historically).
- Hover lifts the card 4px and scales media 1.05× over 600ms.
        `.trim()}}}},v=o.find(e=>e.id==="valet"),b=o.find(e=>e.id==="on-demand"),a={render:()=>t.jsx("div",{style:{width:320},children:t.jsx(i,{benefit:v,ctaLabel:"Book now",onClick:()=>{}})})},n={render:()=>t.jsx("div",{style:{width:320},children:t.jsx(i,{benefit:b})})},r={name:"Three-up grid",render:()=>t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:24,maxWidth:1080},children:o.map(e=>t.jsx(i,{benefit:e,ctaLabel:e.id==="valet"?"Book now":"Redeem",onClick:e.id!=="on-demand"?()=>{}:void 0},e.id))}),parameters:{layout:"padded"}};var d,s,c;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 320
  }}>
      <BenefitCard benefit={valet} ctaLabel="Book now" onClick={() => {}} />
    </div>
}`,...(c=(s=a.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var m,p,l;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 320
  }}>
      <BenefitCard benefit={onDemand} />
    </div>
}`,...(l=(p=n.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var f,u,h;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Three-up grid",
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    maxWidth: 1080
  }}>
      {benefits.map(b => <BenefitCard key={b.id} benefit={b} ctaLabel={b.id === "valet" ? "Book now" : "Redeem"} onClick={b.id !== "on-demand" ? () => {} : undefined} />)}
    </div>,
  parameters: {
    layout: "padded"
  }
}`,...(h=(u=r.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const T=["Interactive","Static","ThreeUp"];export{a as Interactive,n as Static,r as ThreeUp,T as __namedExportsOrder,w as default};
