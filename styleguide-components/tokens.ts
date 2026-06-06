/*
    Live design-token introspection for the design system documentation.

    Values are read directly from `tailwind.config.js` (the production source
    of truth) so the documentation can never drift from the real theme. Only
    the *grouping* of colours into palettes is curated here, because the
    Tailwind config flattens away the palette comments. The hex values, type
    scale references, elevation, layering and motion tokens are all live.
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
import tailwindConfig from '../tailwind.config.js'

// The Tailwind config is plain JS, so it is typed loosely here.
const theme = (tailwindConfig as any).theme as Record<string, any>

export interface ColorToken {
    /** Human readable name, matches Bupa's terminology. */
    name: string
    /** Hex (or other) colour value. */
    hex: string
    /** Tailwind colour identifier, e.g. `cyan-400`. */
    token: string
}

export interface ColorGroup {
    name: string
    description: string
    colors: ColorToken[]
}

/**
 * Resolve a top-level colour key from the Tailwind config into one or more
 * tokens. Handles both flat values (`navy: '#00335B'`) and shaded objects
 * (`cyan: { DEFAULT, 400, 50 }`).
 */
const resolveColor = (key: string): ColorToken[] => {
    const value = theme.colors?.[key]
    if (value == null) return []

    if (typeof value === 'string') {
        return [{ name: titleCase(key), hex: value, token: key }]
    }

    return Object.entries(value).map(([shade, hex]) => ({
        name: shade === 'DEFAULT' ? titleCase(key) : `${titleCase(key)} ${shade}`,
        hex: String(hex),
        token: shade === 'DEFAULT' ? key : `${key}-${shade}`,
    }))
}

const group = (
    name: string,
    description: string,
    keys: string[]
): ColorGroup => ({
    name,
    description,
    colors: keys.flatMap(resolveColor),
})

/** Colour palettes, grouped to mirror the comments in `tailwind.config.js`. */
export const colorGroups: ColorGroup[] = [
    group(
        'Primary',
        'Core brand colours. Cyan and navy carry the Bupa identity across the experience.',
        ['cyan', 'navy', 'warm-grey', 'white', 'grey', 'cool-grey', 'light-grey', 'lighter-grey', 'black']
    ),
    group(
        'Secondary',
        'Expressive accents used sparingly for categorisation, illustration and emphasis.',
        ['purple', 'violet', 'fuchsia', 'burgandy', 'orange', 'teal', 'dark-green', 'green', 'lime']
    ),
    group(
        'UI',
        'Functional colours that communicate state: errors, warnings, success, focus and disabled.',
        ['error-red', 'warning-yellow', 'success-green', 'focus-blue', 'disabled', 'disabled-text', 'alert', 'charcoal', 'silver']
    ),
    group(
        'Background',
        'Tinted surface colours for sections and cards. "Cool" leans blue, "warm" leans beige.',
        ['cool-paper-50', 'cool-paper-100', 'cool-paper-200', 'warm-paper-100', 'warm-paper-200']
    ),
    group(
        'Build / debug (BDS)',
        'Developer-only helpers for visualising padding and margin while building. Not for product UI.',
        ['bds-padding', 'bds-margin']
    ),
]

export interface TypeStep {
    /** Semantic name, e.g. `heading-xl`. */
    token: string
    /** The CSS custom property the token resolves to. */
    cssVar: string
    /** Font size in px at each breakpoint, sourced from typography.css. */
    sizes: { base: string; md: string; lg: string }
    /** Line height in px at each breakpoint. */
    lineHeights: { base: string; md: string; lg: string }
    /** Whether this is a current semantic name or a legacy alias. */
    legacy?: boolean
}

/*
    The responsive type scale lives as CSS custom properties in
    styles/base/typography.css (it cannot be read at build time from JS, so the
    resolved px values are mirrored here). The mapping of semantic token -> CSS
    var is taken live from the Tailwind `fontSize` config.
*/
const fontSizeConfig = theme.fontSize as Record<string, [string, { lineHeight: string }]>

const cssVarOf = (token: string): string => {
    const entry = fontSizeConfig?.[token]
    const match = entry?.[0]?.match(/var\((--[^)]+)\)/)
    return match?.[1] ?? ''
}

