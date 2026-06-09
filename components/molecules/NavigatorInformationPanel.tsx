import Link from 'next/link'
import { ChevronRightIcon } from '../atoms/icons/ChevronRightIcon'

interface NavigatorInformationPanelProps {
    heading: string
    description: string
    /** Optional icon node (57×57px) shown to the left of the text */
    icon?: React.ReactNode
    ctaText?: string
    ctaHref?: string
    className?: string
}

/**
 * Contextual information callout used alongside navigator steps and results.
 *
 * Renders a light-blue bordered panel with an icon, heading, description and an
 * optional inline CTA link. Maps to the "Information" component in the Figma
 * Navigator shared library (Breakpoint=XL / XS).
 */
export const NavigatorInformationPanel = ({
    heading,
    description,
    icon,
    ctaText,
    ctaHref,
    className,
}: NavigatorInformationPanelProps) => (
    <div
        className={[
            'border border-cyan rounded-lg bg-cool-paper-50 p-4 md:p-6',
            className,
        ]
            .filter(Boolean)
            .join(' ')}
    >
        <div className="flex gap-4 items-start">
            {icon && (
                <span
                    className="shrink-0 h-[57px] w-[57px] flex items-center justify-center"
                    aria-hidden="true"
                >
                    {icon}
                </span>
            )}
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-heading-s leading-6 text-navy">{heading}</p>
                    <p className="text-body leading-7 text-grey">{description}</p>
                </div>
                {ctaText && ctaHref && (
                    <Link href={ctaHref}>
                        <a className="inline-flex items-center gap-2 border border-cyan rounded text-body-small font-semibold text-cyan px-2 py-2 self-start hover:bg-cyan-50 transition-colors">
                            {ctaText}
                            <ChevronRightIcon className="inline-block fill-current" />
                        </a>
                    </Link>
                )}
            </div>
        </div>
    </div>
)
