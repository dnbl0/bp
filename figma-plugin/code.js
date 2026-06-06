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
function makeText(content, { weight = 'regular', size = 16, line = 20, color = C.grey } = {}) {
    const t = figma.createText()
    t.fontName = fontFor(weight)
    t.characters = content
    t.fontSize = size
    t.lineHeight = { unit: 'PIXELS', value: line }
    t.fills = solid(color)
    return t
}

// Upsert a local paint style by name (so re-runs don't duplicate).
function upsertPaintStyle(name, hex) {
    const existing = figma.getLocalPaintStyles().find(s => s.name === name)
    const style = existing || figma.createPaintStyle()
    style.name = name
    style.paints = solid(hex)
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
    const b = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', padX: 8, padY: 3, fill: bg })
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
    const f = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: gap != null ? gap : 8, pad: pad != null ? pad : 16, counter: 'FIXED' })
    f.resize(width, f.height)
    f.fills = []
    return f
}

// A single inline button rendering (not a component) for use inside previews.
function miniButton(label, variantName, sizeName) {
    const v = BUTTON_VARIANTS[variantName || 'Primary']
    const s = BUTTON_SIZES[sizeName || 'Standard']
    const f = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', gap: 8, padX: s.padX, padY: s.padY, align: 'CENTER', justify: 'CENTER' })
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

// ---------------------------------------------------------------------------
// Foundations
// ---------------------------------------------------------------------------

function buildColorStyles() {
    const byName = {}
    for (const { group, colors } of COLOR_GROUPS) {
        for (const [name, hex] of colors) {
            const style = upsertPaintStyle(`${group}/${name}`, hex)
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

// One Button variant as a Component, named for combineAsVariants.
function buildButtonVariant(variantName, sizeName) {
    const v = BUTTON_VARIANTS[variantName]
    const s = BUTTON_SIZES[sizeName]

    const comp = figma.createComponent()
    comp.name = `Variant=${variantName}, Size=${sizeName}`
    autolayout(comp, {
        dir: 'HORIZONTAL', gap: 16, padX: s.padX, padY: s.padY,
        align: 'CENTER', justify: 'CENTER',
    })
    comp.cornerRadius = s.radius
    comp.fills = v.fill ? solid(v.fill) : []
    if (v.stroke) {
        comp.strokes = solid(v.stroke)
        comp.strokeWeight = 2
    }

    const label = makeText('Button', { weight: 'semibold', size: s.font, line: s.font * 1.25, color: v.text })
    if (v.underline) label.textDecoration = 'UNDERLINE'
    comp.appendChild(label)
    return comp
}

function buildButtonSet() {
    const variants = []
    for (const variantName of Object.keys(BUTTON_VARIANTS)) {
        for (const sizeName of Object.keys(BUTTON_SIZES)) {
            variants.push(buildButtonVariant(variantName, sizeName))
        }
    }
    const set = figma.combineAsVariants(variants, figma.currentPage)
    set.name = 'Button'
    autolayout(set, { dir: 'HORIZONTAL', gap: 24, padX: 24, padY: 24, wrap: true, primary: 'FIXED' })
    set.resize(720, set.height)
    set.counterAxisSizingMode = 'AUTO'
    set.fills = solid('#FFFFFF')
    set.cornerRadius = 8
    return set
}

function buildTagSet() {
    const variants = TAG_COLORS.map(([name, bg, fg]) => {
        const comp = figma.createComponent()
        comp.name = `Color=${name}`
        autolayout(comp, { dir: 'HORIZONTAL', pad: 4, align: 'CENTER', justify: 'CENTER' })
        comp.cornerRadius = 4
        comp.fills = solid(bg)
        comp.appendChild(makeText('Tag', { size: 12, line: 16, color: fg }))
        return comp
    })
    const set = figma.combineAsVariants(variants, figma.currentPage)
    set.name = 'Tag'
    autolayout(set, { dir: 'HORIZONTAL', gap: 16, padX: 24, padY: 24, align: 'CENTER' })
    set.fills = solid('#FFFFFF')
    set.cornerRadius = 8
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
    const variants = sizes.map(([name, spec]) => {
        const comp = figma.createComponent()
        comp.name = `Size=${name}`
        autolayout(comp, { dir: 'VERTICAL' })
        comp.appendChild(
            makeText('Section heading', { weight: spec.weight, size: spec.size, line: spec.line, color: C.navy })
        )
        return comp
    })
    const set = figma.combineAsVariants(variants, figma.currentPage)
    set.name = 'Heading'
    autolayout(set, { dir: 'VERTICAL', gap: 24, padX: 24, padY: 24 })
    set.fills = solid('#FFFFFF')
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
    const b = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', padX: 24, padY: 12, fill: C.white })
    b.cornerRadius = 4
    b.appendChild(makeText(label, { weight: 'semibold', size: 16, line: 20, color: C.navy }))
    return b
}

// A fixed bar used by template/page diagrams.
function bar(w, h, fill, label, labelColor) {
    const f = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: fill })
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
    c.cornerRadius = 8
    c.appendChild(makeText('Find the right aged care', { weight: 'bold', size: 32, line: 40, color: C.white }))
    c.appendChild(makeParagraph('Compassionate support, close to home — explore Bupa aged care options.', 396, { size: 16, line: 20, color: '#EAF6FF' }))
    c.appendChild(inverseButton('Get started'))
    return c
}

function buildCta() {
    const c = comp('CtaBlock', { dir: 'HORIZONTAL' })
    c.appendChild(miniButton('Book a tour  ›', 'Primary', 'Standard'))
    return c
}

function buildAlert() {
    const c = comp('AlertBlock', { dir: 'HORIZONTAL', gap: 12, padX: 16, padY: 12, align: 'CENTER', primary: 'FIXED', fill: '#F0F9FF' })
    c.resize(460, c.height)
    c.cornerRadius = 4
    c.strokes = solid(C.cyan)
    c.strokeWeight = 1
    c.appendChild(makeText('ⓘ', { size: 16, line: 20, color: C.cyan }))
    c.appendChild(makeParagraph('Our offices are closed on the public holiday. Bookings resume Monday.', 350, { size: 14, line: 18, color: C.grey }))
    c.appendChild(makeText('✕', { size: 14, line: 18, color: C.disabledText }))
    return c
}

function accRow(question, body, open) {
    const r = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 8, padX: 16, padY: 14, counter: 'FIXED' })
    r.resize(360, r.height)
    r.fills = []
    const head = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', justify: 'SPACE_BETWEEN', align: 'CENTER', primary: 'FIXED' })
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
    col.appendChild(makeText('Card heading', { weight: 'semibold', size: 20, line: 24, color: C.navy }))
    col.appendChild(makeParagraph('Short supporting copy that introduces the card content.', 248, { size: 14, line: 18, color: C.grey }))
    col.appendChild(makeText('Learn more  ›', { weight: 'semibold', size: 14, line: 18, color: C.cyan }))
    c.appendChild(col)
    return c
}

