import Link from 'next/link'
import { cx } from '../../utils/cx'
interface TagProps {
    title: string
    href: string
    openInNewTab: boolean
    bgColor: string
    textColor: string
}

export const Tag = ({
    title,
    href,
    openInNewTab,
    bgColor,
    textColor,
}: TagProps) => {
    const bgColorHex = extractHex(bgColor)
    const textColorHex = extractHex(textColor)

    const className = cx(
        'inline-block',
        'p-1',
        'text-xs',
        'font-normal',
        'tracking-wide',
        'rounded',
        'hover:contrast-75',
        'mb-2',
        'mr-2'
    )

    return href.includes('#') ? (
        <a
            href={href}
            className={className}
            style={{ backgroundColor: bgColorHex, color: textColorHex }}
        >
            {title}
        </a>
    ) : (
        <Link href={href}>
            <a
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noreferrer' : undefined}
                className={className}
                style={{ backgroundColor: bgColorHex, color: textColorHex }}
            >
                {title}
            </a>
        </Link>
    )
}

const extractHex = (color: string) => {
    const hex = color.split('-')[1]
    return hex
}
