/*
    Bupa Component Library Builder — Figma plugin
    ----------------------------------------------
    Builds a foundations + core-component library into the current Figma page,
    sourced directly from the Bupa Aged Care design tokens:

      • Colour styles      ← tailwind.config.js `theme.colors`
      • Text styles        ← the responsive type scale (desktop sizes)
      • Components          Button, Tag, Card, Heading, Breadcrumbs
                            ← styles/components/buttons.css + the atom specs

    The values below are mirrored from the codebase so the Figma library never
    drifts from production. Re-running the plugin is safe: it removes any frame
    it previously created and upserts styles by name.
*/

// ---------------------------------------------------------------------------
// Tokens (mirrored from the codebase — keep in sync with tailwind.config.js)
// ---------------------------------------------------------------------------

// Colour palettes, grouped to mirror styleguide-components/tokens.ts. The
// group name becomes the Figma style folder, e.g. "Primary/Cyan 400".
const COLOR_GROUPS = [
    {
        group: 'Primary',
        colors: [
            ['Cyan', '#0079c8'],
            ['Cyan 400', '#2595DC'],
            ['Cyan 50', '#F0F9FF'],
            ['Navy', '#00335B'],
            ['Warm Grey', '#f0efeb'],
            ['White', '#ffffff'],
            ['Grey', '#333333'],
            ['Cool Grey', '#24292E'],
            ['Light Grey', '#BFCCD6'],
            ['Lighter Grey', '#d1d5dc'],
            ['Black', '#000000'],
        ],
    },
    {
        group: 'Secondary',
        colors: [
            ['Purple', '#8a3ff5'],
            ['Violet', '#a4219b'],
            ['Fuchsia', '#d02670'],
            ['Burgandy', '#942151'],
            ['Orange', '#db3907'],
            ['Teal', '#008385'],
            ['Teal 50', '#e1fcfd'],
            ['Dark Green', '#18542c'],
            ['Green', '#1b883c'],
            ['Lime', '#678004'],
        ],
    },
    {
        group: 'UI',
        colors: [
            ['Error Red', '#d90014'],
            ['Warning Yellow', '#fdd835'],
            ['Success Green', '#008a00'],
            ['Focus Blue', '#a3dafd'],
            ['Disabled', '#dadbdb'],
            ['Disabled Text', '#757575'],
            ['Alert', '#3552b5'],
            ['Charcoal', '#292E39'],
            ['Silver', '#607285'],
        ],
    },
    {
        group: 'Background',
        colors: [
            ['Cool Paper 50', '#f3faff'],
            ['Cool Paper 100', '#f2f5f7'],
            ['Cool Paper 200', '#bfccd6'],
            ['Warm Paper 100', '#f8f7f4'],
            ['Warm Paper 200', '#dddad2'],
        ],
    },
]

// Frequently-referenced colours, by hex, for component fills/strokes/text.
const C = {
    cyan: '#0079c8',
    navy: '#00335B',
    white: '#ffffff',
    grey: '#333333',
    disabledText: '#757575',
    lightGrey: '#BFCCD6',
    teal: '#008385',
    purple: '#8a3ff5',
    fuchsia: '#d02670',
    green: '#1b883c',
    silver: '#607285',
    coolPaper100: '#f2f5f7',
    warmPaper: '#f8f7f4',
    border: '#E5E7EB',
    surface: '#FAFBFC',
}

// Responsive type scale — desktop (lg) sizes are used as the canonical Figma
// values. Mirrors styles/base/typography.css via styleguide-components/tokens.ts.
// weight: 'regular' | 'semibold' | 'bold'
const TYPE = {
    'Heading/XL': { size: 56, line: 68, weight: 'semibold' },
    'Heading/L': { size: 48, line: 60, weight: 'semibold' },
    'Heading/M': { size: 32, line: 40, weight: 'semibold' },
    'Heading/S': { size: 24, line: 32, weight: 'semibold' },
    'Heading': { size: 20, line: 24, weight: 'semibold' },
    'Body': { size: 16, line: 20, weight: 'regular' },
    'Body Small': { size: 14, line: 18, weight: 'regular' },
    'Caption': { size: 12, line: 16, weight: 'regular' },
}

// Button geometry per size — from styles/components/buttons.css.
// Tailwind radii: sm = 2, DEFAULT = 4, lg = 8.
const BUTTON_SIZES = {
    Small: { padX: 12, padY: 3, font: 14, radius: 2 },
    Standard: { padX: 24, padY: 12, font: 16, radius: 4 },
    Giant: { padX: 40, padY: 20, font: 16, radius: 8 },
}

// Button variants — colours from buttons.css (resting state).
const BUTTON_VARIANTS = {
    Primary: { fill: C.cyan, text: C.white, stroke: null, underline: false },
    Secondary: { fill: null, text: C.cyan, stroke: C.cyan, underline: false },
    Ghost: { fill: null, text: C.cyan, stroke: null, underline: false },
    Tertiary: { fill: null, text: C.cyan, stroke: null, underline: true },
}

// Tag colours — the Tag atom is freely colourable; these are sensible presets.
const TAG_COLORS = [
    ['Cyan', C.cyan, C.white],
    ['Teal', C.teal, C.white],
    ['Purple', C.purple, C.white],
    ['Fuchsia', C.fuchsia, C.white],
    ['Green', C.green, C.white],
]

// Semantic colour tokens (best-practice layer on top of the primitive palette).
// Each aliases a primitive where one matches by hex; the rest (interaction
// states that are literal in buttons.css) carry a direct value. Keyed by the
// short token path used when binding component colours.
const SEMANTIC = [
    ['Action/Default', '#0079c8'],
    ['Action/Hover', '#005497'],
    ['Action/Active', '#00254f'],
    ['Action/On', '#ffffff'],
    ['Text/Default', '#00335B'],
    ['Text/Body', '#333333'],
    ['Text/Muted', '#757575'],
    ['Text/Inverse', '#ffffff'],
    ['Text/Link', '#0079c8'],
    ['Surface/Default', '#ffffff'],
    ['Surface/Muted', '#f2f5f7'],
    ['Surface/Sunken', '#FAFBFC'],
    ['Surface/Brand', '#00335B'],
    ['Border/Default', '#BFCCD6'],
    ['Border/Subtle', '#E5E7EB'],
    ['Border/Disabled', '#dadbdb'],
    ['Surface/Disabled', '#dadbdb'],
    ['Focus', '#a3dafd'],
]

// The 4px spacing scale and radius scale exposed as number variables.
const SPACING = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64]
const RADIUS = [['Sm', 2], ['Default', 4], ['Lg', 8], ['Pill', 100]]

// Populated by buildVariables(): VARS holds semantic/space/radius variables by
// path, PRIM holds primitive colour variables by "Group/Name". VARS_OK gates
// every binding so the plugin still runs on files without the Variables API.
let VARS = {}
let PRIM = {}
let VARS_OK = false

// --- Code ↔ Figma parity -----------------------------------------------------
// The Figma component name mirrors the code path so the asset panel renders the
// same folder tree as components/ (e.g. Molecules/Blocks/CardBlock). Slashes
// create the folders. Top-level molecules live directly under molecules/; the
// rest under molecules/blocks/ (matching the repo).
const TOP_MOLECULES = { HeroBanner: 1, AlgoliaSearch: 1, Autocomplete: 1, YouTubeVideo: 1, CmsElement: 1 }

function figmaPath(layerTitle, name) {
    if (name === 'Button') return 'Atoms/Button'
    if (layerTitle === 'Atoms') return 'Atoms/' + name
    if (layerTitle === 'Molecules') return (TOP_MOLECULES[name] ? 'Molecules/' : 'Molecules/Blocks/') + name
    if (layerTitle === 'Sections') return 'Molecules/Sections/' + name
    if (layerTitle === 'Organisms') return 'Organisms/' + name
    if (layerTitle === 'Templates') return 'Templates/' + name
    return 'Pages/' + name
}

function codePath(layerTitle, name) {
    if (name === 'Button') return 'styles/components/buttons.css'
    if (layerTitle === 'Atoms') return 'components/atoms/' + name
    if (layerTitle === 'Molecules') return (TOP_MOLECULES[name] ? 'components/molecules/' : 'components/molecules/blocks/') + name
    if (layerTitle === 'Sections') return 'components/molecules/sections/' + name
    if (layerTitle === 'Organisms') return 'components/organisms/' + name
    if (layerTitle === 'Templates') return 'components/templates/' + name
    return 'example composition (no direct code source)'
}

// The code folder a layer maps to, shown on its canvas section for parity.
function layerFolder(title) {
    if (title === 'Atoms') return 'components/atoms'
    if (title === 'Molecules') return 'components/molecules'
    if (title === 'Sections') return 'components/molecules/sections'
    if (title === 'Organisms') return 'components/organisms'
    if (title === 'Templates') return 'components/templates'
    return 'components/pages'
}

// Base components captured as they are built, so composite components can nest
// real instances of them — mirroring how the code composes Button and Tag.
const BUILT = {}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const hexToRgb = hex => {
    const h = hex.replace('#', '')
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h
    return {
        r: parseInt(full.slice(0, 2), 16) / 255,
        g: parseInt(full.slice(2, 4), 16) / 255,
        b: parseInt(full.slice(4, 6), 16) / 255,
    }
}

const solid = hex => [{ type: 'SOLID', color: hexToRgb(hex) }]

const rgba = hex => {
    const c = hexToRgb(hex)
    return { r: c.r, g: c.g, b: c.b, a: 1 }
}

// Create the "Bupa Tokens" variable collection: primitive colours, semantic
// aliases, spacing and radius. Everything is wrapped so a file/host without the
// Variables API simply falls back to raw values (VARS_OK stays false).
function buildVariables() {
    try {
        if (!figma.variables || !figma.variables.createVariableCollection) return
        // Reuse an existing collection (re-runs) or create a fresh one.
        let collection = null
        const existing = figma.variables.getLocalVariableCollections
            ? figma.variables.getLocalVariableCollections()
            : []
        for (const c of existing) if (c.name === 'Bupa Tokens') collection = c
        if (!collection) collection = figma.variables.createVariableCollection('Bupa Tokens')
        const mode = collection.modes[0].modeId

        // Index any pre-existing variables so re-runs update rather than dupe.
        const existingVars = {}
        if (figma.variables.getLocalVariables) {
            for (const v of figma.variables.getLocalVariables()) existingVars[v.name] = v
        }
        const upsertVar = (name, type) => existingVars[name] || figma.variables.createVariable(name, collection, type)

        const hexToVar = {}
        for (const group of COLOR_GROUPS) {
            for (const pair of group.colors) {
                const name = 'Color/' + group.group + '/' + pair[0]
                const v = upsertVar(name, 'COLOR')
                v.setValueForMode(mode, rgba(pair[1]))
                PRIM[group.group + '/' + pair[0]] = v
                hexToVar[pair[1].toLowerCase()] = v
            }
        }
        for (const pair of SEMANTIC) {
            const v = upsertVar('Color/' + pair[0], 'COLOR')
            const alias = hexToVar[pair[1].toLowerCase()]
            if (alias) v.setValueForMode(mode, figma.variables.createVariableAlias(alias))
            else v.setValueForMode(mode, rgba(pair[1]))
            VARS[pair[0]] = v
        }
        for (const s of SPACING) {
            const v = upsertVar('Space/' + s, 'FLOAT')
            v.setValueForMode(mode, s)
            VARS['Space/' + s] = v
        }
        for (const pair of RADIUS) {
            const v = upsertVar('Radius/' + pair[0], 'FLOAT')
            v.setValueForMode(mode, pair[1])
            VARS['Radius/' + pair[0]] = v
        }
        VARS_OK = true
    } catch (e) {
        VARS_OK = false
    }
}