function buildColouredCard() {
    const c = cardShell('ColouredCardBlock', 280, { fill: C.purple, gap: 12 })
    c.appendChild(rectNode(40, 40, C.white, 20))
    c.appendChild(makeText('Personalised care', { weight: 'semibold', size: 20, line: 24, color: C.white }))
    c.appendChild(makeParagraph('A short description of the value this card communicates.', 240, { size: 14, line: 18, color: '#F3E9FF' }))
    c.appendChild(makeText('Learn more  ›', { weight: 'semibold', size: 14, line: 18, color: C.white }))
    return c
}

function buildContactCard() {
    const c = cardShell('ContactCardBlock', 300, { shadow: true, gap: 10 })
    c.appendChild(makeText('Bupa Clemton Park', { weight: 'semibold', size: 18, line: 24, color: C.navy }))
    c.appendChild(makeParagraph('1 Bexley Road, Clemton Park NSW 2206', 260, { size: 14, line: 18, color: C.grey }))
    c.appendChild(makeText('1800 555 123', { weight: 'semibold', size: 14, line: 18, color: C.cyan }))
    const row = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', gap: 8 })
    row.fills = []
    row.appendChild(miniButton('Book a tour', 'Primary', 'Small'))
    row.appendChild(miniButton('Enquire', 'Secondary', 'Small'))
    c.appendChild(row)
    return c
}

