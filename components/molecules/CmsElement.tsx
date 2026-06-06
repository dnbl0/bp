import {
    CmsAccordionBlock,
    CmsAgedCareHomeDetailsTemplate,
    CmsAgedCareHomeMap,
    CmsBasicHeroSection,
    CmsCalendlyBlock,
    CmsBlogBlock,
    CmsCard,
    CmsCarousel,
    CmsColouredCard,
    CmsContactCard,
    CmsContactHeroSection,
    CmsContentfulMetadata,
    CmsCtaBlock,
    CmsFormBlock,
    CmsGrid12,
    CmsGrid3X3X3X3,
    CmsGrid4X4X4,
    CmsGrid4X8,
    CmsGrid6X6,
    CmsHeadingBlock,
    CmsImageBlock,
    CmsImageCard,
    CmsNavigationBar,
    CmsOneColumnSection,
    CmsPricingCard,
    CmsPromotionCard,
    CmsRegionListDetailsSection,
    CmsRichTextBlock,
    CmsSearchHomeHeroSection,
    CmsThreeColumnSearchHomeHeroSection,
    CmsSingleColumnTemplate,
    CmsTestimonialCard,
    CmsTwoColumnSection,
    CmsVideoCard,
    CmsPricingCalculatorCard,
    CmsAgedCareNavigator
} from '../../types/contentful-cms-types'

import { ComponentType } from 'react'
import { AccordionBlock } from './blocks/AccordionBlock'
import { AgedCareHomeMapBlock } from './blocks/AgedCareHomeMapBlock'
import { CardBlock } from './blocks/CardBlock'
import { ColouredCardBlock } from './blocks/ColouredCardBlock'
import { ContactCardBlock } from './blocks/ContactCardBlock'
import { CtaBlock } from './blocks/CtaBlock'
import { HeadingBlock } from './blocks/HeadingBlock'
import { ImageBlock } from './blocks/ImageBlock'
import { ImageCardBlock } from './blocks/ImageCardBlock'
import { PromotionCardBlock } from './blocks/PromotionCardBlock'
import { RichTextBlock } from './blocks/RichTextBlock'
import { TagsBlock } from './blocks/TagsBlock'
import { TestimonialCardBlock } from './blocks/TestimonialCardBlock'
import { VideoCardBlock } from './blocks/VideoCardBlock'
import { BasicHeroSection } from './sections/BasicHeroSection'
import { ContactHeroSection } from './sections/ContactHeroSection'
import { NavigationBar } from './sections/NavigationBar'
import { OneColumnSection } from './sections/OneColumnSection'
import { RegionListDetailSection } from './sections/RegionListDetailSection'
import { SearchHomeHeroSection } from './sections/SearchHomeHeroSection'
import { ThreeColumnSearchHomeHeroSection } from './sections/ThreeColumnSearchHeroSection'
import { Section12 } from './sections/Section12'
import { Section3x3x3x3 } from './sections/Section3x3x3x3'
import { Section4x4x4 } from './sections/Section4x4x4'
import { Section4x8 } from './sections/Section4x8'
import { Section6x6 } from './sections/Section6x6'
import { TwoColumnSection } from './sections/TwoColumnSection'
import { AgedCareHomeDetailsTemplate } from './templates/AgedCareHomeDetailsTemplate'
import { SingleColumnTemplate } from './templates/SingleColumnTemplate'
import { PricingBlock } from './blocks/PricingBlock'
import { FormBlock } from './blocks/FormBlock'
import { CalendlyBlock } from './blocks/CalendlyBlock'
import { CarouselBlock } from './blocks/CarouselBlock'
import { BlogBlock } from './blocks/BlogBlock'
import {PricingCalculatorBlock} from './blocks/PricingCalculatorBlock'
import { AgedCareNavigator } from './blocks/AgedCareNavigator'

// The `AnyCmsElement` type represents a `Section`, `Block` or equivalent item in Contentful.
// This type is permissive to avoid breaking the build when new content models are created
// in Contentful.
export type AnyCmsElement = {
    __typename: string
}

