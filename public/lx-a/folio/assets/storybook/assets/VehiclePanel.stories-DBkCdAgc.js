import{j as t}from"./jsx-runtime-BYYWji4R.js";import{V as i}from"./VehicleCard-Xo78SkQ8.js";import{a as n}from"./accounts-BIvvDVsT.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-CO6p2nHe.js";import"./Carousel-Bfc7wHST.js";import"./dashboard-PpIkkDYV.js";import"./vehicles-Dg4r7W26.js";import"./profile-D1_2poo4.js";const x={title:"Composition/VehiclePanel",component:i,parameters:{layout:"padded",docs:{description:{component:`
Sidebar card showing the member's vehicle(s). When more than one vehicle is
linked, a slim carousel surfaces with prev/next round controls.

### Behaviour

- The active vehicle defaults to the first linked vehicle.
- Manage button invokes \`onManage(id)\` so the parent can route to the
  vehicle detail screen.

### Specs

- Vehicle render at 86% width on a radial backdrop — matches the rest of
  the vehicle-render family.
- Encore "Verified" chip when \`encore: true\`.
- Sits in the dashboard \`.dash__side\` next to the OffersCarousel.
        `.trim()}}}},e={render:()=>t.jsx("div",{style:{width:"100%",maxWidth:380,margin:"0 auto"},children:t.jsx(i,{onManage:()=>{},vehicles:n.owner.vehicles})})};var r,o,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => <div style={{
    width: "100%",
    maxWidth: 380,
    margin: "0 auto"
  }}>
      <VehiclePanel onManage={() => {}} vehicles={accounts.owner.vehicles} />
    </div>
}`,...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const g=["Default"];export{e as Default,g as __namedExportsOrder,x as default};
