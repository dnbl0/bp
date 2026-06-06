import type { GetServerSideProps, NextPage } from 'next'
import { NextPageWithLayout } from '../../../../types/nextLayout'

import { requestPreviewData } from '../../../../lib/requestPreviewData/requestPreviewData'
import { CmsElement } from '../../../../components/molecules/CmsElement'
import { BlankLayout } from '../../../../components/templates/BlankLayout'
import { 
    CmsAccordionBlock,
    CmsAgedCareHomeDetailsTemplate,
    CmsAgedCareHomeMap,
    CmsBasicHeroSection,
    CmsBlogBlock,
    CmsCalendlyBlock,
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
    CmsSingleColumnTemplate,
    CmsTestimonialCard,
    CmsTwoColumnSection,
    CmsVideoCard,
    CmsThreeColumnSearchHomeHeroSection,
    CmsAgedCareNavigator
} from '../../../../types/contentful-cms-types'

type SupportedCmsElementList =
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
    | CmsThreeColumnSearchHomeHeroSection
    | CmsAgedCareNavigator

interface PageProps {
    previewCms: SupportedCmsElementList,
    previewType: string,
}

export const getServerSideProps: GetServerSideProps = async context => {
    const { PREVIEW_ACCESS_KEY } = process.env
    const {showPreview} = context.query
    const entryId = previewParam(context.params?.entryid || '')
    const environment = previewParam(context.params?.environment || '')


    if (!entryId || !environment || showPreview !== PREVIEW_ACCESS_KEY) {
        return {
            notFound: true,
        }
    }

    const previewData = await requestPreviewData({id:entryId, environment})

    if (!previewData || !previewData.data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            previewCms: Object.values(previewData.data)[0],
            previewType: previewData?.entity,
        },
    }
}

const View: NextPage<PageProps> = ({
    previewCms,
}) => {
    const title = 'Entry Preview'

    return (
        <main>
            {previewCms && <CmsElement component={{block: previewCms}} />}
        </main>
    )
}

export default View
;(View as NextPageWithLayout).layoutComponent = BlankLayout

const previewParam = (idParams: string | string[]): string | undefined => {
    return typeof idParams === 'string'
        ? idParams
        : idParams.join('')
}