// The `SupportedCmsElement` is the subset of `AnyCmsElement` items that are supported
// by this codebase. All supported items can be rendered on the frontend. All other
// items will be ignored.
type SupportedCmsElement =
    | CmsAccordionBlock
    | CmsAgedCareHomeDetailsTemplate
    | CmsAgedCareHomeMap
    | CmsCard
    | CmsColouredCard
    | CmsContactCard
    | CmsContactHeroSection
    | CmsCtaBlock
    | CmsFormBlock
    | CmsGrid12
    | CmsGrid3X3X3X3
    | CmsGrid4X4X4
    | CmsGrid4X8
    | CmsGrid6X6
    | CmsHeadingBlock
    | CmsImageBlock
    | CmsImageCard
    | CmsNavigationBar
    | CmsPromotionCard
    | CmsRichTextBlock
    | CmsSearchHomeHeroSection
    | CmsThreeColumnSearchHomeHeroSection
    | CmsSingleColumnTemplate
    | CmsTestimonialCard
    | CmsOneColumnSection
    | CmsTwoColumnSection
    | CmsVideoCard
    | CmsRegionListDetailsSection
    | CmsContentfulMetadata
    | CmsBasicHeroSection
    | CmsPricingCard
    | CmsCalendlyBlock
    | CmsCarousel
    | CmsBlogBlock
    | CmsPricingCalculatorCard
    | CmsAgedCareNavigator

interface CmsElementProps {
    block: AnyCmsElement | null | undefined
}

export const CmsElement = ({ component }: { component: CmsElementProps }) => {
    const { block } = component
    if (!block) return null
    const TagName = getCmsElementComponent(block.__typename)
    if (!TagName) {
        console.warn(`CmsElement cannot display element: "${block.__typename}"`)
    }
    return TagName ? <TagName component={block} /> : null
}

const ComponentLookup: Record<
    SupportedCmsElement['__typename'],
    ComponentType<any>
> = {
    AccordionBlock: AccordionBlock,
    AgedCareHomeDetailsTemplate: AgedCareHomeDetailsTemplate,
    AgedCareHomeMap: AgedCareHomeMapBlock,
    AgedCareNavigator: AgedCareNavigator,
    Card: CardBlock,
    ColouredCard: ColouredCardBlock,
    ContactCard: ContactCardBlock,
    ContactHeroSection: ContactHeroSection,
    CtaBlock: CtaBlock,
    FormBlock: FormBlock,
    Grid12: Section12,
    Grid3X3X3X3: Section3x3x3x3,
    Grid4X4X4: Section4x4x4,
    Grid4X8: Section4x8,
    Grid6X6: Section6x6,
    HeadingBlock: HeadingBlock,
    ImageBlock: ImageBlock,
    ImageCard: ImageCardBlock,
    NavigationBar: NavigationBar,
    PromotionCard: PromotionCardBlock,
    RichTextBlock: RichTextBlock,
    SearchHomeHeroSection: SearchHomeHeroSection,
    ThreeColumnSearchHomeHeroSection: ThreeColumnSearchHomeHeroSection,
    SingleColumnTemplate: SingleColumnTemplate,
    TestimonialCard: TestimonialCardBlock,
    OneColumnSection: OneColumnSection,
    TwoColumnSection: TwoColumnSection,
    VideoCard: VideoCardBlock,
    RegionListDetailsSection: RegionListDetailSection,
    ContentfulMetadata: TagsBlock,
    BasicHeroSection: BasicHeroSection,
    PricingCard: PricingBlock,
    CalendlyBlock: CalendlyBlock,
    Carousel: CarouselBlock,
    BlogBlock: BlogBlock,
    PricingCalculatorCard: PricingCalculatorBlock
}

const getCmsElementComponent = (
    key: string
): ComponentType<any> | undefined => {
    return (ComponentLookup as any)[key]
}
