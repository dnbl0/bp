import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const m={title:"Foundations/Opacity",parameters:{docs:{description:{component:"\nThe Lexus DS opacity tokens, `--ld-s-opacity-*`:\n\n- `--ld-s-opacity-disabled` (0.5) — the standard dim for disabled controls.\n- `--ld-s-opacity-overlay` (0.8) — heavy overlay / dialog scrim coverage.\n\nThese drive component-level tokens (e.g. `--ld-c-form-disabled` and\n`--ld-c-input-border-disabled` both resolve to the disabled value).\n        ".trim()}}}},l='ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',p=[{token:"--ld-s-opacity-disabled",v:"0.5",note:"Disabled controls"},{token:"--ld-s-opacity-overlay",v:"0.8",note:"Overlay / scrim"}],o={name:"Opacity tokens",render:()=>e.jsx("div",{className:"sb-row",style:{gap:24},children:p.map(n=>e.jsxs("div",{className:"sb-stack",style:{gap:8,width:200},children:[e.jsx("div",{style:{position:"relative",height:110,borderRadius:"var(--radius-md)",overflow:"hidden",border:"1px solid var(--border-strong)",background:"repeating-conic-gradient(var(--surface-raised) 0% 25%, var(--surface) 0% 50%) 50% / 20px 20px"},children:e.jsx("div",{style:{position:"absolute",inset:0,background:"var(--accent)",opacity:`var(${n.token})`}})}),e.jsxs("span",{style:{fontSize:13,color:"var(--fg)"},children:[n.note," · ",n.v]}),e.jsx("code",{style:{fontFamily:l,fontSize:11,color:"var(--fg-muted)"},children:n.token})]},n.token))})},a={name:"Disabled, in context",render:()=>e.jsxs("div",{className:"sb-row",style:{gap:16},children:[e.jsx("button",{type:"button",style:{padding:"10px 20px",background:"var(--accent)",color:"var(--fg-on-accent)",border:"none",borderRadius:"var(--radius-sm)",fontSize:13},children:"Enabled"}),e.jsx("button",{type:"button",disabled:!0,style:{padding:"10px 20px",background:"var(--accent)",color:"var(--fg-on-accent)",border:"none",borderRadius:"var(--radius-sm)",fontSize:13,opacity:"var(--ld-s-opacity-disabled)",cursor:"not-allowed"},children:"Disabled · opacity-disabled"})]})};var r,t,s;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  name: "Opacity tokens",
  render: () => <div className="sb-row" style={{
    gap: 24
  }}>
      {TOKENS.map(t => <div key={t.token} className="sb-stack" style={{
      gap: 8,
      width: 200
    }}>
          <div style={{
        position: "relative",
        height: 110,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--border-strong)",
        background: "repeating-conic-gradient(var(--surface-raised) 0% 25%, var(--surface) 0% 50%) 50% / 20px 20px"
      }}>
            <div style={{
          position: "absolute",
          inset: 0,
          background: "var(--accent)",
          opacity: \`var(\${t.token})\`
        }} />
          </div>
          <span style={{
        fontSize: 13,
        color: "var(--fg)"
      }}>
            {t.note} · {t.v}
          </span>
          <code style={{
        fontFamily: mono,
        fontSize: 11,
        color: "var(--fg-muted)"
      }}>
            {t.token}
          </code>
        </div>)}
    </div>
}`,...(s=(t=o.parameters)==null?void 0:t.docs)==null?void 0:s.source}}};var d,i,c;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Disabled, in context",
  render: () => <div className="sb-row" style={{
    gap: 16
  }}>
      <button type="button" style={{
      padding: "10px 20px",
      background: "var(--accent)",
      color: "var(--fg-on-accent)",
      border: "none",
      borderRadius: "var(--radius-sm)",
      fontSize: 13
    }}>
        Enabled
      </button>
      <button type="button" disabled style={{
      padding: "10px 20px",
      background: "var(--accent)",
      color: "var(--fg-on-accent)",
      border: "none",
      borderRadius: "var(--radius-sm)",
      fontSize: 13,
      opacity: "var(--ld-s-opacity-disabled)",
      cursor: "not-allowed"
    }}>
        Disabled · opacity-disabled
      </button>
    </div>
}`,...(c=(i=a.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const y=["Tokens","DisabledInContext"];export{a as DisabledInContext,o as Tokens,y as __namedExportsOrder,m as default};
