import{j as e}from"./jsx-runtime-BYYWji4R.js";import{useMDXComponents as t}from"./index-DUy19JZU.js";import{M as o}from"./index-D-19mszI.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./iframe-5xacFVBO.js";import"./index-Brl4xq4Y.js";import"./index-Bhelpi4i.js";import"./index-Bhqu_tAV.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"my-lexus--design-system",children:"My Lexus — Design System"}),`
`,e.jsxs(n.p,{children:[`A working catalogue of every component, pattern and foundation used in the
authenticated `,e.jsx(n.strong,{children:"My Lexus"}),` experience. Built for designers, developers and
content people to share a single source of truth.`]}),`
`,e.jsx(n.p,{children:`This Storybook is organised in concentric circles — from the smallest design
decisions outward:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Foundations"}),` — colour, typography, spacing, radii, shadows, motion,
tracking and icons. The tokens that everything else uses.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Primitives"}),` — single-purpose, reusable inputs and surfaces. Buttons,
TextField, Checkbox, Radio, DataTable, DatePicker, Skeleton.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Composition"}),` — composed UI elements that combine primitives into a
recognisable Lexus pattern. BenefitCard, VehiclePanel, Hero, TodayModule.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Patterns"}),` — repeatable behavioural patterns. Flyout, Confirmation,
StepIndicator, Notifications popover.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Visualisation"})," — data displays. ServiceTimeline, PointsSparkline."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pages"}),` — full screens composed from everything above so reviewers can
see real composition.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Authentication"})," — the unauthenticated screens."]}),`
`]}),`
`,e.jsx(n.h2,{id:"how-this-storybook-is-structured",children:"How this Storybook is structured"}),`
`,e.jsx(n.p,{children:"Every component story carries:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["A short ",e.jsx(n.strong,{children:"purpose"})," statement — what this component does and when to use it."]}),`
`,e.jsxs(n.li,{children:["A ",e.jsx(n.strong,{children:"default"})," story showing the canonical use case."]}),`
`,e.jsxs(n.li,{children:["One or more ",e.jsx(n.strong,{children:"variant"})," stories covering states, sizes and edge cases."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility"}),` notes — keyboard interactions, ARIA roles, focus
management and contrast considerations.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Specs"})," — sizes, paddings and token references (e.g. ",e.jsx(n.code,{children:"--space-4"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Interaction"})," examples for components that respond to user input."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Controls"}),` for the live preview, so designers can experiment with props
without writing code.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"conventions",children:"Conventions"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`All visual values are token-driven. If you see a literal in a story, it is
a one-off override and should be questioned in code review.`}),`
`,e.jsx(n.li,{children:`Themes are switchable from the toolbar (☀️ Light / 🌙 Dark / Auto). Components
must read in both themes; light theme uses the warm smoke palette, dark uses
Lexus deepblue.`}),`
`,e.jsxs(n.li,{children:["Stories run inside the real ",e.jsx(n.code,{children:"FlyoutProvider"}),`, so flyout-launching components
work as they do in product.`]}),`
`,e.jsxs(n.li,{children:["Accessibility is checked automatically by the ",e.jsx(n.code,{children:"a11y"}),` addon on every story.
Failing rules will appear in the Accessibility panel.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"getting-started",children:"Getting started"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Browse the sidebar to find a component by name."}),`
`,e.jsxs(n.li,{children:["Use the ",e.jsx(n.strong,{children:"Docs"})," tab on any story for prose + spec."]}),`
`,e.jsxs(n.li,{children:["Use the ",e.jsx(n.strong,{children:"Canvas"})," tab to interact with the live component and tweak props."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.strong,{children:"Accessibility"})," panel reports WCAG-style violations and warnings."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.strong,{children:"Interactions"})," panel lets you replay scripted interactions."]}),`
`]}),`
`,e.jsx(n.p,{children:"If a component is missing from this catalogue, please add a story for it."})]})}function j(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{j as default};
