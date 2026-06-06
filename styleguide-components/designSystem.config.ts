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
        ],
    },
]

/** Flattened list of every documented page, used for search. */
export const allDocs: NavItem[] = navSections.flatMap(section => section.items)

export const hrefFor = (slug: string): string =>
    slug ? `${BASE_PATH}/${slug}` : BASE_PATH
