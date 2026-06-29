import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const b={title:"Foundations/Motion",parameters:{docs:{description:{component:`
Motion is restrained — there is one signature curve (\`--ease-emphasized\`)
that handles meaningful state changes (flyouts opening, primary CTAs, hero
reveals). Other curves are used for narrower roles.

### Eases

- \`--ease-emphasized\` — meaningful state change (flyout, panel reveal).
- \`--ease-decelerate\` — content entering the viewport.
- \`--ease-standard\` — everyday hover/focus baseline.
- \`--ease-sharp\` — toggles and snaps.

### Durations

- \`--dur-1\` 140ms · sharp affordances.
- \`--dur-2\` 240ms · default.
- \`--dur-3\` 360ms · flyout, section change.
- \`--dur-4\` 560ms · showcase reveals (hero, celebration).

### Accessibility

All animations respect \`prefers-reduced-motion: reduce\` — the section fade,
the carousel slide, the typing indicator, and the reveal-in stagger all
collapse to none.
        `.trim()}}}};function a({token:s,label:i}){return e.jsxs("div",{className:"sb-tile",children:[e.jsx("span",{className:"sb-tile__label",children:i}),e.jsx("code",{className:"sb-tile__value",children:s}),e.jsx("div",{className:"sb-tile__preview",style:{minHeight:56,position:"relative",overflow:"hidden"},children:e.jsx("div",{style:{width:36,height:36,borderRadius:"var(--radius-pill)",background:"var(--accent)",animation:`previewMotion 2.2s var(${s}) infinite`}})}),e.jsx("style",{children:`
        @keyframes previewMotion {
          0%, 10% { transform: translateX(0); }
          50%     { transform: translateX(140px); }
          90%, 100% { transform: translateX(0); }
        }
      `})]})}const r={name:"Eases",render:()=>e.jsxs("div",{className:"sb-grid",children:[e.jsx(a,{token:"--ease-emphasized",label:"Emphasized"}),e.jsx(a,{token:"--ease-decelerate",label:"Decelerate"}),e.jsx(a,{token:"--ease-standard",label:"Standard"}),e.jsx(a,{token:"--ease-sharp",label:"Sharp"})]})},n={name:"Durations",render:()=>e.jsx("div",{className:"sb-stack",style:{maxWidth:480},children:[{t:"--dur-1",ms:"140ms",use:"Sharp affordances · toggle snap"},{t:"--dur-2",ms:"240ms",use:"Hover, focus, baseline"},{t:"--dur-3",ms:"360ms",use:"Flyout, section change"},{t:"--dur-4",ms:"560ms",use:"Showcase reveal"}].map(({t:s,ms:i,use:h})=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"140px 60px 1fr",gap:16,alignItems:"center",padding:"8px 0",borderBottom:"1px solid var(--border)"},children:[e.jsx("code",{className:"sb-tile__value",children:s}),e.jsx("span",{style:{color:"var(--fg-muted)",fontSize:12},children:i}),e.jsx("span",{style:{color:"var(--fg)",fontSize:13},children:h})]},s))})},t={name:"Reveal-in stagger",render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,maxWidth:540},children:[0,1,2,3,4,5].map(s=>e.jsxs("div",{className:"reveal-in",style:{"--reveal-i":s,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",padding:16,fontSize:"var(--text-sm)",color:"var(--fg)"},children:["Item ",s+1]},s))},Math.random()),parameters:{docs:{description:{story:"Apply `.reveal-in` and set `--reveal-i` per child to stagger their entry by 60ms × index. Honours `prefers-reduced-motion`."}}}};var o,d,l;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Eases",
  render: () => <div className="sb-grid">
      <MotionTile token="--ease-emphasized" label="Emphasized" />
      <MotionTile token="--ease-decelerate" label="Decelerate" />
      <MotionTile token="--ease-standard" label="Standard" />
      <MotionTile token="--ease-sharp" label="Sharp" />
    </div>
}`,...(l=(d=r.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var c,m,p;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Durations",
  render: () => <div className="sb-stack" style={{
    maxWidth: 480
  }}>
      {[{
      t: "--dur-1",
      ms: "140ms",
      use: "Sharp affordances · toggle snap"
    }, {
      t: "--dur-2",
      ms: "240ms",
      use: "Hover, focus, baseline"
    }, {
      t: "--dur-3",
      ms: "360ms",
      use: "Flyout, section change"
    }, {
      t: "--dur-4",
      ms: "560ms",
      use: "Showcase reveal"
    }].map(({
      t,
      ms,
      use
    }) => <div key={t} style={{
      display: "grid",
      gridTemplateColumns: "140px 60px 1fr",
      gap: 16,
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid var(--border)"
    }}>
          <code className="sb-tile__value">{t}</code>
          <span style={{
        color: "var(--fg-muted)",
        fontSize: 12
      }}>{ms}</span>
          <span style={{
        color: "var(--fg)",
        fontSize: 13
      }}>{use}</span>
        </div>)}
    </div>
}`,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,v,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "Reveal-in stagger",
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    maxWidth: 540
  }} key={Math.random()}>
      {[0, 1, 2, 3, 4, 5].map(i => <div key={i} className="reveal-in" style={{
      ["--reveal-i" as keyof React.CSSProperties]: i,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      padding: 16,
      fontSize: "var(--text-sm)",
      color: "var(--fg)"
    } as React.CSSProperties}>
          Item {i + 1}
        </div>)}
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Apply \`.reveal-in\` and set \`--reveal-i\` per child to stagger their entry by 60ms × index. Honours \`prefers-reduced-motion\`."
      }
    }
  }
}`,...(g=(v=t.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};const S=["Eases","Durations","RevealInStagger"];export{n as Durations,r as Eases,t as RevealInStagger,S as __namedExportsOrder,b as default};
