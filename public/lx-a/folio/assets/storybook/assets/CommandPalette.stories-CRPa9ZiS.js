import{j as o}from"./jsx-runtime-BYYWji4R.js";import{r as a}from"./index-ClcD9ViR.js";import{S as V,X as P}from"./icons-CO6p2nHe.js";import{d as z,s as B}from"./service-DNBLk8uc.js";import{u as I,m as T}from"./FlyoutProvider-8hBwW8GN.js";import{a as K}from"./accounts-BIvvDVsT.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";import"./dashboard-PpIkkDYV.js";import"./vehicles-Dg4r7W26.js";function k({onNavigate:c,onOpenVehicle:E,vehicles:y,benefits:g,canBookService:p=!0,canUseConcierge:b=!0,canAddVehicle:x=!0,canRedeemEncore:S=!0}){const{open:i}=I(),[m,w]=a.useState(!1),[h,C]=a.useState(""),[_,f]=a.useState(0),M=a.useRef(null);a.useEffect(()=>{const r=t=>{(t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"?(t.preventDefault(),w(e=>!e)):t.key==="Escape"&&m&&(t.preventDefault(),w(!1))};return document.addEventListener("keydown",r),()=>document.removeEventListener("keydown",r)},[m]),a.useEffect(()=>{m?(C(""),f(0),window.setTimeout(()=>{var r;return(r=M.current)==null?void 0:r.focus()},20),document.body.style.overflow="hidden"):document.body.style.overflow=""},[m]);const j=()=>w(!1),s=r=>{j(),window.setTimeout(r,50)},q=a.useMemo(()=>{const r=[];["Dashboard","My Lexus","Encore","Profile"].forEach(e=>r.push({id:`sec-${e}`,group:"Sections",label:e,run:()=>s(()=>c(e))})),y.forEach(e=>r.push({id:`veh-${e.id}`,group:"Vehicles",label:`${e.year} ${e.name}`,meta:`${e.bodyType} · ${e.rego}`,run:()=>s(()=>E(e.id))})),g.forEach(e=>r.push({id:`ben-${e.id}`,group:"Benefits",label:e.title,meta:e.kicker,run:()=>s(()=>c("Encore"))})),T.forEach(e=>r.push({id:`man-${e.id}`,group:"Manuals",label:e.title,meta:`${e.format} · ${e.size}`,run:()=>s(()=>i("manuals"))})),z.forEach(e=>r.push({id:`deal-${e.id}`,group:"Dealers",label:e.name,meta:e.address,run:()=>s(()=>i("preferred-dealer"))})),B.forEach(e=>r.push({id:`srv-${e.id}`,group:"Service history",label:`${e.title} · ${e.interval}`,meta:e.date,run:()=>s(()=>i("service-history"))}));const t=(e,n)=>r.push({id:`act-${n}`,group:"Actions",label:e,run:()=>s(()=>i(n))});return p&&t("Book a service","book-service"),b&&t("Open concierge","concierge"),t("Refer a friend","refer-friend"),t("Open settings","settings"),t("Show upcoming","upcoming"),x&&t("Add a vehicle","add-vehicle"),r},[c,E,i,y,g,p,b,x]),$=a.useMemo(()=>{const r=[],t=(n,l,d,A)=>r.push({id:n,group:"Quick actions",label:l,meta:A,run:d}),e=y[0];return p&&t("q-book","Book a service",()=>s(()=>i("book-service"))),b&&t("q-concierge","Open concierge",()=>s(()=>i("concierge"))),e&&t("q-vehicles","Manage your vehicles",()=>s(()=>c("My Lexus"))),p&&t("q-upcoming","Upcoming bookings",()=>s(()=>i("upcoming"))),x&&!e&&t("q-add","Add a vehicle",()=>s(()=>i("add-vehicle"))),g.length&&t("q-encore",S?"Encore benefits":"Discover Encore",()=>s(()=>c("Encore"))),t("q-profile","Profile & settings",()=>s(()=>c("Profile"))),r.slice(0,6)},[y,g,p,b,x,S,i,c]),u=a.useMemo(()=>{const r=h.trim().toLowerCase();if(!r)return $;const t=q.filter(l=>{var d;return l.label.toLowerCase().includes(r)||(((d=l.meta)==null?void 0:d.toLowerCase().includes(r))??!1)||l.group.toLowerCase().includes(r)}),e=new Map,n=[];for(const l of t){const d=e.get(l.group)??0;d>=5||(e.set(l.group,d+1),n.push(l))}return n},[q,$,h]),O=a.useMemo(()=>{const r=new Map;return u.forEach(t=>{const e=r.get(t.group)??[];e.push(t),r.set(t.group,e)}),Array.from(r.entries())},[u]);if(a.useEffect(()=>{f(0)},[h]),!m)return null;const R=r=>{var t;r.key==="ArrowDown"?(r.preventDefault(),f(e=>Math.min(e+1,u.length-1))):r.key==="ArrowUp"?(r.preventDefault(),f(e=>Math.max(e-1,0))):r.key==="Enter"&&(r.preventDefault(),(t=u[_])==null||t.run())};return o.jsxs("div",{className:"cmdk",role:"dialog","aria-modal":"true","aria-label":"Search",children:[o.jsx("div",{className:"cmdk__scrim",onClick:j}),o.jsxs("div",{className:"cmdk__panel",children:[o.jsxs("div",{className:"cmdk__inputrow",children:[o.jsx(V,{width:18,height:18}),o.jsx("input",{ref:M,type:"text",className:"cmdk__input","aria-label":"Search My Lexus",placeholder:"Search My Lexus…",value:h,onChange:r=>C(r.target.value),onKeyDown:R}),o.jsx("button",{type:"button",className:"cmdk__close","aria-label":"Close",onClick:j,children:o.jsx(P,{width:16,height:16})})]}),o.jsx("div",{className:"cmdk__results",role:"listbox",children:u.length===0?o.jsxs("p",{className:"cmdk__empty",children:['No matches for "',h,'".']}):O.map(([r,t])=>o.jsxs("div",{className:"cmdk__group",children:[o.jsx("p",{className:"cmdk__grouphead",children:r}),t.map(e=>{const n=u.indexOf(e);return o.jsxs("button",{type:"button",role:"option","aria-selected":n===_,className:`cmdk__item${n===_?" is-active":""}`,onMouseEnter:()=>f(n),onClick:e.run,children:[o.jsx("span",{className:"cmdk__itemlabel",children:e.label}),e.meta&&o.jsx("span",{className:"cmdk__itemmeta",children:e.meta})]},e.id)})]},r))}),o.jsxs("footer",{className:"cmdk__foot",children:[o.jsxs("span",{children:[o.jsx("kbd",{children:"↑"}),o.jsx("kbd",{children:"↓"})," navigate"]}),o.jsxs("span",{children:[o.jsx("kbd",{children:"↵"})," select"]}),o.jsxs("span",{children:[o.jsx("kbd",{children:"Esc"})," close"]})]})]})]})}try{k.displayName="CommandPalette",k.__docgenInfo={description:"",displayName:"CommandPalette",props:{onNavigate:{defaultValue:null,description:"",name:"onNavigate",required:!0,type:{name:"(section: Section) => void"}},onOpenVehicle:{defaultValue:null,description:"",name:"onOpenVehicle",required:!0,type:{name:"(id: string) => void"}},vehicles:{defaultValue:null,description:"",name:"vehicles",required:!0,type:{name:"Vehicle[]"}},benefits:{defaultValue:null,description:"",name:"benefits",required:!0,type:{name:"Benefit[]"}},canBookService:{defaultValue:{value:"true"},description:"",name:"canBookService",required:!1,type:{name:"boolean"}},canUseConcierge:{defaultValue:{value:"true"},description:"",name:"canUseConcierge",required:!1,type:{name:"boolean"}},canAddVehicle:{defaultValue:{value:"true"},description:"",name:"canAddVehicle",required:!1,type:{name:"boolean"}},canRedeemEncore:{defaultValue:{value:"true"},description:"",name:"canRedeemEncore",required:!1,type:{name:"boolean"}}}}}catch{}const F=()=>document.dispatchEvent(new KeyboardEvent("keydown",{key:"k",metaKey:!0,ctrlKey:!0,bubbles:!0})),ce={title:"Search/Command palette",component:k,parameters:{layout:"fullscreen",docs:{description:{component:`
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
        `.trim()}}}},v={render:()=>o.jsxs("div",{style:{display:"flex",justifyContent:"center",padding:24},children:[o.jsxs("button",{type:"button","aria-label":"Open search",onClick:F,style:{display:"inline-flex",alignItems:"center",gap:10,width:"min(360px, 100%)",height:42,padding:"0 8px 0 16px",background:"var(--elevation-inset)",border:"1px solid var(--border-strong)",borderRadius:"var(--radius-pill)",color:"var(--fg-muted)",font:"inherit",fontSize:"var(--ld-s-typography-body2-font-size)",cursor:"pointer"},children:[o.jsx(V,{width:16,height:16}),o.jsx("span",{style:{flex:1,textAlign:"left"},children:"Search My Lexus…"}),o.jsx("kbd",{style:{fontSize:11,padding:"3px 7px",border:"1px solid var(--border-strong)",borderRadius:6,color:"var(--fg-dim)"},children:"⌘K"})]}),o.jsx(k,{onNavigate:()=>{},onOpenVehicle:()=>{},vehicles:K.owner.vehicles,benefits:K.owner.encoreBenefits})]})};var N,D,L;v.parameters={...v.parameters,docs:{...(N=v.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    justifyContent: "center",
    padding: 24
  }}>
      {/* A standalone search bar (the nav's own .topnav__search is
          responsively hidden under 860px, which is narrower than this embed). */}
      <button type="button" aria-label="Open search" onClick={openPalette} style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      width: "min(360px, 100%)",
      height: 42,
      padding: "0 8px 0 16px",
      background: "var(--elevation-inset)",
      border: "1px solid var(--border-strong)",
      borderRadius: "var(--radius-pill)",
      color: "var(--fg-muted)",
      font: "inherit",
      fontSize: "var(--ld-s-typography-body2-font-size)",
      cursor: "pointer"
    }}>
        <Search width={16} height={16} />
        <span style={{
        flex: 1,
        textAlign: "left"
      }}>Search My Lexus…</span>
        <kbd style={{
        fontSize: 11,
        padding: "3px 7px",
        border: "1px solid var(--border-strong)",
        borderRadius: 6,
        color: "var(--fg-dim)"
      }}>
          ⌘K
        </kbd>
      </button>
      <CommandPalette onNavigate={() => {}} onOpenVehicle={() => {}} vehicles={accounts.owner.vehicles} benefits={accounts.owner.encoreBenefits} />
    </div>
}`,...(L=(D=v.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};const de=["Default"];export{v as Default,de as __namedExportsOrder,ce as default};
