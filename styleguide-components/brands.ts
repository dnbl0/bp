/*
    The brand registry for the multi-brand Bupa design system.

    The site is modelled on GitHub Primer: a shared, brand-neutral core
    (`/design-system`) holds the foundations and base components, and each line
    of business — Health Care, Vision & Eyewear, Dental Care, Aged Care and
    Corporate & Business — is a sub-brand living under its own path
    (`/design-system/health-care`, …). Every brand shares the same palette and
    type; sub-brands differ only by content.

    Each brand owns its own information architecture (`navSections`), from which
    the sidebar, breadcrumbs, previous/next pager and search are derived. The
    core brand reuses the existing IA in designSystem.config.ts; the sub-brands
    add their own pages and re-surface the core Foundations section as inherited
    links pointing back to core.
*/
import {
    DocStatus,
    NavItem,
    NavSection,
    SITE_TAGLINE,
    SITE_TITLE,
    navSections as coreNavSections,
} from './designSystem.config'

export interface Brand {
    /** Stable id, matching the path segment for sub-brands. */
    id: string
    /** Short name shown in the switcher and on brand cards. */
    label: string
    /** Full name used in the document title and breadcrumb root. */
    title: string
    tagline: string
    /** `/design-system` for core, `/design-system/<id>` for sub-brands. */
    basePath: string
    status: DocStatus
    /** Full IA, including inherited sections, used to render the sidebar. */
    navSections: NavSection[]
    /** Flattened nav, used by search. */
    allDocs: NavItem[]
    /** The brand's own pages (inherited items removed), used for paging. */
    pagingDocs: NavItem[]
    isCore?: boolean
}

const CORE_BASE_PATH = '/design-system'

/** Joins a brand base path and a page slug into an absolute href. */
export const hrefForSlug = (brand: Brand, slug: string): string =>
    slug ? `${brand.basePath}/${slug}` : brand.basePath

/**
 * The href for a nav item: an inherited item carries its own absolute `href`
 * into another brand; everything else is resolved against the brand base path.
 */
export const hrefForItem = (brand: Brand, item: NavItem): string =>
    item.href ?? hrefForSlug(brand, item.slug)

/**
 * Builds the "Foundations (shared)" sidebar section for a sub-brand by mapping
 * the core Foundations items to inherited links that point back to core.
 */
const sharedFoundations = (): NavSection => {
    const core = coreNavSections.find(section => section.title === 'Foundations')
    const items = (core?.items ?? []).map(item => ({
        ...item,
        href: item.slug ? `${CORE_BASE_PATH}/${item.slug}` : CORE_BASE_PATH,
        inherited: true,
    }))
    return { title: 'Foundations (shared)', items }
}

/**
 * Assembles a Brand, deriving the flattened `allDocs` (for search) and
 * `pagingDocs` (the brand's own pages, for breadcrumbs and the prev/next
 * pager — inherited foundations belong to core's reading order, not this
 * brand's).
 */
const makeBrand = (
    brand: Omit<Brand, 'allDocs' | 'pagingDocs'>
): Brand => {
    const allDocs = brand.navSections.flatMap(section => section.items)
    return {
        ...brand,
        allDocs,
        pagingDocs: allDocs.filter(item => !item.inherited),
    }
}

export const core: Brand = makeBrand({
    id: 'core',
    label: 'Core',
    title: SITE_TITLE,
    tagline: SITE_TAGLINE,
    basePath: CORE_BASE_PATH,
    status: 'stable',
    navSections: coreNavSections,
    isCore: true,
})

/**
 * Builds a sub-brand from its own pages plus the shared foundations. Each
 * sub-brand has an Overview group (its landing + one representative page) and
 * the inherited Foundations section.
 */
const makeSubBrand = (config: {
    id: string
    label: string
    title: string
    tagline: string
    overview: NavItem
}): Brand =>
    makeBrand({
        id: config.id,
        label: config.label,
        title: config.title,
        tagline: config.tagline,
        basePath: `${CORE_BASE_PATH}/${config.id}`,
        status: 'in-review',
        navSections: [
            {
                title: 'Overview',
                items: [
                    {
                        title: 'Introduction',
                        slug: '',
                        status: 'in-review',
                        summary: config.tagline,
                    },
                    config.overview,
                ],
            },
            sharedFoundations(),
        ],
    })

