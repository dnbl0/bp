import{j as e}from"./jsx-runtime-BYYWji4R.js";import{useMDXComponents as t}from"./index-DUy19JZU.js";import{M as r}from"./index-DG7IRPiA.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./iframe-B91Ae07q.js";import"./index-Brl4xq4Y.js";import"./index-Bhelpi4i.js";import"./index-Bhqu_tAV.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Foundations/Overview"}),`
`,e.jsx(n.h1,{id:"foundations",children:"Foundations"}),`
`,e.jsxs(n.p,{children:[`Foundations are the atomic decisions every other component inherits — the
colour, type, space and motion the brand operates on. Every component you
see in this Storybook resolves through tokens declared in
`,e.jsx(n.code,{children:"src/styles/tokens.css"}),"."]}),`
`,e.jsx(n.h2,{id:"why-tokens",children:"Why tokens"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Single source of truth"}),` — change a value once and every consumer
updates.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Theme-aware"}),` — light and dark themes are token overrides, not separate
stylesheets.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Predictable"}),` — sizing, spacing and tracking snap to a small set of
scales so the product feels coherent.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"where-to-find-things",children:"Where to find things"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Colour"})," — palette, semantic roles, scrims, tier identity."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Typography"})," — display vs body face, type scale, tracking."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Spacing"})," — the ",e.jsx(n.code,{children:"--space-1..11"})," scale used for gap, padding, margin."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Radii"})," — ",e.jsx(n.code,{children:"--radius-sm | md | pill"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Shadows"})," — elevations and vehicle render shadows."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Motion"})," — eases, durations and the reveal/typing animations."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tracking"})," — letter-spacing scale for uppercase eyebrows and chips."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Icons"})," — the inline SVG set, sized via the ",e.jsx(n.code,{children:"width"}),"/",e.jsx(n.code,{children:"height"})," props."]}),`
`]}),`
`,e.jsx(n.p,{children:`If you need a value that doesn't fit one of these scales, default to "no" —
either find the nearest token, or propose a new one in the token file.`})]})}function g(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{g as default};