// A solid paint, bound to a given variable object when available.
function boundPaintVar(variable, hex) {
    const base = { type: 'SOLID', color: hexToRgb(hex) }
    if (VARS_OK && variable) {
        try {
            return figma.variables.setBoundVariableForPaint(base, 'color', variable)
        } catch (e) {
            // fall through to the plain paint
        }
    }
    return base
}

// Bound to a semantic token path (VARS) or a primitive "Group/Name" (PRIM).
const boundPaint = (varKey, hex) => boundPaintVar(VARS[varKey], hex)
const primPaint = (primKey, hex) => boundPaintVar(PRIM[primKey], hex)

const fillBound = (node, varKey, hex) => { node.fills = [boundPaint(varKey, hex)] }
const strokeBound = (node, varKey, hex) => { node.strokes = [boundPaint(varKey, hex)] }

// Bind a numeric field (radius corners, padding, gap) to a number variable.
function bindNum(node, field, varKey) {
    if (!VARS_OK || !VARS[varKey]) return
    try {
        node.setBoundVariable(field, VARS[varKey])
    } catch (e) {
        // unsupported field on this node — leave the literal value in place
    }
}

const RADIUS_CORNERS = ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']
function bindRadius(node, varKey) {
    for (const corner of RADIUS_CORNERS) bindNum(node, corner, varKey)
}

// Resolved font family + weight styles, populated by loadFonts().
let FONT = {
    family: 'Montserrat',
    regular: 'Regular',
    semibold: 'SemiBold',
    bold: 'Bold',
}

const fontFor = weight =>
    weight === 'bold'
        ? { family: FONT.family, style: FONT.bold }
        : weight === 'semibold'
          ? { family: FONT.family, style: FONT.semibold }
          : { family: FONT.family, style: FONT.regular }

// Try the brand font (Montserrat); fall back to Inter if it isn't installed.
async function loadFonts() {
    const candidates = [
        { family: 'Montserrat', regular: 'Regular', semibold: 'SemiBold', bold: 'Bold' },
        { family: 'Inter', regular: 'Regular', semibold: 'Semi Bold', bold: 'Bold' },
        { family: 'Roboto', regular: 'Regular', semibold: 'Medium', bold: 'Bold' },
    ]
    for (const c of candidates) {
        try {
            await figma.loadFontAsync({ family: c.family, style: c.regular })
            await figma.loadFontAsync({ family: c.family, style: c.semibold })
            await figma.loadFontAsync({ family: c.family, style: c.bold })
            FONT = c
            return c.family
        } catch (e) {
            // try the next candidate
        }
    }
    // Last resort: whatever Inter Regular is (Figma's default font).
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
    FONT = { family: 'Inter', regular: 'Regular', semibold: 'Regular', bold: 'Regular' }
    return FONT.family
}

// Create a text node with brand font, size, line-height and colour applied.
// Pass `colorVar` (a semantic token path) to bind the fill to a variable.
function makeText(content, { weight = 'regular', size = 16, line = 20, color = C.grey, colorVar } = {}) {
    const t = figma.createText()
    t.fontName = fontFor(weight)
    t.characters = content
    t.fontSize = size
    t.lineHeight = { unit: 'PIXELS', value: line }
    t.fills = colorVar ? [boundPaint(colorVar, color)] : solid(color)
    return t
}

// Upsert a local paint style by name, binding it to its primitive variable so
// the style resolves to a token in Dev Mode. `primKey` is "Group/Name".
function upsertPaintStyle(name, hex, primKey) {
    const existing = figma.getLocalPaintStyles().find(s => s.name === name)
    const style = existing || figma.createPaintStyle()
    style.name = name
    const base = { type: 'SOLID', color: hexToRgb(hex) }
    if (VARS_OK && primKey && PRIM[primKey]) {
        try {
            style.paints = [figma.variables.setBoundVariableForPaint(base, 'color', PRIM[primKey])]
            return style
        } catch (e) {
            // fall through to unbound paint
        }
    }
    style.paints = [base]
    return style
}

// Upsert a local text style by name.
function upsertTextStyle(name, spec) {
    const existing = figma.getLocalTextStyles().find(s => s.name === name)
    const style = existing || figma.createTextStyle()
    style.name = name
    style.fontName = fontFor(spec.weight)
    style.fontSize = spec.size
    style.lineHeight = { unit: 'PIXELS', value: spec.line }
    return style
}

// Configure a frame as an auto-layout container.
function autolayout(frame, opts = {}) {
    if (opts.name) frame.name = opts.name
    frame.layoutMode = opts.dir || 'VERTICAL'
    frame.itemSpacing = opts.gap != null ? opts.gap : 16
    frame.paddingTop = opts.padY != null ? opts.padY : (opts.pad || 0)
    frame.paddingBottom = opts.padY != null ? opts.padY : (opts.pad || 0)
    frame.paddingLeft = opts.padX != null ? opts.padX : (opts.pad || 0)
    frame.paddingRight = opts.padX != null ? opts.padX : (opts.pad || 0)
    frame.primaryAxisSizingMode = opts.primary || 'AUTO'
    frame.counterAxisSizingMode = opts.counter || 'AUTO'
    if (opts.align) frame.counterAxisAlignItems = opts.align
    if (opts.justify) frame.primaryAxisAlignItems = opts.justify
    if (opts.wrap) frame.layoutWrap = 'WRAP'
    frame.fills = opts.fill ? solid(opts.fill) : []
    if (opts.radius) frame.cornerRadius = opts.radius
    return frame
}

// A fixed-width, wrapping paragraph (avoids the layoutSizing API entirely).
function makeParagraph(content, width, opts) {
    const t = makeText(content, opts)
    t.textAutoResize = 'HEIGHT'
    t.resize(width, t.height)
    return t
}

// A plain coloured rectangle.
function rectNode(w, h, fill, radius, stroke, strokeW) {
    const r = figma.createRectangle()
    r.resize(w, h)
    r.fills = fill ? solid(fill) : []
    if (radius != null) r.cornerRadius = radius
    if (stroke) {
        r.strokes = solid(stroke)
        r.strokeWeight = strokeW || 1
    }
    return r
}

// A fixed-size image placeholder.
function imagePh(w, h, radius) {
    const f = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: '#E6EBF0' })
    f.name = 'Image'
    f.resize(w, h)
    f.cornerRadius = radius != null ? radius : 8
    f.appendChild(makeText('Image', { size: 12, line: 16, color: '#8A99A8' }))
    return f
}

// A small pill badge.
function badge(text, bg, fg) {
    const b = autolayout(figma.createFrame(), { name: 'Badge', dir: 'HORIZONTAL', padX: 8, padY: 3, fill: bg })
    b.cornerRadius = 100
    b.appendChild(makeText(text, { weight: 'semibold', size: 11, line: 14, color: fg }))
    return b
}

// A new component shell with auto-layout applied.
function comp(name, opts) {
    const c = figma.createComponent()
    c.name = name
    autolayout(c, opts || {})
    return c
}

// A fixed-size centred box with an optional label — used for bands and frames.
function centerBox(name, w, h, fill, label, labelColor, radius) {
    const c = comp(name, { dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: fill })
    c.resize(w, h)
    if (radius != null) c.cornerRadius = radius
    if (label) c.appendChild(makeText(label, { size: 13, line: 16, color: labelColor || C.navy }))
    return c
}

// A padded inner column (transparent) of fixed width.
function innerCol(width, pad, gap) {
    const f = autolayout(figma.createFrame(), { name: 'Content', dir: 'VERTICAL', gap: gap != null ? gap : 8, pad: pad != null ? pad : 16, counter: 'FIXED' })
    f.resize(width, f.height)
    f.fills = []
    return f
}

// A single inline button rendering (not a component) for use inside previews.
function miniButton(label, variantName, sizeName) {
    const v = BUTTON_VARIANTS[variantName || 'Primary']
    const s = BUTTON_SIZES[sizeName || 'Standard']
    const f = autolayout(figma.createFrame(), { name: 'Button', dir: 'HORIZONTAL', gap: 8, padX: s.padX, padY: s.padY, align: 'CENTER', justify: 'CENTER' })
    f.cornerRadius = s.radius
    f.fills = v.fill ? solid(v.fill) : []
    if (v.stroke) {
        f.strokes = solid(v.stroke)
        f.strokeWeight = 2
    }
    const l = makeText(label, { weight: 'semibold', size: s.font, line: s.font * 1.25, color: v.text })
    if (v.underline) l.textDecoration = 'UNDERLINE'
    f.appendChild(l)
    return f
}

// A white card shell with optional border/shadow, fixed width.
function cardShell(name, width, opts) {
    opts = opts || {}
    const c = comp(name, { dir: 'VERTICAL', gap: opts.gap != null ? opts.gap : 12, pad: opts.pad != null ? opts.pad : 20, counter: 'FIXED', fill: opts.fill || C.white })
    c.resize(width, c.height)
    if (!opts.fill || opts.fill === C.white) fillBound(c, 'Surface/Default', C.white)
    c.cornerRadius = opts.radius != null ? opts.radius : 8
    if (opts.clip) c.clipsContent = true
    if (opts.stroke) {
        c.strokes = solid(opts.stroke)
        c.strokeWeight = opts.strokeW || 1
    }
    if (opts.shadow) {
        const s = hexToRgb(C.lightGrey)
        c.effects = [{ type: 'DROP_SHADOW', color: { r: s.r, g: s.g, b: s.b, a: 0.5 }, offset: { x: 0, y: 2 }, radius: 2, spread: 0, visible: true, blendMode: 'NORMAL' }]
    }
    return c
}

// A real instance of the Button component (falls back to a static render if the
// base component isn't available yet). This is how composites compose Button,
// mirroring the code.
function buttonInstance(label, variant, size) {
    try {
        if (BUILT.button) {
            const vname = 'Variant=' + (variant || 'Primary') + ', Size=' + (size || 'Standard') + ', State=Default'
            let master = null
            for (const ch of BUILT.button.children) if (ch.name === vname) master = ch
            if (!master) master = BUILT.button.defaultVariant
            if (master) {
                const inst = master.createInstance()
                const t = inst.findOne(n => n.type === 'TEXT' && n.name === 'Label')
                if (t) t.characters = label
                return inst
            }
        }
    } catch (e) { /* fall back */ }
    return miniButton(label, variant, size)
}

