/*
    Information architecture for the Bupa Aged Care design system documentation.

    The sidebar navigation and the search index are both generated from this
    single structure. As component documentation is added in later phases, new
    entries are appended to the relevant section here.
*/

export type DocStatus = 'stable' | 'in-review' | 'planned'

export interface NavItem {
    title: string
    /** Route under /design-system, e.g. `foundations/color`. */
    slug: string
    status?: DocStatus
    /** Short description used by search and overview cards. */
    summary?: string
}

export interface NavSection {
    title: string
    items: NavItem[]
}

export const SITE_TITLE = 'Bupa Design System'
export const SITE_TAGLINE = 'The living design language behind Bupa Aged Care.'
export const BASE_PATH = '/design-system'

export const navSections: NavSection[] = [
    {
        title: 'Overview',
        items: [
            {
                title: 'Introduction',
                slug: '',
                status: 'stable',
                summary: 'What the design system is, how it is built, and how to use it.',
            },
        ],
    },
    {
        title: 'Foundations',
        items: [
            {
                title: 'Color',
                slug: 'foundations/color',
                status: 'stable',
                summary: 'Primary, secondary, UI and background palettes, read live from the theme.',
            },
            {
                title: 'Typography',
                slug: 'foundations/typography',
                status: 'stable',
                summary: 'Montserrat and the responsive type scale defined in typography.css.',
            },
            {
                title: 'Spacing & Layout',
                slug: 'foundations/spacing',
                status: 'stable',
                summary: 'The 4px spacing scale, corner radii and container-query utilities.',
            },
            {
                title: 'Elevation',
                slug: 'foundations/elevation',
                status: 'stable',
                summary: 'Resting and hover shadows used to separate and lift surfaces.',
            },
            {
                title: 'Iconography',
                slug: 'foundations/iconography',
                status: 'stable',
                summary: 'The inline SVG icon library, searchable with copyable imports.',
            },
            {
                title: 'Motion',
                slug: 'foundations/motion',
                status: 'stable',
                summary: 'Fade, slide and spin animations plus staggered delay utilities.',
            },
            {
                title: 'Layering',
                slug: 'foundations/layering',
                status: 'stable',
                summary: 'The named z-index scale for predictable stacking.',
            },
            {
                title: 'Logo',
                slug: 'foundations/logo',
                status: 'stable',
                summary: 'The Bupa Aged Care logo marks and usage guidance.',
            },
        ],
    },
    {
        title: 'Components',
        items: [
            {
                title: 'Overview',
                slug: 'components',
                status: 'stable',
                summary: 'The full component catalogue grouped by atomic-design layer.',
            },
            {
                title: 'Button',
                slug: 'components/button',
                status: 'stable',
                summary: 'Primary, secondary, ghost and tertiary actions in three sizes.',
            },
            {
                title: 'Tag',
                slug: 'components/tag',
                status: 'stable',
                summary: 'A small, colourable label that links to a page or anchor.',
            },
            {
                title: 'Alert',
                slug: 'components/alert',
                status: 'stable',
                summary: 'A dismissible, full-width site notification banner.',
            },
            {
                title: 'CTA',
                slug: 'components/cta',
                status: 'stable',
                summary: 'A CMS-driven call-to-action built on the Button API.',
            },
        ],
    },
    {
        title: 'Patterns',
        items: [
            {
                title: 'Patterns',
                slug: 'patterns',
                status: 'stable',
                summary: 'Atomic design, the grid system, forms and search experiences.',
            },
        ],
    },
    {
        title: 'Resources',
        items: [
            {
                title: 'Resources',
                slug: 'resources',
                status: 'stable',
                summary: 'Figma UI Kit, Contentful and contribution guidance.',
            },
        ],
    },
]

/** Flattened list of every documented page, used for search. */
export const allDocs: NavItem[] = navSections.flatMap(section => section.items)

export const hrefFor = (slug: string): string =>
    slug ? `${BASE_PATH}/${slug}` : BASE_PATH
