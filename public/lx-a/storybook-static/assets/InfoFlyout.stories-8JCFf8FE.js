import{j as o}from"./jsx-runtime-BYYWji4R.js";import{I as c}from"./FlyoutProvider-P9Q0XqON.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-DqULDr2a.js";import"./icons-DC4KyQ6f.js";import"./Radio-5Lqa9hyu.js";import"./TextField-DZx8ztRo.js";import"./Confirmation-CgcDxs0V.js";import"./Table-Cl5q1-NJ.js";import"./DatePicker-DdS7sv6N.js";import"./StepIndicator-xww0QFSC.js";const C={title:"Flyouts/Info flyout (generic)",parameters:{layout:"fullscreen",docs:{description:{component:`
The reusable **"Learn more" building block** that other content flyouts
compose. Unlike the kind-driven flyouts, \`<InfoFlyout>\` is not registered
with the \`FlyoutProvider\` by a \`FlyoutKind\` — it's a generic shell you render
directly with content.

### Props

- \`open\` — controls visibility.
- \`title\` — the flyout's header label.
- \`heading\` — the large content heading.
- \`description\` — optional supporting line under the heading.
- \`children\` — the body slot; the caller decides what goes here (tables,
  lists, paragraphs).
- \`primaryAction\` — optional \`{ label, onClick }\`. When supplied, the footer
  shows a primary button next to a ghost *Close*. When omitted, no footer
  renders and the flyout is dismissed via its header close control.

### Where it's used

DriveCare, Service loan car and Encore vehicle info all wrap \`<InfoFlyout>\`,
passing their own title, heading, description, body and primary action. This
keeps every "learn more" surface visually and behaviourally consistent.

### Accessibility

- Inherits focus trap + focus restore from \`<Flyout>\`.
- Close is always reachable: via the primary/ghost footer pair when an action
  is present, and via the header close control regardless.
        `.trim()}}}},e={name:"With primary action",render:()=>o.jsx(c,{open:!0,title:"About Encore",heading:"Membership, elevated",description:"A short supporting line that frames the content below.",primaryAction:{label:"Got it",onClick:()=>{}},children:o.jsx("p",{style:{color:"var(--fg-muted)"},children:"Example body content goes here. Callers pass tables, lists or paragraphs into the body slot."})}),parameters:{docs:{description:{story:"The standard configuration: a primary action paired with a ghost Close in the footer."}}}},t={name:"Without primary action",render:()=>o.jsx(c,{open:!0,title:"About Encore",heading:"Membership, elevated",description:"With no primaryAction, the footer is omitted entirely.",children:o.jsx("p",{style:{color:"var(--fg-muted)"},children:"Without a primary action there is no footer — the flyout is dismissed using the header close control."})}),parameters:{docs:{description:{story:"Omitting `primaryAction` removes the footer; dismissal relies on the header close control."}}}};var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  name: "With primary action",
  render: () => <InfoFlyout open title="About Encore" heading="Membership, elevated" description="A short supporting line that frames the content below." primaryAction={{
    label: "Got it",
    onClick: () => {}
  }}>
      <p style={{
      color: "var(--fg-muted)"
    }}>
        Example body content goes here. Callers pass tables, lists or
        paragraphs into the body slot.
      </p>
    </InfoFlyout>,
  parameters: {
    docs: {
      description: {
        story: "The standard configuration: a primary action paired with a ghost Close in the footer."
      }
    }
  }
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};var s,a,l;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Without primary action",
  render: () => <InfoFlyout open title="About Encore" heading="Membership, elevated" description="With no primaryAction, the footer is omitted entirely.">
      <p style={{
      color: "var(--fg-muted)"
    }}>
        Without a primary action there is no footer — the flyout is dismissed
        using the header close control.
      </p>
    </InfoFlyout>,
  parameters: {
    docs: {
      description: {
        story: "Omitting \`primaryAction\` removes the footer; dismissal relies on the header close control."
      }
    }
  }
}`,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const I=["Default","NoPrimaryAction"];export{e as Default,t as NoPrimaryAction,I as __namedExportsOrder,C as default};
