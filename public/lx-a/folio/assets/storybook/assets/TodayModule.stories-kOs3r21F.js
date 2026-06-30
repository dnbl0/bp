import{j as t}from"./jsx-runtime-BYYWji4R.js";import{T as n}from"./TodayModule-DTibmPey.js";import{a as s}from"./accounts-BIvvDVsT.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-CO6p2nHe.js";import"./FlyoutProvider-8hBwW8GN.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";import"./relativeTime-DJMNEcqn.js";import"./dashboard-PpIkkDYV.js";import"./vehicles-Dg4r7W26.js";const N={title:"Composition/TodayModule",component:n,parameters:{layout:"padded",docs:{description:{component:`
Slim status strip surfacing **next service** and **upcoming events**. Lives
in the dashboard sidebar — narrow column, vertical stack.

### Cells

- **Lead (next service)** — accent-tinted background, relative time chip,
  Smart book CTA that opens the booking flyout pre-filled.
- **Upcoming** — count of scheduled events with the next event's date.
  Routes to the Upcoming flyout when there's one or more.

### Empty states

- No next service due → "No services due" + a normal Book a service button.
- No upcoming events → "Nothing scheduled", CTA hidden.

### Specs

- Cell min-height 64px, padding \`--space-3 / --space-4\`.
- Icon: 32px pill with elevation-inset background.
- Stack gap: \`--space-3\`.
        `.trim()}}}},e={render:()=>t.jsx("div",{style:{maxWidth:380},children:t.jsx(n,{onOpenVehicle:()=>{},vehicles:s.owner.vehicles})})};var o,i,r;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 380
  }}>
      <TodayModule onOpenVehicle={() => {}} vehicles={accounts.owner.vehicles} />
    </div>
}`,...(r=(i=e.parameters)==null?void 0:i.docs)==null?void 0:r.source}}};const E=["Default"];export{e as Default,E as __namedExportsOrder,N as default};
