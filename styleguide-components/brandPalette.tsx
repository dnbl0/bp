/*
    The Bupa brand colour system, transcribed verbatim from the Bupa Brand
    Guidelines 2023 (v1), pages 13–17 and 37.

    These values are the *brand book* source of truth and are intentionally
    self-contained here rather than read from `tailwind.config.js`: the brand
    guidelines document a few values that differ from the current production
    theme (notably Bupa Navy #0d1846 vs the theme's #00335B, and Bupa Warm Grey
    #f1efeb vs #f0efeb). The Foundations → Color page documents the live theme
    tokens; this module documents the published brand palette. Where the two
    diverge, the brand pages call it out explicitly.
*/
import { ReactNode } from 'react'

export interface BrandColor {
    /** Brand name, e.g. "Bupa Blue". */
    name: string
    hex: string
    /** Optional RGB string, e.g. "R0 G121 B200". */
    rgb?: string
    /** Optional CMYK string, e.g. "C90 M44 Y0 K0". */
    cmyk?: string
    /** Optional Pantone reference, e.g. "PMS 2174C". */
    pms?: string
    /** Optional RAL reference, e.g. "RAL 5015". */
    ral?: string
    /** Optional note shown under the value (e.g. "Core", "Row 5"). */
    note?: string
}

export interface ColorFamily {
    name: string
    /** Step rows from lightest tint (1) to darkest shade (9). */
    rows: { step: string; hex: string; isCore?: boolean }[]
}

/** Choose readable label colour for text sitting on a swatch. */
export const isLightHex = (hex: string): boolean => {
    const value = hex.replace('#', '')
    if (value.length !== 6) return true
    const r = parseInt(value.slice(0, 2), 16)
    const g = parseInt(value.slice(2, 4), 16)
    const b = parseInt(value.slice(4, 6), 16)
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
}

/* ---- Primary palette (p.13) --------------------------------------------- */

export const primaryPalette: BrandColor[] = [
    {
        name: 'Bupa Blue',
        hex: '#0079c8',
        rgb: 'R0 G121 B200',
        cmyk: 'C90 M44 Y0 K0',
        pms: 'PMS 2174C',
        ral: 'RAL 5015',
    },
    {
        name: 'Bupa Navy',
        hex: '#0d1846',
        rgb: 'R13 G24 B70',
        cmyk: 'C100 M83 Y0 K47',
        pms: 'PMS 2758C',
        ral: 'RAL 5022',
    },
    {
        name: 'Bupa Warm Grey',
        hex: '#f1efeb',
        rgb: 'R241 G239 B235',
        cmyk: 'C3 M3 Y6 K5',
        pms: 'PMS Warm Grey 1C',
        ral: 'RAL 9003',
    },
]

/* ---- Secondary palette: six families, rows 1–9 (p.14) ------------------- */

