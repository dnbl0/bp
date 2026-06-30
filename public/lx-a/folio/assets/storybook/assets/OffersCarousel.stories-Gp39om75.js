import{j as t}from"./jsx-runtime-BYYWji4R.js";import{O as a}from"./OffersCarousel-CTCqw87f.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./icons-CO6p2nHe.js";import"./Carousel-Bfc7wHST.js";import"./dashboard-PpIkkDYV.js";const m={title:"Composition/OffersCarousel",component:a,parameters:{layout:"padded",docs:{description:{component:`
Responsive offers carousel. Renders 3 cards per page on desktop, 2 on
tablet, 1 on phones — page count and current page reflow when the
breakpoint changes.

### Interactions

- **Touch swipe** — drag the track during pan, snap on release (threshold:
  18% of viewport width or 80px, whichever is smaller).
- **Keyboard** — ← / → on the carousel container (when focused).
- **Pointer** — round prev/next buttons with disabled states at edges, plus
  page-position dots.

### Accessibility

- The carousel container is \`role="region"\` with
  \`aria-roledescription="carousel"\` and \`aria-label="Exclusive offers"\`.
- Non-active pages are \`aria-hidden\`.
- Slide track honours \`prefers-reduced-motion\` and drops the transition.

### Specs

- Viewport clips, track translates by 100% per page.
- Card grid: 3-column 16:10 \`.ocard\` tiles, gap \`--space-6\`.
        `.trim()}}}},e={render:()=>t.jsx(a,{onExploreAll:()=>{}})};var r,o,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => <OffersCarousel onExploreAll={() => {}} />
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const f=["Default"];export{e as Default,f as __namedExportsOrder,m as default};
