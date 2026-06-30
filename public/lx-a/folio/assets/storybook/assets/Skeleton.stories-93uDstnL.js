import{j as e}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";function a({width:s="100%",height:n="1em",radius:y=4,className:b="",style:f}){return e.jsx("span",{"aria-hidden":"true",className:`skeleton ${b}`.trim(),style:{width:s,height:n,borderRadius:y,...f}})}try{a.displayName="Skeleton",a.__docgenInfo={description:`Skeleton shimmer block. Use to placehold content while it loads.
Width/height accept any CSS length; defaults to 100% width / 1em tall.`,displayName:"Skeleton",props:{width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string | number"}},height:{defaultValue:{value:"1em"},description:"",name:"height",required:!1,type:{name:"string | number"}},radius:{defaultValue:{value:"4"},description:"",name:"radius",required:!1,type:{name:"number"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}}}}}catch{}function j(){return e.jsxs("div",{className:"skelcard",children:[e.jsx(a,{className:"skelcard__media",height:"100%",radius:0}),e.jsxs("div",{className:"skelcard__body",children:[e.jsx(a,{width:"45%",height:12}),e.jsx(a,{width:"100%",height:10}),e.jsx(a,{width:"85%",height:10}),e.jsx(a,{width:"38%",height:10})]})]})}function d(){return e.jsxs("div",{"aria-busy":"true","aria-label":"Loading your dashboard",children:[e.jsx("div",{className:"hero skelhero",children:e.jsxs("div",{className:"shell hero__content",children:[e.jsx(a,{width:150,height:12}),e.jsx(a,{width:300,height:44,radius:6,style:{marginTop:18}})]})}),e.jsxs("div",{className:"shell dash",children:[e.jsx("div",{className:"dash__main",children:[0,1].map(s=>e.jsxs("section",{children:[e.jsxs("div",{className:"section-head",children:[e.jsx(a,{width:170,height:14}),e.jsx(a,{width:90,height:11})]}),e.jsx("div",{className:"benefits__grid",children:[0,1,2].map(n=>e.jsx(j,{},n))})]},s))}),e.jsx("div",{className:"dash__side",children:e.jsxs("div",{className:"skelpanel",children:[e.jsx(a,{width:120,height:12}),e.jsx(a,{className:"skelpanel__card"}),e.jsx(a,{className:"skelpanel__strip"})]})})]})]})}try{d.displayName="DashboardSkeleton",d.__docgenInfo={description:"Loading placeholder that mirrors the authenticated dashboard layout.",displayName:"DashboardSkeleton",props:{}}}catch{}const _={title:"Primitives/Skeleton",component:a,parameters:{layout:"padded",docs:{description:{component:'\nShimmer placeholder for content that\'s loading. Use to preserve layout while\ndata is in flight — never as a permanent decoration.\n\n### Props\n\n- `width` — number (px) or any CSS length. Default 100%.\n- `height` — number (px) or any CSS length. Default 1em.\n- `radius` — number (px). Default 4.\n\n### Accessibility\n\n- Each `Skeleton` is `aria-hidden`. Wrap the loading region in a container\n  with `aria-busy="true"` and a brief `aria-label` (see DashboardSkeleton).\n- The shimmer is disabled under `prefers-reduced-motion: reduce`.\n        '.trim()}}}},r={render:()=>e.jsxs("div",{style:{width:320},children:[e.jsx(a,{width:"45%",height:12}),e.jsx(a,{width:"100%",height:10,style:{marginTop:8}}),e.jsx(a,{width:"85%",height:10,style:{marginTop:6}}),e.jsx(a,{width:"38%",height:10,style:{marginTop:6}})]})},t={render:()=>e.jsxs("div",{style:{width:280,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-md)",overflow:"hidden"},children:[e.jsx(a,{width:"100%",height:160,radius:0}),e.jsxs("div",{style:{padding:16,display:"flex",flexDirection:"column",gap:10},children:[e.jsx(a,{width:"60%",height:12}),e.jsx(a,{width:"100%",height:10}),e.jsx(a,{width:"80%",height:10})]})]})},i={name:"Full dashboard skeleton",render:()=>e.jsx(d,{}),parameters:{layout:"fullscreen",docs:{description:{story:"Composed skeleton that mirrors the authenticated dashboard layout — the screen the user sees in the brief moment after login."}}}};var o,l,h;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 320
  }}>
      <Skeleton width="45%" height={12} />
      <Skeleton width="100%" height={10} style={{
      marginTop: 8
    }} />
      <Skeleton width="85%" height={10} style={{
      marginTop: 6
    }} />
      <Skeleton width="38%" height={10} style={{
      marginTop: 6
    }} />
    </div>
}`,...(h=(l=r.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var c,m,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 280,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden"
  }}>
      <Skeleton width="100%" height={160} radius={0} />
      <div style={{
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }}>
        <Skeleton width="60%" height={12} />
        <Skeleton width="100%" height={10} />
        <Skeleton width="80%" height={10} />
      </div>
    </div>
}`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var p,g,x;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "Full dashboard skeleton",
  render: () => <DashboardSkeleton />,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Composed skeleton that mirrors the authenticated dashboard layout — the screen the user sees in the brief moment after login."
      }
    }
  }
}`,...(x=(g=i.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const S=["Block","Card","Dashboard"];export{r as Block,t as Card,i as Dashboard,S as __namedExportsOrder,_ as default};