// A real instance of the Tag component (falls back to a static chip).
function tagInstance(label, colorName) {
    try {
        if (BUILT.tag) {
            const vname = 'Color=' + (colorName || 'Cyan')
            let master = null
            for (const ch of BUILT.tag.children) if (ch.name === vname) master = ch
            if (!master) master = BUILT.tag.defaultVariant
            if (master) {
                const inst = master.createInstance()
                const t = inst.findOne(n => n.type === 'TEXT' && n.name === 'Label')
                if (t) t.characters = label
                return inst
            }
        }
    } catch (e) { /* fall back */ }
    const chip = autolayout(figma.createFrame(), { name: 'Tag · ' + (colorName || 'Cyan'), dir: 'HORIZONTAL', padX: 8, padY: 4, align: 'CENTER', fill: C.cyan })
    chip.cornerRadius = 4
    chip.appendChild(makeText(label, { size: 12, line: 16, color: C.white }))
    return chip
}

// Expose a text layer as an editable TEXT component property on `component`.
function addTextProp(component, node, propName, defaultVal) {
    try {
        const id = component.addComponentProperty(propName, 'TEXT', defaultVal)
        node.componentPropertyReferences = { characters: id }
    } catch (e) { /* properties unsupported on this host */ }
}

// Let a text layer fill its auto-layout parent so content reflows on resize.
const fillText = node => {
    try {
        if (node.type === 'TEXT' && node.textAutoResize === 'WIDTH_AND_HEIGHT') node.textAutoResize = 'HEIGHT'
        node.layoutSizingHorizontal = 'FILL'
    } catch (e) { /* not in an auto-layout parent */ }
}

// ---------------------------------------------------------------------------
// Foundations
// ---------------------------------------------------------------------------

function buildColorStyles() {
    const byName = {}
    for (const { group, colors } of COLOR_GROUPS) {
        for (const [name, hex] of colors) {
            const style = upsertPaintStyle(`${group}/${name}`, hex, `${group}/${name}`)
            byName[`${group}/${name}`] = { style, hex }
        }
    }
    return byName
}

// A visible swatch card: colour chip + name + hex, with the paint style linked.
async function buildSwatch(name, hex, style) {
    const cell = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 8, counter: 'FIXED' })
    cell.name = `Swatch / ${name}`
    cell.resize(176, cell.height)
    cell.counterAxisSizingMode = 'FIXED'

    const chip = figma.createFrame()
    chip.name = 'Chip'
    chip.resize(176, 72)
    chip.cornerRadius = 8
    chip.fills = solid(hex)
    chip.strokes = solid('#E5E7EB')
    chip.strokeWeight = 1
    try {
        await chip.setFillStyleIdAsync(style.id)
    } catch (e) {
        chip.fills = solid(hex)
    }
    cell.appendChild(chip)
    cell.appendChild(makeText(name, { weight: 'semibold', size: 14, line: 18, color: C.navy }))
    cell.appendChild(makeText(hex.toUpperCase(), { size: 12, line: 16, color: C.disabledText }))
    return cell
}

async function buildColorSection() {
    const section = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 32 })
    section.name = 'Foundations · Colour'
    section.appendChild(makeText('Colour', { weight: 'bold', size: 32, line: 40, color: C.navy }))

    for (const { group, colors } of COLOR_GROUPS) {
        const groupFrame = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 16 })
        groupFrame.name = group
        groupFrame.appendChild(makeText(group, { weight: 'semibold', size: 20, line: 24, color: C.navy }))

        const row = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', gap: 16, wrap: true, primary: 'FIXED' })
        row.name = `${group} swatches`
        row.resize(176 * 5 + 16 * 4, row.height)
        row.counterAxisSizingMode = 'AUTO'
        for (const [name, hex] of colors) {
            const style = figma.getLocalPaintStyles().find(s => s.name === `${group}/${name}`)
            row.appendChild(await buildSwatch(name, hex, style))
        }
        groupFrame.appendChild(row)
        section.appendChild(groupFrame)
    }
    return section
}

function buildTextStyles() {
    for (const [name, spec] of Object.entries(TYPE)) upsertTextStyle(name, spec)
}

async function buildTypographySection() {
    const section = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 24 })
    section.name = 'Foundations · Typography'
    section.appendChild(makeText('Typography', { weight: 'bold', size: 32, line: 40, color: C.navy }))
    section.appendChild(
        makeText(`${FONT.family} — responsive scale (desktop sizes shown)`, {
            size: 14, line: 18, color: C.disabledText,
        })
    )

    for (const [name, spec] of Object.entries(TYPE)) {
        const row = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', gap: 32, align: 'CENTER' })
        row.name = name

        const label = makeText(`${name}  ·  ${spec.size}/${spec.line}`, {
            size: 12, line: 16, color: C.disabledText,
        })
        const sample = makeText('The quick brown fox', {
            weight: spec.weight, size: spec.size, line: spec.line, color: C.navy,
        })
        const style = figma.getLocalTextStyles().find(s => s.name === name)
        if (style) {
            try {
                await sample.setTextStyleIdAsync(style.id)
                sample.fills = solid(C.navy)
            } catch (e) {
                // direct properties already applied
            }
        }
        // layoutSizing can only be set once the node is in an auto-layout parent.
        row.appendChild(label)
        label.layoutSizingHorizontal = 'FIXED'
        label.resize(220, label.height)
        row.appendChild(sample)
        section.appendChild(row)
    }
    return section
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

const BUTTON_STATES = ['Default', 'Hover', 'Active', 'Disabled']

// Resolve fill/stroke/text tokens for a variant + interaction state, straight
// from the resting and :hover/:active/:disabled rules in buttons.css.
function btnStyle(variant, state) {
    if (variant === 'Primary') {
        if (state === 'Hover') return { fillVar: 'Action/Hover', fill: '#005497', textVar: 'Action/On', text: C.white, strokeVar: null, stroke: null, underline: false }
        if (state === 'Active') return { fillVar: 'Action/Active', fill: '#00254f', textVar: 'Action/On', text: C.white, strokeVar: null, stroke: null, underline: false }
        if (state === 'Disabled') return { fillVar: 'Surface/Disabled', fill: '#dadbdb', textVar: 'Text/Muted', text: C.disabledText, strokeVar: null, stroke: null, underline: false }
        return { fillVar: 'Action/Default', fill: C.cyan, textVar: 'Action/On', text: C.white, strokeVar: null, stroke: null, underline: false }
    }
    let textVar = 'Action/Default'
    let text = C.cyan
    if (state === 'Hover') { textVar = 'Action/Hover'; text = '#005497' }
    else if (state === 'Active') { textVar = 'Text/Default'; text = C.navy }
    else if (state === 'Disabled') { textVar = 'Text/Muted'; text = C.disabledText }

    if (variant === 'Secondary') {
        let strokeVar = 'Action/Default'
        let stroke = C.cyan
        if (state === 'Hover') { strokeVar = 'Action/Hover'; stroke = '#005497' }
        else if (state === 'Active') { strokeVar = 'Text/Default'; stroke = C.navy }
        else if (state === 'Disabled') { strokeVar = 'Border/Disabled'; stroke = '#dadbdb' }
        return { fillVar: null, fill: null, textVar: textVar, text: text, strokeVar: strokeVar, stroke: stroke, underline: false }
    }
    if (variant === 'Tertiary') {
        return { fillVar: null, fill: null, textVar: textVar, text: text, strokeVar: null, stroke: null, underline: (state === 'Hover' || state === 'Active') }
    }
    return { fillVar: null, fill: null, textVar: textVar, text: text, strokeVar: null, stroke: null, underline: false } // Ghost
}

const radiusVarFor = px => (px === 2 ? 'Radius/Sm' : px === 8 ? 'Radius/Lg' : 'Radius/Default')

// One Button variant component, with token-bound colours, padding and radius.
// Returns the component plus its label/chevron nodes for property wiring.
function buildButtonVariant(variantName, sizeName, state) {
    const s = BUTTON_SIZES[sizeName]
    const st = btnStyle(variantName, state)

    const c = figma.createComponent()
    c.name = `Variant=${variantName}, Size=${sizeName}, State=${state}`
    autolayout(c, { dir: 'HORIZONTAL', gap: 16, padX: s.padX, padY: s.padY, align: 'CENTER', justify: 'CENTER' })

    c.cornerRadius = s.radius
    bindRadius(c, radiusVarFor(s.radius))
    bindNum(c, 'paddingLeft', 'Space/' + s.padX)
    bindNum(c, 'paddingRight', 'Space/' + s.padX)
    bindNum(c, 'paddingTop', 'Space/' + s.padY)
    bindNum(c, 'paddingBottom', 'Space/' + s.padY)
    bindNum(c, 'itemSpacing', 'Space/16')

    if (st.fill) fillBound(c, st.fillVar, st.fill)
    else c.fills = []
    if (st.stroke) {
        strokeBound(c, st.strokeVar, st.stroke)
        c.strokeWeight = 2
    } else c.strokes = []

    const label = makeText('Button', { weight: 'semibold', size: s.font, line: s.font * 1.25, color: st.text, colorVar: st.textVar })
    if (st.underline) label.textDecoration = 'UNDERLINE'
    label.name = 'Label'
    const chevron = makeText('›', { weight: 'semibold', size: s.font, line: s.font * 1.25, color: st.text, colorVar: st.textVar })
    chevron.name = 'Trailing icon'
    chevron.visible = false

    c.appendChild(label)
    c.appendChild(chevron)
    return { comp: c, label: label, chevron: chevron }
}

function buildButtonSet() {
    const variants = []
    const labels = []
    const chevrons = []
    for (const variantName of Object.keys(BUTTON_VARIANTS)) {
        for (const sizeName of Object.keys(BUTTON_SIZES)) {
            for (const state of BUTTON_STATES) {
                const r = buildButtonVariant(variantName, sizeName, state)
                variants.push(r.comp)
                labels.push(r.label)
                chevrons.push(r.chevron)
            }
        }
    }
    const set = figma.combineAsVariants(variants, figma.currentPage)
    set.name = 'Button'

    // Expose a proper component API: editable Label + a Trailing-icon toggle.
    try {
        const labelProp = set.addComponentProperty('Label', 'TEXT', 'Button')
        for (const l of labels) l.componentPropertyReferences = { characters: labelProp }
    } catch (e) { /* properties unsupported — variants still work */ }
    try {
        const iconProp = set.addComponentProperty('Trailing icon', 'BOOLEAN', false)
        for (const ch of chevrons) ch.componentPropertyReferences = { visible: iconProp }
    } catch (e) { /* boolean property unsupported */ }

    autolayout(set, { dir: 'HORIZONTAL', gap: 20, padX: 24, padY: 24, wrap: true, primary: 'FIXED' })
    set.resize(900, set.height)
    set.counterAxisSizingMode = 'AUTO'
    fillBound(set, 'Surface/Default', C.white)
    set.cornerRadius = 8
    BUILT.button = set
    return set
}

