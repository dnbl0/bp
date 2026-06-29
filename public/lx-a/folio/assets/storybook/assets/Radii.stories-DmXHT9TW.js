import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const g={title:"Foundations/Radii",parameters:{docs:{description:{component:"\nBorder radius is the Lexus Design System scale, exposed as\n`--ld-s-border-radius-*` (none · small · medium · extra-medium · large ·\nextra-large · rounded). It runs tight — 3px to 8px — plus a `rounded` pill.\n\nThe prototype's legacy aliases map onto it, so existing code keeps working:\n\n- `--radius-sm` → `--ld-s-border-radius-small` (3px) — inputs, kbd, tight frames.\n- `--radius-md` → `--ld-s-border-radius-medium` (5px) — cards, popovers, the dominant container shape.\n- `--radius-lg` → `--ld-s-border-radius-extra-large` (8px) — modals, command palette.\n- `--radius-pill` → `--ld-s-border-radius-rounded` (999px) — chips, avatars, round buttons, segmented tabs.\n\nPrefer the `--ld-s-border-radius-*` tokens directly in new work. If a corner\nradius doesn't land on the scale, the component shape probably needs a rethink\n(the one sanctioned exception is the chat bubble's bespoke 14px).\n        ".trim()}}}},p=[{token:"--ld-s-border-radius-none",label:"none · 0"},{token:"--ld-s-border-radius-small",label:"small · 3px",alias:"--radius-sm"},{token:"--ld-s-border-radius-medium",label:"medium · 5px",alias:"--radius-md"},{token:"--ld-s-border-radius-extra-medium",label:"extra-medium · 6px"},{token:"--ld-s-border-radius-large",label:"large · 7px"},{token:"--ld-s-border-radius-extra-large",label:"extra-large · 8px",alias:"--radius-lg"},{token:"--ld-s-border-radius-rounded",label:"rounded · 999px",alias:"--radius-pill"}],n='ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',a={name:"The scale",render:()=>e.jsx("div",{className:"sb-row",style:{flexWrap:"wrap",gap:24},children:p.map(r=>e.jsxs("div",{className:"sb-stack",style:{gap:8,width:150},children:[e.jsx("div",{style:{width:150,height:90,background:"var(--surface-raised)",border:"1px solid var(--border-strong)",borderRadius:`var(${r.token})`}}),e.jsx("span",{style:{fontSize:12,color:"var(--fg)"},children:r.label}),e.jsx("code",{style:{fontFamily:n,fontSize:11,color:"var(--fg-muted)"},children:r.token}),r.alias&&e.jsxs("code",{style:{fontFamily:n,fontSize:11,color:"var(--fg-dim)"},children:["alias ",r.alias]})]},r.token))})},s={name:"On real shapes",render:()=>e.jsxs("div",{className:"sb-row",style:{gap:16,alignItems:"flex-start"},children:[e.jsx("button",{type:"button",style:{padding:"10px 20px",background:"var(--accent)",color:"var(--fg-on-accent)",border:"none",borderRadius:"var(--radius-sm)",fontSize:13},children:"Button · small"}),e.jsx("div",{style:{padding:"var(--space-5)",width:200,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",color:"var(--fg-muted)",fontSize:13},children:"Card surface · medium"}),e.jsx("span",{style:{padding:"6px 14px",background:"var(--surface-raised)",border:"1px solid var(--border-strong)",borderRadius:"var(--radius-pill)",color:"var(--fg)",fontSize:12},children:"Chip · rounded"})]})};var d,o,t;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "The scale",
  render: () => <div className="sb-row" style={{
    flexWrap: "wrap",
    gap: 24
  }}>
      {SCALE.map(s => <div key={s.token} className="sb-stack" style={{
      gap: 8,
      width: 150
    }}>
          <div style={{
        width: 150,
        height: 90,
        background: "var(--surface-raised)",
        border: "1px solid var(--border-strong)",
        borderRadius: \`var(\${s.token})\`
      }} />
          <span style={{
        fontSize: 12,
        color: "var(--fg)"
      }}>{s.label}</span>
          <code style={{
        fontFamily: mono,
        fontSize: 11,
        color: "var(--fg-muted)"
      }}>
            {s.token}
          </code>
          {s.alias && <code style={{
        fontFamily: mono,
        fontSize: 11,
        color: "var(--fg-dim)"
      }}>
              alias {s.alias}
            </code>}
        </div>)}
    </div>
}`,...(t=(o=a.parameters)==null?void 0:o.docs)==null?void 0:t.source}}};var i,l,c;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "On real shapes",
  render: () => <div className="sb-row" style={{
    gap: 16,
    alignItems: "flex-start"
  }}>
      <button type="button" style={{
      padding: "10px 20px",
      background: "var(--accent)",
      color: "var(--fg-on-accent)",
      border: "none",
      borderRadius: "var(--radius-sm)",
      fontSize: 13
    }}>
        Button · small
      </button>
      <div style={{
      padding: "var(--space-5)",
      width: 200,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      color: "var(--fg-muted)",
      fontSize: 13
    }}>
        Card surface · medium
      </div>
      <span style={{
      padding: "6px 14px",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-pill)",
      color: "var(--fg)",
      fontSize: 12
    }}>
        Chip · rounded
      </span>
    </div>
}`,...(c=(l=s.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const x=["Scale","InContext"];export{s as InContext,a as Scale,x as __namedExportsOrder,g as default};
