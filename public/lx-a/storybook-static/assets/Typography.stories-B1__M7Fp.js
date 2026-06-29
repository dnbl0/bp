import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const w={title:"Foundations/Typography",parameters:{docs:{description:{component:"\nTwo faces. **Cormorant Garamond** (`--font-display`) handles editorial\nheadings — hero titles, page titles, vehicle hero. **Nobel** (`--font-body`,\nwith Futura PT fallbacks) handles everything else. A constrained type ramp\nkeeps the product coherent.\n\n### Pairing rules\n\n- Editorial headings (`hero__title`, `page-title`, `vhero__title`,\n  `onboard__title`, `today__title`) — Cormorant, **mixed case**, zero\n  tracking, weight 300–400.\n- Eyebrows, chips, button labels — Nobel, **uppercase**, with a value from the\n  tracking scale (1.0px → 2.4px).\n- Body copy — Nobel, sentence case, line-height 1.5–1.7.\n\n### Tokens\n\n- **Text scale:** `--text-2xs` (10) → `--text-display-2xl` (52).\n- **Tracking scale:** `--tracking-tight` → `--tracking-eyebrow-strong`.\n\nAvoid one-off literals; if you need an in-between size, propose it in the\ntoken file.\n        ".trim()}}}},u=[{token:"--text-display-2xl",px:"52px",label:"Hero"},{token:"--text-display-xl",px:"46px",label:"Page title"},{token:"--text-display-lg",px:"40px",label:"Vehicle hero"},{token:"--text-display-md",px:"30px",label:"Display M"},{token:"--text-display-sm",px:"26px",label:"Display S"},{token:"--text-display-xs",px:"22px",label:"Display XS"},{token:"--text-display-2xs",px:"20px",label:"Display 2XS"},{token:"--text-xl",px:"18px",label:"Lede / module head"},{token:"--text-lg",px:"15px",label:"Card head"},{token:"--text-base",px:"14px",label:"Body"},{token:"--text-md",px:"13px",label:"Secondary body"},{token:"--text-sm",px:"12px",label:"Caption / chip"},{token:"--text-xs",px:"11px",label:"Eyebrow"},{token:"--text-2xs",px:"10px",label:"Micro label"}],n={name:"Type ramp",render:()=>e.jsx("div",{className:"sb-stack",children:u.map(({token:r,px:v,label:b})=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"180px 80px 1fr",gap:16,alignItems:"baseline",paddingBottom:12,borderBottom:"1px solid var(--border)"},children:[e.jsx("code",{style:{fontFamily:'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',fontSize:12,color:"var(--fg-muted)"},children:r}),e.jsx("span",{style:{color:"var(--fg-muted)",fontSize:12},children:v}),e.jsxs("span",{style:{fontFamily:"var(--font-body)",fontSize:`var(${r})`,color:"var(--fg-strong)"},children:[b," — the Lexus moves you forward"]})]},r))})},t={name:"Display face",render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsxs("p",{style:{fontFamily:"var(--font-display)",fontWeight:300,fontSize:"var(--text-display-2xl)",letterSpacing:0,lineHeight:1.05,margin:0,color:"var(--fg-strong)"},children:["Good morning,"," ",e.jsx("span",{style:{fontStyle:"italic"},children:"Susan"})]}),e.jsx("p",{style:{fontFamily:"var(--font-display)",fontWeight:400,fontSize:"var(--text-display-xl)",letterSpacing:0,margin:0,color:"var(--fg-strong)"},children:"Encore Benefits"}),e.jsx("p",{style:{fontFamily:"var(--font-display)",fontWeight:300,fontSize:"var(--text-display-lg)",letterSpacing:0,margin:0,color:"var(--fg-strong)"},children:"2024 NX 450h+ F Sport"})]}),parameters:{docs:{description:{story:"Cormorant Garamond reads best in **mixed case** at large sizes. Don't apply `text-transform: uppercase` to display headings."}}}},a={name:"Body face",render:()=>e.jsxs("div",{className:"sb-stack",style:{maxWidth:640},children:[e.jsx("p",{style:{margin:0,fontSize:"var(--text-base)"},children:"Body copy uses Nobel (with Futura PT, Avenir Next and Helvetica fallbacks). Line-height sits at 1.5–1.7 for paragraph content, tightening to 1.3 for compact UI text."}),e.jsx("p",{style:{margin:0,fontSize:"var(--text-md)",color:"var(--fg-muted)"},children:"Secondary body — captions, helper text, table values. One step down from the base size, with the same line-height."}),e.jsx("p",{style:{margin:0,fontSize:"var(--text-xs)",letterSpacing:"var(--tracking-wide)",textTransform:"uppercase",color:"var(--fg-muted)"},children:"Eyebrow — pairs with display headings to label a section"})]})},s={name:"Accessibility",render:()=>e.jsxs("div",{className:"sb-stack",style:{maxWidth:720},children:[e.jsxs("p",{style:{margin:0,fontSize:"var(--text-base)"},children:[e.jsx("strong",{children:"Line length:"})," body paragraphs cap at ~640px (~75ch) to keep lines comfortably scannable."]}),e.jsxs("p",{style:{margin:0,fontSize:"var(--text-base)"},children:[e.jsx("strong",{children:"Minimum sizes:"})," 10px (\\`--text-2xs\\`) is reserved for uppercase, tracked micro-labels with high contrast against surface. Don't use it for sentence case copy."]}),e.jsxs("p",{style:{margin:0,fontSize:"var(--text-base)"},children:[e.jsx("strong",{children:"Text-size preference:"})," users can scale all text via Settings → Text size. The root font-size grows 12.5% or 25% and every token-driven size inherits."]}),e.jsxs("p",{style:{margin:0,fontSize:"var(--text-base)"},children:[e.jsx("strong",{children:"Display face & screen readers:"})," Cormorant Garamond is used purely visually. Headings remain real \\`h1\\`/\\`h2\\` elements."]})]})};var o,i,l;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "Type ramp",
  render: () => <div className="sb-stack">
      {RAMP.map(({
      token,
      px,
      label
    }) => <div key={token} style={{
      display: "grid",
      gridTemplateColumns: "180px 80px 1fr",
      gap: 16,
      alignItems: "baseline",
      paddingBottom: 12,
      borderBottom: "1px solid var(--border)"
    }}>
          <code style={{
        fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
        fontSize: 12,
        color: "var(--fg-muted)"
      }}>
            {token}
          </code>
          <span style={{
        color: "var(--fg-muted)",
        fontSize: 12
      }}>{px}</span>
          <span style={{
        fontFamily: "var(--font-body)",
        fontSize: \`var(\${token})\`,
        color: "var(--fg-strong)"
      }}>
            {label} — the Lexus moves you forward
          </span>
        </div>)}
    </div>
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var p,c,d;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Display face",
  render: () => <div className="sb-stack">
      <p style={{
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: "var(--text-display-2xl)",
      letterSpacing: 0,
      lineHeight: 1.05,
      margin: 0,
      color: "var(--fg-strong)"
    }}>
        Good morning,{" "}
        <span style={{
        fontStyle: "italic"
      }}>Susan</span>
      </p>
      <p style={{
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: "var(--text-display-xl)",
      letterSpacing: 0,
      margin: 0,
      color: "var(--fg-strong)"
    }}>
        Encore Benefits
      </p>
      <p style={{
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: "var(--text-display-lg)",
      letterSpacing: 0,
      margin: 0,
      color: "var(--fg-strong)"
    }}>
        2024 NX 450h+ F Sport
      </p>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Cormorant Garamond reads best in **mixed case** at large sizes. Don't apply \`text-transform: uppercase\` to display headings."
      }
    }
  }
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var m,x,g;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Body face",
  render: () => <div className="sb-stack" style={{
    maxWidth: 640
  }}>
      <p style={{
      margin: 0,
      fontSize: "var(--text-base)"
    }}>
        Body copy uses Nobel (with Futura PT, Avenir Next and Helvetica
        fallbacks). Line-height sits at 1.5–1.7 for paragraph content,
        tightening to 1.3 for compact UI text.
      </p>
      <p style={{
      margin: 0,
      fontSize: "var(--text-md)",
      color: "var(--fg-muted)"
    }}>
        Secondary body — captions, helper text, table values. One step down
        from the base size, with the same line-height.
      </p>
      <p style={{
      margin: 0,
      fontSize: "var(--text-xs)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--fg-muted)"
    }}>
        Eyebrow — pairs with display headings to label a section
      </p>
    </div>
}`,...(g=(x=a.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var y,f,h;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Accessibility",
  render: () => <div className="sb-stack" style={{
    maxWidth: 720
  }}>
      <p style={{
      margin: 0,
      fontSize: "var(--text-base)"
    }}>
        <strong>Line length:</strong> body paragraphs cap at ~640px (~75ch) to
        keep lines comfortably scannable.
      </p>
      <p style={{
      margin: 0,
      fontSize: "var(--text-base)"
    }}>
        <strong>Minimum sizes:</strong> 10px (\\\`--text-2xs\\\`) is reserved for
        uppercase, tracked micro-labels with high contrast against surface.
        Don't use it for sentence case copy.
      </p>
      <p style={{
      margin: 0,
      fontSize: "var(--text-base)"
    }}>
        <strong>Text-size preference:</strong> users can scale all text via
        Settings → Text size. The root font-size grows 12.5% or 25% and every
        token-driven size inherits.
      </p>
      <p style={{
      margin: 0,
      fontSize: "var(--text-base)"
    }}>
        <strong>Display face & screen readers:</strong> Cormorant Garamond is
        used purely visually. Headings remain real \\\`h1\\\`/\\\`h2\\\` elements.
      </p>
    </div>
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const j=["TypeRamp","DisplayFace","BodyFace","Accessibility"];export{s as Accessibility,a as BodyFace,t as DisplayFace,n as TypeRamp,j as __namedExportsOrder,w as default};
