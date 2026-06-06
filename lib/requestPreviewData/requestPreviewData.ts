import {
    CmsAccordionBlock,
    CmsAgedCareHomeDetailsTemplate,
    CmsBasicHeroSection,
    CmsBlogBlock,
    CmsCalendlyBlock,
    CmsCard,
    CmsCarousel,
    CmsColouredCard,
    CmsContactCard,
    CmsContactHeroSection,
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
    CmsPricingCalculatorCard,
    CmsPricingCard,
    CmsPromotionCard,
    CmsRegionListDetailsSection,
    CmsRichTextBlock,
    CmsSearchHomeHeroSection,
    CmsSingleColumnTemplate,
    CmsTestimonialCard,
    CmsTwoColumnSection,
    CmsVideoCard,
    CmsThreeColumnSearchHomeHeroSection,
    CmsAgedCareNavigator
} from '../../types/contentful-cms-types'

import { DocumentNode } from 'graphql'
import { sendContentRequest } from '../contentfulGraphqlClient'
import { RequestEntryCollection } from '../../schema/requestEntryCollection'
import { gql } from '@apollo/client'
import { lowerCaseFirstLetter } from '../../utils/lowerCaseFirstLetter'
import FragmentBlockCard from '../../schema/fragmentBlockCard'
import FragmentBlockColouredCard from '../../schema/fragmentBlockColouredCard'
import FragmentBlockImageCard from '../../schema/fragmentBlockImageCard'
import FragmentBlockContactCard from '../../schema/fragmentBlockContactCard'
import FragmentBlockVideoCard from '../../schema/fragmentBlockVideoCard'
import FragmentBlockAccordion from '../../schema/fragmentBlockAccordion'
import FragmentBlockTestimonialCard from '../../schema/fragmentBlockTestimonialCard'
import FragmentBlockRichText from '../../schema/fragmentBlockRichText'
import FragmentBlockImage from '../../schema/fragmentBlockImage'
import FragmentBlockForm from '../../schema/fragmentBlockForm'
import FragmentCarousel from '../../schema/fragmentCarousel'
import FragmentContactHero from '../../schema/fragmentContactHeroSection'
import FragmentGrid3x3x3x3 from '../../schema/fragmentGrid3x3x3x3'
import FragmentGrid4x4x4 from '../../schema/fragmentGrid4x4x4'
import FragmentGrid4x8 from '../../schema/fragmentGrid4x8'
import FragmentGrid6x6 from '../../schema/fragmentGrid6x6'
import FragmentGrid12 from '../../schema/fragmentGrid12'
import FragmenSearchHomeHero from '../../schema/fragmentSearchHomeHeroSection'
import FragmentSectionNavigationBar from '../../schema/fragmentSectionNavigationBar'
import FragmentBlockCalendly from '../../schema/fragmentBlockCalendly'
import FragmentBlockCta from '../../schema/fragmentBlockCta'
import FragmentBlockHeading from '../../schema/fragmentBlockHeading'
import FragmentBlogBlock from '../../schema/fragmentBlogBlock'
import FragmentBlockPromotionCard from '../../schema/fragmentBlockPromotionCard'
import FragmentBlockPricing from '../../schema/fragmentBlockPricing'
import FragmentAgedCareHomeDetailsTemplate from '../../schema/fragmentAgedCareHomeDetailsTemplate'
import FragmentSingleColumnTemplate from '../../schema/fragmentSingleColumnTemplate'
import { isDefined } from '../../utils/typeguards'
import { RequestBasicHeroSection } from '../../schema/requestBasicHeroSection'
import { RequestListingRegionDetailsSection } from '../../schema/requestListingRegionDetailsSection'
import { RequestOneColumnSection } from '../../schema/requestOneColumnSection'
import { RequestTwoColumnSection } from '../../schema/requestTwoColumnSection'
import { requestSingleColumnTemplateById } from '../requestPageData/requestSingleColumnTemplate'
import FragmentPricingCalculatorCard from '../../schema/fragmentPricingCalculatorCard'
import { RequestAgedCareNavigator } from '../../schema/requestAgedCareNavigator'
import FragmentThreeColumnSearchHomeSection from '../../schema/fragmentThreeColumnSeachHomeSection'

/**
 * Supported sections are those that can be displayed on website.
 * Sections not in this list will be ignored.
 */
type SupportedSection =
    | CmsAccordionBlock
    | CmsAgedCareHomeDetailsTemplate
    | CmsCalendlyBlock
    | CmsCard
    | CmsColouredCard
    | CmsCtaBlock
    | CmsFormBlock
    | CmsHeadingBlock
    | CmsImageBlock
    | CmsImageCard
    | CmsPricingCard
    | CmsPromotionCard
    | CmsRichTextBlock
    | CmsTestimonialCard
    | CmsVideoCard
    | CmsCarousel
    | CmsContactCard
    | CmsContactHeroSection
    | CmsGrid12
    | CmsGrid3X3X3X3
    | CmsGrid4X4X4
    | CmsGrid4X8
    | CmsGrid6X6
    | CmsNavigationBar
    | CmsSearchHomeHeroSection
    | CmsBlogBlock
    | CmsBasicHeroSection
    | CmsRegionListDetailsSection
    | CmsOneColumnSection
    | CmsSingleColumnTemplate
    | CmsTwoColumnSection
    | CmsPricingCalculatorCard
    | CmsThreeColumnSearchHomeHeroSection
    | CmsAgedCareNavigator


