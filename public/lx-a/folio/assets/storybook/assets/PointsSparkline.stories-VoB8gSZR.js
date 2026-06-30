import{j as e}from"./jsx-runtime-BYYWji4R.js";import{P as n}from"./PointsSparkline-Cgey1rfm.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const g={title:"Visualisation/PointsSparkline",component:n,parameters:{layout:"padded",docs:{description:{component:`
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
        `.trim()}}}},r={render:()=>e.jsxs("div",{style:{width:"100%",maxWidth:360,margin:"0 auto",padding:24,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-lg)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:16},children:[e.jsx("span",{style:{fontSize:"var(--ld-s-typography-label1-font-size)",letterSpacing:"var(--ld-s-typography-label1-letter-spacing)",textTransform:"uppercase",color:"var(--fg-muted)"},children:"Encore points"}),e.jsx("span",{style:{fontSize:"1.9rem",fontWeight:700,letterSpacing:"-0.02em",color:"var(--fg-strong)"},children:"2,580"})]}),e.jsx("div",{style:{color:"var(--ld-color-lexus-clay-400)"},children:e.jsx(n,{})})]})},a={name:"Custom series",render:()=>e.jsx("div",{style:{width:"100%",maxWidth:360,margin:"0 auto",padding:16,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",color:"var(--accent)"},children:e.jsx(n,{data:[100,240,180,320,420,380,510]})})};var t,s,o;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <div style={{
    width: "100%",
    maxWidth: 360,
    margin: "0 auto",
    padding: 24,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)"
  }}>
      <div style={{
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 16
    }}>
        <span style={{
        fontSize: "var(--ld-s-typography-label1-font-size)",
        letterSpacing: "var(--ld-s-typography-label1-letter-spacing)",
        textTransform: "uppercase",
        color: "var(--fg-muted)"
      }}>
          Encore points
        </span>
        <span style={{
        fontSize: "1.9rem",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: "var(--fg-strong)"
      }}>
          2,580
        </span>
      </div>
      <div style={{
      color: "var(--ld-color-lexus-clay-400)"
    }}>
        <PointsSparkline />
      </div>
    </div>
}`,...(o=(s=r.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var i,d,l;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Custom series",
  render: () => <div style={{
    width: "100%",
    maxWidth: 360,
    margin: "0 auto",
    padding: 16,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    color: "var(--accent)"
  }}>
      <PointsSparkline data={[100, 240, 180, 320, 420, 380, 510]} />
    </div>
}`,...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const h=["Default","ShorterSeries"];export{r as Default,a as ShorterSeries,h as __namedExportsOrder,g as default};
