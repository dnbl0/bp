# Component Visual Specifications

This directory contains TypeScript configuration files that define the visual design specifications (spacing, sizing, typography, colors, shadows) for each component. These specs are used by the `<Specifications>` primitive to render annotated diagrams and reference tables on component pages.

## Pattern

Each component gets one or more `.specs.ts` file(s) in this directory.

### File Naming

- `button.specs.ts` — specs for the Button component
- `badge.specs.ts` — specs for the Badge component
- One file per component, named after the component slug

### File Structure

```typescript
import { SpecGroup } from '../primitives/Specifications'

export const componentNameVariantSpecs: SpecGroup[] = [
    {
        title: 'State Name (e.g., Default State, Hover State)',
        dimensions: [
            { 
                label: 'Padding', 
                token: 'px-4', 
                value: '16px', 
                direction: 'left',
                type: 'padding' 
            },
            { 
                label: 'Font Size', 
                token: 'text-body', 
                value: '16px',
                type: 'font-size' 
            },
            // ... more dimensions
        ],
    },
    // ... more states
]
```

### Dimension Properties

| Field | Type | Example | Required |
|-------|------|---------|----------|
| `label` | string | "Padding", "Font Size" | ✓ |
| `token` | string | "px-4", "text-body" | Optional (but recommended) |
| `value` | string | "16px", "14px / 1.5" | ✓ |
| `direction` | string | "top", "left", "all" | Optional (for spacing) |
| `type` | enum | "padding", "margin", "font-size", ... | ✓ |

### Type Values

The `type` field categorizes the specification for filtering in the UI:

```
Spacing category:   'padding' | 'margin' | 'gap'
Sizing category:    'width' | 'height'
Typography:         'font-size' | 'line-height'
Visual:             'color' | 'shadow' | 'border-radius'
```

## Creating Specs for a Component

### Step 1: Identify the component's structure

For example, Button has:
- **Variants**: Primary, Secondary, Ghost, Tertiary
- **Sizes**: Giant, Standard, Small
- **States**: Default, Hover, Active, Disabled

### Step 2: Extract measurement values from CSS

Look at the component's CSS (in `styles/components/`) or compute the values from Tailwind classes.

Example Button Standard:
```css
.button {
    padding: 12px 24px;  /* py-3 px-6 */
    font-size: 16px;     /* text-base */
    border-radius: 4px;  /* rounded */
}
```

### Step 3: Create the spec config file

```typescript
// styleguide-components/specs/button.specs.ts
import { SpecGroup } from '../primitives/Specifications'

export const buttonPrimaryStandardSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-3', value: '12px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-6', value: '24px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-base', value: '16px', type: 'font-size' },
            // ... more dimensions
        ],
    },
]
```

### Step 4: Export all variants

One export per variant/size/state combination:
```typescript
export const buttonPrimaryStandardSpecs: SpecGroup[] = [...]
export const buttonPrimaryGiantSpecs: SpecGroup[] = [...]
export const buttonSecondaryStandardSpecs: SpecGroup[] = [...]
```

## Integrating Specs into a Component Page

### Step 1: Import Specifications primitive and spec configs

```typescript
import {
    Specifications,
} from '../../../styleguide-components/primitives'
import {
    buttonPrimaryStandardSpecs,
    buttonPrimaryGiantSpecs,
    buttonSecondaryStandardSpecs,
} from '../../../styleguide-components/specs/button.specs'
```

### Step 2: Update the TOC

```typescript
const toc = [
    { id: 'variants', title: 'Variants' },
    { id: 'sizes', title: 'Sizes' },
    { id: 'specifications', title: 'Visual Specifications' },  // ← Add this
    { id: 'states', title: 'States' },
    // ... rest of TOC
]
```

### Step 3: Add a Specifications section

Insert a new `<Section id="specifications" title="Visual Specifications">` after the component's "Sizes" or "Variants" section (before "States").

```typescript
<Section id="specifications" title="Visual Specifications">
    <p className="text-grey dark:text-light-grey">
        Each button variant has precise spacing, sizing, and color specifications. Click "Show specs" to see annotated measurements.
    </p>

    <h3 className="text-heading-sm font-semibold mt-8 mb-4">Primary Standard</h3>
    <Specifications variant="Primary Standard" groups={buttonPrimaryStandardSpecs} withTable>
        <button className="button">Primary Button</button>
    </Specifications>

    <h3 className="text-heading-sm font-semibold mt-8 mb-4">Primary Giant</h3>
    <Specifications variant="Primary Giant" groups={buttonPrimaryGiantSpecs} withTable>
        <button className="button button--giant">Giant</button>
    </Specifications>
</Section>
```

### Tips for Component Pages

- **Section placement**: Add after "Sizes"/"Variants" section, before "States" or "Guidelines"
- **Grouping**: Use sub-headings (`<h3>`) to group by variant/size
- **One Specifications per variant**: Each variant gets its own `<Specifications>` component
- **Live component**: Render the actual component inside `<Specifications>` to show real measurements
- **Table**: Set `withTable={true}` to show the reference table below

## Specifications Primitive Props

```typescript
interface SpecificationsProps {
    children: ReactNode              // The rendered component to annotate
    groups: SpecGroup[]              // Specs config (from *.specs.ts)
    variant?: string                 // Label for the variant (e.g., "Primary Standard")
    withTable?: boolean              // Show reference table (default: true)
    showAnnotations?: boolean        // Auto-show or require toggle (default: true)
}
```

## Scaling Checklist

- [ ] Create `.specs.ts` files for all remaining components (currently have: Button, Badge, Accordion, Tabs, Tooltip, Alert)
- [ ] Integrate Specifications sections into all component pages
- [ ] Update TOCs to include "Visual Specifications" anchor
- [ ] Verify specs values match actual CSS/Tailwind config
- [ ] Test SVG annotations render correctly
- [ ] Test toggles show/hide spec categories
- [ ] Test dark mode readability of annotations
- [ ] Test mobile/responsive behavior (annotations hidden on small screens)

## Future Enhancements

1. **Auto-generation**: Write a script that parses component CSS, extracts Tailwind classes, resolves tokens, and generates spec config files
2. **Figma integration**: Use Figma Code Connect to map component pages to Figma nodes and auto-extract specs
3. **Validation**: Automated checks to ensure spec values match CSS and Tailwind config
4. **Visual regression**: Snapshot test annotations at multiple breakpoints and dark/light modes

## Component Spec Status

| Component | Specs | Page Integrated | Status |
|-----------|-------|-----------------|--------|
| Button | ✓ | ✓ | Pilot |
| Badge | ✓ | ✓ | Pilot |
| Accordion | ✓ | ✗ | Ready |
| Tabs | ✓ | ✗ | Ready |
| Tooltip | ✓ | ✗ | Ready |
| Alert | ✓ | ✗ | Ready |
| — | — | — | — |
| *Remaining ~29 components* | *Pending* | *Pending* | *Backlog* |

To add specs to the remaining components, follow the "Creating Specs for a Component" and "Integrating into Component Pages" steps above.
