import{j as e}from"./jsx-runtime-BYYWji4R.js";import{T as l}from"./TopNav-BNhzx6Jo.js";import{n as d}from"./dashboard-Cb8hRV_-.js";import{H as p}from"./Hero-D7WOlNXN.js";import{O as h}from"./OnboardingBanner-BvibuS5c.js";import{T as u}from"./TodayModule-CnyTuNyw.js";import{B as v}from"./BenefitCard-DKq2KvRn.js";import{O as b}from"./OffersCarousel-DVRRonXF.js";import{V as f}from"./VehicleCard-Chzek8Ou.js";import{C as N}from"./ConciergeButton-CKYxwFvV.js";import{a as x}from"./accounts-B26DJhEI.js";import{A as _}from"./icons-DC4KyQ6f.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./notifications-Cjmw1YQT.js";import"./FlyoutProvider-P9Q0XqON.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-DqULDr2a.js";import"./Radio-5Lqa9hyu.js";import"./TextField-DZx8ztRo.js";import"./Confirmation-CgcDxs0V.js";import"./Table-Cl5q1-NJ.js";import"./DatePicker-DdS7sv6N.js";import"./StepIndicator-xww0QFSC.js";import"./relativeTime-DJMNEcqn.js";import"./Carousel-D6UyLyPg.js";import"./vehicles-BaCw3toR.js";import"./valet-B1TJxLs_.js";import"./lounge-1r1YjYL8.js";function o({active:a,onChange:m}){return e.jsx("div",{className:"secnav",children:e.jsx("div",{className:"shell secnav__inner",children:e.jsx("nav",{className:"secnav__tabs","aria-label":"Account sections",children:d.map(s=>e.jsx("button",{className:`secnav__tab${s.value===a?" is-active":""}`,onClick:()=>m(s.value),"aria-current":s.value===a?"page":void 0,children:s.label},s.value))})})})}try{o.displayName="SectionNav",o.__docgenInfo={description:"",displayName:"SectionNav",props:{active:{defaultValue:null,description:"",name:"active",required:!0,type:{name:"enum",value:[{value:'"Dashboard"'},{value:'"My Lexus"'},{value:'"Encore"'},{value:'"Profile"'}]}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:'(s: "Dashboard" | "My Lexus" | "Encore" | "Profile") => void'}}}}}catch{}const n=x.owner,Y={title:"Pages/Dashboard",parameters:{layout:"fullscreen",docs:{description:{component:`
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
        `.trim()}}}},i={render:()=>e.jsxs("div",{className:"app",children:[e.jsx(l,{member:n.member,switchLabel:n.switchLabel}),e.jsx(o,{active:"Dashboard",onChange:()=>{}}),e.jsxs("main",{id:"main",className:"app__body",children:[e.jsx(p,{member:n.member}),e.jsx("div",{className:"shell",children:e.jsx(h,{member:n.member})}),e.jsxs("div",{className:"shell dash",children:[e.jsxs("div",{className:"dash__main",children:[e.jsxs("section",{className:"benefits",children:[e.jsxs("header",{className:"section-head",children:[e.jsx("h2",{className:"eyebrow",children:"Encore Benefits"}),e.jsxs("button",{type:"button",className:"link-arrow",children:["All Encore benefits ",e.jsx(_,{width:16,height:16})]})]}),e.jsx("div",{className:"benefits__grid",children:n.dashboardBenefits.map(a=>e.jsx(v,{benefit:a,ctaLabel:a.id==="valet"?"Book now":"Redeem",onClick:a.id!=="on-demand"?()=>{}:void 0},a.id))})]}),e.jsx(b,{onExploreAll:()=>{}})]}),e.jsxs("div",{className:"dash__side",children:[e.jsx(u,{onOpenVehicle:()=>{},vehicles:n.vehicles}),e.jsx(f,{onManage:()=>{},vehicles:n.vehicles})]})]})]}),e.jsx(N,{})]})};var r,t,c;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(c=(t=i.parameters)==null?void 0:t.docs)==null?void 0:c.source}}};const Z=["Default"];export{i as Default,Z as __namedExportsOrder,Y as default};
