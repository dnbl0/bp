import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const c={title:"Foundations/Tracking",parameters:{docs:{description:{component:"\nA small letter-spacing scale used wherever text is uppercased — eyebrows,\nchips, button labels, micro-labels. Match the value to the size:\n\n- 10–11px text → `--ld-s-typography-label1-letter-spacing` or stronger.\n- 12px text → `--ld-s-typography-label1-letter-spacing` or `--ld-s-typography-heading5-letter-spacing`.\n- 14px+ uppercase → `--ld-s-typography-label2-letter-spacing` or `--ld-s-typography-heading6-letter-spacing`.\n\nNever tracked: editorial display headings (Cormorant). The serif handles its\nown spacing.\n        ".trim()}}}},p=[{token:"--ld-s-typography-heading6-letter-spacing",value:"0.4px"},{token:"--ld-s-typography-label2-letter-spacing",value:"1px"},{token:"--ld-s-typography-label1-letter-spacing",value:"1.4px"},{token:"--ld-s-typography-heading5-letter-spacing",value:"1.6px"},{token:"--ld-s-typography-label1-letter-spacing",value:"2px"},{token:"--ld-s-typography-label1-letter-spacing",value:"2.4px"}],a={name:"Scale",render:()=>e.jsx("div",{className:"sb-stack",style:{maxWidth:720},children:p.map(({token:t,value:l})=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"220px 60px 1fr",gap:16,alignItems:"center",padding:"8px 0",borderBottom:"1px solid var(--border)"},children:[e.jsx("code",{className:"sb-tile__value",children:t}),e.jsx("span",{style:{color:"var(--fg-muted)",fontSize:12},children:l}),e.jsx("span",{style:{fontSize:"var(--ld-s-typography-body2-font-size)",textTransform:"uppercase",color:"var(--fg-strong)",letterSpacing:`var(${t})`},children:"Encore Platinum"})]},t))})};var r,n,s;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
        fontSize: "var(--ld-s-typography-body2-font-size)",
        textTransform: "uppercase",
        color: "var(--fg-strong)",
        letterSpacing: \`var(\${token})\`
      }}>
            Encore Platinum
          </span>
        </div>)}
    </div>
}`,...(s=(n=a.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const g=["Scale"];export{a as Scale,g as __namedExportsOrder,c as default};
