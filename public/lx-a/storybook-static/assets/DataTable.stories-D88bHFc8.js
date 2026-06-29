import{j as e}from"./jsx-runtime-BYYWji4R.js";import{D as o}from"./Table-Cl5q1-NJ.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const f={title:"Primitives/DataTable",component:o,parameters:{layout:"padded",docs:{description:{component:`
Two-column key/value display. Used across vehicle summary, flyout
confirmations and lounge / valet booking detail.

### Semantics

Renders as \`<dl>\` with \`<dt>\` / \`<dd>\` pairs — assistive tech announces
them as definition pairs.

### Anatomy

- \`label\` (left, muted) and \`value\` (right).
- Optional \`action\` button next to the label (Edit / Learn more / Show more).
- Rows separated by 1px borders. Use \`.dtable--flyout\` to add a top and
  bottom border for the in-flyout context.

### Responsive

Below 480px, rows collapse to a single stacked column so long addresses or
dealer names don't get crushed.
        `.trim()}}}},a={render:()=>e.jsx(o,{rows:[{label:"VIN",value:"JTJYARBZ000000456"},{label:"Registration",value:"ABC123"},{label:"Odometer",value:"28,910 km"}]})},n={name:"With row actions",render:()=>e.jsx(o,{rows:[{label:"VIN",value:"JTJYARBZ000000456"},{label:"Registration",value:"ABC123",action:e.jsx("button",{type:"button",className:"dtable__action",children:"Edit"})},{label:"Odometer",value:"28,910 km"},{label:"Connected Vehicle",value:"No",action:e.jsx("button",{type:"button",className:"dtable__action",children:"Learn more"})}]})},t={name:"Inside a flyout",render:()=>e.jsx("div",{style:{maxWidth:380,padding:24,background:"var(--surface)",border:"1px solid var(--border)"},children:e.jsx(o,{className:"dtable--flyout",rows:[{label:"Vehicle",value:"2024 NX 450h+ F Sport"},{label:"Service",value:"Logbook service"},{label:"Dealer",value:"Lexus City Melbourne"},{label:"Address",value:"501 Swanston St, Melbourne VIC 3000"},{label:"Date",value:"12/08/2026"},{label:"Drop-off time",value:"8:30am"}]})})};var l,r,s;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <DataTable rows={[{
    label: "VIN",
    value: "JTJYARBZ000000456"
  }, {
    label: "Registration",
    value: "ABC123"
  }, {
    label: "Odometer",
    value: "28,910 km"
  }]} />
}`,...(s=(r=a.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};var i,d,u;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: "With row actions",
  render: () => <DataTable rows={[{
    label: "VIN",
    value: "JTJYARBZ000000456"
  }, {
    label: "Registration",
    value: "ABC123",
    action: <button type="button" className="dtable__action">
              Edit
            </button>
  }, {
    label: "Odometer",
    value: "28,910 km"
  }, {
    label: "Connected Vehicle",
    value: "No",
    action: <button type="button" className="dtable__action">
              Learn more
            </button>
  }]} />
}`,...(u=(d=n.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var c,b,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Inside a flyout",
  render: () => <div style={{
    maxWidth: 380,
    padding: 24,
    background: "var(--surface)",
    border: "1px solid var(--border)"
  }}>
      <DataTable className="dtable--flyout" rows={[{
      label: "Vehicle",
      value: "2024 NX 450h+ F Sport"
    }, {
      label: "Service",
      value: "Logbook service"
    }, {
      label: "Dealer",
      value: "Lexus City Melbourne"
    }, {
      label: "Address",
      value: "501 Swanston St, Melbourne VIC 3000"
    }, {
      label: "Date",
      value: "12/08/2026"
    }, {
      label: "Drop-off time",
      value: "8:30am"
    }]} />
    </div>
}`,...(m=(b=t.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};const x=["Default","WithActions","InsideFlyout"];export{a as Default,t as InsideFlyout,n as WithActions,x as __namedExportsOrder,f as default};