function buildImageCard() {
    const c = cardShell('ImageCardBlock', 280, { shadow: true, pad: 0, gap: 0, clip: true })
    c.appendChild(imagePh(280, 170, 0))
    const col = innerCol(280, 16, 6)
    col.appendChild(makeText('Living well at Bupa', { weight: 'semibold', size: 18, line: 24, color: C.navy }))
    col.appendChild(makeParagraph('An image-led card that lifts on hover.', 248, { size: 14, line: 18, color: C.grey }))
    c.appendChild(col)
    return c
}

function buildPromotionCard() {
    const c = cardShell('PromotionCardBlock', 280, { stroke: C.cyan, strokeW: 2, gap: 10 })
    c.appendChild(badge('Offer', '#F0F9FF', C.cyan))
    c.appendChild(makeText('Move-in offer', { weight: 'semibold', size: 20, line: 24, color: C.navy }))
    c.appendChild(makeParagraph('A cyan-bordered card to highlight campaigns and offers.', 240, { size: 14, line: 18, color: C.grey }))
    c.appendChild(miniButton('Find out more', 'Primary', 'Small'))
    return c
}

function buildVideoCard() {
    const c = cardShell('VideoCardBlock', 280, { shadow: true, pad: 0, gap: 0, clip: true })
    const media = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: '#22384A' })
    media.resize(280, 160)
    const play = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', justify: 'CENTER', align: 'CENTER', primary: 'FIXED', counter: 'FIXED', fill: C.white })
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
    c.appendChild(makeParagraph('The staff treat mum like family. We finally have peace of mind.', 280, { size: 18, line: 24, color: C.navy }))
    c.appendChild(makeText('— Sarah, daughter of resident', { size: 14, line: 18, color: C.disabledText }))
    return c
}

function buildTagsBlock() {
    const c = comp('TagsBlock', { dir: 'HORIZONTAL', gap: 8, wrap: true, primary: 'FIXED' })
    c.resize(280, c.height)
    c.fills = []
    for (const item of TAG_COLORS) {
        const t = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', pad: 4, align: 'CENTER', fill: item[1] })
        t.cornerRadius = 4
        t.appendChild(makeText(item[0], { size: 12, line: 16, color: item[2] }))
        c.appendChild(t)
    }
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
        c.appendChild(gridCell(Math.round((inner * col) / 12), col + '/12'))
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
    c.strokes = solid(C.border)
    c.strokeWeight = 1
    const logo = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', padX: 10, padY: 6, fill: C.navy })
    logo.cornerRadius = 4
    logo.appendChild(makeText('Bupa', { weight: 'bold', size: 16, line: 20, color: C.white }))
    c.appendChild(logo)
    const nav = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', gap: 16, align: 'CENTER' })
    nav.fills = []
    for (const t of ['Find a home', 'Services', 'About']) nav.appendChild(makeText(t, { size: 14, line: 18, color: C.grey }))
    c.appendChild(nav)
    c.appendChild(miniButton('Book a tour', 'Primary', 'Small'))
    return c
}

function footerCol(title, items) {
    const f = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 6 })
    f.fills = []
    f.appendChild(makeText(title, { weight: 'semibold', size: 14, line: 18, color: C.white }))
    for (const i of items) f.appendChild(makeText(i, { size: 12, line: 16, color: '#AEC2D6' }))
    return f
}

function buildFooter() {
    const c = comp('Footer', { dir: 'VERTICAL', gap: 16, pad: 24, counter: 'FIXED', fill: C.navy })
    c.resize(480, c.height)
    const cols = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', gap: 32 })
    cols.fills = []
    cols.appendChild(footerCol('Care', ['Residential', 'Respite', 'Dementia']))
    cols.appendChild(footerCol('Company', ['About', 'Careers', 'News']))
    cols.appendChild(footerCol('Support', ['Contact', 'FAQs', 'Feedback']))
    c.appendChild(cols)
    c.appendChild(rectNode(432, 1, '#1C4A6E'))
    const legal = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', justify: 'SPACE_BETWEEN', align: 'CENTER', primary: 'FIXED' })
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
    const exit = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', padX: 12, padY: 4, fill: C.navy })
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
    const row = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', gap: 8, primary: 'FIXED' })
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
    const row = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', gap: 8, primary: 'FIXED' })
    row.resize(304, row.height)
    row.fills = []
    row.appendChild(bar(100, 80, C.white, 'Details', C.silver))
    row.appendChild(bar(196, 80, C.white, 'Gallery', C.silver))
    c.appendChild(row)
    c.appendChild(bar(304, 40, C.navy, 'Footer'))
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
    Section: buildSectionAtom,
    ResponsiveImage: buildResponsiveImage,
    SmallSearchInput: buildSmallSearchInput,
    ShowMoreButton: buildShowMore,
    BackToTop: buildBackToTop,
    ErrorMessageWrapper: buildErrorMessage,
    HeroBanner: buildHero,
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

// A name + description label wrapping a rendered component.
function buildBlock(name, desc, node) {
    const w = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 8 })
    w.name = name
    w.fills = []
    w.appendChild(makeText(name, { weight: 'semibold', size: 16, line: 20, color: C.navy }))
    w.appendChild(makeParagraph(desc, 300, { size: 12, line: 16, color: C.disabledText }))
    w.appendChild(node)
    return w
}