export const healthCare = makeSubBrand({
    id: 'health-care',
    label: 'Health Care',
    title: 'Bupa Health Care',
    tagline: 'Health insurance and care services built on the Bupa foundations.',
    overview: {
        title: 'Cover comparison',
        slug: 'cover-comparison',
        status: 'in-review',
        summary: 'Comparing health cover tiers and member-facing product pages.',
        keywords: ['health', 'insurance', 'cover', 'plans', 'members', 'claims'],
    },
})

export const vision = makeSubBrand({
    id: 'vision',
    label: 'Vision & Eyewear',
    title: 'Bupa Vision & Eyewear',
    tagline: 'Optical stores and eyewear experiences built on the Bupa foundations.',
    overview: {
        title: 'Eyewear guidelines',
        slug: 'eyewear-guidelines',
        status: 'in-review',
        summary: 'Frame galleries, lens guidance and store-locator patterns.',
        keywords: ['vision', 'optical', 'eyewear', 'glasses', 'lenses', 'frames'],
    },
})

export const dental = makeSubBrand({
    id: 'dental',
    label: 'Dental Care',
    title: 'Bupa Dental Care',
    tagline: 'Dental clinics and oral-health services built on the Bupa foundations.',
    overview: {
        title: 'Clinic pages',
        slug: 'clinic-pages',
        status: 'in-review',
        summary: 'Clinic locator, appointment booking and treatment guidance.',
        keywords: ['dental', 'dentist', 'clinic', 'appointment', 'oral health', 'booking'],
    },
})

/*
    Aged Care is the most built-out sub-brand: it is the line of business the
    design system originally documented, so it carries real brand-specific
    components (the care navigator, home-finder map, pricing calculator and
    nearby-homes widget) and page patterns (the care-home detail page and the
    find-a-home journey) on top of the shared foundations.
*/
export const agedCare: Brand = makeBrand({
    id: 'aged-care',
    label: 'Aged Care',
    title: 'Bupa Aged Care',
    tagline: 'Residential aged care and care homes built on the Bupa foundations.',
    basePath: `${CORE_BASE_PATH}/aged-care`,
    status: 'stable',
    navSections: [
        {
            title: 'Overview',
            items: [
                {
                    title: 'Introduction',
                    slug: '',
                    status: 'stable',
                    summary:
                        'Residential aged care and care homes built on the Bupa foundations.',
                },
                {
                    title: 'Care homes',
                    slug: 'care-homes',
                    status: 'stable',
                    summary:
                        'The care-home experience end to end: discovery, the home detail page, and conversion.',
                    keywords: ['aged care', 'care home', 'residential', 'overview', 'journey'],
                },
                {
                    title: 'Component library',
                    slug: 'components',
                    status: 'stable',
                    summary:
                        'Every component in the Aged Care experience, by atomic layer — shared ones link to core.',
                    keywords: ['components', 'library', 'catalog', 'catalogue', 'atomic', 'mirror', 'coverage'],
                },
            ],
        },
        {
            title: 'Care home components',
            items: [
                {
                    title: 'Care navigator',
                    slug: 'navigator',
                    status: 'stable',
                    summary:
                        'A guided, multi-step needs assessment that recommends an aged-care pathway.',
                    keywords: ['navigator', 'needs', 'assessment', 'wizard', 'pathway', 'steps'],
                },
                {
                    title: 'Home finder map',
                    slug: 'home-map',
                    status: 'stable',
                    summary:
                        'An interactive map and list of care-home locations with state and region filtering.',
                    keywords: ['map', 'locations', 'find', 'region', 'state', 'google maps', 'cluster'],
                },
                {
                    title: 'Pricing calculator',
                    slug: 'pricing',
                    status: 'stable',
                    summary:
                        'The accommodation and care cost estimator with RAD/DAP breakdowns.',
                    keywords: ['pricing', 'cost', 'calculator', 'rad', 'dap', 'fees', 'accommodation'],
                },
                {
                    title: 'Nearby homes',
                    slug: 'nearby-homes',
                    status: 'stable',
                    summary:
                        'A sidebar widget surfacing the closest care homes by distance.',
                    keywords: ['nearby', 'distance', 'closest', 'related', 'sidebar'],
                },
            ],
        },
        {
            title: 'Discovery & contact',
            items: [
                {
                    title: 'Home search hero',
                    slug: 'home-search',
                    status: 'stable',
                    summary:
                        'The hero with integrated search that opens the find-a-home journey.',
                    keywords: ['search', 'hero', 'autocomplete', 'places', 'suburb', 'postcode', 'find'],
                },
                {
                    title: 'Region browse',
                    slug: 'region-browse',
                    status: 'stable',
                    summary:
                        'The browse-by-region grid of care-home result cards with a three-column search hero.',
                    keywords: ['region', 'state', 'browse', 'result card', 'load more', 'grid'],
                },
                {
                    title: 'Contact card',
                    slug: 'contact-card',
                    status: 'stable',
                    summary:
                        'The conversion card: phone, hours, address and the book-a-tour / call / Calendly actions.',
                    keywords: ['contact', 'book a tour', 'call', 'callback', 'calendly', 'phone', 'directions'],
                },
                {
                    title: 'Header actions',
                    slug: 'header-actions',
                    status: 'stable',
                    summary:
                        'The aged-care CTA cluster in the global header: book a tour, call now, call me back.',
                    keywords: ['header', 'cta', 'book a tour', 'call now', 'call me back', 'contact'],
                },
            ],
        },
        {
            title: 'Patterns',
            items: [
                {
                    title: 'Care home page',
                    slug: 'home-page',
                    status: 'stable',
                    summary:
                        'The anatomy of a care-home detail page: gallery, contact, pricing, testimonials and nearby homes.',
                    keywords: ['template', 'detail', 'home page', 'layout', 'sidebar', 'anatomy'],
                },
                {
                    title: 'Find a care home',
                    slug: 'find-a-home',
                    status: 'in-review',
                    summary:
                        'The discovery journey from a region search to a shortlisted care home.',
                    keywords: ['search', 'find', 'discovery', 'journey', 'region', 'shortlist'],
                },
            ],
        },
        sharedFoundations(),
    ],
})

