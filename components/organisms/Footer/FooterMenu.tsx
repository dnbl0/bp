import Link from 'next/link'
import { Fragment } from 'react'
import { FooterData } from '../../../lib/requestFooterData'
import { isMenuItemWithHref, MenuItem } from '../../../types/menuItem'
import { cx } from '../../../utils/cx'

export const FooterMenu = ({
    footerMenu,
}: {
    footerMenu: Required<FooterData>['footerMenu']
}) => {
    const pairedSections = [
        [footerMenu[0], footerMenu[1]],
        [footerMenu[2], footerMenu[3]],
        [footerMenu[4], footerMenu[5]],
        [footerMenu[6], footerMenu[7]],
    ]

    return (
        <div
            className={cx(
                'flex flex-col justify-between gap-x-4 gap-y-6',
                'md:flex-row'
            )}
        >
            {pairedSections.map(([menuItemA, menuItemB], index) => (
                <MenuPair key={`${index}_${menuItemA?.id}_${menuItemB?.id}`}>
                    {menuItemA && <MenuSection menuItem={menuItemA} />}
                    {menuItemB && <MenuSection menuItem={menuItemB} />}
                </MenuPair>
            ))}
        </div>
    )
}

const MenuPair = ({ children }: { children?: React.ReactNode }) => {
    return <div className="flex flex-col gap-6">{children}</div>
}

const MenuSection = ({ menuItem }: { menuItem: MenuItem }) => {
    return (
        <ul>
            <li>
                <PrimaryMenuItem menuItem={menuItem} />
                {menuItem.items && <ChildMenuItems items={menuItem.items} />}
            </li>
        </ul>
    )
}

const PrimaryMenuItem = ({ menuItem }: { menuItem: MenuItem }) => {
    const href = menuItem.href
    const openInNewTab = menuItem.openInNewTab

    const displayElement = (
        <div
            className={cx(
                'text-lg font-semibold',
                href ? 'hover:underline' : 'cursor-default'
            )}
        >
            {menuItem.caption}
        </div>
    )

    return href ? (
        <Link href={href}>
            <a
                className="hover:underline"
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noreferrer' : undefined}
            >
                {displayElement}
            </a>
        </Link>
    ) : (
        <Fragment>{displayElement}</Fragment>
    )
}

const ChildMenuItems = ({ items }: { items: MenuItem[] }) => {
    return (
        <ul className="pt-3">
            {items.filter(isMenuItemWithHref).map((item, index) => (
                <li key={`${index}_${item.id}`}>
                    <Link href={item.href}>
                        <a
                            className={cx(
                                'text-sm',
                                index > 0 && 'pt-2',
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
