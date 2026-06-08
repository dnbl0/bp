/*
    Token resolver: maps a Tailwind utility/token name (as authored in the
    *.specs.ts files) to its canonical resolved value, read live from the design
    tokens in `tokens.ts` (which themselves derive from tailwind.config.js).

    This is the single source of truth that stops authored spec values from
    drifting away from the real theme. The Specifications primitive prefers a
    resolved value when one is found, and falls back to the hand-authored value
    for semantic/invented tokens that have no literal entry (e.g. state colours
    like `bg-cyan-hover`).
*/

import {
    spacingScale,
    radiusScale,
    typeScale,
    legacyTypeScale,
    elevation,
} from './tokens'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import tailwindConfig from '../tailwind.config.js'

const theme = (tailwindConfig as any).theme as Record<string, any>

export interface ResolvedToken {
    /** The canonical value, e.g. `24px`, `#00335B`, `16px / 24px`. */
    value: string
    /** True when the token resolved against the live theme (authoritative). */
    resolved: boolean
}

/** Strip the trailing ` (24px)` annotation the scales add, keeping the px. */
const pxOnly = (scaleValue: string): string => {
    const px = scaleValue.match(/\((\d+(?:\.\d+)?px)\)/)
    if (px) return px[1]
    // Fall back to a raw px value or the rem/string as-is.
    return scaleValue.replace(/\s*\(.*\)\s*/, '')
}

/** Spacing utilities: p/px/py/pt/pr/pb/pl, m/mx/.., gap, w, h, size, space. */
const SPACING_PREFIXES = [
    'gap-x-', 'gap-y-', 'gap-',
    'space-x-', 'space-y-',
    'px-', 'py-', 'pt-', 'pr-', 'pb-', 'pl-', 'p-',
    'mx-', 'my-', 'mt-', 'mr-', 'mb-', 'ml-', 'm-',
    'w-', 'h-', 'min-w-', 'min-h-', 'max-w-', 'max-h-', 'size-',
]

const resolveSpacing = (token: string): string | null => {
    const prefix = SPACING_PREFIXES.find(p => token.startsWith(p))
    if (!prefix) return null
    const key = token.slice(prefix.length)
    if (key === 'px') return '1px'
    if (key === 'full') return '100%'
    const step = spacingScale.find(s => s.token === key)
    return step ? pxOnly(step.value) : null
}

const resolveRadius = (token: string): string | null => {
    if (!token.startsWith('rounded')) return null
    const step = radiusScale.find(s => s.token === token)
    if (step) return pxOnly(step.value)
    if (token === 'rounded-full') return '9999px'
    return null
}

const resolveFontSize = (token: string): string | null => {
    if (!token.startsWith('text-')) return null
    const key = token.slice('text-'.length)
    const step =
        typeScale.find(s => s.token === key) ??
        legacyTypeScale.find(s => s.token === key)
    if (!step || !step.sizes.base) return null
    const size = step.sizes.base
    const lh = step.lineHeights.base
    return lh ? `${size} / ${lh}` : size
}

const resolveShadow = (token: string): string | null => {
    if (!token.startsWith('shadow')) return null
    const step = elevation.find(s => s.token === token)
    return step ? step.value : null
}

/**
 * Resolve a colour utility (`bg-`, `text-`, `border-`) to its hex value.
 * Colour keys may themselves contain hyphens (`cool-paper-100`, `error-red`),
 * so the whole remainder is tried first, then progressively shorter bases with
 * the trailing segment treated as a shade.
 */
const resolveColorHex = (token: string): string | null => {
    const prefix = ['bg-', 'text-', 'border-', 'fill-', 'stroke-'].find(p =>
        token.startsWith(p)
    )
    if (!prefix) return null
    const name = token.slice(prefix.length)
    const colors = theme.colors as Record<string, any>
    if (!colors) return null

    const read = (value: any): string | null => {
        if (value == null) return null
        if (typeof value === 'string') return value
        if (typeof value === 'object' && typeof value.DEFAULT === 'string')
            return value.DEFAULT
        return null
    }

    // Whole name as a key (handles `cyan`, `error-red`, `cool-paper-100`).
    const direct = read(colors[name])
    if (direct) return direct

    // Split a trailing shade: `cyan-50` -> base `cyan`, shade `50`.
    const lastDash = name.lastIndexOf('-')
    if (lastDash > 0) {
        const base = name.slice(0, lastDash)
        const shade = name.slice(lastDash + 1)
        const group = colors[base]
        if (group && typeof group === 'object' && group[shade] != null)
            return String(group[shade])
    }
    return null
}

/**
 * Resolve a single token to its canonical value. Returns `resolved: false`
 * (with an empty value) when the token has no literal entry in the theme.
 */
export const resolveToken = (token: string | undefined): ResolvedToken => {
    if (!token) return { value: '', resolved: false }

    const value =
        resolveSpacing(token) ??
        resolveRadius(token) ??
        resolveFontSize(token) ??
        resolveShadow(token) ??
        resolveColorHex(token)

    return value != null ? { value, resolved: true } : { value: '', resolved: false }
}

/** Resolve just a colour token to a hex string, for swatch chips. */
export const resolveColor = (token: string | undefined): string | null =>
    token ? resolveColorHex(token) : null
