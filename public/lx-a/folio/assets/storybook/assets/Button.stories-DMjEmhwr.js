import{j as t}from"./jsx-runtime-BYYWji4R.js";import{A as R}from"./icons-CO6p2nHe.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const O={title:"Primitives/Button",parameters:{layout:"centered",docs:{description:{component:`
The button system is class-based. Apply \`.btn\` plus a variant.

### Variants

- \`.btn--primary\` — the page's single most important action. Solid surface,
  inverted text. One per view.
- \`.btn--ghost\` — secondary action with an outline. Pair with primary.
- \`.btn--pill\` — rounded utility button, used in the top nav for Quick Book
  and the search hint.

### Sizing

Default height is 48px. Pill is 40px. \`.btn--primary\` accepts a \`disabled\`
attribute and grey-tones automatically.

### Accessibility

- Real \`<button type="button">\` elements; \`type="submit"\` only inside a
  \`<form>\`.
- Focus-visible ring is the accent outline + 2px offset, applied centrally
  in \`global.css\`.
- For icon-only buttons, always provide \`aria-label\`.
        `.trim()}}}},r={render:()=>t.jsx("button",{type:"button",className:"btn btn--primary",children:"Book a service"})},e={render:()=>t.jsx("button",{type:"button",className:"btn btn--ghost",children:"Stay signed in"})},n={render:()=>t.jsx("button",{type:"button",className:"btn btn--pill",children:"Quick Book"})},a={name:"Primary — disabled",render:()=>t.jsx("button",{type:"button",className:"btn btn--primary",disabled:!0,children:"Submit for verification"})},o={name:"With trailing icon",render:()=>t.jsxs("button",{type:"button",className:"btn btn--primary",children:["Smart book ",t.jsx(R,{width:16,height:16})]}),parameters:{docs:{description:{story:"Buttons compose with the icon set. Use the trailing icon for forward motion (continue, smart book, open) and remember the icon gap is already 10px."}}}},s={name:"Primary + ghost pair",render:()=>t.jsxs("div",{style:{display:"flex",gap:12,background:"var(--surface)",padding:16,borderRadius:"var(--radius-md)",border:"1px solid var(--border)"},children:[t.jsx("button",{type:"button",className:"btn btn--primary",children:"Confirm booking"}),t.jsx("button",{type:"button",className:"btn btn--ghost",children:"Cancel"})]}),parameters:{docs:{description:{story:"Standard footer pattern across every flyout: primary action on the left, ghost cancel on the right."}}}},i={name:"Link arrow",render:()=>t.jsxs("button",{type:"button",className:"link-arrow",children:["All Encore benefits ",t.jsx(R,{width:16,height:16})]}),parameters:{docs:{description:{story:"`.link-arrow` is the uppercase tracked link that pairs an arrow with a label. Used for section CTAs (All Encore benefits, View all). On hover the icon translates 4px to signal forward motion."}}}};var c,d,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <button type="button" className="btn btn--primary">
      Book a service
    </button>
}`,...(l=(d=r.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var p,m,b;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <button type="button" className="btn btn--ghost">
      Stay signed in
    </button>
}`,...(b=(m=e.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var u,h,y;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <button type="button" className="btn btn--pill">
      Quick Book
    </button>
}`,...(y=(h=n.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var g,f,w;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: "Primary — disabled",
  render: () => <button type="button" className="btn btn--primary" disabled>
      Submit for verification
    </button>
}`,...(w=(f=a.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var k,x,v;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: "With trailing icon",
  render: () => <button type="button" className="btn btn--primary">
      Smart book <ArrowRight width={16} height={16} />
    </button>,
  parameters: {
    docs: {
      description: {
        story: "Buttons compose with the icon set. Use the trailing icon for forward motion (continue, smart book, open) and remember the icon gap is already 10px."
      }
    }
  }
}`,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var S,N,P;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: "Primary + ghost pair",
  render: () => <div style={{
    display: "flex",
    gap: 12,
    background: "var(--surface)",
    padding: 16,
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)"
  }}>
      <button type="button" className="btn btn--primary">
        Confirm booking
      </button>
      <button type="button" className="btn btn--ghost">
        Cancel
      </button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Standard footer pattern across every flyout: primary action on the left, ghost cancel on the right."
      }
    }
  }
}`,...(P=(N=s.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var A,j,B;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  name: "Link arrow",
  render: () => <button type="button" className="link-arrow">
      All Encore benefits <ArrowRight width={16} height={16} />
    </button>,
  parameters: {
    docs: {
      description: {
        story: "\`.link-arrow\` is the uppercase tracked link that pairs an arrow with a label. Used for section CTAs (All Encore benefits, View all). On hover the icon translates 4px to signal forward motion."
      }
    }
  }
}`,...(B=(j=i.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};const U=["Primary","Ghost","Pill","PrimaryDisabled","WithTrailingIcon","Pair","LinkArrow"];export{e as Ghost,i as LinkArrow,s as Pair,n as Pill,r as Primary,a as PrimaryDisabled,o as WithTrailingIcon,U as __namedExportsOrder,O as default};
