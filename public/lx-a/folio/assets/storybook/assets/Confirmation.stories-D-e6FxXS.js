import{j as e}from"./jsx-runtime-BYYWji4R.js";import{C as i}from"./Confirmation-CgcDxs0V.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-DC4KyQ6f.js";const g={title:"Patterns/Confirmation",component:i,parameters:{layout:"padded",docs:{description:{component:`
Shared success panel used at the end of every flyout flow — booking,
valet, lounge redemption, add-vehicle, refer-a-friend, concierge message.

### Anatomy

- Centred green tick (60px pill, success-tinted background).
- Title — what just happened.
- Description — what the user should expect next.
- Optional meta — small chip-like line ("2 redemptions remaining").
- Single ghost "Done" CTA that calls \`onDone\`.

### When to use

Use this at the end of any positive flow. It keeps the celebration moment
consistent and saves designers from re-inventing a success screen each
time.
        `.trim()}}}},t={render:()=>e.jsx("div",{style:{maxWidth:380,padding:24},children:e.jsx(i,{title:"Booking confirmed",description:e.jsxs(e.Fragment,{children:["Valet parking confirmed at ",e.jsx("strong",{children:"Westfield Bondi Junction"}),". Just arrive and the friendly staff will park your Lexus."]}),meta:"2 redemptions remaining",onDone:()=>{}})})},n={name:"Without meta",render:()=>e.jsx("div",{style:{maxWidth:380,padding:24},children:e.jsx(i,{title:"Invitation sent",description:e.jsxs(e.Fragment,{children:["We've emailed ",e.jsx("strong",{children:"Alex"})," a personal Encore test-drive invitation."]}),onDone:()=>{}})})};var r,o,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 380,
    padding: 24
  }}>
      <Confirmation title="Booking confirmed" description={<>
            Valet parking confirmed at <strong>Westfield Bondi Junction</strong>.
            Just arrive and the friendly staff will park your Lexus.
          </>} meta="2 redemptions remaining" onDone={() => {}} />
    </div>
}`,...(a=(o=t.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var s,d,m;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: "Without meta",
  render: () => <div style={{
    maxWidth: 380,
    padding: 24
  }}>
      <Confirmation title="Invitation sent" description={<>
            We've emailed <strong>Alex</strong> a personal Encore test-drive
            invitation.
          </>} onDone={() => {}} />
    </div>
}`,...(m=(d=n.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const f=["Default","WithoutMeta"];export{t as Default,n as WithoutMeta,f as __namedExportsOrder,g as default};
