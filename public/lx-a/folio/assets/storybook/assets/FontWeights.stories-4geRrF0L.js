import{j as t}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const h={title:"Foundations/Font weights",parameters:{docs:{description:{component:`
The Lexus Design System ships three weights, carried by each typography
style's \`*-font-weight\` token:

- **300 (book)** — \`--ld-s-typography-body1-font-weight\`; body copy and most
  Nobel display text.
- **400 (regular)** — \`--ld-s-typography-label2-font-weight\`; labels and
  slightly firmer headings.
- **700 (bold)** — \`--ld-s-typography-label1-font-weight\`; uppercase labels /
  emphasis.

These are the only weights in the system — all UI text routes through one of
these typography tokens.
        `.trim()}}}},r='ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',l=[{token:"--ld-s-typography-body1-font-weight",n:300,note:"Book — body & display"},{token:"--ld-s-typography-label2-font-weight",n:400,note:"Regular — labels"},{token:"--ld-s-typography-label1-font-weight",n:700,note:"Bold — emphasis"}],o={name:"DS weights",render:()=>t.jsx("div",{className:"sb-stack",style:{gap:24,maxWidth:720},children:l.map(e=>t.jsxs("div",{className:"sb-stack",style:{gap:4},children:[t.jsxs("span",{style:{fontFamily:"var(--ld-s-typography-heading1-font-family)",fontWeight:`var(${e.token})`,fontSize:30,color:"var(--fg-strong)"},children:["Lexus Encore — ",e.note]}),t.jsxs("code",{style:{fontFamily:r,fontSize:12,color:"var(--fg-muted)"},children:[e.token," · ",e.n]})]},e.token))})};var n,s,a;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "DS weights",
  render: () => <div className="sb-stack" style={{
    gap: 24,
    maxWidth: 720
  }}>
      {WEIGHTS.map(w => <div key={w.token} className="sb-stack" style={{
      gap: 4
    }}>
          <span style={{
        fontFamily: "var(--ld-s-typography-heading1-font-family)",
        fontWeight: \`var(\${w.token})\` as React.CSSProperties["fontWeight"],
        fontSize: 30,
        color: "var(--fg-strong)"
      }}>
            Lexus Encore — {w.note}
          </span>
          <code style={{
        fontFamily: mono,
        fontSize: 12,
        color: "var(--fg-muted)"
      }}>
            {w.token} · {w.n}
          </code>
        </div>)}
    </div>
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const y=["Weights"];export{o as Weights,y as __namedExportsOrder,h as default};
