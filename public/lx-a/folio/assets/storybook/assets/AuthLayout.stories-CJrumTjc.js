import{j as e}from"./jsx-runtime-BYYWji4R.js";import{A as m}from"./AuthLayout-XexULNhu.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-DC4KyQ6f.js";const f={title:"Authentication/AuthLayout",component:m,parameters:{layout:"fullscreen",docs:{description:{component:'\nThe shared shell for every authentication screen — the full public Lexus top\nnav, an optional "Close" affordance, a left form panel (`children`) and a\nright lifestyle image (`image`). `LoginScreen`, `RegisterScreen` and\n`ResetScreen` all compose this, as does `AuthPlaceholder`.\n        '.trim()}}},argTypes:{image:{control:"text"},onClose:{action:"close"}}},c=e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"auth__eyebrow",children:[e.jsx("span",{className:"tick"})," Encore"]}),e.jsx("h1",{className:"auth__title",children:"Welcome back"}),e.jsx("p",{className:"auth__sub",children:"Sign in to manage your vehicles, bookings and Encore benefits."})]}),a={name:"Shell with content",args:{children:c,image:"assets/auth-login.jpg"}},s={name:"With close affordance",args:{children:c,image:"assets/auth-login.jpg",onClose:()=>{}},parameters:{docs:{description:{story:"Passing `onClose` reveals the close link — used when auth is entered as a modal flow rather than a destination."}}}};var n,t,o;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: "Shell with content",
  args: {
    children: SampleForm,
    image: "assets/auth-login.jpg"
  }
}`,...(o=(t=a.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var r,i,l;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`{
  name: "With close affordance",
  args: {
    children: SampleForm,
    image: "assets/auth-login.jpg",
    onClose: () => {}
  },
  parameters: {
    docs: {
      description: {
        story: "Passing \`onClose\` reveals the close link — used when auth is entered as a modal flow rather than a destination."
      }
    }
  }
}`,...(l=(i=s.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const j=["Default","WithClose"];export{a as Default,s as WithClose,j as __namedExportsOrder,f as default};