export const secondaryFamilies: ColorFamily[] = [
    {
        name: 'Blue',
        rows: [
            { step: 'B9', hex: '#0d1846' },
            { step: 'B8', hex: '#0f2460' },
            { step: 'B7', hex: '#00398a' },
            { step: 'B6', hex: '#0652ae' },
            { step: 'B5', hex: '#0079c8', isCore: true },
            { step: 'B4', hex: '#51a0dc' },
            { step: 'B3', hex: '#8dc0e8' },
            { step: 'B2', hex: '#b3d6ef' },
            { step: 'B1', hex: '#ddedf8' },
        ],
    },
    {
        name: 'Fuchsia',
        rows: [
            { step: 'F9', hex: '#2c0c1a' },
            { step: 'F8', hex: '#510224' },
            { step: 'F7', hex: '#740937' },
            { step: 'F6', hex: '#9f1853' },
            { step: 'F5', hex: '#d02670', isCore: true },
            { step: 'F4', hex: '#f26cac' },
            { step: 'F3', hex: '#faa6c9' },
            { step: 'F2', hex: '#fbd3e8' },
            { step: 'F1', hex: '#fcecf4' },
        ],
    },
    {
        name: 'Orange',
        rows: [
            { step: 'O9', hex: '#380400' },
            { step: 'O8', hex: '#570d00' },
            { step: 'O7', hex: '#781800' },
            { step: 'O6', hex: '#b72900' },
            { step: 'O5', hex: '#db3907', isCore: true },
            { step: 'O4', hex: '#ec8938' },
            { step: 'O3', hex: '#f1ad71' },
            { step: 'O2', hex: '#f8d09e' },
            { step: 'O1', hex: '#fbeacf' },
        ],
    },
    {
        name: 'Green',
        rows: [
            { step: 'G9', hex: '#071908' },
            { step: 'G8', hex: '#022d0d' },
            { step: 'G7', hex: '#044317' },
            { step: 'G6', hex: '#0e6027' },
            { step: 'G5', hex: '#1b883c', isCore: true },
            { step: 'G4', hex: '#48c06a' },
            { step: 'G3', hex: '#6fdc8c' },
            { step: 'G2', hex: '#a7f0ba' },
            { step: 'G1', hex: '#defbe6' },
        ],
    },
    {
        name: 'Teal',
        rows: [
            { step: 'T9', hex: '#081a1c' },
            { step: 'T8', hex: '#022b30' },
            { step: 'T7', hex: '#004144' },
            { step: 'T6', hex: '#005d5d' },
            { step: 'T5', hex: '#007d79', isCore: true },
            { step: 'T4', hex: '#05b8b5' },
            { step: 'T3', hex: '#56dbdb' },
            { step: 'T2', hex: '#9ef0f0' },
            { step: 'T1', hex: '#d2fbfb' },
        ],
    },
    {
        name: 'Purple',
        rows: [
            { step: 'P9', hex: '#1c0f30' },
            { step: 'P8', hex: '#31135e' },
            { step: 'P7', hex: '#491d8b' },
            { step: 'P6', hex: '#6929c4' },
            { step: 'P5', hex: '#8a3ff5', isCore: true },
            { step: 'P4', hex: '#b88af6' },
            { step: 'P3', hex: '#d3b9ff' },
            { step: 'P2', hex: '#e8daff' },
            { step: 'P1', hex: '#f4f0fe' },
        ],
    },
]

/* ---- Neutral palette (p.16) --------------------------------------------- */

export const neutralPalette: BrandColor[] = [
    { name: 'Bupa Black', hex: '#000000', rgb: 'R0 G0 B0', note: 'Text in print' },
    { name: 'White', hex: '#ffffff', rgb: 'R255 G255 B255' },
    { name: 'Bupa Ink', hex: '#111c24', rgb: 'R17 G28 B36', note: 'Dark-mode warm grey' },
    { name: 'Bupa Text Grey', hex: '#21272a', rgb: 'R33 G39 B42', note: 'Text in digital' },
    { name: 'Bupa Grey 5', hex: '#929ba2', rgb: 'R146 G155 B162' },
    { name: 'Bupa Grey 4', hex: '#bdc3c9', rgb: 'R189 G195 B201' },
    { name: 'Bupa Grey 3', hex: '#dde1e6', rgb: 'R221 G225 B230' },
    { name: 'Bupa Grey 2', hex: '#ebeef2', rgb: 'R235 G238 B242' },
    { name: 'Bupa Grey 1', hex: '#f3f5f8', rgb: 'R243 G245 B248' },
    { name: 'Bupa Warm Background 2', hex: '#e5e2d8', rgb: 'R229 G226 B216' },
    { name: 'Bupa Warm Background 1', hex: '#f7f5f2', rgb: 'R247 G245 B242' },
]

/* ---- Alert palette (p.16) ----------------------------------------------- */

export const alertPalette: BrandColor[] = [
    { name: 'AL Red', hex: '#d60023', rgb: 'R214 G0 B35' },
    { name: 'AL Orange', hex: '#c85204', rgb: 'R200 G82 B4' },
    { name: 'AL Green', hex: '#017221', rgb: 'R1 G114 B33' },
    { name: 'AL Yellow', hex: '#f1c22d', rgb: 'R241 G194 B45' },
    { name: 'AL Indigo', hex: '#3552b5', rgb: 'R53 G82 B181' },
]

