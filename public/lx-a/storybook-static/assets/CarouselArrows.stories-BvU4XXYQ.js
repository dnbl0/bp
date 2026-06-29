import{j as e}from"./jsx-runtime-BYYWji4R.js";import{C as P,b as w}from"./icons-DC4KyQ6f.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";function r({canPrev:s,canNext:b,onPrev:x,onNext:f,prevLabel:N="Previous",nextLabel:y="Next",className:g=""}){return e.jsxs("div",{className:`carousel-nav ${g}`.trim(),children:[e.jsx("button",{type:"button",className:"roundbtn roundbtn--sm",onClick:x,disabled:!s,"aria-label":N,children:e.jsx(P,{width:15,height:15})}),e.jsx("button",{type:"button",className:"roundbtn roundbtn--sm",onClick:f,disabled:!b,"aria-label":y,children:e.jsx(w,{width:15,height:15})})]})}try{r.displayName="CarouselArrows",r.__docgenInfo={description:`Shared prev/next control for every carousel (offers, vehicle panel, …).
Arrows sit next to each other, right-aligned within their container, and
each disables when there's nothing further in that direction.`,displayName:"CarouselArrows",props:{canPrev:{defaultValue:null,description:"",name:"canPrev",required:!0,type:{name:"boolean"}},canNext:{defaultValue:null,description:"",name:"canNext",required:!0,type:{name:"boolean"}},onPrev:{defaultValue:null,description:"",name:"onPrev",required:!0,type:{name:"() => void"}},onNext:{defaultValue:null,description:"",name:"onNext",required:!0,type:{name:"() => void"}},prevLabel:{defaultValue:{value:"Previous"},description:"",name:"prevLabel",required:!1,type:{name:"string"}},nextLabel:{defaultValue:{value:"Next"},description:"",name:"nextLabel",required:!1,type:{name:"string"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const L={title:"Primitives/Carousel arrows",component:r,parameters:{layout:"centered",docs:{description:{component:'\nThe shared prev/next control used by every carousel in the app (offers, the\nvehicle panel, …). Two round `.roundbtn--sm` buttons sit next to each other,\nright-aligned within their container.\n\n### Props\n\n- `canPrev` / `canNext` — booleans that enable each direction. When false,\n  the matching button is `disabled` so you can\'t page past the ends.\n- `onPrev` / `onNext` — click handlers for each direction.\n- `prevLabel` / `nextLabel` — `aria-label`s for the buttons. Default to\n  *Previous* / *Next*.\n- `className` — appended to the `.carousel-nav` wrapper for layout overrides.\n\n### Accessibility\n\n- Real `<button type="button">` elements carrying an `aria-label` (the\n  ChevronLeft / ChevronRight icons are presentational).\n- The `disabled` attribute is driven by `canPrev` / `canNext`, so screen\n  readers and keyboard users get the same end-of-range feedback as the visual\n  greying.\n        '.trim()}}}},t=()=>{},a={name:"Both enabled",render:()=>e.jsx(r,{canPrev:!0,canNext:!0,onPrev:t,onNext:t})},n={name:"At start — previous disabled",render:()=>e.jsx(r,{canPrev:!1,canNext:!0,onPrev:t,onNext:t}),parameters:{docs:{description:{story:"On the first item `canPrev` is false, disabling the previous arrow."}}}},o={name:"At end — next disabled",render:()=>e.jsx(r,{canPrev:!0,canNext:!1,onPrev:t,onNext:t}),parameters:{docs:{description:{story:"On the last item `canNext` is false, disabling the next arrow."}}}};var i,l,d;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "Both enabled",
  render: () => <CarouselArrows canPrev canNext onPrev={noop} onNext={noop} />
}`,...(d=(l=a.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,u,p;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "At start — previous disabled",
  render: () => <CarouselArrows canPrev={false} canNext onPrev={noop} onNext={noop} />,
  parameters: {
    docs: {
      description: {
        story: "On the first item \`canPrev\` is false, disabling the previous arrow."
      }
    }
  }
}`,...(p=(u=n.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,h,v;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "At end — next disabled",
  render: () => <CarouselArrows canPrev canNext={false} onPrev={noop} onNext={noop} />,
  parameters: {
    docs: {
      description: {
        story: "On the last item \`canNext\` is false, disabling the next arrow."
      }
    }
  }
}`,...(v=(h=o.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};const q=["Default","AtStart","AtEnd"];export{o as AtEnd,n as AtStart,a as Default,q as __namedExportsOrder,L as default};