export const requestPreviewData = async ({
    id,
    environment
}: {
    id: string
    environment: string
}) => {
    const request = RequestEntryCollection

    const showPreviewContent = true

    const entryData = await sendContentRequest({
        showPreviewContent,
        query: request,
        variables: { id },
        requestId: `requestSectionData: entryCollection`,
        environment: environment
    })

    const entity = entryData?.entryCollection?.items.filter(isDefined).shift()
    if (!entity) return undefined

    const previewEntity = entity?.__typename
    if (!previewEntity) return undefined

    const fragment = getFragment(previewEntity)
    if (!fragment) return undefined

    if (fragment.name==='singleColumnTemplate') {
        const previewEntityDataSc = await requestSingleColumnTemplateById(id,true)
        return {
            data: {singleColumnTemplate: previewEntityDataSc},
            entity: previewEntity,
        }
    } else {
        const requestPreviewEntity = fragment.fragment ?
        gql`
            query($id: String!) {
                block: ${lowerCaseFirstLetter(previewEntity)}(id: $id, preview: true) {
                    ...${fragment.name}
                }
            }
            ${fragment.code}
            ` : fragment.code
        const previewEntityData = await sendContentRequest({
            showPreviewContent,
            query: requestPreviewEntity,
            variables: { id, preview: true },
            requestId: `requestSectionData: ${previewEntity}`,
        })

        return {
            data: previewEntityData,
            entity: previewEntity,
        }
    }
}

const LookupObject: Record<SupportedSection['__typename'], fragmentLookup> = {
    AccordionBlock: { code: FragmentBlockAccordion, name: 'fragmentBlockAccordion', fragment: true },
    CalendlyBlock: { code: FragmentBlockCalendly, name: 'fragmentBlockCalendly', fragment: true },
    Card: { code: FragmentBlockCard, name: 'fragmentBlockCard', fragment: true },
    ColouredCard: { code: FragmentBlockColouredCard, name: 'fragmentBlockColouredCard', fragment: true },
    ContactCard: { code: FragmentBlockContactCard, name: 'fragmentBlockContactCard', fragment: true },
    CtaBlock: { code: FragmentBlockCta, name: 'fragmentBlockCta', fragment: true },
    FormBlock: { code: FragmentBlockForm, name: 'fragmentBlockForm', fragment: true },
    HeadingBlock: { code: FragmentBlockHeading, name: 'fragmentBlockHeading', fragment: true },
    ImageBlock: { code: FragmentBlockImage, name: 'fragmentBlockImage', fragment: true },
    ImageCard: { code: FragmentBlockImageCard, name: 'fragmentBlockImageCard', fragment: true },
    PricingCard: { code: FragmentBlockPricing, name: 'fragmentBlockPricing', fragment: true },
    PromotionCard: { code: FragmentBlockPromotionCard, name: 'fragmentBlockPromotionCard', fragment: true },
    RichTextBlock: { code: FragmentBlockRichText, name: 'fragmentBlockRichText', fragment: true },
    TestimonialCard: { code: FragmentBlockTestimonialCard, name: 'fragmentBlockTestimonialCard', fragment: true },
    VideoCard: { code: FragmentBlockVideoCard, name: 'fragmentBlockVideoCard', fragment: true },
    BlogBlock: { code: FragmentBlogBlock, name: 'fragmentBlogBlock', fragment: true },
    Carousel: { code: FragmentCarousel, name: 'fragmentCarousel', fragment: true },
    ContactHeroSection: { code: FragmentContactHero, name: 'fragmentContactHeroSection', fragment: true },
    Grid3X3X3X3: { code: FragmentGrid3x3x3x3, name: 'fragmentSection3x3x3x3', fragment: true },
    Grid4X4X4: { code: FragmentGrid4x4x4, name: 'fragmentSection4x4x4', fragment: true },
    Grid4X8: { code: FragmentGrid4x8, name: 'fragmentSection4x8', fragment: true },
    Grid6X6: { code: FragmentGrid6x6, name: 'fragmentSection6x6', fragment: true },
    Grid12: { code: FragmentGrid12, name: 'fragmentSection12', fragment: true },
    SearchHomeHeroSection: { code: FragmenSearchHomeHero, name: 'fragmentSearchHomeHeroSection', fragment: true },
    NavigationBar: { code: FragmentSectionNavigationBar, name: 'fragmentSectionNavigationBar', fragment: true },
    AgedCareHomeDetailsTemplate: {code: FragmentAgedCareHomeDetailsTemplate, name: 'agedCareHomeDetailsTemplate', fragment: true},
    SingleColumnTemplate: {code: FragmentSingleColumnTemplate, name: 'singleColumnTemplate', fragment: true},
    BasicHeroSection: {code: RequestBasicHeroSection, name: 'basicHeroSection', fragment: false},
    RegionListDetailsSection: {code: RequestListingRegionDetailsSection, name: 'regionListDetailsSection', fragment: false},
    OneColumnSection: {code: RequestOneColumnSection, name: 'oneColumnSection', fragment: false},
    TwoColumnSection: {code: RequestTwoColumnSection, name: 'twoColumnSection', fragment: false},
    PricingCalculatorCard: { code: FragmentPricingCalculatorCard, name: 'fragmentPricingCalculatorCard', fragment: true },
    ThreeColumnSearchHomeHeroSection: { code: FragmentThreeColumnSearchHomeSection, name: 'fragmentThreeColumnSearchHomeHeroSection', fragment: true },
    AgedCareNavigator: { code: RequestAgedCareNavigator, name: 'agedCareNavigator', fragment: false },
}

type fragmentLookup = {
    code: DocumentNode | undefined,
    name: string
    fragment?: boolean
}

const getFragment = (key: string) => {
    return (LookupObject as any)[key]
}
