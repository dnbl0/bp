import{j as n}from"./jsx-runtime-BYYWji4R.js";import{I as m,A as p}from"./icons-CO6p2nHe.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const b={title:"Foundations/Icons",parameters:{docs:{description:{component:`
Every icon ships as inline SVG with \`stroke="currentColor"\` so tint follows
the consuming element. Pass \`width\` and \`height\` to scale (default 18×18).

### Usage rules

- **Sizes:** 12, 14, 16, 18, 20px. Don't size in-between.
- **Tint:** never hardcode — let the consuming element drive colour.
- **Pair with text:** add an \`aria-label\` on the parent button or wrap the
  icon in an \`<span aria-hidden="true">\` if a sibling text label is
  already announced.
- **Decorative-only:** \`aria-hidden\` on the SVG or its wrapper.

### Adding an icon

Add a new \`export const Name = (p: I) => …\` to
\`src/components/icons.tsx\` using the shared \`base()\` defaults. Reuse the
24×24 viewbox so existing sizing assumptions hold.
        `.trim()}}}},h=Object.keys(m).filter(e=>e[0]===e[0].toUpperCase()&&e!=="default"),s={name:"Library",render:()=>n.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))",gap:12},children:h.map(e=>{const r=m[e];return typeof r!="function"?null:n.jsxs("div",{className:"sb-tile",style:{alignItems:"center"},children:[n.jsx("div",{style:{width:56,height:56,display:"grid",placeItems:"center",background:"var(--elevation-inset)",borderRadius:"var(--radius-pill)",color:"var(--fg)"},children:n.jsx(r,{width:20,height:20})}),n.jsx("span",{className:"sb-tile__label",style:{textAlign:"center"},children:e})]},e)})})},t={name:"Sizing",render:()=>n.jsx("div",{className:"sb-row",style:{alignItems:"center"},children:[12,14,16,18,20].map(e=>n.jsxs("div",{className:"sb-stack",style:{alignItems:"center"},children:[n.jsx(p,{width:e,height:e}),n.jsxs("span",{style:{fontSize:12,color:"var(--fg-muted)"},children:[e,"px"]})]},e))})};var a,i,o;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`{
  name: "Library",
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 12
  }}>
      {ICON_NAMES.map(name => {
      const Icon = (Icons as unknown as Record<string, React.ComponentType<{
        width?: number;
        height?: number;
      }>>)[name];
      if (typeof Icon !== "function") return null;
      return <div key={name} className="sb-tile" style={{
        alignItems: "center"
      }}>
            <div style={{
          width: 56,
          height: 56,
          display: "grid",
          placeItems: "center",
          background: "var(--elevation-inset)",
          borderRadius: "var(--radius-pill)",
          color: "var(--fg)"
        }}>
              <Icon width={20} height={20} />
            </div>
            <span className="sb-tile__label" style={{
          textAlign: "center"
        }}>
              {name}
            </span>
          </div>;
    })}
    </div>
}`,...(o=(i=s.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var l,d,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Sizing",
  render: () => <div className="sb-row" style={{
    alignItems: "center"
  }}>
      {[12, 14, 16, 18, 20].map(s => <div key={s} className="sb-stack" style={{
      alignItems: "center"
    }}>
          <Icons.ArrowRight width={s} height={s} />
          <span style={{
        fontSize: 12,
        color: "var(--fg-muted)"
      }}>{s}px</span>
        </div>)}
    </div>
}`,...(c=(d=t.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const x=["Library","Sizes"];export{s as Library,t as Sizes,x as __namedExportsOrder,b as default};
