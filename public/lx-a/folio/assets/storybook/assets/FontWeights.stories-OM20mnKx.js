import{j as t}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const f={title:"Foundations/Font weights",parameters:{docs:{description:{component:`
The Lexus Design System ships three weights, exposed as
\`--ld-font-weights-*\`:

- \`--ld-font-weights-book\` (300) — body copy and most Nobel display text.
- \`--ld-font-weights-regular\` (400) — labels and slightly firmer headings.
- \`--ld-font-weights-bold\` (700) — uppercase labels / emphasis.

The prototype's 300 and 400 weights are routed through these tokens. It also
uses **500 / 600** for non-Nobel UI text (counters, dense controls) — those
sit outside the DS weight set and stay as literals by design.
        `.trim()}}}},c='ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',m=[{token:"--ld-font-weights-book",n:300,note:"Book — body & display"},{token:"--ld-font-weights-regular",n:400,note:"Regular — labels"},{token:"--ld-font-weights-bold",n:700,note:"Bold — emphasis"}],s={name:"DS weights",render:()=>t.jsx("div",{className:"sb-stack",style:{gap:24,maxWidth:720},children:m.map(e=>t.jsxs("div",{className:"sb-stack",style:{gap:4},children:[t.jsxs("span",{style:{fontFamily:"var(--font-display)",fontWeight:`var(${e.token})`,fontSize:30,color:"var(--fg-strong)"},children:["Lexus Encore — ",e.note]}),t.jsxs("code",{style:{fontFamily:c,fontSize:12,color:"var(--fg-muted)"},children:[e.token," · ",e.n]})]},e.token))})},n={name:"UI weights (off-scale)",render:()=>t.jsx("div",{className:"sb-stack",style:{gap:16,maxWidth:720},children:[500,600].map(e=>t.jsxs("div",{className:"sb-stack",style:{gap:4},children:[t.jsxs("span",{style:{fontFamily:"var(--font-body)",fontWeight:e,fontSize:18,color:"var(--fg)"},children:["Dense UI text at weight ",e]}),t.jsxs("code",{style:{fontFamily:c,fontSize:12,color:"var(--fg-dim)"},children:["literal ",e," — outside the DS weight set"]})]},e))}),parameters:{docs:{description:{story:"500/600 are used for compact non-Nobel UI text and are intentionally kept as literals — the DS weight scale stops at book/regular/bold."}}}};var o,a,r;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "DS weights",
  render: () => <div className="sb-stack" style={{
    gap: 24,
    maxWidth: 720
  }}>
      {WEIGHTS.map(w => <div key={w.token} className="sb-stack" style={{
      gap: 4
    }}>
          <span style={{
        fontFamily: "var(--font-display)",
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
}`,...(r=(a=s.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};var i,l,d;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "UI weights (off-scale)",
  render: () => <div className="sb-stack" style={{
    gap: 16,
    maxWidth: 720
  }}>
      {[500, 600].map(n => <div key={n} className="sb-stack" style={{
      gap: 4
    }}>
          <span style={{
        fontFamily: "var(--font-body)",
        fontWeight: n as React.CSSProperties["fontWeight"],
        fontSize: 18,
        color: "var(--fg)"
      }}>
            Dense UI text at weight {n}
          </span>
          <code style={{
        fontFamily: mono,
        fontSize: 12,
        color: "var(--fg-dim)"
      }}>
            literal {n} — outside the DS weight set
          </code>
        </div>)}
    </div>,
  parameters: {
    docs: {
      description: {
        story: "500/600 are used for compact non-Nobel UI text and are intentionally kept as literals — the DS weight scale stops at book/regular/bold."
      }
    }
  }
}`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const y=["Weights","OffScale"];export{n as OffScale,s as Weights,y as __namedExportsOrder,f as default};