// Tag colour name -> primitive colour token, so each variant's fill is a token.
const TAG_PRIM = { Cyan: 'Primary/Cyan', Teal: 'Secondary/Teal', Purple: 'Secondary/Purple', Fuchsia: 'Secondary/Fuchsia', Green: 'Secondary/Green' }

function buildTagSet() {
    const labels = []
    const variants = TAG_COLORS.map(([name, bg, fg]) => {
        const c = figma.createComponent()
        c.name = `Color=${name}`
        autolayout(c, { dir: 'HORIZONTAL', padX: 8, padY: 4, align: 'CENTER', justify: 'CENTER' })
        c.cornerRadius = 4
        bindRadius(c, 'Radius/Default')
        c.fills = [primPaint(TAG_PRIM[name], bg)]
        const t = makeText('Tag', { size: 12, line: 16, color: fg, colorVar: 'Text/Inverse' })
        t.name = 'Label'
        labels.push(t)
        c.appendChild(t)
        return c
    })
    const set = figma.combineAsVariants(variants, figma.currentPage)
    set.name = 'Tag'
    try {
        const labelProp = set.addComponentProperty('Label', 'TEXT', 'Tag')
        for (const l of labels) l.componentPropertyReferences = { characters: labelProp }
    } catch (e) { /* properties unsupported */ }
    autolayout(set, { dir: 'HORIZONTAL', gap: 16, padX: 24, padY: 24, align: 'CENTER' })
    fillBound(set, 'Surface/Default', C.white)
    set.cornerRadius = 8
    BUILT.tag = set
    return set
}

function buildCard() {
    const card = figma.createComponent()
    card.name = 'Card'
    autolayout(card, { dir: 'VERTICAL', gap: 12, pad: 24, counter: 'FIXED' })
    card.resize(320, card.height)
    card.counterAxisSizingMode = 'FIXED'
    card.cornerRadius = 8
    card.fills = solid(C.white)
    // Resting elevation — from tailwind boxShadow DEFAULT: light-grey @ 50%.
    const shadowRgb = hexToRgb(C.lightGrey)
    card.effects = [
        {
            type: 'DROP_SHADOW',
            color: { r: shadowRgb.r, g: shadowRgb.g, b: shadowRgb.b, a: 0.5 },
            offset: { x: 0, y: 2 },
            radius: 2,
            spread: 0,
            visible: true,
            blendMode: 'NORMAL',
        },
    ]

    const heading = makeText('Card heading', { weight: 'semibold', size: 24, line: 32, color: C.navy })
    const body = makeText(
        'Supporting copy that explains the card and gives the reader a reason to act.',
        { size: 16, line: 20, color: C.grey }
    )
    const cta = makeText('Learn more', { weight: 'semibold', size: 16, line: 20, color: C.cyan })

    // Append first, then stretch to fill — layoutSizing needs an auto-layout parent.
    card.appendChild(heading)
    card.appendChild(body)
    card.appendChild(cta)
    heading.layoutSizingHorizontal = 'FILL'
    body.layoutSizingHorizontal = 'FILL'
    return card
}

function buildHeadingSet() {
    const sizes = [
        ['XL', TYPE['Heading/XL']],
        ['L', TYPE['Heading/L']],
        ['M', TYPE['Heading/M']],
        ['S', TYPE['Heading/S']],
    ]
    const texts = []
    const variants = sizes.map(([name, spec]) => {
        const comp = figma.createComponent()
        comp.name = `Size=${name}`
        autolayout(comp, { dir: 'VERTICAL' })
        const t = makeText('Section heading', { weight: spec.weight, size: spec.size, line: spec.line, color: C.navy, colorVar: 'Text/Default' })
        t.name = 'Text'
        texts.push(t)
        comp.appendChild(t)
        return comp
    })
    const set = figma.combineAsVariants(variants, figma.currentPage)
    set.name = 'Heading'
    try {
        const prop = set.addComponentProperty('Text', 'TEXT', 'Section heading')
        for (const t of texts) t.componentPropertyReferences = { characters: prop }
    } catch (e) { /* properties unsupported */ }
    autolayout(set, { dir: 'VERTICAL', gap: 24, padX: 24, padY: 24 })
    fillBound(set, 'Surface/Default', C.white)
    set.cornerRadius = 8
    return set
}

function buildBreadcrumbs() {
    const comp = figma.createComponent()
    comp.name = 'Breadcrumbs'
    autolayout(comp, { dir: 'HORIZONTAL', gap: 8, pad: 4, align: 'CENTER' })

    const crumb = (text, opts) => comp.appendChild(makeText(text, opts))
    const sep = () => comp.appendChild(makeText('›', { size: 12, line: 16, color: C.disabledText }))

    crumb('Bupa Design System', { size: 12, line: 16, color: C.grey })
    sep()
    crumb('Components', { size: 12, line: 16, color: C.grey })
    sep()
    crumb('Button', { weight: 'semibold', size: 12, line: 16, color: C.navy })
    return comp
}

// --- small shared preview pieces -------------------------------------------

// A white-on-colour inverse button for use on coloured fields.
function inverseButton(label) {
    const b = autolayout(figma.createFrame(), { name: 'Button', dir: 'HORIZONTAL', padX: 24, padY: 12, fill: C.white })
    b.cornerRadius = 4
    b.appendChild(makeText(label, { weight: 'semibold', size: 16, line: 20, color: C.navy }))
    return b
}

// A fixed bar used by template/page diagrams.
function bar(w, h, fill, label, labelColor) {
    const f = autolayout(figma.createFrame(), { name: label || 'Bar', dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: fill })
    f.resize(w, h)
    f.cornerRadius = 4
    if (label) f.appendChild(makeText(label, { size: 11, line: 14, color: labelColor || C.white }))
    return f
}

// --- atoms ------------------------------------------------------------------

function buildSectionAtom() {
    return centerBox('Section', 360, 88, C.warmPaper, 'Full-width section band', C.navy, 8)
}

function buildResponsiveImage() {
    const c = comp('ResponsiveImage', { dir: 'VERTICAL', counter: 'FIXED' })
    c.resize(280, c.height)
    c.appendChild(imagePh(280, 160))
    return c
}

function buildImageBlock() {
    const c = comp('ImageBlock', { dir: 'VERTICAL', counter: 'FIXED' })
    c.resize(360, c.height)
    c.appendChild(imagePh(360, 180))
    return c
}

function buildSmallSearchInput() {
    const c = comp('SmallSearchInput', { dir: 'HORIZONTAL', gap: 8, padX: 12, padY: 8, align: 'CENTER', primary: 'FIXED', fill: C.white })
    c.resize(240, c.height)
    c.cornerRadius = 4
    c.strokes = solid(C.lightGrey)
    c.strokeWeight = 1
    c.appendChild(rectNode(14, 14, null, 7, C.disabledText, 2))
    c.appendChild(makeText('Search', { size: 14, line: 18, color: C.disabledText }))
    return c
}

function buildShowMore() {
    const c = comp('ShowMoreButton', { dir: 'HORIZONTAL', gap: 8, padX: 24, padY: 12, align: 'CENTER', justify: 'CENTER' })
    c.appendChild(makeText('Show more  ⌄', { weight: 'semibold', size: 16, line: 20, color: C.cyan }))
    return c
}

function buildBackToTop() {
    const c = comp('BackToTop', { dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: C.cyan })
    c.resize(48, 48)
    c.cornerRadius = 24
    c.appendChild(makeText('↑', { weight: 'bold', size: 20, line: 24, color: C.white }))
    return c
}

function buildErrorMessage() {
    const c = comp('ErrorMessageWrapper', { dir: 'HORIZONTAL', gap: 8, align: 'CENTER' })
    c.appendChild(makeText('⚠', { size: 14, line: 18, color: '#d90014' }))
    c.appendChild(makeText('This field is required', { size: 14, line: 18, color: '#d90014' }))
    return c
}

// --- molecules --------------------------------------------------------------

function buildHero() {
    const c = comp('HeroBanner', { dir: 'VERTICAL', gap: 16, pad: 32, counter: 'FIXED', fill: C.cyan })
    c.resize(460, c.height)
    fillBound(c, 'Action/Default', C.cyan)
    c.cornerRadius = 8
    const heading = makeText('Find the right aged care', { weight: 'bold', size: 32, line: 40, color: C.white, colorVar: 'Text/Inverse' })
    heading.name = 'Heading'
    const body = makeParagraph('Compassionate support, close to home — explore Bupa aged care options.', 396, { size: 16, line: 20, color: '#EAF6FF' })
    body.name = 'Body'
    c.appendChild(heading)
    c.appendChild(body)
    c.appendChild(inverseButton('Get started'))
    fillText(heading)
    fillText(body)
    addTextProp(c, heading, 'Heading', 'Find the right aged care')
    addTextProp(c, body, 'Body', 'Compassionate support, close to home — explore Bupa aged care options.')
    return c
}

function buildCta() {
    // CtaBlock is a Button in code → an instance of the Button component here.
    const c = comp('CtaBlock', { dir: 'HORIZONTAL' })
    c.appendChild(buttonInstance('Book a tour  ›', 'Primary', 'Standard'))
    return c
}

function buildAlert() {
    const c = comp('AlertBlock', { dir: 'HORIZONTAL', gap: 12, padX: 16, padY: 12, align: 'CENTER', primary: 'FIXED', fill: '#F0F9FF' })
    c.resize(460, c.height)
    c.cornerRadius = 4
    c.strokes = solid(C.cyan)
    c.strokeWeight = 1
    c.appendChild(makeText('ⓘ', { size: 16, line: 20, color: C.cyan }))
    const body = makeParagraph('Our offices are closed on the public holiday. Bookings resume Monday.', 350, { size: 14, line: 18, color: C.grey, colorVar: 'Text/Body' })
    body.name = 'Message'
    c.appendChild(body)
    c.appendChild(makeText('✕', { size: 14, line: 18, color: C.disabledText }))
    fillText(body)
    addTextProp(c, body, 'Message', 'Our offices are closed on the public holiday. Bookings resume Monday.')
    return c
}

function accRow(question, body, open) {
    const r = autolayout(figma.createFrame(), { name: 'Row', dir: 'VERTICAL', gap: 8, padX: 16, padY: 14, counter: 'FIXED' })
    r.resize(360, r.height)
    r.fills = []
    const head = autolayout(figma.createFrame(), { name: 'Header', dir: 'HORIZONTAL', justify: 'SPACE_BETWEEN', align: 'CENTER', primary: 'FIXED' })
    head.resize(328, head.height)
    head.fills = []
    head.appendChild(makeText(question, { weight: 'semibold', size: 16, line: 20, color: C.navy }))
    head.appendChild(makeText(open ? '–' : '+', { weight: 'bold', size: 18, line: 20, color: C.cyan }))
    r.appendChild(head)
    if (open) r.appendChild(makeParagraph(body, 328, { size: 14, line: 18, color: C.grey }))
    return r
}

