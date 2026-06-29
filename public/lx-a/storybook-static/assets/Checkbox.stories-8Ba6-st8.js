import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as v}from"./index-ClcD9ViR.js";import{C as g}from"./Checkbox-apHFA1nz.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-DC4KyQ6f.js";const E={title:"Primitives/Checkbox",component:g,parameters:{layout:"centered",docs:{description:{component:`
Compact custom-styled checkbox with a real, focusable native input. Used in
login (Stay logged in), register (Terms), and pattern flyouts.

### Accessibility

- Native \`<input type="checkbox">\` retained for assistive tech and form
  semantics; focus ring shows on \`:focus-visible\` via the visual proxy.
- The visible box is \`aria-hidden\`; the label text is read by SR users.
- Click or press Space to toggle; Enter does **not** toggle in a form to
  avoid accidental submission.

### Specs

- 20×20 box, \`--radius-sm\`, 1.5px border.
- Checked: background \`--fg\`, tick uses \`--fg-on-accent\`.
        `.trim()}}}};function s({label:h="Stay logged in",initial:b=!1}){const[x,f]=v.useState(b);return e.jsx(g,{checked:x,onChange:f,label:h})}const r={render:()=>e.jsx(s,{})},t={render:()=>e.jsx(s,{initial:!0})},o={name:"Long label",render:()=>e.jsx("div",{style:{maxWidth:360},children:e.jsx(s,{label:"I agree to the Encore Terms and Privacy Notice.",initial:!0})})};var a,n,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <Controlled />
}`,...(i=(n=r.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var c,d,l;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <Controlled initial={true} />
}`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var m,p,u;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: "Long label",
  render: () => <div style={{
    maxWidth: 360
  }}>
      <Controlled label="I agree to the Encore Terms and Privacy Notice." initial={true} />
    </div>
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const L=["Unchecked","Checked","LongLabel"];export{t as Checked,o as LongLabel,r as Unchecked,L as __namedExportsOrder,E as default};
