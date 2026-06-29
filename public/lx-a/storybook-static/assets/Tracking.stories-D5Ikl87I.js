import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const d={title:"Foundations/Tracking",parameters:{docs:{description:{component:"\nA small letter-spacing scale used wherever text is uppercased — eyebrows,\nchips, button labels, micro-labels. Match the value to the size:\n\n- 10–11px text → `--tracking-eyebrow` or stronger.\n- 12px text → `--tracking-wide` or `--tracking-wider`.\n- 14px+ uppercase → `--tracking-base` or `--tracking-tight`.\n\nNever tracked: editorial display headings (Cormorant). The serif handles its\nown spacing.\n        ".trim()}}}},i=[{token:"--tracking-tight",value:"0.4px"},{token:"--tracking-base",value:"1px"},{token:"--tracking-wide",value:"1.4px"},{token:"--tracking-wider",value:"1.6px"},{token:"--tracking-eyebrow",value:"2px"},{token:"--tracking-eyebrow-strong",value:"2.4px"}],t={name:"Scale",render:()=>e.jsx("div",{className:"sb-stack",style:{maxWidth:720},children:i.map(({token:r,value:o})=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"220px 60px 1fr",gap:16,alignItems:"center",padding:"8px 0",borderBottom:"1px solid var(--border)"},children:[e.jsx("code",{className:"sb-tile__value",children:r}),e.jsx("span",{style:{color:"var(--fg-muted)",fontSize:12},children:o}),e.jsx("span",{style:{fontSize:"var(--text-sm)",textTransform:"uppercase",color:"var(--fg-strong)",letterSpacing:`var(${r})`},children:"Encore Platinum"})]},r))})};var a,n,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Scale",
  render: () => <div className="sb-stack" style={{
    maxWidth: 720
  }}>
      {TRACK.map(({
      token,
      value
    }) => <div key={token} style={{
      display: "grid",
      gridTemplateColumns: "220px 60px 1fr",
      gap: 16,
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid var(--border)"
    }}>
          <code className="sb-tile__value">{token}</code>
          <span style={{
        color: "var(--fg-muted)",
        fontSize: 12
      }}>
            {value}
          </span>
          <span style={{
        fontSize: "var(--text-sm)",
        textTransform: "uppercase",
        color: "var(--fg-strong)",
        letterSpacing: \`var(\${token})\`
      }}>
            Encore Platinum
          </span>
        </div>)}
    </div>
}`,...(s=(n=t.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const m=["Scale"];export{t as Scale,m as __namedExportsOrder,d as default};