function buildAccordion() {
    const c = comp('AccordionBlock', { dir: 'VERTICAL', gap: 0, counter: 'FIXED', fill: C.white })
    c.resize(360, c.height)
    c.cornerRadius = 8
    c.strokes = solid(C.border)
    c.strokeWeight = 1
    c.clipsContent = true
    c.appendChild(accRow('What is respite care?', 'Short-term care that gives carers a break while your loved one is supported.', true))
    c.appendChild(rectNode(360, 1, C.border))
    c.appendChild(accRow('How do I arrange a tour?', '', false))
    return c
}

function buildCardBlock() {
    const c = cardShell('CardBlock', 280, { shadow: true, pad: 0, gap: 0, clip: true })
    c.appendChild(imagePh(280, 150, 0))
    const col = innerCol(280, 16, 8)
    const heading = makeText('Card heading', { weight: 'semibold', size: 20, line: 24, color: C.navy, colorVar: 'Text/Default' })
    heading.name = 'Heading'
    const body = makeParagraph('Short supporting copy that introduces the card content.', 248, { size: 14, line: 18, color: C.grey, colorVar: 'Text/Body' })
    body.name = 'Body'
    col.appendChild(heading)
    col.appendChild(body)
    col.appendChild(buttonInstance('Learn more  ›', 'Tertiary', 'Small'))
    c.appendChild(col)
    fillText(heading)
    fillText(body)
    addTextProp(c, heading, 'Heading', 'Card heading')
    addTextProp(c, body, 'Body', 'Short supporting copy that introduces the card content.')
    return c
}

function buildColouredCard() {
    const c = cardShell('ColouredCardBlock', 280, { fill: C.purple, gap: 12 })
    c.appendChild(rectNode(40, 40, C.white, 20))
    const heading = makeText('Personalised care', { weight: 'semibold', size: 20, line: 24, color: C.white })
    heading.name = 'Heading'
    const body = makeParagraph('A short description of the value this card communicates.', 240, { size: 14, line: 18, color: '#F3E9FF' })
    body.name = 'Body'
    c.appendChild(heading)
    c.appendChild(body)
    c.appendChild(makeText('Learn more  ›', { weight: 'semibold', size: 14, line: 18, color: C.white }))
    fillText(heading)
    fillText(body)
    addTextProp(c, heading, 'Heading', 'Personalised care')
    addTextProp(c, body, 'Body', 'A short description of the value this card communicates.')
    return c
}

function buildContactCard() {
    const c = cardShell('ContactCardBlock', 300, { shadow: true, gap: 10 })
    const name = makeText('Bupa Clemton Park', { weight: 'semibold', size: 18, line: 24, color: C.navy, colorVar: 'Text/Default' })
    name.name = 'Name'
    const addr = makeParagraph('1 Bexley Road, Clemton Park NSW 2206', 260, { size: 14, line: 18, color: C.grey, colorVar: 'Text/Body' })
    addr.name = 'Address'
    c.appendChild(name)
    c.appendChild(addr)
    c.appendChild(makeText('1800 555 123', { weight: 'semibold', size: 14, line: 18, color: C.cyan, colorVar: 'Text/Link' }))
    const row = autolayout(figma.createFrame(), { name: 'Actions', dir: 'HORIZONTAL', gap: 8 })
    row.fills = []
    row.appendChild(buttonInstance('Book a tour', 'Primary', 'Small'))
    row.appendChild(buttonInstance('Enquire', 'Secondary', 'Small'))
    c.appendChild(row)
    fillText(name)
    fillText(addr)
    addTextProp(c, name, 'Name', 'Bupa Clemton Park')
    addTextProp(c, addr, 'Address', '1 Bexley Road, Clemton Park NSW 2206')
    return c
}

function buildImageCard() {
    const c = cardShell('ImageCardBlock', 280, { shadow: true, pad: 0, gap: 0, clip: true })
    c.appendChild(imagePh(280, 170, 0))
    const col = innerCol(280, 16, 6)
    const heading = makeText('Living well at Bupa', { weight: 'semibold', size: 18, line: 24, color: C.navy, colorVar: 'Text/Default' })
    heading.name = 'Heading'
    const body = makeParagraph('An image-led card that lifts on hover.', 248, { size: 14, line: 18, color: C.grey, colorVar: 'Text/Body' })
    body.name = 'Body'
    col.appendChild(heading)
    col.appendChild(body)
    c.appendChild(col)
    fillText(heading)
    fillText(body)
    addTextProp(c, heading, 'Heading', 'Living well at Bupa')
    addTextProp(c, body, 'Body', 'An image-led card that lifts on hover.')
    return c
}

function buildPromotionCard() {
    const c = cardShell('PromotionCardBlock', 280, { stroke: C.cyan, strokeW: 2, gap: 10 })
    c.appendChild(badge('Offer', '#F0F9FF', C.cyan))
    const heading = makeText('Move-in offer', { weight: 'semibold', size: 20, line: 24, color: C.navy, colorVar: 'Text/Default' })
    heading.name = 'Heading'
    const body = makeParagraph('A cyan-bordered card to highlight campaigns and offers.', 240, { size: 14, line: 18, color: C.grey, colorVar: 'Text/Body' })
    body.name = 'Body'
    c.appendChild(heading)
    c.appendChild(body)
    c.appendChild(buttonInstance('Find out more', 'Primary', 'Small'))
    fillText(heading)
    fillText(body)
    addTextProp(c, heading, 'Heading', 'Move-in offer')
    addTextProp(c, body, 'Body', 'A cyan-bordered card to highlight campaigns and offers.')
    return c
}

function buildVideoCard() {
    const c = cardShell('VideoCardBlock', 280, { shadow: true, pad: 0, gap: 0, clip: true })
    const media = autolayout(figma.createFrame(), { name: 'Media', dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: '#22384A' })
    media.resize(280, 160)
    const play = autolayout(figma.createFrame(), { name: 'Play', dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: C.white })
    play.resize(48, 48)
    play.cornerRadius = 24
    play.appendChild(makeText('▶', { size: 16, line: 20, color: C.cyan }))
    media.appendChild(play)
    c.appendChild(media)
    const col = innerCol(280, 16, 4)
    col.appendChild(makeText('Watch our story', { weight: 'semibold', size: 18, line: 24, color: C.navy }))
    c.appendChild(col)
    return c
}

function buildTestimonial() {
    const c = cardShell('TestimonialCardBlock', 320, { stroke: C.border, strokeW: 1, gap: 8 })
    c.appendChild(makeText('“', { weight: 'bold', size: 40, line: 40, color: C.cyan }))
    const quote = makeParagraph('The staff treat mum like family. We finally have peace of mind.', 280, { size: 18, line: 24, color: C.navy, colorVar: 'Text/Default' })
    quote.name = 'Quote'
    const attr = makeText('— Sarah, daughter of resident', { size: 14, line: 18, color: C.disabledText, colorVar: 'Text/Muted' })
    attr.name = 'Attribution'
    c.appendChild(quote)
    c.appendChild(attr)
    fillText(quote)
    addTextProp(c, quote, 'Quote', 'The staff treat mum like family. We finally have peace of mind.')
    addTextProp(c, attr, 'Attribution', '— Sarah, daughter of resident')
    return c
}

// TagsBlock composes Tag in code → a wrap of real Tag instances here.
function buildTagsBlock() {
    const c = comp('TagsBlock', { dir: 'HORIZONTAL', gap: 8, wrap: true, primary: 'FIXED' })
    c.resize(280, c.height)
    c.fills = []
    const sample = [['Respite care', 'Cyan'], ['Dementia', 'Teal'], ['Residential', 'Purple'], ['Day therapy', 'Fuchsia'], ['Palliative', 'Green']]
    for (const item of sample) c.appendChild(tagInstance(item[0], item[1]))
    return c
}

// --- sections (grid diagrams + bands) --------------------------------------

function gridCell(w, label) {
    const f = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: '#EAF1F7' })
    f.resize(w, 68)
    f.cornerRadius = 4
    f.appendChild(makeText(label, { size: 11, line: 14, color: C.silver }))
    return f
}

function buildGrid(name, cols) {
    const c = comp(name, { dir: 'HORIZONTAL', gap: 8, pad: 6, primary: 'FIXED', counter: 'FIXED', fill: C.white })
    c.resize(360, 80)
    c.cornerRadius = 8
    c.strokes = solid(C.border)
    c.strokeWeight = 1
    const inner = 360 - 12 - 8 * (cols.length - 1)
    for (const col of cols) {
        const cell = gridCell(Math.round((inner * col) / 12), col + '/12')
        cell.name = 'Column ' + col + '/12'
        c.appendChild(cell)
    }
    return c
}

function buildNavBar() {
    const c = comp('NavigationBar', { dir: 'HORIZONTAL', gap: 24, padX: 16, padY: 12, align: 'CENTER', primary: 'FIXED', fill: C.white })
    c.resize(360, c.height)
    c.cornerRadius = 8
    c.strokes = solid(C.border)
    c.strokeWeight = 1
    const items = ['Overview', 'Services', 'Pricing', 'Contact']
    items.forEach((t, i) => c.appendChild(makeText(t, { weight: i === 0 ? 'semibold' : 'regular', size: 14, line: 18, color: i === 0 ? C.cyan : C.grey })))
    return c
}

// --- organisms --------------------------------------------------------------

function buildHeader() {
    const c = comp('Header', { dir: 'HORIZONTAL', gap: 16, padX: 20, padY: 14, align: 'CENTER', justify: 'SPACE_BETWEEN', primary: 'FIXED', fill: C.white })
    c.resize(480, c.height)
    fillBound(c, 'Surface/Default', C.white)
    strokeBound(c, 'Border/Subtle', C.border)
    c.strokeWeight = 1
    const logo = autolayout(figma.createFrame(), { name: 'Logo', dir: 'HORIZONTAL', padX: 10, padY: 6, fill: C.navy })
    logo.cornerRadius = 4
    logo.appendChild(makeText('Bupa', { weight: 'bold', size: 16, line: 20, color: C.white }))
    c.appendChild(logo)
    const nav = autolayout(figma.createFrame(), { name: 'Nav', dir: 'HORIZONTAL', gap: 16, align: 'CENTER' })
    nav.fills = []
    for (const t of ['Find a home', 'Services', 'About']) nav.appendChild(makeText(t, { size: 14, line: 18, color: C.grey }))
    c.appendChild(nav)
    c.appendChild(buttonInstance('Book a tour', 'Primary', 'Small'))
    return c
}

function footerCol(title, items) {
    const f = autolayout(figma.createFrame(), { name: title, dir: 'VERTICAL', gap: 6 })
    f.fills = []
    f.appendChild(makeText(title, { weight: 'semibold', size: 14, line: 18, color: C.white }))
    for (const i of items) f.appendChild(makeText(i, { size: 12, line: 16, color: '#AEC2D6' }))
    return f
}