// Resolved px values from typography.css, keyed by the size CSS var.
const sizePx: Record<string, { base: string; md: string; lg: string }> = {
    '--font-size-5xl': { base: '48px', md: '48px', lg: '48px' },
    '--font-size-4xl': { base: '32px', md: '40px', lg: '56px' },
    '--font-size-3xl': { base: '28px', md: '36px', lg: '48px' },
    '--font-size-2xl': { base: '24px', md: '28px', lg: '32px' },
    '--font-size-xl': { base: '20px', md: '24px', lg: '24px' },
    '--font-size-lg': { base: '18px', md: '20px', lg: '20px' },
    '--font-size-base': { base: '16px', md: '16px', lg: '16px' },
    '--font-size-sm': { base: '14px', md: '14px', lg: '14px' },
    '--font-size-xs': { base: '12px', md: '12px', lg: '12px' },
}

const lineHeightPx: Record<string, { base: string; md: string; lg: string }> = {
    '--font-size-5xl': { base: '60px', md: '60px', lg: '60px' },
    '--font-size-4xl': { base: '40px', md: '48px', lg: '68px' },
    '--font-size-3xl': { base: '36px', md: '44px', lg: '60px' },
    '--font-size-2xl': { base: '32px', md: '36px', lg: '40px' },
    '--font-size-xl': { base: '24px', md: '32px', lg: '32px' },
    '--font-size-lg': { base: '24px', md: '24px', lg: '24px' },
    '--font-size-base': { base: '20px', md: '20px', lg: '20px' },
    '--font-size-sm': { base: '18px', md: '18px', lg: '18px' },
    '--font-size-xs': { base: '16px', md: '16px', lg: '16px' },
}

const typeStep = (token: string, legacy = false): TypeStep => {
    const cssVar = cssVarOf(token)
    return {
        token,
        cssVar,
        sizes: sizePx[cssVar] ?? { base: '', md: '', lg: '' },
        lineHeights: lineHeightPx[cssVar] ?? { base: '', md: '', lg: '' },
        legacy,
    }
}

/** Semantic type scale (preferred) plus legacy numeric aliases. */
export const typeScale: TypeStep[] = [
    typeStep('heading-xl'),
    typeStep('heading-l'),
    typeStep('heading-m'),
    typeStep('heading-s'),
    typeStep('heading'),
    typeStep('body'),
    typeStep('body-small'),
    typeStep('caption'),
]

export const legacyTypeScale: TypeStep[] = [
    typeStep('5xl', true),
    typeStep('4xl', true),
    typeStep('3xl', true),
    typeStep('2xl', true),
    typeStep('xl', true),
    typeStep('lg', true),
    typeStep('base', true),
    typeStep('sm', true),
    typeStep('xs', true),
]

export interface ShadowToken {
    token: string
    value: string
    description: string
}

const shadowDescriptions: Record<string, string> = {
    DEFAULT: 'Subtle resting shadow used on cards and raised surfaces.',
    'depth-default': 'Hairline outline for elevated elements at rest.',
    'depth-hover': 'Lifted shadow shown when an interactive surface is hovered.',
}

export const elevation: ShadowToken[] = Object.entries(
    (theme.boxShadow ?? {}) as Record<string, string>
).map(([token, value]) => ({
    token: token === 'DEFAULT' ? 'shadow' : `shadow-${token}`,
    value: String(value).replace(/;$/, ''),
    description: shadowDescriptions[token] ?? 'Elevation token.',
}))

export interface LayerToken {
    token: string
    value: string
}

export const layering: LayerToken[] = Object.entries(
    (theme.zIndex ?? {}) as Record<string, string>
)
    .map(([token, value]) => ({ token: `z-${token}`, value: String(value) }))
    .sort((a, b) => Number(a.value) - Number(b.value))

export interface MotionToken {
    token: string
    value: string
}

export const motion: MotionToken[] = Object.entries(
    (theme.extend?.animation ?? {}) as Record<string, string>
).map(([token, value]) => ({ token: `animate-${token}`, value: String(value) }))

export const animationDelays: MotionToken[] = Object.entries(
    (theme.animationDelay ?? {}) as Record<string, string>
).map(([token, value]) => ({ token: `animation-delay-${token}`, value: String(value) }))

function titleCase(value: string): string {
    return value
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}
