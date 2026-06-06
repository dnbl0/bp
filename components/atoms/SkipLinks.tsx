import { cx } from '../../utils/cx'

export interface SkipLink {
    /** The in-page anchor to jump to, e.g. `#main`. */
    href: string
    /** The visible label, e.g. "Skip to content". */
    label: string
}

export interface SkipLinksProps {
    /**
     * The destinations offered to keyboard and screen-reader users. Defaults
     * to the site-wide content, footer and chat targets.
     */
    links?: SkipLink[]
}

const defaultLinks: SkipLink[] = [
    { href: '#main', label: 'Skip to content' },
    { href: '#footer', label: 'Skip to footer' },
    { href: '#chat', label: 'Skip to chat' },
]

/**
 * Visually-hidden navigation shortcuts that become visible on focus, letting
 * keyboard users bypass the header and jump straight to the main landmarks.
 * Render this as the first focusable element inside the page template.
 */
export const SkipLinks = ({ links = defaultLinks }: SkipLinksProps) => (
    <nav aria-label="Skip links">
        <ul className="list-none m-0 p-0">
            {links.map(link => (
                <li key={link.href}>
                    <a
                        href={link.href}
                        className={cx(
                            // Off-screen until focused, then pinned top-left.
                            'sr-only focus:not-sr-only',
                            'focus:fixed focus:top-3 focus:left-3 focus:z-fixed',
                            'focus:rounded-md focus:bg-navy focus:px-4 focus:py-2',
                            'focus:text-white focus:text-sm focus:font-semibold',
                            'focus:outline-none focus:ring-2 focus:ring-focus-blue'
                        )}
                    >
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
)

export default SkipLinks