/* ---- Skin-tone palette — illustration only (p.37) ----------------------- */

export const skinTones: BrandColor[] = [
    { name: 'Bupa Skin Tone 5', hex: '#5c2f0f', rgb: 'R92 G47 B15' },
    { name: 'Bupa Skin Tone 4', hex: '#885631', rgb: 'R136 G86 B49' },
    { name: 'Bupa Skin Tone 3', hex: '#b9956e', rgb: 'R185 G149 B110' },
    { name: 'Bupa Skin Tone 2', hex: '#debf9f', rgb: 'R222 G191 B159' },
    { name: 'Bupa Skin Tone 1', hex: '#f7dec2', rgb: 'R247 G222 B191' },
]

/* ---- Presentational components ------------------------------------------ */

/** A single brand colour tile with its name, hex and optional print refs. */
export const BrandSwatch = ({ color }: { color: BrandColor }) => (
    <div className="rounded-lg overflow-hidden border border-cool-paper-200 dark:border-charcoal">
        <div
            className="h-24 flex items-end p-3"
            style={{ backgroundColor: color.hex }}
        >
            {color.note && (
                <span
                    className={
                        isLightHex(color.hex)
                            ? 'text-grey font-mono text-caption'
                            : 'text-white/90 font-mono text-caption'
                    }
                >
                    {color.note}
                </span>
            )}
        </div>
        <div className="p-3 bg-white dark:bg-cool-grey">
            <div className="font-semibold text-navy dark:text-white text-body-small">
                {color.name}
            </div>
            <div className="font-mono uppercase text-caption text-grey dark:text-light-grey">
                {color.hex}
            </div>
            {color.rgb && (
                <div className="mt-1 text-caption text-disabled-text">{color.rgb}</div>
            )}
            {(color.pms || color.cmyk) && (
                <div className="text-caption text-disabled-text">
                    {[color.cmyk, color.pms, color.ral].filter(Boolean).join(' · ')}
                </div>
            )}
        </div>
    </div>
)

/** A responsive grid of brand colour tiles. */
export const BrandSwatchGrid = ({ colors }: { colors: BrandColor[] }) => (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {colors.map(color => (
            <BrandSwatch key={color.name} color={color} />
        ))}
    </div>
)

/**
 * The full secondary palette as a families × steps matrix, mirroring the grid
 * on p.14 of the brand book. Core rows are flagged with a ring.
 */
export const SecondaryPaletteGrid = () => (
    <div className="overflow-x-auto">
        <div className="min-w-[640px] grid grid-cols-6 gap-2">
            {secondaryFamilies.map(family => (
                <div key={family.name} className="space-y-2">
                    <p className="text-caption font-bold uppercase tracking-wide text-disabled-text text-center">
                        {family.name}
                    </p>
                    {family.rows.map(row => (
                        <div
                            key={row.step}
                            title={`${family.name} ${row.step} · ${row.hex}`}
                            className={
                                'h-12 rounded-md flex items-center justify-between px-2 border border-cool-paper-200 dark:border-charcoal' +
                                (row.isCore ? ' ring-2 ring-offset-2 ring-cyan dark:ring-offset-grey' : '')
                            }
                            style={{ backgroundColor: row.hex }}
                        >
                            <span
                                className={
                                    (isLightHex(row.hex) ? 'text-grey' : 'text-white/90') +
                                    ' font-mono text-caption'
                                }
                            >
                                {row.step}
                            </span>
                            <span
                                className={
                                    (isLightHex(row.hex) ? 'text-grey/70' : 'text-white/70') +
                                    ' font-mono text-caption uppercase hidden sm:inline'
                                }
                            >
                                {row.hex}
                            </span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
)

/**
 * The Bupa Blue square — the brand's defining distinctive asset. Sized by the
 * caller via className (defaults to a medium tile).
 */
export const BlueSquare = ({
    className = 'w-24 h-24',
    children,
}: {
    className?: string
    children?: ReactNode
}) => (
    <div
        className={`bg-cyan text-white flex items-center justify-center ${className}`}
    >
        {children}
    </div>
)
