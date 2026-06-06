import { paramCase } from 'param-case'
import { ChangeEventHandler, useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'react-use'
import { useIsAfterFirstRender } from '../../../../hooks/useIsAfterFirstRender'
import { CmsNavigationBar } from '../../../../types/contentful-cms-types'
import {
    isNavigationLink,
    NavigationLink,
} from '../../../../types/navigationLink'
import { cx } from '../../../../utils/cx'
import { scrollToTarget } from '../../../../utils/scrollToTarget'
import { Section } from '../../../atoms/Section'
import {
    useNavigationBarDispatch,
    useNavigationBarState,
} from './NavigationBarContext'

export const NavigationBar = ({
    component,
}: {
    component: CmsNavigationBar
}) => {
    const state = useNavigationBarState()
    const dispatch = useNavigationBarDispatch()
    const isAfterFirstRender = useIsAfterFirstRender()
    const isSticky = component.sticky
    const cta = isNavigationLink(component.cta) ? component.cta : undefined

    const links = useMemo(
        () => component.linksCollection?.items.filter(isNavigationLink) || [],
        [component]
    )

    useEffect(() => dispatch({ type: 'updateLinks', links }), [links, dispatch])

    const focusedHref =
        isAfterFirstRender && state.activeAnchorId
            ? `#${state.activeAnchorId}`
            : undefined

    return (
        <div className={cx('bg-white', isSticky && 'sticky top-0 z-sticky')}>
            <div className="block md:hidden">
                <NarrowScreenNavigationBar
                    focusedHref={focusedHref}
                    cta={cta}
                    links={links}
                />
            </div>
            <div className="hidden md:block">
                <WideScreenNavigationBar
                    focusedHref={focusedHref}
                    cta={cta}
                    links={links}
                />
            </div>
        </div>
    )
}

const NarrowScreenNavigationBar = ({
    focusedHref,
    cta,
    links,
}: {
    focusedHref: string | undefined
    cta: NavigationLink | undefined
    links: NavigationLink[]
}) => {
    // Using a momentary override prevents the UI from glitching out when using the
    // drop down selector.
    const [override, setOverride] = useState<string>()

    const handledSelected: ChangeEventHandler<HTMLSelectElement> = event => {
        const href = event.currentTarget?.value
        if (href) {
            setOverride(href)
            scrollToTarget(href)
        }
    }

    useDebounce(() => setOverride(undefined), 1000, [override])

    return (
        <div className="border-b-[4px] border-cool-paper-200">
            <Section>
                <div className="flex flex-row gap-8">
                    <select
                        onChange={handledSelected}
                        value={override || focusedHref}
                        className="select py-3 block flex-grow"
                    >
                        {links.map((link, index) => (
                            <option
                                key={`${index}_${link.sys?.id}`}
                                value={link.href}
                            >
                                {link.caption}
                            </option>
                        ))}
                    </select>

                    {cta && (
                        <a
                            className={cx(
                                'group',
                                'cursor-pointer select-none',
                                'text-center block',
                                'button my-[4px]',
                                `${cta.ctaColour === "Pink" ? "button--pink" : ""}`
                            )}
                            href={cta.href}
                        >
                            {cta.caption}
                        </a>
                    )}
                </div>
            </Section>
        </div>
    )
}

const WideScreenNavigationBar = ({
    focusedHref,
    cta,
    links,
}: {
    focusedHref: string | undefined
    cta: NavigationLink | undefined
    links: NavigationLink[]
}) => {
    return (
        <Section>
            <ul className="flex flex-row justify-between max-w-full overflow-hidden">
                {links.map((link, index) => (
                    <LinkItem
                        key={`${index}_${link.sys?.id}`}
                        text={link.caption}
                        href={link.href}
                        active={focusedHref === link.href}
                        variant="Link"
                    />
                ))}
                {cta && (
                    <LinkItem
                        active={false}
                        text={cta.caption}
                        href={cta.href}
                        colour={String(cta.ctaColour)}
                        variant="Button"
                    />
                )}
            </ul>
        </Section>
    )
}

const LinkItem = ({
    active,
    text,
    href,
    colour,
    variant,
}: {
    active: boolean
    text: string
    colour?: string
    href: string
    variant: 'Link' | 'Button'
}) => {
    const linkSpanStyle = cx(
        'border-transparent border-b-[1.6px]',
        'group-hover:border-current',
        'transition-all duration-75',
        !active && 'group-hover:duration-75'
    )

    return (
        <li
            className={cx(
                variant === 'Link' && 'flex-grow',
                variant === 'Button' && 'shrink-0'
            )}
        >
            <div
                className={cx(
                    'h-full flex flex-col justify-center',
                    'border-b-[4px]',
                    active ? 'border-cyan' : 'border-cool-paper-200',
                    variant === 'Button' && 'px-4'
                )}
            >
                <a
                    className={cx(
                        'group',
                        'cursor-pointer select-none',
                        'text-center block',
                        variant === 'Link' && 'py-4',
                        variant === 'Button' && 'button py-2',
                        `${colour === "Pink" ? "button--pink" : ""}`
                    )}
                    href={href}
                    data-link-type={
                        variant === 'Button'
                            ? `cta-button-${paramCase(text)}`
                            : 'quick-link'
                    }
                >
                    <span
                        className={cx(
                            'pointer-events-none',
                            variant === 'Link' ? linkSpanStyle : undefined
                        )}
                    >
                        {text}
                    </span>
                </a>
            </div>
        </li>
    )
}
