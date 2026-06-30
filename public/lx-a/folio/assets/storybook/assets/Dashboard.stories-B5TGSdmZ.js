import{j as e}from"./jsx-runtime-BYYWji4R.js";import{T as d}from"./TopNav-C5ktwZFf.js";import{n as p}from"./dashboard-PpIkkDYV.js";import{H as h}from"./Hero-BhX9jqyR.js";import{O as u}from"./OnboardingBanner-DTl15lW1.js";import{T as v}from"./TodayModule-DTibmPey.js";import{B as b}from"./BenefitCard-ak2smjab.js";import{O as f}from"./OffersCarousel-CTCqw87f.js";import{V as N}from"./VehicleCard-Xo78SkQ8.js";import{C as x}from"./ConciergeButton-D3jkmEl4.js";import{a as _}from"./accounts-BIvvDVsT.js";import{A as g}from"./icons-CO6p2nHe.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./notifications-Cjmw1YQT.js";import"./FlyoutProvider-8hBwW8GN.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";import"./relativeTime-DJMNEcqn.js";import"./Carousel-Bfc7wHST.js";import"./vehicles-Dg4r7W26.js";import"./valet-B1TJxLs_.js";import"./lounge-B1FbmX0T.js";function r({active:a,onChange:m,labels:o}){return e.jsx("div",{className:"secnav",children:e.jsxs("div",{className:"shell secnav__inner",children:[e.jsx("nav",{className:"secnav__tabs","aria-label":"Account sections",children:p.map(s=>e.jsx("button",{className:`secnav__tab${s.value===a?" is-active":""}`,onClick:()=>m(s.value),"aria-current":s.value===a?"page":void 0,children:(o==null?void 0:o[s.value])??s.label},s.value))}),e.jsxs("span",{className:"secnav__logo encmark","aria-label":"Encore Platinum",children:[e.jsx("span",{className:"encmark__main",children:"ENCORE"}),e.jsx("span",{className:"encmark__sub",children:"PLATINUM"})]})]})})}try{r.displayName="SectionNav",r.__docgenInfo={description:"",displayName:"SectionNav",props:{active:{defaultValue:null,description:"",name:"active",required:!0,type:{name:"enum",value:[{value:'"Dashboard"'},{value:'"My Lexus"'},{value:'"Encore"'},{value:'"Profile"'}]}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:'(s: "Dashboard" | "My Lexus" | "Encore" | "Profile") => void'}},labels:{defaultValue:null,description:"Per-account label overrides keyed by section (e.g. My Lexus → Wishlist).",name:"labels",required:!1,type:{name:'Partial<Record<"Dashboard" | "My Lexus" | "Encore" | "Profile", string>>'}}}}}catch{}const n=_.owner,Z={title:"Pages/Dashboard",parameters:{layout:"fullscreen",docs:{description:{component:`
The authenticated landing page. Reads top-to-bottom as:

1. **TopNav** — Lexus mark + primary links + search/notifications + Quick
   Book + account.
2. **SectionNav** — Dashboard / My Lexus / Encore / Profile tabs.
3. **Hero** — time-of-day greeting on a member-photo backdrop.
4. **OnboardingBanner** — anniversary / welcome moment (dismissible).
5. **Encore Benefits + Offers** in the main column.
6. **Today + Vehicle panel** in the sidebar.
7. **Concierge** floating affordance.

Use this story to review composition, breakpoints and density.
        `.trim()}}}},i={render:()=>e.jsxs("div",{className:"app",children:[e.jsx(d,{member:n.member,switchLabel:n.switchLabel}),e.jsx(r,{active:"Dashboard",onChange:()=>{}}),e.jsxs("main",{id:"main",className:"app__body",children:[e.jsx(h,{member:n.member}),e.jsx("div",{className:"shell",children:e.jsx(u,{member:n.member})}),e.jsxs("div",{className:"shell dash",children:[e.jsxs("div",{className:"dash__main",children:[e.jsxs("section",{className:"benefits",children:[e.jsxs("header",{className:"section-head",children:[e.jsx("h2",{className:"eyebrow",children:"Encore Benefits"}),e.jsxs("button",{type:"button",className:"link-arrow",children:["All Encore benefits ",e.jsx(g,{width:16,height:16})]})]}),e.jsx("div",{className:"benefits__grid",children:n.dashboardBenefits.map(a=>e.jsx(b,{benefit:a,ctaLabel:a.id==="valet"?"Book now":"Redeem",onClick:a.id!=="on-demand"?()=>{}:void 0},a.id))})]}),e.jsx(f,{onExploreAll:()=>{}})]}),e.jsxs("div",{className:"dash__side",children:[e.jsx(v,{onOpenVehicle:()=>{},vehicles:n.vehicles}),e.jsx(N,{onManage:()=>{},vehicles:n.vehicles})]})]})]}),e.jsx(x,{})]})};var t,c,l;i.parameters={...i.parameters,docs:{...(t=i.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <div className="app">
    <TopNav member={account.member} switchLabel={account.switchLabel} />
      <SectionNav active="Dashboard" onChange={() => {}} />
      <main id="main" className="app__body">
      <Hero member={account.member} />
        <div className="shell">
        <OnboardingBanner member={account.member} />
        </div>
        <div className="shell dash">
          <div className="dash__main">
            <section className="benefits">
              <header className="section-head">
                <h2 className="eyebrow">Encore Benefits</h2>
                <button type="button" className="link-arrow">
                  All Encore benefits <ArrowRight width={16} height={16} />
                </button>
              </header>
              <div className="benefits__grid">
                {account.dashboardBenefits.map(b => <BenefitCard key={b.id} benefit={b} ctaLabel={b.id === "valet" ? "Book now" : "Redeem"} onClick={b.id !== "on-demand" ? () => {} : undefined} />)}
              </div>
            </section>

            <OffersCarousel onExploreAll={() => {}} />
          </div>

          <div className="dash__side">
            <TodayModule onOpenVehicle={() => {}} vehicles={account.vehicles} />
            <VehiclePanel onManage={() => {}} vehicles={account.vehicles} />
          </div>
        </div>
      </main>
      <ConciergeButton />
    </div>
}`,...(l=(c=i.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const ee=["Default"];export{i as Default,ee as __namedExportsOrder,Z as default};
