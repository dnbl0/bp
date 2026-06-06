/*
    Themed "group" pages document the integration-heavy components that don't
    lend themselves to a standalone live demo (they need Algolia, Google Maps,
    Calendly or live CMS data). Each entry records what the component is, where
    it lives and the key integration/usage notes, so coverage stays complete
    and honest without shipping thin or misleading demos.
*/
export interface GroupEntry {
    name: string
    source: string
    summary: string
    /** Integration / usage notes specific to this component. */
    note: string
}

export interface ComponentGroup {
    slug: string
    title: string
    eyebrow: string
    intro: string
    entries: GroupEntry[]
}

export const componentGroups: ComponentGroup[] = [
    {
        slug: 'components/group-search',
        title: 'Search & navigation',
        eyebrow: 'Components · Group',
        intro: 'The find-a-home search experience and in-page navigation. These are powered by Algolia and live CMS data, so they are documented here rather than as isolated demos.',
        entries: [
            { name: 'SmallSearchInput', source: 'components/atoms/SmallSearchInput.tsx', summary: 'A compact search field for the header and tight spaces.', note: 'Presentational input; submits the query to the search route. Reuses the SearchIcon atom.' },
            { name: 'AlgoliaSearch', source: 'components/molecules/AlgoliaSearch.tsx', summary: 'The instant-search results experience.', note: 'Built on react-instantsearch-dom / instantsearch.js. Requires Algolia app id, search key and index env configuration.' },
            { name: 'Autocomplete', source: 'components/molecules/Autocomplete.tsx', summary: 'Type-ahead query suggestions.', note: 'Uses @algolia/autocomplete-js with query-suggestion and recent-search plugins; styled by the classic theme plus styles/components/autocomplete.css.' },
            { name: 'SearchPageBlock', source: 'components/molecules/blocks/SearchPageBlock.tsx', summary: 'The full search results page composition.', note: 'Combines Autocomplete, AlgoliaSearch and result cards. Provide a clear empty state (SearchEmpty icon) when nothing matches.' },
            { name: 'NavigationBar', source: 'components/molecules/sections/NavigationBar', summary: 'In-page section navigation with scroll targets.', note: 'Pairs with ScrollTargetAnchor (used by HeadingBlock and AccordionBlock) to jump to anchored sections.' },
        ],
    },
    {
        slug: 'components/group-media',
        title: 'Media & imagery',
        eyebrow: 'Components · Group',
        intro: 'Components that present images and video. Most resolve responsive sources from Contentful, so they need live CMS assets to render.',
        entries: [
            { name: 'ResponsiveImage', source: 'components/atoms/ResponsiveImage.tsx', summary: 'A CMS-aware image with responsive sources.', note: 'Wraps next/image. Supports layout="fill" | "responsive" | "intrinsic" | "fixed"; serves sized sources from images.ctfassets.net.' },
            { name: 'ImageBlock', source: 'components/molecules/blocks/ImageBlock.tsx', summary: 'A standalone responsive image block.', note: 'Thin wrapper around ResponsiveImage for use directly in page content.' },
            { name: 'ImageGallery', source: 'components/molecules/blocks/ImageGallery.tsx', summary: 'A gallery with a full-screen modal viewer.', note: 'Built on react-image-gallery and the ImageModal/FullScreenModal; styled via styles/components/gallery.css.' },
            { name: 'CarouselBlock', source: 'components/molecules/blocks/CarouselBlock.tsx', summary: 'A horizontally scrolling carousel.', note: 'Uses react-responsive-carousel. Keep slide counts modest and ensure controls are keyboard accessible.' },
            { name: 'YouTubeVideo', source: 'components/molecules/YouTubeVideo.tsx', summary: 'A privacy-aware embedded YouTube player.', note: 'Shows a placeholder until played; loads via the YouTube iframe API script registered in _document. See also the Video card page.' },
        ],
    },
    {
        slug: 'components/group-content',
        title: 'Content & text',
        eyebrow: 'Components · Group',
        intro: 'The building blocks that render long-form copy and structure content bands. They turn CMS rich text and markdown into styled prose.',
        entries: [
            { name: 'RichTextContent', source: 'components/atoms/RichTextContent.tsx', summary: 'Renders Contentful rich text to React.', note: 'Uses @contentful/rich-text-react-renderer. Accepts an isColouredCard flag to invert text on coloured surfaces.' },
            { name: 'RichTextBlock', source: 'components/molecules/blocks/RichTextBlock.tsx', summary: 'A rich-text field as a content block.', note: 'Wraps RichTextContent for direct placement in page content.' },
            { name: 'MarkdownBlock', source: 'components/molecules/blocks/MarkdownBlock.tsx', summary: 'Renders markdown to styled prose.', note: 'Uses marked + sanitize-html; output styled by styles/components/prose.css and the typography plugin.' },
            { name: 'HeaderStyle', source: 'components/atoms/HeaderStyle.tsx', summary: 'Resolves the correct heading element and styling.', note: 'Returns a heading component for a given CMS size; used by HeadingBlock and the coloured card.' },
            { name: 'Section', source: 'components/atoms/Section.tsx', summary: 'A full-width layout band.', note: 'Provides consistent horizontal padding and a content width; the basis for sections and the footer.' },
            { name: 'BelowHeader', source: 'components/atoms/BelowHeader.tsx', summary: 'Offsets content beneath the fixed header.', note: 'A spacing helper so anchored content is not hidden behind the sticky header.' },
            { name: 'StickyBar', source: 'components/molecules/blocks/StickyBar.tsx', summary: 'A bar that sticks while scrolling.', note: 'Uses the z-sticky layer; keep contents short so it does not crowd the viewport on mobile.' },
        ],
    },
    {
        slug: 'components/group-forms',
        title: 'Forms & booking',
        eyebrow: 'Components · Group',
        intro: 'Lead-capture forms and booking flows. Forms render through the SnapForms integration and can appear inline or in a modal.',
        entries: [
            { name: 'FormSelector', source: 'components/atoms/FormSelector.tsx', summary: 'Resolves the correct form for a CMS reference.', note: 'Maps a form id to its SnapForm; the SnapForm context and modal are provided in _app.' },
            { name: 'FormBlock', source: 'components/molecules/blocks/FormBlock.tsx', summary: 'Renders a referenced form within content.', note: 'Surfaces a FormSelector inline in the page body.' },
            { name: 'ErrorMessageWrapper', source: 'components/atoms/ErrorMessageWrapper.tsx', summary: 'Standardised inline error messaging.', note: 'Use error-red for the message; pair with the field it describes for screen readers.' },
            { name: 'FullScreenModal', source: 'components/atoms/FullScreenModal.tsx', summary: 'An accessible full-screen overlay.', note: 'Renders at the z-modal layer over a z-modal-backdrop scrim; trap focus and restore it on close.' },
            { name: 'CalendlyBlock', source: 'components/molecules/blocks/CalendlyBlock.tsx', summary: 'An embedded Calendly scheduler.', note: 'Requires NEXT_PUBLIC_CALENDLY_PREFIX; loads the Calendly widget for booking tours/callbacks.' },
        ],
    },
    {
        slug: 'components/group-tools',
        title: 'Data-driven tools',
        eyebrow: 'Components · Group',
        intro: 'Interactive tools and listing components backed by live data — pricing, the care navigator, maps and feeds. They need their data sources to render meaningfully.',
        entries: [
            { name: 'PricingBlock', source: 'components/molecules/blocks/PricingBlock.tsx', summary: 'Displays aged-care pricing information.', note: 'Styled via styles/components/pricingComponent.css. Present fees clearly with their conditions.' },
            { name: 'PricingCalculatorBlock', source: 'components/molecules/blocks/PricingCalculatorBlock.tsx', summary: 'An interactive cost-of-care calculator.', note: 'Uses react-currency-input-field; validates inputs with zod. State is reflected in the URL for shareable estimates.' },
            { name: 'AgedCareNavigator', source: 'components/molecules/blocks/AgedCareNavigator.tsx', summary: 'A guided, multi-step needs navigator.', note: 'Steps and options come from the CMS; the result maps the user’s answers to recommended next actions.' },
            { name: 'AgedCareHomeMapBlock', source: 'components/molecules/blocks/AgedCareHomeMapBlock', summary: 'A map of care-home locations.', note: 'Uses google-maps-react-markers with supercluster clustering; requires a Google Maps API key.' },
            { name: 'NearbyCardBlock', source: 'components/molecules/blocks/NearbyCardBlock.tsx', summary: 'Surfaces nearby aged-care homes.', note: 'Uses geolocation/distance helpers to rank homes by proximity.' },
            { name: 'BlogBlock', source: 'components/molecules/blocks/BlogBlock.tsx', summary: 'A list of blog story cards.', note: 'Fetches stories from the CMS; pairs with BlogComponent for the article layout.' },
            { name: 'CardBlock', source: 'components/molecules/blocks/CardBlock.tsx', summary: 'A simple heading + rich-text card.', note: 'A placeholder card pending its full design; renders a heading and rich-text content.' },
        ],
    },
    {
        slug: 'components/group-infra',
        title: 'Infrastructure & templates',
        eyebrow: 'Components · Group',
        intro: 'The plumbing that assembles the experience: the block dispatcher, link handling, preview affordances and the page templates, plus the third-party global chrome (chat and consent) that the production site mounts on every page.',
        entries: [
            { name: 'CmsElement', source: 'components/molecules/CmsElement.tsx', summary: 'Maps a CMS block type to its component.', note: 'The central dispatcher: every content block is rendered through here based on its __typename.' },
            { name: 'LinkHandler', source: 'components/organisms/LinkHandler.tsx', summary: 'Centralised internal/external link behaviour.', note: 'A context provider (mounted in _app) that normalises link handling, including new-tab and tracking behaviour.' },
            { name: 'PreviewEnabledNotification', source: 'components/organisms/PreviewEnabledNotification.tsx', summary: 'Banner shown when CMS preview is active.', note: 'Signals that draft content is being viewed; offers a way to exit preview mode.' },
            { name: 'PrimaryPageTemplate', source: 'components/templates/PrimaryPageTemplate.tsx', summary: 'The standard content page layout.', note: 'Composes the header, CMS sections and footer; the default template for most pages.' },
            { name: 'BlankLayout', source: 'components/templates/BlankLayout.tsx', summary: 'A minimal layout with no global chrome.', note: 'Used for standalone routes (e.g. the Contentful app) that should not show the site header/footer.' },
            { name: 'ChatWidget', source: 'Third-party (Spectrm)', summary: 'The site-wide “Chat with us” assistant.', note: 'A vendor-managed widget (mounted via the spr-chat script and exposed as the #chat skip-link target). Documented here as an integration point — it is not an in-repo component, so there is no live demo. Keep its trigger reachable and ensure SkipLinks offers a “Skip to chat” destination.' },
            { name: 'CookieConsent', source: 'Third-party (OneTrust)', summary: 'The site-wide cookie / consent banner.', note: 'A vendor-managed consent manager loaded on every page before analytics fire. Documented as an integration point rather than an in-repo component. Ensure it traps focus while open and does not obscure the SkipLinks.' },
        ],
    },
]
