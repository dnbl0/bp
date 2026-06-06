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
    /**
     * Extra search terms for this page — typically the page's section
     * headings. Lets search reach section-level content without crawling the
     * DOM. Optional; search falls back to title + summary where absent.
     */
    keywords?: string[]
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
            {
                title: 'Getting started',
                slug: 'getting-started',
                status: 'stable',
                summary: 'Run the site, learn the structure, and compose pages from components and tokens.',
                keywords: [
                    'prerequisites',
                    'run locally',
                    'install',
                    'project structure',
                    'using a component',
                    'using tokens',
                    'theming',
                    'dark mode',
                    'contributing',
                    'onboarding',
                    'setup',
                ],
            },
            {
                title: 'Component status',
                slug: 'status',
                status: 'stable',
                summary: 'Coverage at a glance: every documented page and its maturity.',
                keywords: ['coverage', 'matrix', 'maturity', 'stable', 'in review', 'planned', 'roadmap'],
            },
        ],
    },
    {
        title: 'Foundations',
        items: [
            {
                title: 'Design tokens',
                slug: 'foundations/tokens',
                status: 'stable',
                summary: 'The complete token reference — colour, type, spacing, radius, elevation, layering and motion.',
                keywords: [
                    'color',
                    'typography',
                    'spacing',
                    'radius',
                    'elevation',
                    'shadow',
                    'layering',
                    'z-index',
                    'motion',
                    'animation',
                    'reference',
                ],
            },
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
            {
                title: 'Accessibility',
                slug: 'foundations/accessibility',
                status: 'stable',
                summary: 'Shared WCAG AA rules for contrast, keyboard, motion, forms and images.',
                keywords: [
                    'wcag',
                    'a11y',
                    'contrast',
                    'keyboard',
                    'focus',
                    'screen reader',
                    'aria',
                    'alt text',
                    'reduced motion',
                    'forms',
                ],
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
            {
                title: 'Accordion',
                slug: 'components/accordion',
                status: 'stable',
                summary: 'Expandable panels for FAQs and long supporting content.',
            },
            {
                title: 'Breadcrumbs',
                slug: 'components/breadcrumbs',
                status: 'stable',
                summary: "A trail showing the page's position in the site hierarchy.",
            },
            {
                title: 'Testimonial card',
                slug: 'components/testimonial',
                status: 'stable',
                summary: 'A bordered card presenting a customer quote with attribution.',
            },
            {
                title: 'Sections',
                slug: 'components/sections',
                status: 'stable',
                summary: 'The named grid and layout section family on a 12-column grid.',
            },
            {
                title: 'Coloured card',
                slug: 'components/coloured-card',
                status: 'stable',
                summary: 'A colourable card grouping an icon, heading, body and CTA.',
            },
            {
                title: 'Header',
                slug: 'components/header',
                status: 'stable',
                summary: 'The global site header with responsive navigation and actions.',
            },
            {
                title: 'Footer',
                slug: 'components/footer',
                status: 'stable',
                summary: 'The global navy site footer with menus, legal and social links.',
            },
            {
                title: 'Hero banner',
                slug: 'components/hero',
                status: 'stable',
                summary: 'A full-width page-opening banner on a cyan field.',
            },
            {
                title: 'Back to top',
                slug: 'components/back-to-top',
                status: 'stable',
                summary: 'A floating control that smooth-scrolls to the top of the page.',
            },
            {
                title: 'Show more',
                slug: 'components/show-more',
                status: 'stable',
                summary: 'A ghost button that expands additional content.',
            },
            {
                title: 'Heading',
                slug: 'components/heading',
                status: 'stable',
                summary: 'A standalone section heading with size and weight options.',
            },
            {
                title: 'Tags block',
                slug: 'components/tags',
                status: 'stable',
                summary: 'A wrapping group of Tag atoms.',
            },
            {
                title: 'Image card',
                slug: 'components/image-card',
                status: 'stable',
                summary: 'An image-led content card that lifts on hover.',
            },
            {
                title: 'Promotion card',
                slug: 'components/promotion-card',
                status: 'stable',
                summary: 'A cyan-bordered card for campaigns and offers.',
            },
            {
                title: 'Contact card',
                slug: 'components/contact-card',
                status: 'stable',
                summary: "A care home's contact details with calls to action.",
            },
            {
                title: 'Video card',
                slug: 'components/video-card',
                status: 'stable',
                summary: 'A YouTube player with a placeholder and play affordance.',
            },
            {
                title: 'Badge',
                slug: 'components/badge',
                status: 'stable',
                summary: 'A small status, category or recognition label.',
                keywords: ['status', 'pill', 'label', 'award', 'canstar', 'tag'],
            },
            {
                title: 'Tooltip',
                slug: 'components/tooltip',
                status: 'stable',
                summary: 'An accessible hint revealed on hover and keyboard focus.',
                keywords: ['hint', 'popover', 'help', 'info', 'aria-describedby'],
            },
            {
                title: 'Skip links',
                slug: 'components/skip-links',
                status: 'stable',
                summary: 'Focus-revealed shortcuts that bypass the header to main landmarks.',
                keywords: ['accessibility', 'a11y', 'skip to content', 'keyboard', 'bypass'],
            },
            {
                title: 'Toggle switch',
                slug: 'components/toggle',
                status: 'stable',
                summary: 'A binary on/off switch built on a real checkbox input.',
                keywords: ['switch', 'toggle', 'on off', 'checkbox', 'monthly annual'],
            },
            {
                title: 'Pagination',
                slug: 'components/pagination',
                status: 'stable',
                summary: 'Numbered page navigation for long listings, with truncation.',
                keywords: ['pager', 'pages', 'next', 'previous', 'listing', 'results'],
            },
            {
                title: 'Tabs',
                slug: 'components/tabs',
                status: 'stable',
                summary: 'An accessible tabbed panel following the WAI-ARIA tabs pattern.',
                keywords: ['tabs', 'tabpanel', 'tablist', 'segmented', 'switcher'],
            },
            {
                title: 'Comparison table',
                slug: 'components/comparison-table',
                status: 'stable',
                summary: 'A responsive feature-comparison matrix for products.',
                keywords: ['compare', 'comparison', 'matrix', 'cover', 'plans', 'features'],
            },
            {
                title: 'Disclaimer',
                slug: 'components/disclaimer',
                status: 'stable',
                summary: 'A legal footnote block, optionally collapsible.',
                keywords: ['footnote', 'disclaimer', 'legal', 'terms', 'superscript', 'fine print'],
            },
            {
                title: 'Stepper',
                slug: 'components/stepper',
                status: 'stable',
                summary: 'A horizontal progress indicator for multi-step flows.',
                keywords: ['stepper', 'progress', 'wizard', 'steps', 'quote', 'funnel', 'multi-step'],
            },
        ],
    },
    {
        title: 'Component groups',
        items: [
            {
                title: 'Search & navigation',
                slug: 'components/group-search',
                status: 'stable',
                summary: 'Algolia search, autocomplete and in-page navigation.',
            },
            {
                title: 'Media & imagery',
                slug: 'components/group-media',
                status: 'stable',
                summary: 'Responsive images, galleries, carousels and video.',
            },
            {
                title: 'Content & text',
                slug: 'components/group-content',
                status: 'stable',
                summary: 'Rich text, markdown, headings and layout bands.',
            },
            {
                title: 'Forms & booking',
                slug: 'components/group-forms',
                status: 'stable',
                summary: 'SnapForms, modals, error messaging and Calendly.',
            },
            {
                title: 'Data-driven tools',
                slug: 'components/group-tools',
                status: 'stable',
                summary: 'Pricing, the care navigator, maps and feeds.',
            },
            {
                title: 'Infrastructure & templates',
                slug: 'components/group-infra',
                status: 'stable',
                summary: 'The block dispatcher, link handling and page templates.',
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

/** Maps a page slug to the title of the nav section that contains it. */
const slugToSection: Record<string, string> = navSections.reduce(
    (map, section) => {
        section.items.forEach(item => {
            map[item.slug] = section.title
        })
        return map
    },
    {} as Record<string, string>
)

/** The title of the nav section that contains the given slug, if any. */
export const sectionTitleFor = (slug: string): string | undefined =>
    slugToSection[slug]

/**
 * The documented pages immediately before and after `slug` in reading order,
 * used to render the previous/next pager at the foot of every page.
 */
export const adjacentDocs = (
    slug: string
): { prev?: NavItem; next?: NavItem } => {
    const index = allDocs.findIndex(doc => doc.slug === slug)
    if (index === -1) return {}
    return {
        prev: index > 0 ? allDocs[index - 1] : undefined,
        next: index < allDocs.length - 1 ? allDocs[index + 1] : undefined,
    }
}
