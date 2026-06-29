import{j as a}from"./jsx-runtime-BYYWji4R.js";import{P as o}from"./PointsSparkline-Cgey1rfm.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const h={title:"Visualisation/PointsSparkline",component:o,parameters:{layout:"padded",docs:{description:{component:`
Compact points-earned sparkline on the Profile Encore Membership card.

### Anatomy

- Gradient area fill (currentColor 32% → 0%).
- 1.4px stroke line.
- End-point emphasised, prior months smaller.
- Caption row: "Month · N pts earned" left, delta vs start of series right.

### Props

- \`data\` — array of numbers (defaults to a sample 12-month series).
- \`height\` — number, default 72.

### Tinting

The whole SVG inherits \`currentColor\` from the parent. We tint it clay
(\`--ld-color-lexus-clay-400\`) to track tier identity. Drop it in any other
context and it will tint with whatever the parent's color is.

### Accessibility

- Wrapped in \`<figure role="figure">\` with an \`aria-label\` summarising the
  series.
- \`<figcaption>\` carries the textual data so SR users get the headline.
        `.trim()}}}},r={render:()=>a.jsx("div",{style:{width:360,padding:16,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",color:"var(--ld-color-lexus-clay-400)"},children:a.jsx(o,{})})},e={name:"Custom series",render:()=>a.jsx("div",{style:{width:360,padding:16,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",color:"var(--accent)"},children:a.jsx(o,{data:[100,240,180,320,420,380,510]})})};var t,s,i;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360,
    padding: 16,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    color: "var(--ld-color-lexus-clay-400)"
  }}>
      <PointsSparkline />
    </div>
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var n,d,l;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Custom series",
  render: () => <div style={{
    width: 360,
    padding: 16,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    color: "var(--accent)"
  }}>
      <PointsSparkline data={[100, 240, 180, 320, 420, 380, 510]} />
    </div>
}`,...(l=(d=e.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const v=["Default","ShorterSeries"];export{r as Default,e as ShorterSeries,v as __namedExportsOrder,h as default};
