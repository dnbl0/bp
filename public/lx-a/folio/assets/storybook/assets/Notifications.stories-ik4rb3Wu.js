import{j as t}from"./jsx-runtime-BYYWji4R.js";import{T as n}from"./TopNav-C5ktwZFf.js";import{a as o}from"./accounts-BIvvDVsT.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-CO6p2nHe.js";import"./notifications-Cjmw1YQT.js";import"./dashboard-PpIkkDYV.js";import"./FlyoutProvider-8hBwW8GN.js";import"./service-DNBLk8uc.js";import"./usePersistedState-Bg2-979L.js";import"./profile-D1_2poo4.js";import"./Flyout-D4L2FAUu.js";import"./Radio-5Lqa9hyu.js";import"./TextField-B45XVZ_W.js";import"./Confirmation-CQi9Xsc0.js";import"./Table-Cl5q1-NJ.js";import"./StepIndicator-xww0QFSC.js";import"./DatePicker-CzmVSzMy.js";import"./vehicles-Dg4r7W26.js";const I={title:"Patterns/Notifications popover",parameters:{layout:"padded",docs:{description:{component:`
Bell-icon popover in the top nav. Surfaces timely items (service due, lounge
expiry, new offer) and routes each one to its destination.

### Behaviour

- Click the bell to open. Outside click + Esc close it.
- **Mark all read** appears only when there are unread items.
- **Clear all** removes everything from the list.
- Each item is a real \`<button>\` — Enter activates and routes the user to
  the relevant section/flyout.
- Unread items show a small accent dot before the title and bump the title
  weight to \`--fg-strong\`.

### Accessibility

- The bell button announces unread count via \`aria-label\`
  ("Notifications, 2 unread").
- Popover is \`role="dialog"\` with \`aria-label="Notifications"\`.
- Focus stays in the bell trigger when opened; SR users hear titles and
  bodies as buttons.

### Spec

- 340px width, max-height 420px with scroll.
- \`--shadow-md\`, \`--radius-md\`, popover sits 14px below the bell.
        `.trim()}}}},e={name:"In the top nav",render:()=>t.jsxs("div",{children:[t.jsx("p",{style:{color:"var(--fg-muted)"},children:"Click the bell icon at the top-right of the nav to open the popover."}),t.jsx(n,{member:o.owner.member,switchLabel:o.owner.switchLabel})]})};var r,i,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  name: "In the top nav",
  render: () => <div>
      <p style={{
      color: "var(--fg-muted)"
    }}>
        Click the bell icon at the top-right of the nav to open the popover.
      </p>
      <TopNav member={accounts.owner.member} switchLabel={accounts.owner.switchLabel} />
    </div>
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const L=["InContext"];export{e as InContext,L as __namedExportsOrder,I as default};
