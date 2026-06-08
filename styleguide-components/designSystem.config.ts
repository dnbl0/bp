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
        ],
    },
    {
        title: 'Accessibility',
        items: [
            {
                title: 'Overview',
                slug: 'foundations/accessibility',
                status: 'stable',
                summary: 'How we build to WCAG 2.2 AA — an entry point to every accessibility guideline.',
                keywords: [
                    'wcag',
                    'a11y',
                    'accessibility',
                    'inclusive design',
                    'ada',
                    'pour',
                    'wcag 2.2',
                ],
            },
            {
                title: 'Principles',
                slug: 'foundations/accessibility/principles',
                status: 'stable',
                summary: 'The POUR model — perceivable, operable, understandable, robust — and our AA target.',
                keywords: [
                    'pour',
                    'perceivable',
                    'operable',
                    'understandable',
                    'robust',
                    'principles',
                    'wcag',
                    'checklist',
                ],
            },
            {
                title: 'Conformance & statement',
                slug: 'foundations/accessibility/conformance',
                status: 'stable',
                summary: 'What WCAG 2.2 AA conformance means, our target and how we track known issues.',
                keywords: [
                    'conformance',
                    'compliance',
                    'wcag 2.2 aa',
                    'accessibility statement',
                    'vpat',
                    'section 508',
                    'known issues',
                    'audit',
                ],
            },
            {
                title: 'Color & contrast',
                slug: 'foundations/accessibility/contrast',
                status: 'stable',
                summary: 'Text and non-text contrast ratios, and never using colour alone to convey meaning.',
                keywords: [
                    'contrast',
                    'colour',
                    'color',
                    'ratio',
                    '4.5:1',
                    'non-text contrast',
                    'colour blind',
                    'vision',
                ],
            },
            {
                title: 'Typography & low vision',
                slug: 'foundations/accessibility/typography',
                status: 'stable',
                summary: 'Text resize to 200%, reflow, spacing overrides, zoom and magnification.',
                keywords: [
                    'low vision',
                    'resize text',
                    'reflow',
                    'zoom',
                    'magnification',
                    'text spacing',
                    'images of text',
                    'readability',
                ],
            },
            {
                title: 'Images & media',
                slug: 'foundations/accessibility/images',
                status: 'stable',
                summary: 'Alt text, decorative images, icon labels, captions and transcripts.',
                keywords: [
                    'alt text',
                    'images',
                    'icons',
                    'aria-label',
                    'captions',
                    'transcripts',
                    'audio description',
                    'video',
                    'media',
                ],
            },
            {
                title: 'Structure & semantics',
                slug: 'foundations/accessibility/structure',
                status: 'stable',
                summary: 'Headings, landmarks, skip links, page titles and a logical reading order.',
                keywords: [
                    'semantic html',
                    'headings',
                    'landmarks',
                    'skip links',
                    'bypass blocks',
                    'page title',
                    'reading order',
                    'link text',
                    'structure',
                ],
            },
            {
                title: 'Keyboard & focus',
                slug: 'foundations/accessibility/keyboard',
                status: 'stable',
                summary: 'Full keyboard operation, a visible focus ring, logical order and focus management.',
                keywords: [
                    'keyboard',
                    'focus',
                    'tab',
                    'focus ring',
                    'focus order',
                    'focus trap',
                    'focus not obscured',
                    'navigation',
                ],
            },
            {
                title: 'Pointer, touch & targets',
                slug: 'foundations/accessibility/pointer',
                status: 'stable',
                summary: 'Target sizes, gesture and drag alternatives, and pointer cancellation.',
                keywords: [
                    'target size',
                    'touch',
                    'pointer',
                    'gestures',
                    'dragging',
                    'motion actuation',
                    '24px',
                    '44px',
                    'tap',
                    'mobile',
                ],
            },
            {
                title: 'Motion & animation',
                slug: 'foundations/accessibility/motion',
                status: 'stable',
                summary: 'Reduced-motion support, pause/stop/hide controls and flash safety.',
                keywords: [
                    'motion',
                    'animation',
                    'prefers-reduced-motion',
                    'vestibular',
                    'parallax',
                    'pause stop hide',
                    'flashing',
                ],
            },
            {
                title: 'Forms & validation',
                slug: 'foundations/accessibility/forms',
                status: 'stable',
                summary: 'Labels, error identification and suggestion, autocomplete and accessible authentication.',
                keywords: [
                    'forms',
                    'labels',
                    'aria-describedby',
                    'aria-invalid',
                    'error',
                    'validation',
                    'autocomplete',
                    'redundant entry',
                    'authentication',
                ],
            },
            {
                title: 'Content & writing',
                slug: 'foundations/accessibility/content',
                status: 'stable',
                summary: 'Plain language, reading level, inclusive language, link text and consistent help.',
                keywords: [
                    'content',
                    'plain language',
                    'reading level',
                    'inclusive language',
                    'writing',
                    'language',
                    'consistent help',
                    'time limits',
                ],
            },
            {
                title: 'Screen readers & ARIA',
                slug: 'foundations/accessibility/assistive-technology',
                status: 'stable',
                summary: 'How assistive tech works, accessible names, the five rules of ARIA and live regions.',
                keywords: [
                    'screen reader',
                    'assistive technology',
                    'aria',
                    'accessible name',
                    'name role value',
                    'live region',
                    'status messages',
                    'nvda',
                    'voiceover',
                ],
            },
            {
                title: 'Testing & tools',
                slug: 'foundations/accessibility/testing',
                status: 'stable',
                summary: 'Automated tooling, manual screen-reader and keyboard testing, and a runnable checklist.',
                keywords: [
                    'testing',
                    'tools',
                    'axe',
                    'lighthouse',
                    'pa11y',
                    'nvda',
                    'jaws',
                    'voiceover',
                    'checklist',
                    'audit',
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
                title: 'Toggle',
                slug: 'components/toggle',
                status: 'stable',
                summary: 'A binary on/off switch built on a real checkbox input.',
                keywords: ['switch', 'toggle', 'checkbox', 'on', 'off'],
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
        title: 'Primitives',
        items: [
            {
                title: 'Form controls',
                slug: 'primitives/form-controls',
                status: 'in-review',
                summary: 'Text input, textarea, select, checkbox and radio with focus, error and disabled states.',
                keywords: ['input', 'textarea', 'select', 'dropdown', 'checkbox', 'radio', 'field', 'label', 'validation', 'error', 'form'],
            },
            {
                title: 'Selection controls',
                slug: 'primitives/selection-controls',
                status: 'in-review',
                summary: 'Radio-card and segmented selectors, the range slider and the number stepper.',
                keywords: ['radio card', 'segmented', 'toggle group', 'slider', 'range', 'stepper', 'number', 'quantity', 'quote'],
            },
            {
                title: 'Date & file inputs',
                slug: 'primitives/date-file-inputs',
                status: 'in-review',
                summary: 'A date picker and a drag-and-drop file upload control.',
                keywords: ['date', 'calendar', 'datepicker', 'date of birth', 'file', 'upload', 'attachment', 'dropzone', 'claim'],
            },
            {
                title: 'Dialog',
                slug: 'primitives/dialog',
                status: 'in-review',
                summary: 'A centred modal dialog and a confirmation variant, with focus management.',
                keywords: ['modal', 'dialog', 'popup', 'overlay', 'confirm', 'confirmation', 'alert dialog'],
            },
            {
                title: 'Toast',
                slug: 'primitives/toast',
                status: 'in-review',
                summary: 'Transient, self-dismissing notifications for action feedback.',
                keywords: ['toast', 'notification', 'snackbar', 'flash', 'feedback', 'success', 'error', 'transient'],
            },
            {
                title: 'Filtering',
                slug: 'primitives/filtering',
                status: 'in-review',
                summary: 'Facet checkboxes, applied-filter chips and a sort dropdown for result lists.',
                keywords: ['filter', 'facet', 'refine', 'chip', 'sort', 'results', 'find a provider', 'search'],
            },
            {
                title: 'Loading',
                slug: 'primitives/loading',
                status: 'in-review',
                summary: 'Skeleton placeholders, a spinner and a progress bar for pending states.',
                keywords: ['loading', 'skeleton', 'spinner', 'progress', 'pending', 'placeholder', 'shimmer'],
            },
            {
                title: 'Consent banner',
                slug: 'primitives/consent-banner',
                status: 'in-review',
                summary: 'A cookie/consent banner with accept, reject and preference actions.',
                keywords: ['cookie', 'consent', 'gdpr', 'privacy', 'banner', 'accept', 'reject', 'preferences'],
            },
            {
                title: 'Rating',
                slug: 'primitives/rating',
                status: 'in-review',
                summary: 'A star rating for displaying and capturing review scores.',
                keywords: ['rating', 'stars', 'review', 'score', 'feedback', 'provider'],
            },
        ],
    },
    {
        title: 'Composite patterns',
        items: [
            {
                title: 'Mega menu',
                slug: 'patterns/mega-menu',
                status: 'in-review',
                summary: 'A multi-column flyout navigation panel for grouping a large product catalogue.',
                keywords: ['mega menu', 'navigation', 'flyout', 'dropdown', 'header', 'nav panel', 'menu'],
            },
            {
                title: 'Utility bar',
                slug: 'patterns/utility-bar',
                status: 'in-review',
                summary: 'A top utility bar with an audience switcher (Personal, Business, Overseas, Providers).',
                keywords: ['utility bar', 'top bar', 'audience switcher', 'segment', 'personal', 'business', 'overseas'],
            },
            {
                title: 'Account menu',
                slug: 'patterns/account-menu',
                status: 'in-review',
                summary: 'A member login control and the authenticated account dropdown menu.',
                keywords: ['login', 'sign in', 'account', 'member', 'mybupa', 'avatar', 'profile', 'dropdown', 'auth'],
            },
            {
                title: 'Plan cards',
                slug: 'patterns/plan-cards',
                status: 'in-review',
                summary: 'Tiered price/plan cards with feature lists, a most-popular badge and a select action.',
                keywords: ['plan', 'pricing', 'tier', 'bronze', 'silver', 'gold', 'price card', 'most popular', 'compare'],
            },
            {
                title: 'Price summary bar',
                slug: 'patterns/price-summary-bar',
                status: 'in-review',
                summary: 'A sticky summary bar showing the running price with a fortnightly/monthly toggle.',
                keywords: ['price', 'summary', 'sticky bar', 'fortnightly', 'monthly', 'frequency', 'quote', 'total'],
            },
            {
                title: 'Help widget',
                slug: 'patterns/help-widget',
                status: 'in-review',
                summary: 'A floating live-chat / virtual-assistant launcher and chat panel.',
                keywords: ['chat', 'live chat', 'virtual assistant', 'bot', 'help', 'support', 'messenger', 'widget'],
            },
            {
                title: 'Offer ribbon',
                slug: 'patterns/offer-ribbon',
                status: 'in-review',
                summary: 'A promotional banner with a live countdown to an offer deadline.',
                keywords: ['offer', 'promotion', 'countdown', 'timer', 'deadline', 'campaign', 'ribbon', 'banner'],
            },
            {
                title: 'Help hub',
                slug: 'patterns/help-hub',
                status: 'in-review',
                summary: 'A categorised help-article browser with search and topic cards.',
                keywords: ['help', 'hub', 'faq', 'support', 'knowledge base', 'articles', 'topics', 'search'],
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

/**
 * GitHub repo URL for editing the source file. Maps slug to the corresponding
 * page file in pages/design-system/.
 */
export const githubEditUrl = (slug: string): string => {
    const repo = 'https://github.com/dnbl0/bp/edit/main'
    let filePath = slug
    // Root pages and explicit index pages
    if (slug === '') filePath = 'pages/design-system/index'
    else if (slug === 'components') filePath = 'pages/design-system/components/index'
    else if (slug === 'foundations/accessibility')
        filePath = 'pages/design-system/foundations/accessibility/index'
    else filePath = `pages/design-system/${slug}`
    return `${repo}/${filePath}.tsx`
}

/**
 * Figma component link. Currently a placeholder to the main Figma file;
 * when component node-IDs are mapped, this can deep-link to specific components.
 */
export const figmaDesignUrl = (): string =>
    'https://www.figma.com/design/vvf035VybcSNoOWLVRwIVd/Bupa-Aged-Care-Design-System'

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
