import{j as e}from"./jsx-runtime-BYYWji4R.js";import{A as i}from"./AuthLayout-XexULNhu.js";import{C as l}from"./icons-DC4KyQ6f.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";function a({title:o,onBack:c}){return e.jsxs(i,{children:[e.jsxs("button",{className:"crumb auth__back",onClick:c,children:[e.jsx(l,{width:15,height:15})," Back to log in"]}),e.jsxs("p",{className:"auth__eyebrow",children:[e.jsx("span",{className:"tick"})," Encore"]}),e.jsx("h1",{className:"auth__title",children:o}),e.jsx("p",{className:"auth__sub",children:"This screen is part of the prototype roadmap — the design will be added next."})]})}try{a.displayName="AuthPlaceholder",a.__docgenInfo={description:"",displayName:"AuthPlaceholder",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},onBack:{defaultValue:null,description:"",name:"onBack",required:!0,type:{name:"() => void"}}}}}catch{}const y={title:"Authentication/AuthPlaceholder",component:a,parameters:{layout:"fullscreen",docs:{description:{component:`
A "coming soon" auth screen — wraps \`AuthLayout\` with a back link, Encore
eyebrow, a title and roadmap copy. Used for auth entry points whose full
design hasn't landed yet, so navigation stays intact during the prototype.
        `.trim()}}},argTypes:{title:{control:"text"},onBack:{action:"back"}}},t={args:{title:"Forgot your password?",onBack:()=>{}}};var r,s,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    title: "Forgot your password?",
    onBack: () => {}
  }
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const _=["Default"];export{t as Default,_ as __namedExportsOrder,y as default};
