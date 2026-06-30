import{j as e}from"./jsx-runtime-BYYWji4R.js";import{S as n}from"./StepIndicator-xww0QFSC.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const v={title:"Patterns/StepIndicator",component:n,parameters:{layout:"padded",docs:{description:{component:`
Linear-flow progress indicator used at the top of multi-step flyouts. Drives
the Book a Service wizard.

### Anatomy

- Label line: "Step N of M · Current label" in muted uppercase.
- Segmented track: one segment per step; completed segments tint solid \`--fg\`,
  pending segments fall back to \`--elevation-inset\`.

### Props

- \`current\` — 0-indexed step.
- \`steps\` — array of step labels (3–6 ideal range).

### Accessibility

- Whole element carries \`aria-label\` summarising progress.
- Track itself is \`role="presentation"\` — the label line is the meaningful
  status text.
        `.trim()}}},argTypes:{current:{control:{type:"number",min:0,max:5}}}},o=["Type","Dealer","Date","Time","Transport","Confirm"],t={args:{current:0,steps:o},render:r=>e.jsx("div",{style:{maxWidth:360},children:e.jsx(n,{...r})})},s={args:{current:2,steps:o},render:r=>e.jsx("div",{style:{maxWidth:360},children:e.jsx(n,{...r})})},a={args:{current:5,steps:o},render:r=>e.jsx("div",{style:{maxWidth:360},children:e.jsx(n,{...r})})};var i,d,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    current: 0,
    steps: STEPS
  },
  render: args => <div style={{
    maxWidth: 360
  }}>
      <StepIndicator {...args} />
    </div>
}`,...(c=(d=t.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,m,l;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    current: 2,
    steps: STEPS
  },
  render: args => <div style={{
    maxWidth: 360
  }}>
      <StepIndicator {...args} />
    </div>
}`,...(l=(m=s.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var u,g,S;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    current: 5,
    steps: STEPS
  },
  render: args => <div style={{
    maxWidth: 360
  }}>
      <StepIndicator {...args} />
    </div>
}`,...(S=(g=a.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};const T=["Default","Midway","Last"];export{t as Default,a as Last,s as Midway,T as __namedExportsOrder,v as default};
