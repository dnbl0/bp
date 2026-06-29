import{j as t}from"./jsx-runtime-BYYWji4R.js";import{V as a}from"./VehicleCard-Chzek8Ou.js";import{a as n}from"./accounts-B26DJhEI.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-DC4KyQ6f.js";import"./Carousel-D6UyLyPg.js";import"./dashboard-Cb8hRV_-.js";import"./vehicles-BaCw3toR.js";import"./profile-D1_2poo4.js";const w={title:"Composition/VehiclePanel",component:a,parameters:{layout:"padded",docs:{description:{component:`
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
        `.trim()}}}},e={render:()=>t.jsx("div",{style:{width:380},children:t.jsx(a,{onManage:()=>{},vehicles:n.owner.vehicles})})};var r,o,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 380
  }}>
      <VehiclePanel onManage={() => {}} vehicles={accounts.owner.vehicles} />
    </div>
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const x=["Default"];export{e as Default,x as __namedExportsOrder,w as default};