function buildFooter() {
    const c = comp('Footer', { dir: 'VERTICAL', gap: 16, pad: 24, counter: 'FIXED', fill: C.navy })
    c.resize(480, c.height)
    fillBound(c, 'Surface/Brand', C.navy)
    const cols = autolayout(figma.createFrame(), { name: 'Columns', dir: 'HORIZONTAL', gap: 32 })
    cols.fills = []
    cols.appendChild(footerCol('Care', ['Residential', 'Respite', 'Dementia']))
    cols.appendChild(footerCol('Company', ['About', 'Careers', 'News']))
    cols.appendChild(footerCol('Support', ['Contact', 'FAQs', 'Feedback']))
    c.appendChild(cols)
    c.appendChild(rectNode(432, 1, '#1C4A6E'))
    const legal = autolayout(figma.createFrame(), { name: 'Legal', dir: 'HORIZONTAL', justify: 'SPACE_BETWEEN', align: 'CENTER', primary: 'FIXED' })
    legal.resize(432, legal.height)
    legal.fills = []
    legal.appendChild(makeText('© Bupa Aged Care', { size: 11, line: 14, color: '#AEC2D6' }))
    legal.appendChild(makeText('in   f   ▶', { size: 11, line: 14, color: '#AEC2D6' }))
    c.appendChild(legal)
    return c
}

function buildNotification() {
    const c = comp('PreviewEnabledNotification', { dir: 'HORIZONTAL', gap: 12, padX: 16, padY: 10, align: 'CENTER', justify: 'SPACE_BETWEEN', primary: 'FIXED', fill: '#FDD835' })
    c.resize(460, c.height)
    c.appendChild(makeText('Preview mode is on — you are viewing draft content', { weight: 'semibold', size: 13, line: 16, color: C.navy }))
    const exit = autolayout(figma.createFrame(), { name: 'Exit', dir: 'HORIZONTAL', padX: 12, padY: 4, fill: C.navy })
    exit.cornerRadius = 4
    exit.appendChild(makeText('Exit', { weight: 'semibold', size: 12, line: 16, color: C.white }))
    c.appendChild(exit)
    return c
}

// --- templates & pages ------------------------------------------------------

function buildPrimaryTemplate() {
    const c = comp('PrimaryPageTemplate', { dir: 'VERTICAL', gap: 8, pad: 8, counter: 'FIXED', fill: C.coolPaper100 })
    c.resize(320, c.height)
    c.cornerRadius = 8
    c.strokes = solid(C.border)
    c.strokeWeight = 1
    c.appendChild(bar(304, 26, C.navy, 'Header'))
    c.appendChild(bar(304, 60, C.cyan, 'Hero', C.white))
    c.appendChild(bar(304, 46, C.white, 'Section', C.silver))
    c.appendChild(bar(304, 46, C.white, 'Section', C.silver))
    c.appendChild(bar(304, 40, C.navy, 'Footer'))
    return c
}

function buildBlankLayout() {
    const c = comp('BlankLayout', { dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: C.white })
    c.resize(320, 180)
    c.cornerRadius = 8
    c.strokes = solid('#CBD5E0')
    c.strokeWeight = 1
    c.appendChild(makeText('Blank layout — no global chrome', { size: 13, line: 16, color: C.silver }))
    return c
}

function buildHomePage() {
    const c = comp('HomePage', { dir: 'VERTICAL', gap: 8, pad: 8, counter: 'FIXED', fill: C.coolPaper100 })
    c.resize(320, c.height)
    c.cornerRadius = 8
    c.strokes = solid(C.border)
    c.strokeWeight = 1
    c.appendChild(bar(304, 26, C.navy, 'Header'))
    c.appendChild(bar(304, 70, C.cyan, 'Search hero', C.white))
    const row = autolayout(figma.createFrame(), { name: 'Row', dir: 'HORIZONTAL', gap: 8, primary: 'FIXED' })
    row.resize(304, row.height)
    row.fills = []
    for (let i = 0; i < 3; i++) row.appendChild(bar(96, 70, C.white, 'Card', C.silver))
    c.appendChild(row)
    c.appendChild(bar(304, 40, C.navy, 'Footer'))
    return c
}

function buildCareHomePage() {
    const c = comp('CareHomePage', { dir: 'VERTICAL', gap: 8, pad: 8, counter: 'FIXED', fill: C.coolPaper100 })
    c.resize(320, c.height)
    c.cornerRadius = 8
    c.strokes = solid(C.border)
    c.strokeWeight = 1
    c.appendChild(bar(304, 26, C.navy, 'Header'))
    c.appendChild(bar(304, 60, C.cyan, 'Care home hero', C.white))
    const row = autolayout(figma.createFrame(), { name: 'Row', dir: 'HORIZONTAL', gap: 8, primary: 'FIXED' })
    row.resize(304, row.height)
    row.fills = []
    row.appendChild(bar(100, 80, C.white, 'Details', C.silver))
    row.appendChild(bar(196, 80, C.white, 'Gallery', C.silver))
    c.appendChild(row)
    c.appendChild(bar(304, 40, C.navy, 'Footer'))
    return c
}

// --- added components -------------------------------------------------------

function buildBadge() {
    const c = comp('Badge', { dir: 'HORIZONTAL', gap: 8, align: 'CENTER' })
    c.appendChild(badge('New', '#E3F6E9', C.green))
    c.appendChild(badge('Popular', '#E7F3FB', C.cyan))
    c.appendChild(badge('Award 2024', '#FBF3D7', C.grey))
    return c
}

function buildTooltip() {
    const c = comp('Tooltip', { dir: 'VERTICAL', gap: 6, align: 'CENTER', counter: 'FIXED' })
    c.resize(200, c.height)
    const bubble = autolayout(figma.createFrame(), { name: 'Bubble', dir: 'HORIZONTAL', padX: 10, padY: 6, fill: C.navy })
    bubble.cornerRadius = 6
    bubble.appendChild(makeText('A helpful hint', { size: 12, line: 16, color: C.white }))
    c.appendChild(bubble)
    const trigger = autolayout(figma.createFrame(), { name: 'Trigger', dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: C.coolPaper100 })
    trigger.resize(28, 28)
    trigger.cornerRadius = 100
    trigger.strokes = solid(C.border)
    trigger.strokeWeight = 1
    trigger.appendChild(makeText('?', { weight: 'semibold', size: 13, line: 16, color: C.grey }))
    c.appendChild(trigger)
    return c
}

function buildSkipLinks() {
    const c = comp('SkipLinks', { dir: 'HORIZONTAL', padX: 14, padY: 8, fill: C.navy })
    c.cornerRadius = 6
    c.strokes = solid('#A3DAFD')
    c.strokeWeight = 4
    c.appendChild(makeText('Skip to main content', { weight: 'semibold', size: 13, line: 16, color: C.white }))
    return c
}

