import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const w={title:"Foundations/Typography",parameters:{docs:{description:{component:"\nTwo faces. **Cormorant Garamond** (`--ld-s-typography-heading1-font-family`) handles editorial\nheadings — hero titles, page titles, vehicle hero. **Nobel** (`--ld-s-typography-body1-font-family`,\nwith Futura PT fallbacks) handles everything else. A constrained type ramp\nkeeps the product coherent.\n\n### Pairing rules\n\n- Editorial headings (`hero__title`, `page-title`, `vhero__title`,\n  `onboard__title`, `today__title`) — Cormorant, **mixed case**, zero\n  tracking, weight 300–400.\n- Eyebrows, chips, button labels — Nobel, **uppercase**, with a value from the\n  tracking scale (1.0px → 2.4px).\n- Body copy — Nobel, sentence case, line-height 1.5–1.7.\n\n### Tokens\n\n- **Text scale:** `--ld-s-typography-label2-font-size` (10) → `--ld-s-typography-heading1-font-size` (52).\n- **Tracking scale:** `--ld-s-typography-heading6-letter-spacing` → `--ld-s-typography-label1-letter-spacing`.\n\nAvoid one-off literals; if you need an in-between size, propose it in the\ntoken file.\n        ".trim()}}}},z=[{token:"--ld-s-typography-heading1-font-size",px:"52px",label:"Hero"},{token:"--ld-s-typography-heading1-font-size",px:"46px",label:"Page title"},{token:"--ld-s-typography-heading2-font-size",px:"40px",label:"Vehicle hero"},{token:"--ld-s-typography-heading3-font-size",px:"30px",label:"Display M"},{token:"--ld-s-typography-heading4-font-size",px:"26px",label:"Display S"},{token:"--ld-s-typography-heading5-font-size",px:"22px",label:"Display XS"},{token:"--ld-s-typography-heading6-font-size",px:"20px",label:"Display 2XS"},{token:"--ld-s-typography-body1-font-size",px:"18px",label:"Lede / module head"},{token:"--ld-s-typography-body2-font-size",px:"15px",label:"Card head"},{token:"--ld-s-typography-caption1-font-size",px:"14px",label:"Body"},{token:"--ld-s-typography-banner-font-size",px:"13px",label:"Secondary body"},{token:"--ld-s-typography-price1-font-size",px:"12px",label:"Caption / chip"},{token:"--ld-s-typography-label1-font-size",px:"11px",label:"Eyebrow"},{token:"--ld-s-typography-label2-font-size",px:"10px",label:"Micro label"}],n={name:"Type ramp",render:()=>e.jsx("div",{className:"sb-stack",children:z.map(({token:s,px:b,label:v})=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"180px 80px 1fr",gap:16,alignItems:"baseline",paddingBottom:12,borderBottom:"1px solid var(--border)"},children:[e.jsx("code",{style:{fontFamily:'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',fontSize:12,color:"var(--fg-muted)"},children:s}),e.jsx("span",{style:{color:"var(--fg-muted)",fontSize:12},children:b}),e.jsxs("span",{style:{fontFamily:"var(--ld-s-typography-body1-font-family)",fontSize:`var(${s})`,color:"var(--fg-strong)"},children:[v," — the Lexus moves you forward"]})]},s))})},a={name:"Display face",render:()=>e.jsxs("div",{className:"sb-stack",children:[e.jsxs("p",{style:{fontFamily:"var(--ld-s-typography-heading1-font-family)",fontWeight:"var(--ld-s-typography-body1-font-weight)",fontSize:"var(--ld-s-typography-heading1-font-size)",letterSpacing:0,lineHeight:1.05,margin:0,color:"var(--fg-strong)"},children:["Good morning,"," ",e.jsx("span",{style:{fontStyle:"italic"},children:"Susan"})]}),e.jsx("p",{style:{fontFamily:"var(--ld-s-typography-heading1-font-family)",fontWeight:"var(--ld-s-typography-label2-font-weight)",fontSize:"var(--ld-s-typography-heading1-font-size)",letterSpacing:0,margin:0,color:"var(--fg-strong)"},children:"Encore Benefits"}),e.jsx("p",{style:{fontFamily:"var(--ld-s-typography-heading1-font-family)",fontWeight:"var(--ld-s-typography-body1-font-weight)",fontSize:"var(--ld-s-typography-heading2-font-size)",letterSpacing:0,margin:0,color:"var(--fg-strong)"},children:"2024 NX 450h+ F Sport"})]}),parameters:{docs:{description:{story:"Cormorant Garamond reads best in **mixed case** at large sizes. Don't apply `text-transform: uppercase` to display headings."}}}},t={name:"Body face",render:()=>e.jsxs("div",{className:"sb-stack",style:{maxWidth:640},children:[e.jsx("p",{style:{margin:0,fontSize:"var(--ld-s-typography-caption1-font-size)"},children:"Body copy uses Nobel (with Futura PT, Avenir Next and Helvetica fallbacks). Line-height sits at 1.5–1.7 for paragraph content, tightening to 1.3 for compact UI text."}),e.jsx("p",{style:{margin:0,fontSize:"var(--ld-s-typography-body2-font-size)",color:"var(--fg-muted)"},children:"Secondary body — captions, helper text, table values. One step down from the base size, with the same line-height."}),e.jsx("p",{style:{margin:0,fontSize:"var(--ld-s-typography-label1-font-size)",letterSpacing:"var(--ld-s-typography-label1-letter-spacing)",textTransform:"uppercase",color:"var(--fg-muted)"},children:"Eyebrow — pairs with display headings to label a section"})]})},o={name:"Accessibility",render:()=>e.jsxs("div",{className:"sb-stack",style:{maxWidth:720},children:[e.jsxs("p",{style:{margin:0,fontSize:"var(--ld-s-typography-caption1-font-size)"},children:[e.jsx("strong",{children:"Line length:"})," body paragraphs cap at ~640px (~75ch) to keep lines comfortably scannable."]}),e.jsxs("p",{style:{margin:0,fontSize:"var(--ld-s-typography-caption1-font-size)"},children:[e.jsx("strong",{children:"Minimum sizes:"})," 10px (\\`--ld-s-typography-label2-font-size\\`) is reserved for uppercase, tracked micro-labels with high contrast against surface. Don't use it for sentence case copy."]}),e.jsxs("p",{style:{margin:0,fontSize:"var(--ld-s-typography-caption1-font-size)"},children:[e.jsx("strong",{children:"Text-size preference:"})," users can scale all text via Settings → Text size. The root font-size grows 12.5% or 25% and every token-driven size inherits."]}),e.jsxs("p",{style:{margin:0,fontSize:"var(--ld-s-typography-caption1-font-size)"},children:[e.jsx("strong",{children:"Display face & screen readers:"})," Cormorant Garamond is used purely visually. Headings remain real \\`h1\\`/\\`h2\\` elements."]})]})};var r,i,l;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
        fontFamily: "var(--ld-s-typography-body1-font-family)",
        fontSize: \`var(\${token})\`,
        color: "var(--fg-strong)"
      }}>
            {label} — the Lexus moves you forward
          </span>
        </div>)}
    </div>
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var p,d,y;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Display face",
  render: () => <div className="sb-stack">
      <p style={{
      fontFamily: "var(--ld-s-typography-heading1-font-family)",
      fontWeight: "var(--ld-s-typography-body1-font-weight)",
      fontSize: "var(--ld-s-typography-heading1-font-size)",
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
      fontFamily: "var(--ld-s-typography-heading1-font-family)",
      fontWeight: "var(--ld-s-typography-label2-font-weight)",
      fontSize: "var(--ld-s-typography-heading1-font-size)",
      letterSpacing: 0,
      margin: 0,
      color: "var(--fg-strong)"
    }}>
        Encore Benefits
      </p>
      <p style={{
      fontFamily: "var(--ld-s-typography-heading1-font-family)",
      fontWeight: "var(--ld-s-typography-body1-font-weight)",
      fontSize: "var(--ld-s-typography-heading2-font-size)",
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
}`,...(y=(d=a.parameters)==null?void 0:d.docs)==null?void 0:y.source}}};var c,g,h;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Body face",
  render: () => <div className="sb-stack" style={{
    maxWidth: 640
  }}>
      <p style={{
      margin: 0,
      fontSize: "var(--ld-s-typography-caption1-font-size)"
    }}>
        Body copy uses Nobel (with Futura PT, Avenir Next and Helvetica
        fallbacks). Line-height sits at 1.5–1.7 for paragraph content,
        tightening to 1.3 for compact UI text.
      </p>
      <p style={{
      margin: 0,
      fontSize: "var(--ld-s-typography-body2-font-size)",
      color: "var(--fg-muted)"
    }}>
        Secondary body — captions, helper text, table values. One step down
        from the base size, with the same line-height.
      </p>
      <p style={{
      margin: 0,
      fontSize: "var(--ld-s-typography-label1-font-size)",
      letterSpacing: "var(--ld-s-typography-label1-letter-spacing)",
      textTransform: "uppercase",
      color: "var(--fg-muted)"
    }}>
        Eyebrow — pairs with display headings to label a section
      </p>
    </div>
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,m,x;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: "Accessibility",
  render: () => <div className="sb-stack" style={{
    maxWidth: 720
  }}>
      <p style={{
      margin: 0,
      fontSize: "var(--ld-s-typography-caption1-font-size)"
    }}>
        <strong>Line length:</strong> body paragraphs cap at ~640px (~75ch) to
        keep lines comfortably scannable.
      </p>
      <p style={{
      margin: 0,
      fontSize: "var(--ld-s-typography-caption1-font-size)"
    }}>
        <strong>Minimum sizes:</strong> 10px (\\\`--ld-s-typography-label2-font-size\\\`) is reserved for
        uppercase, tracked micro-labels with high contrast against surface.
        Don't use it for sentence case copy.
      </p>
      <p style={{
      margin: 0,
      fontSize: "var(--ld-s-typography-caption1-font-size)"
    }}>
        <strong>Text-size preference:</strong> users can scale all text via
        Settings → Text size. The root font-size grows 12.5% or 25% and every
        token-driven size inherits.
      </p>
      <p style={{
      margin: 0,
      fontSize: "var(--ld-s-typography-caption1-font-size)"
    }}>
        <strong>Display face & screen readers:</strong> Cormorant Garamond is
        used purely visually. Headings remain real \\\`h1\\\`/\\\`h2\\\` elements.
      </p>
    </div>
}`,...(x=(m=o.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};const j=["TypeRamp","DisplayFace","BodyFace","Accessibility"];export{o as Accessibility,t as BodyFace,a as DisplayFace,n as TypeRamp,j as __namedExportsOrder,w as default};
