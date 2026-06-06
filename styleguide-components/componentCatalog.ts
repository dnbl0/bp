/*
    A catalogue of every component in the library, grouped by atomic-design
    layer. This drives the Components overview page and gives full-coverage
    visibility of the system. Entries with a `docSlug` have a dedicated, live
    documentation page; the rest are catalogued with a status so coverage and
    maturity are always visible.
*/
import { DocStatus } from './designSystem.config'

export interface ComponentEntry {
    name: string
    /** Source path relative to the repo root. */
    source: string
    description: string
    status: DocStatus
    /** Slug of a dedicated docs page, if one exists. */
    docSlug?: string
}

export interface ComponentLayer {
    title: string
    description: string
    components: ComponentEntry[]
}

export const componentLayers: ComponentLayer[] = [
    {
        title: 'Atoms',
        description:
            'The smallest building blocks — single-purpose elements that everything else is composed from.',
        components: [
            { name: 'Button', source: 'styles/components/buttons.css', description: 'Primary, secondary, ghost and tertiary actions in three sizes with inverse variants.', status: 'stable', docSlug: 'components/button' },
            { name: 'Tag', source: 'components/atoms/Tag.tsx', description: 'A small, colourable label that links to a page or in-page anchor.', status: 'stable', docSlug: 'components/tag' },
            { name: 'Section', source: 'components/atoms/Section.tsx', description: 'A full-width layout band with configurable background and vertical padding.', status: 'in-review' },
            { name: 'ResponsiveImage', source: 'components/atoms/ResponsiveImage.tsx', description: 'A CMS-aware image that serves responsive sources from Contentful.', status: 'in-review' },
            { name: 'RichTextContent', source: 'components/atoms/RichTextContent.tsx', description: 'Renders Contentful rich text into styled HTML.', status: 'in-review' },
            { name: 'FormSelector', source: 'components/atoms/FormSelector.tsx', description: 'Resolves and renders the correct form for a CMS form reference.', status: 'in-review' },
            { name: 'SmallSearchInput', source: 'components/atoms/SmallSearchInput.tsx', description: 'A compact search field used in the header and compact contexts.', status: 'in-review' },
            { name: 'ShowMoreButton', source: 'components/atoms/ShowMoreButton.tsx', description: 'A ghost button that expands to reveal additional markdown content.', status: 'stable', docSlug: 'components/show-more' },
            { name: 'BackToTop', source: 'components/atoms/BackToTop.tsx', description: 'A floating control that smooth-scrolls the page back to the top.', status: 'stable', docSlug: 'components/back-to-top' },
            { name: 'FullScreenModal', source: 'components/atoms/FullScreenModal.tsx', description: 'An accessible full-screen overlay container.', status: 'in-review' },
            { name: 'ErrorMessageWrapper', source: 'components/atoms/ErrorMessageWrapper.tsx', description: 'Standardised wrapper for inline form error messaging.', status: 'in-review' },
            { name: 'BelowHeader', source: 'components/atoms/BelowHeader.tsx', description: 'Spacing helper that offsets content beneath the fixed header.', status: 'in-review' },
            { name: 'HeaderStyle', source: 'components/atoms/HeaderStyle.tsx', description: 'Applies contextual header styling per page.', status: 'in-review' },
        ],
    },
    {
        title: 'Molecules',
        description:
            'Small groups of atoms working together, including the CMS-driven content blocks authored in Contentful.',
        components: [
            { name: 'HeroBanner', source: 'components/molecules/HeroBanner.tsx', description: 'A full-width hero with heading, copy and imagery.', status: 'stable', docSlug: 'components/hero' },
            { name: 'AlgoliaSearch', source: 'components/molecules/AlgoliaSearch.tsx', description: 'Instant search experience powered by Algolia.', status: 'in-review' },
            { name: 'Autocomplete', source: 'components/molecules/Autocomplete.tsx', description: 'Type-ahead suggestions for search queries.', status: 'in-review' },
            { name: 'YouTubeVideo', source: 'components/molecules/YouTubeVideo.tsx', description: 'A responsive, privacy-aware embedded YouTube player.', status: 'in-review' },
            { name: 'CmsElement', source: 'components/molecules/CmsElement.tsx', description: 'The dispatcher that maps a CMS block type to its component.', status: 'in-review' },
            { name: 'AlertBlock', source: 'components/molecules/blocks/AlertBlock.tsx', description: 'A dismissible, full-width site-wide notification banner.', status: 'stable', docSlug: 'components/alert' },
            { name: 'CtaBlock', source: 'components/molecules/blocks/CtaBlock.tsx', description: 'A call-to-action button driven by CMS size, variant and alignment options.', status: 'stable', docSlug: 'components/cta' },
            { name: 'AccordionBlock', source: 'components/molecules/blocks/AccordionBlock', description: 'A list of expandable/collapsible question-and-answer panels.', status: 'stable', docSlug: 'components/accordion' },
            { name: 'CardBlock', source: 'components/molecules/blocks/CardBlock.tsx', description: 'A content card with image, heading, body and optional CTA.', status: 'in-review' },
            { name: 'ColouredCardBlock', source: 'components/molecules/blocks/ColouredCardBlock.tsx', description: 'A card variant with a coloured background surface.', status: 'stable', docSlug: 'components/coloured-card' },
            { name: 'ContactCardBlock', source: 'components/molecules/blocks/ContactCardBlock.tsx', description: 'A card presenting contact details and actions.', status: 'in-review' },
            { name: 'ImageCardBlock', source: 'components/molecules/blocks/ImageCardBlock.tsx', description: 'An image-led card.', status: 'in-review' },
            { name: 'PromotionCardBlock', source: 'components/molecules/blocks/PromotionCardBlock.tsx', description: 'A promotional card for campaigns and offers.', status: 'in-review' },
            { name: 'TestimonialCardBlock', source: 'components/molecules/blocks/TestimonialCardBlock.tsx', description: 'A card presenting a customer testimonial.', status: 'stable', docSlug: 'components/testimonial' },
            { name: 'VideoCardBlock', source: 'components/molecules/blocks/VideoCardBlock.tsx', description: 'A card with an embedded or linked video.', status: 'in-review' },
            { name: 'NearbyCardBlock', source: 'components/molecules/blocks/NearbyCardBlock.tsx', description: 'A card surfacing nearby aged-care homes.', status: 'in-review' },
            { name: 'HeadingBlock', source: 'components/molecules/blocks/HeadingBlock.tsx', description: 'A standalone section heading.', status: 'in-review' },
            { name: 'ImageBlock', source: 'components/molecules/blocks/ImageBlock.tsx', description: 'A standalone responsive image.', status: 'in-review' },
            { name: 'ImageGallery', source: 'components/molecules/blocks/ImageGallery.tsx', description: 'A gallery of images with a full-screen modal viewer.', status: 'in-review' },
            { name: 'CarouselBlock', source: 'components/molecules/blocks/CarouselBlock.tsx', description: 'A horizontally scrolling carousel of content.', status: 'in-review' },
            { name: 'MarkdownBlock', source: 'components/molecules/blocks/MarkdownBlock.tsx', description: 'Renders markdown content into styled prose.', status: 'in-review' },
            { name: 'RichTextBlock', source: 'components/molecules/blocks/RichTextBlock.tsx', description: 'Renders a Contentful rich-text field.', status: 'in-review' },
            { name: 'BreadCrumbsBlock', source: 'components/molecules/blocks/BreadCrumbsBlock.tsx', description: 'Breadcrumb navigation for the current page.', status: 'stable', docSlug: 'components/breadcrumbs' },
            { name: 'TagsBlock', source: 'components/molecules/blocks/TagsBlock.tsx', description: 'A group of Tag atoms.', status: 'in-review' },
            { name: 'StickyBar', source: 'components/molecules/blocks/StickyBar.tsx', description: 'A bar that sticks to the viewport while scrolling.', status: 'in-review' },
            { name: 'BlogBlock', source: 'components/molecules/blocks/BlogBlock.tsx', description: 'A list of blog story cards.', status: 'in-review' },
            { name: 'PricingBlock', source: 'components/molecules/blocks/PricingBlock.tsx', description: 'Displays aged-care pricing information.', status: 'in-review' },
            { name: 'PricingCalculatorBlock', source: 'components/molecules/blocks/PricingCalculatorBlock.tsx', description: 'An interactive cost-of-care calculator.', status: 'in-review' },
            { name: 'CalendlyBlock', source: 'components/molecules/blocks/CalendlyBlock.tsx', description: 'An embedded Calendly scheduling widget.', status: 'in-review' },
            { name: 'FormBlock', source: 'components/molecules/blocks/FormBlock.tsx', description: 'Renders a referenced form within page content.', status: 'in-review' },
            { name: 'AgedCareHomeMapBlock', source: 'components/molecules/blocks/AgedCareHomeMapBlock', description: 'A map of aged-care home locations.', status: 'in-review' },
            { name: 'AgedCareNavigator', source: 'components/molecules/blocks/AgedCareNavigator.tsx', description: 'A guided, multi-step aged-care needs navigator.', status: 'in-review' },
            { name: 'SearchPageBlock', source: 'components/molecules/blocks/SearchPageBlock.tsx', description: 'The full search results experience.', status: 'in-review' },
        ],
    },
    {
        title: 'Sections',
        description:
            'Full-width composition layouts that arrange blocks into rows, columns and grids.',
        components: [
            { name: 'BasicHeroSection', source: 'components/molecules/sections/BasicHeroSection.tsx', description: 'A standard page hero band.', status: 'stable', docSlug: 'components/sections' },
            { name: 'ContactHeroSection', source: 'components/molecules/sections/ContactHeroSection.tsx', description: 'A hero with contact-oriented calls to action.', status: 'stable', docSlug: 'components/sections' },
            { name: 'SearchHomeHeroSection', source: 'components/molecules/sections/SearchHomeHeroSection', description: 'The homepage hero with integrated search.', status: 'stable', docSlug: 'components/sections' },
            { name: 'ThreeColumnSearchHeroSection', source: 'components/molecules/sections/ThreeColumnSearchHeroSection.tsx', description: 'A three-column hero with search.', status: 'stable', docSlug: 'components/sections' },
            { name: 'BannerSection', source: 'components/molecules/sections/BannerSection.tsx', description: 'A promotional banner band.', status: 'stable', docSlug: 'components/sections' },
            { name: 'OneColumnSection', source: 'components/molecules/sections/OneColumnSection.tsx', description: 'A single-column content band.', status: 'stable', docSlug: 'components/sections' },
            { name: 'TwoColumnSection', source: 'components/molecules/sections/TwoColumnSection.tsx', description: 'A two-column content band.', status: 'stable', docSlug: 'components/sections' },
            { name: 'Section12', source: 'components/molecules/sections/Section12.tsx', description: 'A 12-unit grid band.', status: 'stable', docSlug: 'components/sections' },
            { name: 'Section6x6', source: 'components/molecules/sections/Section6x6.tsx', description: 'A two-up (6+6) grid band.', status: 'stable', docSlug: 'components/sections' },
            { name: 'Section4x8', source: 'components/molecules/sections/Section4x8.tsx', description: 'An asymmetric (4+8) grid band.', status: 'stable', docSlug: 'components/sections' },
            { name: 'Section4x4x4', source: 'components/molecules/sections/Section4x4x4.tsx', description: 'A three-up (4+4+4) grid band.', status: 'stable', docSlug: 'components/sections' },
            { name: 'Section3x3x3x3', source: 'components/molecules/sections/Section3x3x3x3.tsx', description: 'A four-up (3+3+3+3) grid band.', status: 'stable', docSlug: 'components/sections' },
            { name: 'RegionListDetailSection', source: 'components/molecules/sections/RegionListDetailSection.tsx', description: 'A list/detail layout for browsing regions.', status: 'stable', docSlug: 'components/sections' },
            { name: 'NavigationBar', source: 'components/molecules/sections/NavigationBar', description: 'In-page section navigation.', status: 'in-review' },
        ],
    },
    {
        title: 'Organisms',
        description:
            'Large, self-contained regions that combine many molecules into a complete piece of interface.',
        components: [
            { name: 'Header', source: 'components/organisms/Header', description: 'The global site header with primary navigation and search.', status: 'stable', docSlug: 'components/header' },
            { name: 'Footer', source: 'components/organisms/Footer', description: 'The global site footer with navigation, legal and social links.', status: 'stable', docSlug: 'components/footer' },
            { name: 'PreviewEnabledNotification', source: 'components/organisms/PreviewEnabledNotification.tsx', description: 'A banner shown when CMS preview mode is active.', status: 'in-review' },
            { name: 'LinkHandler', source: 'components/organisms/LinkHandler.tsx', description: 'Centralised handling of internal and external link behaviour.', status: 'in-review' },
        ],
    },
    {
        title: 'Templates',
        description: 'Page-level scaffolds that arrange organisms and sections into a full page.',
        components: [
            { name: 'PrimaryPageTemplate', source: 'components/templates/PrimaryPageTemplate.tsx', description: 'The standard content page layout with header, sections and footer.', status: 'in-review' },
            { name: 'BlankLayout', source: 'components/templates/BlankLayout.tsx', description: 'A minimal layout with no global chrome.', status: 'in-review' },
        ],
    },
]

export const componentCount = componentLayers.reduce(
    (total, layer) => total + layer.components.length,
    0
)
