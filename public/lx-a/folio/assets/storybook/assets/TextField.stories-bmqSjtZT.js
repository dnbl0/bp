import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as P}from"./index-ClcD9ViR.js";import{T as y}from"./TextField-B45XVZ_W.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-CO6p2nHe.js";const A={title:"Primitives/TextField",component:y,parameters:{layout:"centered",docs:{description:{component:'\nA label + input pair. Used across auth, profile edit, payments and any\nflyout that takes text. Password type adds a reveal toggle.\n\n### Props\n\n- `label` — visible field label (sentence case).\n- `required` — appends a red asterisk to the label.\n- `type` — `text | email | password | tel`.\n- `helper` — gentle hint shown under the field.\n- `error` — overrides helper, switches border to error red, sets `aria-invalid`.\n- `autoComplete` — pass the right value so password managers can fill.\n\n### Accessibility\n\n- The input is associated with the label via the wrapping `<label>`.\n- Password reveal toggle has `aria-label` that flips between\n  "Show password" and "Hide password".\n- Caps-Lock detection in LoginScreen surfaces via `helper`.\n\n### Tokens\n\n- Border default: `--border-strong`.\n- Border focus: `--fg-muted`.\n- Border error: `--error-border`.\n        '.trim()}}},args:{label:"Email",required:!0,type:"email",placeholder:"Email address",helper:void 0,error:void 0},argTypes:{type:{control:"select",options:["text","email","password","tel"]}}};function l(e){const[f,x]=P.useState(e.value);return r.jsx("div",{style:{width:360},children:r.jsx(y,{...e,value:f,onChange:x})})}const a={render:e=>r.jsx(l,{...e,value:""})},s={name:"With helper",args:{label:"VIN",helper:"17 characters, found on your compliance plate or rego papers.",type:"text",placeholder:"JTHX9AAA000000123"},render:e=>r.jsx(l,{...e,value:""})},o={name:"With error",args:{label:"Email",type:"email",error:"Enter a valid email address.",value:"susan@"},render:e=>r.jsx(l,{...e})},t={args:{label:"Password",type:"password",required:!0,placeholder:"Password",autoComplete:"current-password",helper:"Use at least 8 characters with a number or symbol."},render:e=>r.jsx(l,{...e,value:""}),parameters:{docs:{description:{story:"Password fields gain a reveal eye toggle. The toggle's `aria-label` flips between 'Show password' and 'Hide password'."}}}};var d,n,i;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <Controlled {...args} value="" />
}`,...(i=(n=a.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var p,c,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: "With helper",
  args: {
    label: "VIN",
    helper: "17 characters, found on your compliance plate or rego papers.",
    type: "text",
    placeholder: "JTHX9AAA000000123"
  },
  render: args => <Controlled {...args} value="" />
}`,...(m=(c=s.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,h,g;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: "With error",
  args: {
    label: "Email",
    type: "email",
    error: "Enter a valid email address.",
    value: "susan@"
  },
  render: args => <Controlled {...args} />
}`,...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var w,b,v;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Password",
    autoComplete: "current-password",
    helper: "Use at least 8 characters with a number or symbol."
  },
  render: args => <Controlled {...args} value="" />,
  parameters: {
    docs: {
      description: {
        story: "Password fields gain a reveal eye toggle. The toggle's \`aria-label\` flips between 'Show password' and 'Hide password'."
      }
    }
  }
}`,...(v=(b=t.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};const W=["Default","WithHelper","WithError","Password"];export{a as Default,t as Password,o as WithError,s as WithHelper,W as __namedExportsOrder,A as default};