function buildLayerSection(layer) {
    const section = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 20 })
    section.name = 'Layer · ' + layer.title
    section.appendChild(makeText(layer.title, { weight: 'bold', size: 28, line: 36, color: C.navy }))
    section.appendChild(makeParagraph(layer.description, 760, { size: 14, line: 20, color: C.grey }))

    const grid = autolayout(figma.createFrame(), { dir: 'HORIZONTAL', gap: 32, wrap: true, primary: 'FIXED' })
    grid.name = layer.title + ' grid'
    grid.resize(1480, grid.height)
    grid.counterAxisSizingMode = 'AUTO'
    grid.fills = []

    for (const entry of layer.components) {
        let node
        try {
            const builder = VISUAL[entry.name]
            node = builder ? builder() : buildPlaceholder(entry.name, entry.desc, entry.badge)
        } catch (err) {
            node = buildPlaceholder(entry.name, entry.desc + '  (preview unavailable)', 'Component')
        }
        node.name = entry.name
        grid.appendChild(buildBlock(entry.name, entry.desc, node))
    }
    section.appendChild(grid)
    return section
}

function buildComponentsSection() {
    const section = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 48 })
    section.name = 'Components'

    const head = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 8 })
    head.fills = []
    head.appendChild(makeText('Components', { weight: 'bold', size: 32, line: 40, color: C.navy }))
    head.appendChild(
        makeParagraph(
            'The full library, grouped by atomic-design layer. Components with a clear visual form are rendered as reusable Figma components; integration-only and infrastructure parts are catalogued as labelled placeholders so coverage stays complete and honest.',
            900,
            { size: 14, line: 20, color: C.grey }
        )
    )
    section.appendChild(head)

    for (const layer of CATALOG) section.appendChild(buildLayerSection(layer))
    return section
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

async function main() {
    const family = await loadFonts()
    if (family !== 'Montserrat') {
        figma.notify(`Montserrat not installed — used ${family}. Install Montserrat for brand-accurate type.`)
    }

    // Remove any library this plugin built previously, so re-runs stay clean.
    const ROOT = 'Bupa Component Library'
    for (const node of figma.currentPage.children) {
        if (node.name === ROOT) node.remove()
    }

    // Foundations (styles must exist before the visible specimens link to them).
    buildColorStyles()
    buildTextStyles()

    const root = autolayout(figma.createFrame(), {
        dir: 'VERTICAL', gap: 64, pad: 64, fill: C.surface,
    })
    root.name = ROOT

    const header = autolayout(figma.createFrame(), { dir: 'VERTICAL', gap: 8 })
    header.name = 'Header'
    header.appendChild(makeText('Bupa Component Library', { weight: 'bold', size: 48, line: 60, color: C.navy }))
    header.appendChild(
        makeText('Foundations and core components, generated from the Bupa Aged Care design tokens.', {
            size: 16, line: 20, color: C.grey,
        })
    )
    root.appendChild(header)

    root.appendChild(await buildColorSection())
    root.appendChild(await buildTypographySection())
    root.appendChild(await buildComponentsSection())

    figma.currentPage.appendChild(root)
    figma.viewport.scrollAndZoomIntoView([root])
    figma.notify('Bupa component library built ✓')
    figma.closePlugin('Bupa component library built ✓')
}

main().catch(err => {
    figma.notify('Build failed: ' + err.message, { error: true })
    figma.closePlugin('Build failed: ' + err.message)
})
