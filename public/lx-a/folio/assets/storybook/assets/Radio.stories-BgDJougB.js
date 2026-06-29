import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as f}from"./index-ClcD9ViR.js";import{R as n}from"./Radio-5Lqa9hyu.js";import"./_commonjsHelpers-Cpj98o6Y.js";const w={title:"Primitives/Radio",component:n,parameters:{layout:"padded",docs:{description:{component:`
Framed radio option. Matches the Figma \`Comp/input/radio\` component.

### Anatomy

- 20px ring + 12px dot.
- Title (\`Subtitle1\` weight).
- Optional secondary description.
- Optional trailing value (e.g. price).

### States

\`unchecked\`, \`hover\`, \`checked\`, \`error\`, \`disabled\`, \`focus\` —
all mirrored from the Figma source.

### Accessibility

- Real \`<input type="radio">\` (hidden) with \`name\` grouping.
- The label wrapper sits in the tab order; Tab moves between groups, arrow
  keys move within a group (native behaviour).
- Focus ring appears around the ring icon when keyboard-focused.

### Usage

Use \`framed={true}\` (default) for prominent choices like dealer pickers and
the service-type picker. Set \`framed={false}\` for inline lists.
        `.trim()}}}},i={name:"Group of options",render:()=>{const g=()=>{const[b,v]=f.useState("logbook"),k=[{id:"logbook",label:"Logbook service",description:"Manufacturer-scheduled · Same-day pickup",trailing:"$85.00*"},{id:"minor",label:"Minor service",description:"Oil, filters and a 60-point check · 3–4 hours",trailing:"$295.00*"},{id:"major",label:"Major service",description:"Full inspection with brake fluid · Overnight",trailing:"$595.00*"}];return e.jsx("div",{className:"radiolist",style:{maxWidth:420},children:k.map(r=>e.jsx(n,{name:"service-type",value:r.id,checked:b===r.id,onChange:v,label:r.label,description:r.description,trailing:r.trailing},r.id))})};return e.jsx(g,{})}},a={name:"Error",render:()=>e.jsx("div",{className:"radiolist",style:{maxWidth:420},children:e.jsx(n,{name:"t",value:"a",checked:!1,onChange:()=>{},label:"Option A",error:!0,description:"This selection has a problem."})})},o={render:()=>e.jsx("div",{className:"radiolist",style:{maxWidth:420},children:e.jsx(n,{name:"t",value:"a",checked:!1,onChange:()=>{},label:"Currently unavailable",disabled:!0})})};var t,s,l;i.parameters={...i.parameters,docs:{...(t=i.parameters)==null?void 0:t.docs,source:{originalSource:`{
  name: "Group of options",
  render: () => {
    const Demo = () => {
      const [v, setV] = useState("logbook");
      const opts = [{
        id: "logbook",
        label: "Logbook service",
        description: "Manufacturer-scheduled · Same-day pickup",
        trailing: "$85.00*"
      }, {
        id: "minor",
        label: "Minor service",
        description: "Oil, filters and a 60-point check · 3–4 hours",
        trailing: "$295.00*"
      }, {
        id: "major",
        label: "Major service",
        description: "Full inspection with brake fluid · Overnight",
        trailing: "$595.00*"
      }];
      return <div className="radiolist" style={{
        maxWidth: 420
      }}>
          {opts.map(o => <Radio key={o.id} name="service-type" value={o.id} checked={v === o.id} onChange={setV} label={o.label} description={o.description} trailing={o.trailing} />)}
        </div>;
    };
    return <Demo />;
  }
}`,...(l=(s=i.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};var d,c,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Error",
  render: () => <div className="radiolist" style={{
    maxWidth: 420
  }}>
      <Radio name="t" value="a" checked={false} onChange={() => {}} label="Option A" error description="This selection has a problem." />
    </div>
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,u,h;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div className="radiolist" style={{
    maxWidth: 420
  }}>
      <Radio name="t" value="a" checked={false} onChange={() => {}} label="Currently unavailable" disabled />
    </div>
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const C=["Group","ErrorState","Disabled"];export{o as Disabled,a as ErrorState,i as Group,C as __namedExportsOrder,w as default};
