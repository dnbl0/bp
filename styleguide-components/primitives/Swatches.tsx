import { ColorGroup, ColorToken } from '../tokens'

/** Choose readable text colour for a swatch label sitting on the colour. */
const isLight = (hex: string): boolean => {
    const value = hex.replace('#', '')
    if (value.length !== 6) return true
    const r = parseInt(value.slice(0, 2), 16)
    const g = parseInt(value.slice(2, 4), 16)
    const b = parseInt(value.slice(4, 6), 16)
    // Perceived luminance.
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
}

const Swatch = ({ color }: { color: ColorToken }) => (
    <div className="rounded-lg overflow-hidden border border-cool-paper-200 dark:border-charcoal">
        <div
            className="h-24 flex items-end p-3"
            style={{ backgroundColor: color.hex }}
        >
            <span
                className={
                    isLight(color.hex)
                        ? 'text-grey font-mono text-caption'
                        : 'text-white font-mono text-caption'
                }
            >
                {color.token}
            </span>
        </div>
        <div className="p-3 bg-white dark:bg-cool-grey">
            <div className="font-semibold text-navy dark:text-white text-body-small">
                {color.name}
            </div>
            <div className="font-mono uppercase text-caption text-grey dark:text-light-grey">
                {color.hex}
            </div>
        </div>
    </div>
)

/** Render a labelled grid of colour swatches for a single palette group. */
export const SwatchGrid = ({ group }: { group: ColorGroup }) => (
    <section className="my-8">
        <h3 className="text-heading-s font-semibold text-navy dark:text-white">
            {group.name}
        </h3>
        <p className="mt-1 mb-4 max-w-2xl text-grey dark:text-light-grey">
            {group.description}
        </p>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {group.colors.map(color => (
                <Swatch key={color.token} color={color} />
            ))}
        </div>
    </section>
)