function toggleTrack(on) {
    const track = autolayout(figma.createFrame(), { name: on ? 'On' : 'Off', dir: 'HORIZONTAL', justify: on ? 'MAX' : 'MIN', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', padX: 2, padY: 2, fill: on ? C.cyan : C.lightGrey })
    track.resize(44, 24)
    track.cornerRadius = 100
    track.appendChild(rectNode(20, 20, C.white, 100))
    return track
}

function buildToggle() {
    const c = comp('ToggleSwitch', { dir: 'HORIZONTAL', gap: 16, align: 'CENTER' })
    c.appendChild(toggleTrack(true))
    c.appendChild(toggleTrack(false))
    return c
}

function pageBox(label, active) {
    const b = autolayout(figma.createFrame(), { name: 'Page', dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: active ? C.cyan : null })
    b.resize(28, 28)
    b.cornerRadius = 6
    if (!active) {
        b.strokes = solid(C.border)
        b.strokeWeight = 1
    }
    b.appendChild(makeText(label, { weight: 'semibold', size: 12, line: 16, color: active ? C.white : C.grey }))
    return b
}

function buildPagination() {
    const c = comp('Pagination', { dir: 'HORIZONTAL', gap: 6, align: 'CENTER' })
    const items = ['‹', '1', '2', '3', '…', '9', '›']
    for (const p of items) {
        if (p === '…') c.appendChild(makeText('…', { size: 12, line: 16, color: C.disabledText }))
        else c.appendChild(pageBox(p, p === '1'))
    }
    return c
}

function buildTabs() {
    const c = comp('Tabs', { dir: 'VERTICAL', gap: 0, counter: 'FIXED' })
    c.resize(320, c.height)
    const list = autolayout(figma.createFrame(), { name: 'Tablist', dir: 'HORIZONTAL', gap: 20, padX: 4, padY: 8, primary: 'FIXED' })
    list.resize(320, list.height)
    list.fills = []
    const tabs = [['Overview', true], ['Rooms', false], ['Fees', false]]
    for (const t of tabs) {
        list.appendChild(makeText(t[0], { weight: t[1] ? 'semibold' : 'regular', size: 14, line: 18, color: t[1] ? C.cyan : C.grey }))
    }
    c.appendChild(list)
    c.appendChild(rectNode(320, 2, C.border))
    const panel = autolayout(figma.createFrame(), { name: 'Panel', dir: 'VERTICAL', gap: 8, padX: 4, padY: 12, counter: 'FIXED' })
    panel.resize(320, panel.height)
    panel.fills = []
    panel.appendChild(rectNode(290, 8, C.coolPaper100, 4))
    panel.appendChild(rectNode(210, 8, C.coolPaper100, 4))
    c.appendChild(panel)
    return c
}

function tableCell(text, w, opts) {
    opts = opts || {}
    const cell = autolayout(figma.createFrame(), { name: 'Cell', dir: 'HORIZONTAL', justify: opts.center ? 'CENTER' : 'MIN', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', padX: 12, padY: 8, fill: opts.head ? C.coolPaper100 : null })
    cell.resize(w, 36)
    cell.appendChild(makeText(text, { weight: opts.head ? 'semibold' : 'regular', size: 12, line: 16, color: opts.color || C.grey }))
    return cell
}

function tableRow(cells) {
    const r = autolayout(figma.createFrame(), { name: 'Row', dir: 'HORIZONTAL', gap: 0, primary: 'FIXED' })
    r.fills = []
    for (const cell of cells) r.appendChild(cell)
    return r
}

function buildComparisonTable() {
    const c = comp('ComparisonTable', { dir: 'VERTICAL', gap: 0, counter: 'FIXED', fill: C.white })
    c.cornerRadius = 8
    c.clipsContent = true
    c.strokes = solid(C.border)
    c.strokeWeight = 1
    c.appendChild(tableRow([
        tableCell('Feature', 150, { head: true, color: C.navy }),
        tableCell('Basic', 90, { head: true, center: true, color: C.navy }),
        tableCell('Plus', 90, { head: true, center: true, color: C.navy }),
    ]))
    for (const label of ['Respite care', 'Nursing']) {
        c.appendChild(tableRow([
            tableCell(label, 150, {}),
            tableCell('✓', 90, { center: true, color: C.green }),
            tableCell('✓', 90, { center: true, color: C.green }),
        ]))
    }
    return c
}

function buildDisclaimer() {
    const c = comp('Disclaimer', { dir: 'VERTICAL', gap: 6, counter: 'FIXED' })
    c.resize(320, c.height)
    c.appendChild(makeParagraph('¹ Fees are indicative and subject to assessment.', 304, { size: 12, line: 16, color: C.grey }))
    c.appendChild(makeParagraph('² Conditions apply; see full terms and conditions.', 304, { size: 12, line: 16, color: C.grey }))
    return c
}

function stepDot(n, filled) {
    const d = autolayout(figma.createFrame(), { name: 'Step ' + n, dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: filled ? C.cyan : C.lightGrey })
    d.resize(28, 28)
    d.cornerRadius = 100
    d.appendChild(makeText(String(n), { weight: 'semibold', size: 12, line: 16, color: C.white }))
    return d
}

function buildStepper() {
    const c = comp('Stepper', { dir: 'HORIZONTAL', gap: 0, align: 'CENTER' })
    c.appendChild(stepDot(1, true))
    c.appendChild(rectNode(40, 2, C.cyan))
    c.appendChild(stepDot(2, true))
    c.appendChild(rectNode(40, 2, C.lightGrey))
    c.appendChild(stepDot(3, false))
    return c
}

// A labelled placeholder for non-visual / integration-only components.
function buildPlaceholder(name, desc, badgeText) {
    const c = cardShell(name, 300, { stroke: C.border, strokeW: 1, gap: 10 })
    c.appendChild(badge(badgeText || 'Infrastructure', '#EEF2F6', C.silver))
    c.appendChild(makeText(name, { weight: 'semibold', size: 16, line: 20, color: C.navy }))
    c.appendChild(makeParagraph(desc, 260, { size: 13, line: 18, color: C.grey }))
    return c
}

// ---------------------------------------------------------------------------
// The full catalogue, mirroring styleguide-components/componentCatalog.ts.
// `kind` is only used for the placeholder badge; named visual builders below
// take precedence over it via the VISUAL registry.
// ---------------------------------------------------------------------------

const CATALOG = [
    {
        title: 'Atoms',
        description: 'The smallest building blocks — single-purpose elements that everything else is composed from.',
        components: [
            { name: 'Button', desc: 'Primary, secondary, ghost and tertiary actions in three sizes.' },
            { name: 'Tag', desc: 'A small, colourable label that links to a page or anchor.' },
            { name: 'Badge', desc: 'A small, non-interactive status, category or recognition label.' },
            { name: 'Tooltip', desc: 'An accessible hint revealed on hover and keyboard focus.' },
            { name: 'SkipLinks', desc: 'Focus-revealed shortcuts that bypass the header to main landmarks.' },
            { name: 'ToggleSwitch', desc: 'A binary on/off switch built on a real checkbox input.' },
            { name: 'Pagination', desc: 'Numbered page navigation for long listings, with truncation.' },
            { name: 'Section', desc: 'A full-width layout band with background and vertical padding.' },
            { name: 'ResponsiveImage', desc: 'A CMS-aware image that serves responsive sources.' },
            { name: 'RichTextContent', desc: 'Renders Contentful rich text into styled HTML.', badge: 'Content' },
            { name: 'FormSelector', desc: 'Resolves and renders the correct form for a CMS reference.', badge: 'Integration' },
            { name: 'SmallSearchInput', desc: 'A compact search field used in the header.' },
            { name: 'ShowMoreButton', desc: 'A ghost button that expands additional content.' },
            { name: 'BackToTop', desc: 'A floating control that scrolls back to the top.' },
            { name: 'FullScreenModal', desc: 'An accessible full-screen overlay container.', badge: 'Overlay' },
            { name: 'ErrorMessageWrapper', desc: 'Standardised wrapper for inline form errors.' },
            { name: 'BelowHeader', desc: 'Spacing helper offsetting content beneath the header.', badge: 'Helper' },
            { name: 'HeaderStyle', desc: 'Applies contextual header styling per page.', badge: 'Helper' },
        ],
    },
    {
        title: 'Molecules',
        description: 'Small groups of atoms working together, including the CMS-driven content blocks authored in Contentful.',
        components: [
            { name: 'HeroBanner', desc: 'A full-width hero with heading, copy and imagery.' },
            { name: 'Tabs', desc: 'An accessible tabbed panel following the WAI-ARIA tabs pattern.' },
            { name: 'ComparisonTable', desc: 'A responsive feature-comparison matrix for products.' },
            { name: 'Disclaimer', desc: 'A legal footnote block, optionally collapsible.' },
            { name: 'Stepper', desc: 'A horizontal progress indicator for multi-step flows.' },
            { name: 'AlgoliaSearch', desc: 'Instant search experience powered by Algolia.', badge: 'Integration' },
            { name: 'Autocomplete', desc: 'Type-ahead suggestions for search queries.', badge: 'Integration' },
            { name: 'YouTubeVideo', desc: 'A privacy-aware embedded YouTube player.', badge: 'Media' },
            { name: 'CmsElement', desc: 'The dispatcher mapping a CMS block type to its component.', badge: 'Infrastructure' },
            { name: 'AlertBlock', desc: 'A dismissible, full-width notification banner.' },
            { name: 'CtaBlock', desc: 'A call-to-action button with size, variant and alignment.' },
            { name: 'AccordionBlock', desc: 'Expandable question-and-answer panels.' },
            { name: 'CardBlock', desc: 'A content card with image, heading, body and CTA.' },
            { name: 'ColouredCardBlock', desc: 'A card variant with a coloured background surface.' },
            { name: 'ContactCardBlock', desc: 'A card presenting contact details and actions.' },
            { name: 'ImageCardBlock', desc: 'An image-led card that lifts on hover.' },
            { name: 'PromotionCardBlock', desc: 'A promotional card for campaigns and offers.' },
            { name: 'TestimonialCardBlock', desc: 'A card presenting a customer testimonial.' },
            { name: 'VideoCardBlock', desc: 'A card with an embedded or linked video.' },
            { name: 'HeadingBlock', desc: 'A standalone section heading.' },
            { name: 'BreadCrumbsBlock', desc: 'Breadcrumb navigation for the current page.' },
            { name: 'TagsBlock', desc: 'A wrapping group of Tag atoms.' },
            { name: 'ImageBlock', desc: 'A standalone responsive image.' },
            { name: 'NearbyCardBlock', desc: 'A card surfacing nearby aged-care homes.', badge: 'Data tool' },
            { name: 'ImageGallery', desc: 'A gallery with a full-screen modal viewer.', badge: 'Media' },
            { name: 'CarouselBlock', desc: 'A horizontally scrolling carousel of content.', badge: 'Media' },
            { name: 'MarkdownBlock', desc: 'Renders markdown content into styled prose.', badge: 'Content' },
            { name: 'RichTextBlock', desc: 'Renders a Contentful rich-text field.', badge: 'Content' },
            { name: 'StickyBar', desc: 'A bar that sticks to the viewport while scrolling.', badge: 'Layout' },
            { name: 'BlogBlock', desc: 'A list of blog story cards.', badge: 'Data tool' },
            { name: 'PricingBlock', desc: 'Displays aged-care pricing information.', badge: 'Data tool' },
            { name: 'PricingCalculatorBlock', desc: 'An interactive cost-of-care calculator.', badge: 'Data tool' },
            { name: 'CalendlyBlock', desc: 'An embedded Calendly scheduling widget.', badge: 'Integration' },
            { name: 'FormBlock', desc: 'Renders a referenced form within page content.', badge: 'Integration' },
            { name: 'AgedCareHomeMapBlock', desc: 'A map of aged-care home locations.', badge: 'Integration' },
            { name: 'AgedCareNavigator', desc: 'A guided, multi-step needs navigator.', badge: 'Data tool' },
            { name: 'SearchPageBlock', desc: 'The full search results experience.', badge: 'Integration' },
        ],
    },
    {
        title: 'Sections',
        description: 'Full-width composition layouts that arrange blocks into rows, columns and grids.',
        components: [
            { name: 'BasicHeroSection', desc: 'A standard page hero band.' },
            { name: 'ContactHeroSection', desc: 'A hero with contact-oriented calls to action.' },
            { name: 'SearchHomeHeroSection', desc: 'The homepage hero with integrated search.' },
            { name: 'ThreeColumnSearchHeroSection', desc: 'A three-column hero with search.' },
            { name: 'BannerSection', desc: 'A promotional banner band.' },
            { name: 'OneColumnSection', desc: 'A single-column content band.' },
            { name: 'TwoColumnSection', desc: 'A two-column content band.' },
            { name: 'Section12', desc: 'A 12-unit grid band.' },
            { name: 'Section6x6', desc: 'A two-up (6+6) grid band.' },
            { name: 'Section4x8', desc: 'An asymmetric (4+8) grid band.' },
            { name: 'Section4x4x4', desc: 'A three-up (4+4+4) grid band.' },
            { name: 'Section3x3x3x3', desc: 'A four-up (3+3+3+3) grid band.' },
            { name: 'RegionListDetailSection', desc: 'A list/detail layout for browsing regions.' },
            { name: 'NavigationBar', desc: 'In-page section navigation.' },
        ],
    },
    {
        title: 'Organisms',
        description: 'Large, self-contained regions that combine many molecules into a complete piece of interface.',
        components: [
            { name: 'Header', desc: 'The global site header with navigation and search.' },
            { name: 'Footer', desc: 'The global footer with navigation, legal and social links.' },
            { name: 'PreviewEnabledNotification', desc: 'A banner shown when CMS preview mode is active.' },
            { name: 'LinkHandler', desc: 'Centralised internal/external link behaviour.', badge: 'Infrastructure' },
        ],
    },
    {
        title: 'Templates',
        description: 'Page-level scaffolds that arrange organisms and sections into a full page.',
        components: [
            { name: 'PrimaryPageTemplate', desc: 'The standard layout with header, sections and footer.' },
            { name: 'BlankLayout', desc: 'A minimal layout with no global chrome.' },
        ],
    },
    {
        title: 'Pages',
        description: 'Concrete instances of templates filled with real content — example compositions.',
        components: [
            { name: 'HomePage', desc: 'The homepage: search hero, featured cards and footer.' },
            { name: 'CareHomePage', desc: 'A care-home detail page: hero, details/gallery and footer.' },
        ],
    },
]

// Named visual builders take precedence; everything else renders as a
// labelled placeholder using its catalogue `badge`.
const VISUAL = {
    Button: buildButtonSet,
    Tag: buildTagSet,
    Badge: buildBadge,
    Tooltip: buildTooltip,
    SkipLinks: buildSkipLinks,
    ToggleSwitch: buildToggle,
    Pagination: buildPagination,
    Section: buildSectionAtom,
    ResponsiveImage: buildResponsiveImage,
    SmallSearchInput: buildSmallSearchInput,
    ShowMoreButton: buildShowMore,
    BackToTop: buildBackToTop,
    ErrorMessageWrapper: buildErrorMessage,
    HeroBanner: buildHero,
    Tabs: buildTabs,
    ComparisonTable: buildComparisonTable,
    Disclaimer: buildDisclaimer,
    Stepper: buildStepper,
    AlertBlock: buildAlert,
    CtaBlock: buildCta,
    AccordionBlock: buildAccordion,
    CardBlock: buildCardBlock,
    ColouredCardBlock: buildColouredCard,
    ContactCardBlock: buildContactCard,
    ImageCardBlock: buildImageCard,
    PromotionCardBlock: buildPromotionCard,
    TestimonialCardBlock: buildTestimonial,
    VideoCardBlock: buildVideoCard,
    HeadingBlock: buildHeadingSet,
    BreadCrumbsBlock: buildBreadcrumbs,
    TagsBlock: buildTagsBlock,
    ImageBlock: buildImageBlock,
    BasicHeroSection: () => centerBox('BasicHeroSection', 360, 90, C.cyan, 'Hero section', C.white, 8),
    ContactHeroSection: () => centerBox('ContactHeroSection', 360, 90, C.cyan, 'Contact hero', C.white, 8),
    SearchHomeHeroSection: () => centerBox('SearchHomeHeroSection', 360, 90, C.cyan, 'Search home hero', C.white, 8),
    ThreeColumnSearchHeroSection: () => centerBox('ThreeColumnSearchHeroSection', 360, 90, C.cyan, 'Search hero · 3 column', C.white, 8),
    BannerSection: () => centerBox('BannerSection', 360, 90, C.fuchsia, 'Banner', C.white, 8),
    OneColumnSection: () => buildGrid('OneColumnSection', [12]),
    TwoColumnSection: () => buildGrid('TwoColumnSection', [6, 6]),
    Section12: () => buildGrid('Section12', [12]),
    Section6x6: () => buildGrid('Section6x6', [6, 6]),
    Section4x8: () => buildGrid('Section4x8', [4, 8]),
    Section4x4x4: () => buildGrid('Section4x4x4', [4, 4, 4]),
    Section3x3x3x3: () => buildGrid('Section3x3x3x3', [3, 3, 3, 3]),
    RegionListDetailSection: () => buildGrid('RegionListDetailSection', [4, 8]),
    NavigationBar: buildNavBar,
    Header: buildHeader,
    Footer: buildFooter,
    PreviewEnabledNotification: buildNotification,
    PrimaryPageTemplate: buildPrimaryTemplate,
    BlankLayout: buildBlankLayout,
    HomePage: buildHomePage,
    CareHomePage: buildCareHomePage,
}

const GRID = { COL: 410, GUT: 24, COLUMNS: 3, PAD: 24 }
const gridWidth = () => GRID.COLUMNS * GRID.COL + (GRID.COLUMNS - 1) * GRID.GUT

// Build one catalogue entry as a REAL, instanceable component (or variant set),
// named `Layer/Name` so the Assets panel folders mirror the code, with its
// description + source recorded as component metadata. Returns the node itself
// (no documentation wrapper — component sets cannot live inside a frame, and the
// wrapper is what broke usability before).
function buildComponentNode(entry, layerTitle) {
    let node
    try {
        const builder = VISUAL[entry.name]
        node = builder ? builder() : buildPlaceholder(entry.name, entry.desc, entry.badge)
    } catch (err) {
        node = buildPlaceholder(entry.name, entry.desc + '  (preview unavailable)', 'Component')
    }
    const path = figmaPath(layerTitle, entry.name)
    const source = codePath(layerTitle, entry.name)
    node.name = path
    if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
        try {
            const tag = entry.badge ? '  ·  ' + entry.badge : ''
            node.description = entry.name + tag + '\n' + entry.desc + '\nSource: ' + source
        } catch (e) { /* description unsupported */ }
    }
    return node
}

// Wrap a large foundation section in a named, white "artboard" frame.
function artboardWrap(node, name) {
    const f = autolayout(figma.createFrame(), { name: name, dir: 'VERTICAL', pad: 40, fill: C.white })
    f.cornerRadius = 16
    f.strokes = solid(C.border)
    f.strokeWeight = 1
    f.appendChild(node)
    return f
}

function buildTitleArtboard() {
    const f = autolayout(figma.createFrame(), { name: 'Bupa Component Library', dir: 'VERTICAL', gap: 12, pad: 56, counter: 'FIXED', fill: C.navy })
    f.resize(gridWidth(), f.height)
    f.cornerRadius = 20
    f.appendChild(makeText('BUPA AGED CARE · DESIGN SYSTEM', { weight: 'semibold', size: 13, line: 16, color: '#7FC4EF' }))
    f.appendChild(makeText('Component Library', { weight: 'bold', size: 52, line: 60, color: C.white }))
    f.appendChild(makeParagraph('Token-backed foundations and the full component catalogue, generated from the Bupa design tokens. Colours, type, spacing and radius are Figma Variables; every item is a real component grouped by atomic layer.', gridWidth() - 112, { size: 16, line: 24, color: '#CFE6F7' }))
    return f
}

function buildLayerHeading(layer) {
    const f = autolayout(figma.createFrame(), { name: layer.title + ' — heading', dir: 'VERTICAL', gap: 6, counter: 'FIXED' })
    f.resize(gridWidth(), f.height)
    f.fills = []
    f.appendChild(makeText(layer.components.length + ' COMPONENTS  ·  ' + layerFolder(layer.title), { weight: 'semibold', size: 12, line: 16, color: C.cyan, colorVar: 'Action/Default' }))
    f.appendChild(makeText(layer.title, { weight: 'bold', size: 28, line: 36, color: C.navy, colorVar: 'Text/Default' }))
    f.appendChild(makeParagraph(layer.description, gridWidth() - 40, { size: 14, line: 20, color: C.grey, colorVar: 'Text/Body' }))
    return f
}

// A per-layer container is a native Figma Section that actually wraps its
// content. Components are placed in a column grid using absolute page
// coordinates; afterwards the section is resized to bound them (the previous
// version left every section at its default 496×496, overlapping at the origin,
// so nothing was visually grouped). Falls back to a plain page placement if the
// host lacks the Sections API.
function placeLayer(layer, startY, tops) {
    const PAD = GRID.PAD
    const ROW_GAP = 40
    const HEAD_GAP = 24

    let section = null
    try {
        if (figma.createSection) {
            section = figma.createSection()
            section.name = layer.title + '  ·  ' + layerFolder(layer.title)
            section.setPluginData('bupaLib', '1')
        }
    } catch (e) { section = null }
    const parent = section || figma.currentPage

    const heading = buildLayerHeading(layer)
    parent.appendChild(heading)
    heading.x = PAD
    heading.y = startY + PAD
    heading.setPluginData('bupaLib', '1')

    let cx = PAD
    let cy = startY + PAD + heading.height + HEAD_GAP
    let rowMax = 0
    const nodes = layer.components.map(entry => buildComponentNode(entry, layer.title))
    for (const node of nodes) {
        parent.appendChild(node)
        if (cx > PAD && cx + node.width > PAD + gridWidth()) {
            cx = PAD
            cy += rowMax + ROW_GAP
            rowMax = 0
        }
        node.x = cx
        node.y = cy
        node.setPluginData('bupaLib', '1')
        cx += node.width + GRID.GUT
        if (node.height > rowMax) rowMax = node.height
    }
    const bottom = cy + rowMax + PAD

    if (section) {
        // Bound the section around its content. Children carry absolute page
        // coordinates, so set the section's frame to wrap them without moving
        // them; resizeWithoutConstraints avoids min-size clamping.
        section.x = 0
        section.y = startY
        try {
            section.resizeWithoutConstraints(gridWidth() + PAD * 2, bottom - startY)
        } catch (e) {
            try { section.resize(gridWidth() + PAD * 2, bottom - startY) } catch (e2) { /* leave default */ }
        }
        tops.push(section)
    } else {
        tops.push(heading)
        for (const n of nodes) tops.push(n)
    }
    return bottom
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

async function main() {
    const family = await loadFonts()
    if (family !== 'Montserrat') {
        figma.notify(`Montserrat not installed — used ${family}. Install Montserrat for brand-accurate type.`)
    }

    // Remove anything this plugin built on a previous run — tagged nodes plus
    // any legacy title/section names from earlier versions.
    for (const node of figma.currentPage.children.slice()) {
        const name = node.name || ''
        if (
            node.getPluginData('bupaLib') === '1' ||
            name === 'Bupa Component Library' ||
            name === 'Component Library' ||
            name === 'Foundations' ||
            /·\s+components\//.test(name)
        ) {
            try { node.remove() } catch (e) { /* already gone */ }
        }
    }

    // Variables first, then styles bind to them, then components bind to both.
    buildVariables()
    buildColorStyles()
    buildTextStyles()

    const SECTION_GAP = 120
    const tops = []
    let y = 0

    // Title banner across the full grid width.
    const title = buildTitleArtboard()
    figma.currentPage.appendChild(title)
    title.x = 0
    title.y = y
    title.setPluginData('bupaLib', '1')
    tops.push(title)
    y += title.height + 72

    // Foundations: colour + typography artboards side by side.
    const color = artboardWrap(await buildColorSection(), 'Foundations — Colour')
    const typo = artboardWrap(await buildTypographySection(), 'Foundations — Typography')
    let fSection = null
    try {
        if (figma.createSection) {
            fSection = figma.createSection()
            fSection.name = 'Foundations'
            fSection.setPluginData('bupaLib', '1')
        }
    } catch (e) { fSection = null }
    const fParent = fSection || figma.currentPage
    fParent.appendChild(color)
    fParent.appendChild(typo)
    color.x = GRID.PAD
    color.y = y + GRID.PAD
    typo.x = GRID.PAD + color.width + 48
    typo.y = y + GRID.PAD
    color.setPluginData('bupaLib', '1')
    typo.setPluginData('bupaLib', '1')
    const fBottom = y + GRID.PAD + Math.max(color.height, typo.height) + GRID.PAD
    if (fSection) {
        fSection.x = 0
        fSection.y = y
        try { fSection.resizeWithoutConstraints(GRID.PAD * 2 + color.width + 48 + typo.width, fBottom - y) } catch (e) { /* leave default */ }
        tops.push(fSection)
    } else {
        tops.push(color)
        tops.push(typo)
    }
    y = fBottom + SECTION_GAP

    // One Section per atomic layer, each wrapping a grid of real components.
    for (const layer of CATALOG) {
        const bottom = placeLayer(layer, y, tops)
        y = bottom + SECTION_GAP
    }

    figma.viewport.scrollAndZoomIntoView(tops)
    const tokenNote = VARS_OK ? ' · tokens bound' : ' · no Variables API (raw values)'
    figma.notify('Bupa library built — ' + tops.length + ' top-level nodes' + tokenNote + ' ✓')
    figma.closePlugin('Bupa component library built ✓')
}

main().catch(err => {
    figma.notify('Build failed: ' + err.message, { error: true })
    figma.closePlugin('Build failed: ' + err.message)
})
