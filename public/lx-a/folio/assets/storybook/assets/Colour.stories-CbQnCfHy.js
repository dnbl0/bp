import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const D={title:"Foundations/Colour",parameters:{layout:"padded",docs:{description:{component:`
The Lexus palette is dark-first. The dark theme uses Lexus deepblue surfaces
with smoke text and an ochre accent; the light theme inverts to warm smoke
surfaces with deepblue text. Semantic tokens (\`--surface\`, \`--fg\`,
\`--border\`) are the right level to consume from in components — they
re-point in light theme automatically.

Under the semantic layer sits the **Lexus DS colour system**
(\`--ld-s-color-*\` — accent, canvas, elevation, foreground, utility), itself
anchored to the raw brand scales. So the chain is **brand scale →
\`--ld-s-color-*\` → app semantic**, one source of truth. See the "DS colour
system" story for that middle layer.

Use the **Theme** toolbar switch to flip palettes and verify in both.
        `.trim()}}}};function n({name:t,token:a,hex:d}){return e.jsxs("div",{className:"sb-swatch",children:[e.jsx("div",{className:"sb-swatch__chip",style:{background:`var(${a})`}}),e.jsxs("div",{children:[e.jsx("div",{className:"sb-swatch__name",children:t}),e.jsx("div",{className:"sb-swatch__value",children:a}),d&&e.jsx("div",{className:"sb-swatch__value",children:d})]})]})}function r({title:t,children:a}){return e.jsxs("section",{style:{marginBottom:32},children:[e.jsx("header",{className:"sb-section-head",children:e.jsx("h3",{children:t})}),e.jsx("div",{className:"sb-grid",children:a})]})}const s={name:"Semantic tokens",render:()=>e.jsxs("div",{children:[e.jsxs(r,{title:"Surfaces",children:[e.jsx(n,{name:"canvas",token:"--canvas"}),e.jsx(n,{name:"canvas-raised",token:"--canvas-raised"}),e.jsx(n,{name:"surface",token:"--surface"}),e.jsx(n,{name:"surface-raised",token:"--surface-raised"}),e.jsx(n,{name:"surface-hover",token:"--surface-hover"}),e.jsx(n,{name:"elevation-inset",token:"--elevation-inset"})]}),e.jsxs(r,{title:"Text",children:[e.jsx(n,{name:"fg",token:"--fg"}),e.jsx(n,{name:"fg-strong",token:"--fg-strong"}),e.jsx(n,{name:"fg-muted",token:"--fg-muted"}),e.jsx(n,{name:"fg-dim",token:"--fg-dim"}),e.jsx(n,{name:"fg-on-accent",token:"--fg-on-accent"})]}),e.jsxs(r,{title:"Accent & state",children:[e.jsx(n,{name:"accent",token:"--accent"}),e.jsx(n,{name:"accent-bright",token:"--accent-bright"}),e.jsx(n,{name:"accent-electrified",token:"--accent-electrified"}),e.jsx(n,{name:"accent-warm",token:"--accent-warm"}),e.jsx(n,{name:"success",token:"--success"}),e.jsx(n,{name:"warning",token:"--warning"}),e.jsx(n,{name:"error",token:"--error"}),e.jsx(n,{name:"error-border",token:"--error-border"})]}),e.jsxs(r,{title:"Borders & overlays",children:[e.jsx(n,{name:"border",token:"--border"}),e.jsx(n,{name:"border-strong",token:"--border-strong"}),e.jsx(n,{name:"border-tier",token:"--border-tier"}),e.jsx(n,{name:"overlay-hover",token:"--overlay-hover"})]})]}),parameters:{docs:{description:{story:"Semantic tokens — the right level to consume from product code. Theme-aware."}}}},o={name:"DS colour system",render:()=>e.jsxs("div",{children:[e.jsx(r,{title:"Accent — primary",children:["darker","default","lighter","disabled"].map(t=>e.jsx(n,{name:`accent-primary-${t}`,token:`--ld-s-color-accent-primary-${t}`},t))}),e.jsx(r,{title:"Accent — secondary",children:["darker","default","lighter"].map(t=>e.jsx(n,{name:`accent-secondary-${t}`,token:`--ld-s-color-accent-secondary-${t}`},t))}),e.jsx(r,{title:"Canvas",children:["darker","default","lighter"].map(t=>e.jsx(n,{name:`canvas-${t}`,token:`--ld-s-color-canvas-${t}`},t))}),e.jsx(r,{title:"Elevation — inset",children:["darker","default","lighter"].map(t=>e.jsx(n,{name:`elevation-inset-${t}`,token:`--ld-s-color-elevation-inset-${t}`},t))}),e.jsx(r,{title:"Elevation — raised",children:["darker","default","lighter"].map(t=>e.jsx(n,{name:`elevation-raised-${t}`,token:`--ld-s-color-elevation-raised-${t}`},t))}),e.jsxs(r,{title:"Foreground",children:[e.jsx(n,{name:"foreground-default",token:"--ld-s-color-foreground-default"}),e.jsx(n,{name:"foreground-on-accent",token:"--ld-s-color-foreground-on-accent"})]}),e.jsxs(r,{title:"Utility",children:[e.jsx(n,{name:"utility-success-default",token:"--ld-s-color-utility-success-default"}),e.jsx(n,{name:"utility-success-darker",token:"--ld-s-color-utility-success-darker"}),e.jsx(n,{name:"utility-error-default",token:"--ld-s-color-utility-error-default"}),e.jsx(n,{name:"utility-error-lighter",token:"--ld-s-color-utility-error-lighter"}),e.jsx(n,{name:"utility-modifiers-midlight",token:"--ld-s-color-utility-modifiers-midlight"})]})]}),parameters:{docs:{description:{story:"The Lexus DS colour system (`--ld-s-color-*`). The app's semantic tokens resolve onto these; these in turn resolve onto the raw brand scales. Note: the DS export ships dark-theme values, so these don't flip with the theme switch — consume the app semantic tokens for theme-aware colour."}}}},c={name:"Tier identity (Platinum)",render:()=>e.jsxs("div",{className:"sb-row",children:[e.jsxs("div",{className:"sb-swatch",style:{background:"var(--tier-gradient)",color:"var(--ld-color-lexus-deepblue-900)",boxShadow:"var(--tier-glow)"},children:[e.jsx("div",{className:"sb-swatch__name",children:"tier-gradient"}),e.jsx("div",{className:"sb-swatch__value",children:"--tier-gradient"})]}),e.jsxs("div",{className:"sb-swatch",children:[e.jsx("div",{className:"sb-swatch__chip",style:{background:"var(--tier-clay)"}}),e.jsx("div",{className:"sb-swatch__name",children:"tier-clay"}),e.jsx("div",{className:"sb-swatch__value",children:"--tier-clay"})]})]}),parameters:{docs:{description:{story:"Reserved for Encore Platinum surfaces — tier chip, hero tier-mark, anniversary banner, concierge avatar."}}}},i={name:"Brand scales (raw)",render:()=>e.jsxs("div",{children:[e.jsx(r,{title:"Smoke",children:["100","300","500","700"].map(t=>e.jsx(n,{name:`smoke-${t}`,token:`--ld-color-lexus-smoke-${t}`},t))}),e.jsx(r,{title:"Deepblue",children:["50","100","300","400","500","600","700","800","900"].map(t=>e.jsx(n,{name:`deepblue-${t}`,token:`--ld-color-lexus-deepblue-${t}`},t))}),e.jsxs(r,{title:"Accent",children:[e.jsx(n,{name:"ochre-400",token:"--ld-color-lexus-ochre-400"}),e.jsx(n,{name:"ochre-500",token:"--ld-color-lexus-ochre-500"}),e.jsx(n,{name:"inari-500",token:"--ld-color-lexus-inari-500"}),e.jsx(n,{name:"clay-400",token:"--ld-color-lexus-clay-400"})]})]}),parameters:{docs:{description:{story:"Raw brand-scale tokens. **Don't** consume these directly — they don't flip in light theme. Use the semantic tokens instead."}}}},l={name:"Canvas scrims",render:()=>e.jsx("div",{className:"sb-row",style:{gap:12},children:[["--canvas-scrim-strong","0.85"],["--canvas-scrim","0.7"],["--canvas-scrim-soft","0.45"]].map(([t,a])=>e.jsxs("div",{style:{width:220,height:140,position:"relative",backgroundImage:'url("assets/hero.png")',backgroundSize:"cover",backgroundPosition:"center",borderRadius:4,overflow:"hidden",border:"1px solid var(--border-strong)"},children:[e.jsx("span",{style:{position:"absolute",inset:0,background:`var(${t})`}}),e.jsxs("span",{style:{position:"relative",padding:12,display:"block",color:"var(--fg-strong)",fontFamily:"var(--font-body)",fontSize:12,letterSpacing:"1.4px",textTransform:"uppercase"},children:[t,e.jsx("br",{}),"α ",a]})]},t))}),parameters:{docs:{description:{story:"Scrims sit over hero imagery and the canvas. The three-step set keeps depth consistent — strong for hero overlap, base for full-cover, soft for shallow gradients."}}}};var m,h,u;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Semantic tokens",
  render: () => <div>
      <Section title="Surfaces">
        <Swatch name="canvas" token="--canvas" />
        <Swatch name="canvas-raised" token="--canvas-raised" />
        <Swatch name="surface" token="--surface" />
        <Swatch name="surface-raised" token="--surface-raised" />
        <Swatch name="surface-hover" token="--surface-hover" />
        <Swatch name="elevation-inset" token="--elevation-inset" />
      </Section>
      <Section title="Text">
        <Swatch name="fg" token="--fg" />
        <Swatch name="fg-strong" token="--fg-strong" />
        <Swatch name="fg-muted" token="--fg-muted" />
        <Swatch name="fg-dim" token="--fg-dim" />
        <Swatch name="fg-on-accent" token="--fg-on-accent" />
      </Section>
      <Section title="Accent & state">
        <Swatch name="accent" token="--accent" />
        <Swatch name="accent-bright" token="--accent-bright" />
        <Swatch name="accent-electrified" token="--accent-electrified" />
        <Swatch name="accent-warm" token="--accent-warm" />
        <Swatch name="success" token="--success" />
        <Swatch name="warning" token="--warning" />
        <Swatch name="error" token="--error" />
        <Swatch name="error-border" token="--error-border" />
      </Section>
      <Section title="Borders & overlays">
        <Swatch name="border" token="--border" />
        <Swatch name="border-strong" token="--border-strong" />
        <Swatch name="border-tier" token="--border-tier" />
        <Swatch name="overlay-hover" token="--overlay-hover" />
      </Section>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Semantic tokens — the right level to consume from product code. Theme-aware."
      }
    }
  }
}`,...(u=(h=s.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var v,k,p;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: "DS colour system",
  render: () => <div>
      <Section title="Accent — primary">
        {["darker", "default", "lighter", "disabled"].map(s => <Swatch key={s} name={\`accent-primary-\${s}\`} token={\`--ld-s-color-accent-primary-\${s}\`} />)}
      </Section>
      <Section title="Accent — secondary">
        {["darker", "default", "lighter"].map(s => <Swatch key={s} name={\`accent-secondary-\${s}\`} token={\`--ld-s-color-accent-secondary-\${s}\`} />)}
      </Section>
      <Section title="Canvas">
        {["darker", "default", "lighter"].map(s => <Swatch key={s} name={\`canvas-\${s}\`} token={\`--ld-s-color-canvas-\${s}\`} />)}
      </Section>
      <Section title="Elevation — inset">
        {["darker", "default", "lighter"].map(s => <Swatch key={s} name={\`elevation-inset-\${s}\`} token={\`--ld-s-color-elevation-inset-\${s}\`} />)}
      </Section>
      <Section title="Elevation — raised">
        {["darker", "default", "lighter"].map(s => <Swatch key={s} name={\`elevation-raised-\${s}\`} token={\`--ld-s-color-elevation-raised-\${s}\`} />)}
      </Section>
      <Section title="Foreground">
        <Swatch name="foreground-default" token="--ld-s-color-foreground-default" />
        <Swatch name="foreground-on-accent" token="--ld-s-color-foreground-on-accent" />
      </Section>
      <Section title="Utility">
        <Swatch name="utility-success-default" token="--ld-s-color-utility-success-default" />
        <Swatch name="utility-success-darker" token="--ld-s-color-utility-success-darker" />
        <Swatch name="utility-error-default" token="--ld-s-color-utility-error-default" />
        <Swatch name="utility-error-lighter" token="--ld-s-color-utility-error-lighter" />
        <Swatch name="utility-modifiers-midlight" token="--ld-s-color-utility-modifiers-midlight" />
      </Section>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "The Lexus DS colour system (\`--ld-s-color-*\`). The app's semantic tokens resolve onto these; these in turn resolve onto the raw brand scales. Note: the DS export ships dark-theme values, so these don't flip with the theme switch — consume the app semantic tokens for theme-aware colour."
      }
    }
  }
}`,...(p=(k=o.parameters)==null?void 0:k.docs)==null?void 0:p.source}}};var g,f,x;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Tier identity (Platinum)",
  render: () => <div className="sb-row">
      <div className="sb-swatch" style={{
      background: "var(--tier-gradient)",
      color: "var(--ld-color-lexus-deepblue-900)",
      boxShadow: "var(--tier-glow)"
    }}>
        <div className="sb-swatch__name">tier-gradient</div>
        <div className="sb-swatch__value">--tier-gradient</div>
      </div>
      <div className="sb-swatch">
        <div className="sb-swatch__chip" style={{
        background: "var(--tier-clay)"
      }} />
        <div className="sb-swatch__name">tier-clay</div>
        <div className="sb-swatch__value">--tier-clay</div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Reserved for Encore Platinum surfaces — tier chip, hero tier-mark, anniversary banner, concierge avatar."
      }
    }
  }
}`,...(x=(f=c.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var y,S,w;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: "Brand scales (raw)",
  render: () => <div>
      <Section title="Smoke">
        {["100", "300", "500", "700"].map(s => <Swatch key={s} name={\`smoke-\${s}\`} token={\`--ld-color-lexus-smoke-\${s}\`} />)}
      </Section>
      <Section title="Deepblue">
        {["50", "100", "300", "400", "500", "600", "700", "800", "900"].map(s => <Swatch key={s} name={\`deepblue-\${s}\`} token={\`--ld-color-lexus-deepblue-\${s}\`} />)}
      </Section>
      <Section title="Accent">
        <Swatch name="ochre-400" token="--ld-color-lexus-ochre-400" />
        <Swatch name="ochre-500" token="--ld-color-lexus-ochre-500" />
        <Swatch name="inari-500" token="--ld-color-lexus-inari-500" />
        <Swatch name="clay-400" token="--ld-color-lexus-clay-400" />
      </Section>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Raw brand-scale tokens. **Don't** consume these directly — they don't flip in light theme. Use the semantic tokens instead."
      }
    }
  }
}`,...(w=(S=i.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var b,j,$;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Canvas scrims",
  render: () => <div className="sb-row" style={{
    gap: 12
  }}>
      {[["--canvas-scrim-strong", "0.85"], ["--canvas-scrim", "0.7"], ["--canvas-scrim-soft", "0.45"]].map(([token, alpha]) => <div key={token} style={{
      width: 220,
      height: 140,
      position: "relative",
      backgroundImage: 'url("assets/hero.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 4,
      overflow: "hidden",
      border: "1px solid var(--border-strong)"
    }}>
          <span style={{
        position: "absolute",
        inset: 0,
        background: \`var(\${token})\`
      }} />
          <span style={{
        position: "relative",
        padding: 12,
        display: "block",
        color: "var(--fg-strong)",
        fontFamily: "var(--font-body)",
        fontSize: 12,
        letterSpacing: "1.4px",
        textTransform: "uppercase"
      }}>
            {token}
            <br />α {alpha}
          </span>
        </div>)}
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Scrims sit over hero imagery and the canvas. The three-step set keeps depth consistent — strong for hero overlap, base for full-cover, soft for shallow gradients."
      }
    }
  }
}`,...($=(j=l.parameters)==null?void 0:j.docs)==null?void 0:$.source}}};const A=["SemanticTokens","DSColourSystem","TierIdentity","BrandScales","Scrims"];export{i as BrandScales,o as DSColourSystem,l as Scrims,s as SemanticTokens,c as TierIdentity,A as __namedExportsOrder,D as default};
