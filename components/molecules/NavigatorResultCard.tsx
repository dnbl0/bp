import Link from 'next/link'
import { ChevronRightIcon } from '../atoms/icons/ChevronRightIcon'

interface NavigatorResultCardProps {
    heading: string
    description?: string
    /** Optional icon node rendered beside the heading */
    icon?: React.ReactNode
    ctaText?: string
    ctaHref?: string
    className?: string
}

/**
 * Result card shown on the Navigator dashboard / results screen.
 *
 * Displays an icon, heading and description inside a warm-paper card, with an
 * optional primary CTA button. Maps to the "Card · Breakpoint=XL, Amount=One"
 * component in the Figma Navigator shared library.
 */
export const NavigatorResultCard = ({
    heading,
    description,
    icon,
    ctaText,
    ctaHref,
    className,
}: NavigatorResultCardProps) => (
    <div
        className={[
            'border border-light-grey rounded-lg overflow-hidden',
            className,
        ]
            .filter(Boolean)
            .join(' ')}
    >
        <div className="bg-warm-paper-100 flex flex-col gap-8 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                    {icon && (
                        <span
                            className="shrink-0 h-[57px] w-[57px] flex items-center justify-center"
                            aria-hidden="true"
                        >
                            {icon}
                        </span>
                    )}
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold text-heading-s leading-[30px] text-navy">
                            {heading}
                        </p>
                        {description && (
                            <p className="text-body leading-7 text-grey">{description}</p>
                        )}
                    </div>
                </div>

                {ctaText && ctaHref && (
                    <Link href={ctaHref}>
                        <a className="button button--primary shrink-0 self-start md:self-center">
                            {ctaText}
                            <ChevronRightIcon className="inline-block fill-current" />
                        </a>
                    </Link>
                )}
            </div>
        </div>
    </div>
)
