import Link from 'next/link'
import { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { ChevronRightIcon } from '../../components/atoms/icons/ChevronRightIcon'
import { ImagePlaceholderIcon } from '../../components/atoms/icons/ImagePlaceholderIcon'

/**
 * The canonical content card for the documentation UI. It is the single source
 * of truth for every navigation / info / feature tile in the docs chrome — the
 * scattered ad-hoc card markup (and the older `InfoCard`) all resolve to this.
 *
 * Two shapes from one API, switched by whether `image` is supplied:
 *
 * - **Tile** (no `image`) — a white card with an optional icon tile, title,
 *   description and CTA. This is the workhorse used in overview grids.
 * - **Media card** (`image` set) — the Figma "card": a media region paired with
 *   a tinted header panel. `direction` and `headerPlacement` arrange the two
 *   regions on either axis.
 *
 * When `href` is set the whole card becomes a single clickable target (a
 * stretched link) and lifts on hover; the CTA row is the visible affordance.
 * Without `href` the card is static (e.g. a guideline or callout).
 *
 * Surface tokens are fixed here so every card matches: `rounded-xl`,
 * `border-cool-paper-200`, `bg-white` (tinted header on `cool-paper-50`).
 */
export interface CardProps {
    title: ReactNode
    description?: ReactNode
    /** Optional icon shown in a bordered tile above the title. */
    icon?: ReactNode
    /** Call-to-action label. Defaults to "Learn more" when `href` is set. */
    cta?: string
    /** Destination. Makes the whole card a clickable, hover-lifting link. */
    href?: string
    /** Open `href` in a new tab. */
    external?: boolean
    /**
     * Media for the image region. When set, the card renders the Figma media
     * layout with a tinted header panel. Pass an `<img>`/illustration node, or
     * `true` for the neutral placeholder.
     */
    image?: ReactNode | true
    /** Aspect ratio of the media region in vertical layouts. */
    aspect?: '16:9' | '4:3' | '1:1' | 'auto'
    direction?: 'vertical' | 'horizontal'
    /** Header panel position relative to the media: `start` (top/left) or `end` (bottom/right). */
    headerPlacement?: 'start' | 'end'
    className?: string
}

const aspectClass: Record<NonNullable<CardProps['aspect']>, string> = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    auto: '',
}

const Media = ({
    image,
    className,
}: {
    image: ReactNode | true
    className?: string
}) => (
    <div
        className={cx(
            'relative overflow-hidden bg-cool-paper-100 dark:bg-charcoal',
            className
        )}
    >
        {image === true ? (
            <div className="absolute inset-0 flex items-center justify-center">
                <ImagePlaceholderIcon className="w-12 h-12 fill-silver" />
            </div>
        ) : (
            image
        )}
    </div>
)

const Cta = ({ label }: { label: string }) => (
    <span className="inline-flex items-center gap-1 text-body-small font-semibold text-cyan">
        {label}
        <ChevronRightIcon className="w-4 h-4" />
    </span>
)

export const Card = ({
    title,
    description,
    icon,
    cta,
    href,
    external,
    image,
    aspect = '16:9',
    direction = 'vertical',
    headerPlacement = 'start',
    className,
}: CardProps) => {
    const hasMedia = image != null && image !== false
    const horizontal = hasMedia && direction === 'horizontal'
    const ctaLabel = href ? cta ?? 'Learn more' : cta

    // The icon tile reads against white on a plain tile, and against the tinted
    // header panel when paired with media — keep it legible in both.
    const iconTile = icon && (
        <div
            className={cx(
                'flex items-center justify-center w-10 h-10 rounded-lg border text-grey dark:text-light-grey shrink-0',
                hasMedia
                    ? 'bg-white dark:bg-cool-grey border-lighter-grey dark:border-charcoal'
                    : 'bg-cool-paper-50 dark:bg-charcoal border-cool-paper-200 dark:border-charcoal'
            )}
        >
            {icon}
        </div>
    )

    const ctaRow = ctaLabel &&
        (href ? (
            external ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="no-underline after:absolute after:inset-0"
                >
                    <Cta label={ctaLabel} />
                </a>
            ) : (
                <Link href={href}>
                    <a className="no-underline after:absolute after:inset-0">
                        <Cta label={ctaLabel} />
                    </a>
                </Link>
            )
        ) : (
            <span>
                <Cta label={ctaLabel} />
            </span>
        ))

    const header = (
        <div
            className={cx(
                'flex flex-col gap-6 p-6',
                hasMedia && 'bg-cool-paper-50 dark:bg-cool-grey',
                horizontal ? 'flex-1 self-stretch justify-center' : 'w-full',
                !hasMedia && 'flex-1'
            )}
        >
            {iconTile}
            <div className="flex flex-col gap-2">
                <h3
                    className="font-semibold text-navy dark:text-white"
                    style={{ fontSize: 18 }}
                >
                    {title}
                </h3>
                {description && (
                    <p
                        className="text-grey dark:text-light-grey"
                        style={{ fontSize: 14, lineHeight: 1.5 }}
                    >
                        {description}
                    </p>
                )}
            </div>
            {ctaRow && <div className="mt-auto pt-2">{ctaRow}</div>}
        </div>
    )

    const media = hasMedia && (
        <Media
            image={image as ReactNode | true}
            className={cx(
                horizontal
                    ? 'flex-1 self-stretch'
                    : cx('w-full', aspectClass[aspect])
            )}
        />
    )

    const headerFirst = headerPlacement === 'start'

    return (
        <div
            className={cx(
                'relative flex flex-1 overflow-hidden rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey',
                horizontal ? 'flex-row' : 'flex-col',
                href && 'transition-all hover:border-cyan hover:shadow-depth-hover',
                className
            )}
        >
            {headerFirst ? header : media}
            {headerFirst ? media : header}
        </div>
    )
}