export const corporate = makeSubBrand({
    id: 'corporate-business',
    label: 'Corporate & Business',
    title: 'Bupa Corporate & Business',
    tagline: 'Employer, partner and business portals built on the Bupa foundations.',
    overview: {
        title: 'Business portals',
        slug: 'business-portals',
        status: 'in-review',
        summary: 'Employer dashboards, partner portals and corporate landing pages.',
        keywords: ['corporate', 'business', 'employer', 'partner', 'portal', 'b2b'],
    },
})

/** The core hub first, then the sub-brands in switcher order. */
export const brands: Brand[] = [
    core,
    healthCare,
    vision,
    dental,
    agedCare,
    corporate,
]

/**
 * Resolves the active brand from a router path. Because the core base path is
 * a prefix of every sub-brand path, brands are matched longest-base-path-first
 * on a path-segment boundary so a sub-brand page is never mistaken for core.
 */
export const brandForPath = (asPath: string): Brand => {
    const path = asPath.split(/[?#]/)[0]
    return (
        [...brands]
            .sort((a, b) => b.basePath.length - a.basePath.length)
            .find(
                brand =>
                    path === brand.basePath ||
                    path.startsWith(`${brand.basePath}/`)
            ) ?? core
    )
}

/** The title of the nav section that contains the given slug within a brand. */
export const sectionTitleFor = (
    brand: Brand,
    slug: string
): string | undefined => {
    for (const section of brand.navSections) {
        if (section.items.some(item => !item.inherited && item.slug === slug)) {
            return section.title
        }
    }
    return undefined
}

/**
 * The brand's own pages immediately before and after `slug` in reading order,
 * used for the previous/next pager. Inherited foundations are excluded.
 */
export const adjacentDocs = (
    brand: Brand,
    slug: string
): { prev?: NavItem; next?: NavItem } => {
    const index = brand.pagingDocs.findIndex(doc => doc.slug === slug)
    if (index === -1) return {}
    return {
        prev: index > 0 ? brand.pagingDocs[index - 1] : undefined,
        next:
            index < brand.pagingDocs.length - 1
                ? brand.pagingDocs[index + 1]
                : undefined,
    }
}
