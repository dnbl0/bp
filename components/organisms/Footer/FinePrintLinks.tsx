import Link from 'next/link'
import { isMenuItemWithHref, MenuItem } from '../../../types/menuItem'
import { cx } from '../../../utils/cx'

export const FinePrintLinks = ({
    finePrintLinks,
}: {
    finePrintLinks: MenuItem[]
}) => {
    return (
        <ul className="flex flex-row flex-wrap justify-center md:justify-start">
            {finePrintLinks.filter(isMenuItemWithHref).map((item, index) => (
                <li key={`${index}_${item.id}`}>
                    <Link href={item.href}>
                        <a
                            className={cx(
                                'whitespace-nowrap',
                                'text-sm',
                                'pr-2',
                                index > 0 && 'border-l border-white pl-2',
                                'hover:underline'
                            )}
                            target={item.openInNewTab ? '_blank' : undefined}
                            rel={item.openInNewTab ? 'noreferrer' : undefined}
                        >
                            {item.caption}
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
