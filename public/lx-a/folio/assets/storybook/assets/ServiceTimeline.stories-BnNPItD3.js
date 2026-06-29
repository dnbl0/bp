import{j as h}from"./jsx-runtime-BYYWji4R.js";import{S as n}from"./ServiceTimeline-YYzT7X-q.js";import{v as i}from"./vehicles-BaCw3toR.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./service-DNBLk8uc.js";const S={title:"Visualisation/ServiceTimeline",component:n,parameters:{layout:"padded",docs:{description:{component:`
Horizontal timeline of past and upcoming services for a single vehicle.
Surfaced on the Vehicle Detail → Service tab.

### Reading the chart

- A horizontal rail anchored to past dates on the left and the next upcoming
  service on the right.
- Past services are filled dark dots; upcoming uses tier-clay tone with a soft
  glow.
- A dashed accent line marks **Today**, with a small label.
- Hover (or focus) any dot to reveal a card with date, title and dealer.

### Accessibility

- The rail carries \`role="img"\` and \`aria-label="Service timeline"\`.
- Hovered detail cards aren't keyboard-focusable today — keyboard users see
  the same data in the **Service history** flyout (linked from the Maintenance
  card on the Service tab).

### Layout

- 220px rail height.
- Inline 24px margin so detail cards don't clip on smaller widths.
        `.trim()}}}},e={name:"NX 450h+ (with upcoming)",render:()=>{const a=i.find(t=>t.id==="nx450h")??i[0];return h.jsx(n,{vehicle:a})}},r={name:"UX 300e (no upcoming)",render:()=>{const a=i.find(t=>t.id==="ux300e")??i[0];return h.jsx(n,{vehicle:a})}};var o,s,c;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  name: "NX 450h+ (with upcoming)",
  render: () => {
    const v = vehicles.find(x => x.id === "nx450h") ?? vehicles[0];
    return <ServiceTimeline vehicle={v} />;
  }
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var d,l,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "UX 300e (no upcoming)",
  render: () => {
    const v = vehicles.find(x => x.id === "ux300e") ?? vehicles[0];
    return <ServiceTimeline vehicle={v} />;
  }
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const y=["NX450h","UX300e"];export{e as NX450h,r as UX300e,y as __namedExportsOrder,S as default};
