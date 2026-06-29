import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as o}from"./index-ClcD9ViR.js";import{S as V,X as M}from"./icons-DC4KyQ6f.js";import{d as L,s as O}from"./service-DNBLk8uc.js";import{u as A,m as B}from"./FlyoutProvider-P9Q0XqON.js";import{a as C}from"./accounts-B26DJhEI.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-DqULDr2a.js";import"./Radio-5Lqa9hyu.js";import"./TextField-DZx8ztRo.js";import"./Confirmation-CgcDxs0V.js";import"./Table-Cl5q1-NJ.js";import"./DatePicker-DdS7sv6N.js";import"./StepIndicator-xww0QFSC.js";import"./dashboard-Cb8hRV_-.js";import"./vehicles-BaCw3toR.js";function h({onNavigate:m,onOpenVehicle:x,vehicles:k,benefits:_,canBookService:f=!0,canUseConcierge:w=!0}){const{open:l}=A(),[c,y]=o.useState(!1),[d,j]=o.useState(""),[v,u]=o.useState(0),E=o.useRef(null);o.useEffect(()=>{const t=s=>{(s.metaKey||s.ctrlKey)&&s.key.toLowerCase()==="k"?(s.preventDefault(),y(e=>!e)):s.key==="Escape"&&c&&(s.preventDefault(),y(!1))};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[c]),o.useEffect(()=>{c?(j(""),u(0),window.setTimeout(()=>{var t;return(t=E.current)==null?void 0:t.focus()},20),document.body.style.overflow="hidden"):document.body.style.overflow=""},[c]);const g=()=>y(!1),a=t=>{g(),window.setTimeout(t,50)},b=o.useMemo(()=>{const t=[];["Dashboard","My Lexus","Encore","Profile"].forEach(e=>t.push({id:`sec-${e}`,group:"Sections",label:e,run:()=>a(()=>m(e))})),k.forEach(e=>t.push({id:`veh-${e.id}`,group:"Vehicles",label:`${e.year} ${e.name}`,meta:`${e.bodyType} · ${e.rego}`,run:()=>a(()=>x(e.id))})),_.forEach(e=>t.push({id:`ben-${e.id}`,group:"Benefits",label:e.title,meta:e.kicker,run:()=>a(()=>m("Encore"))})),B.forEach(e=>t.push({id:`man-${e.id}`,group:"Manuals",label:e.title,meta:`${e.format} · ${e.size}`,run:()=>a(()=>l("manuals"))})),L.forEach(e=>t.push({id:`deal-${e.id}`,group:"Dealers",label:e.name,meta:e.address,run:()=>a(()=>l("preferred-dealer"))})),O.forEach(e=>t.push({id:`srv-${e.id}`,group:"Service history",label:`${e.title} · ${e.interval}`,meta:e.date,run:()=>a(()=>l("service-history"))}));const s=(e,i)=>t.push({id:`act-${i}`,group:"Actions",label:e,run:()=>a(()=>l(i))});return f&&s("Book a service","book-service"),w&&s("Open concierge","concierge"),s("Refer a friend","refer-friend"),s("Open settings","settings"),s("Show upcoming","upcoming"),f&&s("Add a vehicle","add-vehicle"),t},[m,x,l,k,_,f,w]),n=o.useMemo(()=>{const t=d.trim().toLowerCase();return t?b.filter(s=>{var e;return s.label.toLowerCase().includes(t)||(((e=s.meta)==null?void 0:e.toLowerCase().includes(t))??!1)||s.group.toLowerCase().includes(t)}).slice(0,50):b.slice(0,24)},[b,d]),K=o.useMemo(()=>{const t=new Map;return n.forEach(s=>{const e=t.get(s.group)??[];e.push(s),t.set(s.group,e)}),Array.from(t.entries())},[n]);if(o.useEffect(()=>{u(0)},[d]),!c)return null;const D=t=>{var s;t.key==="ArrowDown"?(t.preventDefault(),u(e=>Math.min(e+1,n.length-1))):t.key==="ArrowUp"?(t.preventDefault(),u(e=>Math.max(e-1,0))):t.key==="Enter"&&(t.preventDefault(),(s=n[v])==null||s.run())};return r.jsxs("div",{className:"cmdk",role:"dialog","aria-modal":"true","aria-label":"Search",children:[r.jsx("div",{className:"cmdk__scrim",onClick:g}),r.jsxs("div",{className:"cmdk__panel",children:[r.jsxs("div",{className:"cmdk__inputrow",children:[r.jsx(V,{width:18,height:18}),r.jsx("input",{ref:E,type:"text",className:"cmdk__input",placeholder:"Search Lexus — vehicles, dealers, manuals, actions…",value:d,onChange:t=>j(t.target.value),onKeyDown:D}),r.jsx("button",{type:"button",className:"cmdk__close","aria-label":"Close",onClick:g,children:r.jsx(M,{width:16,height:16})})]}),r.jsx("div",{className:"cmdk__results",role:"listbox",children:n.length===0?r.jsxs("p",{className:"cmdk__empty",children:['No matches for "',d,'".']}):K.map(([t,s])=>r.jsxs("div",{className:"cmdk__group",children:[r.jsx("p",{className:"cmdk__grouphead",children:t}),s.map(e=>{const i=n.indexOf(e);return r.jsxs("button",{type:"button",role:"option","aria-selected":i===v,className:`cmdk__item${i===v?" is-active":""}`,onMouseEnter:()=>u(i),onClick:e.run,children:[r.jsx("span",{className:"cmdk__itemlabel",children:e.label}),e.meta&&r.jsx("span",{className:"cmdk__itemmeta",children:e.meta})]},e.id)})]},t))}),r.jsxs("footer",{className:"cmdk__foot",children:[r.jsxs("span",{children:[r.jsx("kbd",{children:"↑"}),r.jsx("kbd",{children:"↓"})," navigate"]}),r.jsxs("span",{children:[r.jsx("kbd",{children:"↵"})," select"]}),r.jsxs("span",{children:[r.jsx("kbd",{children:"Esc"})," close"]})]})]})]})}try{h.displayName="CommandPalette",h.__docgenInfo={description:"",displayName:"CommandPalette",props:{onNavigate:{defaultValue:null,description:"",name:"onNavigate",required:!0,type:{name:"(section: Section) => void"}},onOpenVehicle:{defaultValue:null,description:"",name:"onOpenVehicle",required:!0,type:{name:"(id: string) => void"}},vehicles:{defaultValue:null,description:"",name:"vehicles",required:!0,type:{name:"Vehicle[]"}},benefits:{defaultValue:null,description:"",name:"benefits",required:!0,type:{name:"Benefit[]"}},canBookService:{defaultValue:{value:"true"},description:"",name:"canBookService",required:!1,type:{name:"boolean"}},canUseConcierge:{defaultValue:{value:"true"},description:"",name:"canUseConcierge",required:!1,type:{name:"boolean"}}}}}catch{}const re={title:"Search/Command palette",component:h,parameters:{layout:"fullscreen",docs:{description:{component:`
Global search palette. Hit **⌘K** (or **Ctrl+K**) anywhere to open.

### What it searches

- Sections (Dashboard, My Lexus, Encore, Profile).
- Vehicles by name + rego.
- Benefits.
- Manuals (Owner's manual, warranty, EV battery care…).
- Dealers by name + address.
- Service history records.
- Actions (Book a service, Open concierge, Refer a friend, Settings,
  Upcoming, Add a vehicle).

### Keyboard

- **↑ / ↓** navigate.
- **Enter** select.
- **Esc** close.
- **⌘K / Ctrl+K** open/close from anywhere.

### Accessibility

- \`role="dialog"\` \`aria-modal="true"\` with focus on the input on open.
- Results list uses \`role="listbox"\` and each item \`role="option"\` with
  \`aria-selected\`.
- Body scroll is locked while open.
        `.trim()}}}},p={render:()=>r.jsxs("div",{children:[r.jsxs("p",{style:{color:"var(--fg-muted)",padding:24},children:["Press ",r.jsx("kbd",{children:"⌘K"})," or ",r.jsx("kbd",{children:"Ctrl+K"})," to open the command palette."]}),r.jsx(h,{onNavigate:()=>{},onOpenVehicle:()=>{},vehicles:C.owner.vehicles,benefits:C.owner.encoreBenefits})]})};var N,S,$;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div>
      <p style={{
      color: "var(--fg-muted)",
      padding: 24
    }}>
        Press <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd> to open the command palette.
      </p>
      <CommandPalette onNavigate={() => {}} onOpenVehicle={() => {}} vehicles={accounts.owner.vehicles} benefits={accounts.owner.encoreBenefits} />
    </div>
}`,...($=(S=p.parameters)==null?void 0:S.docs)==null?void 0:$.source}}};const se=["Default"];export{p as Default,se as __namedExportsOrder,re as default};
