import {
    CmsAgedCareNavigator,
    CmsBasicHeroSection,
    CmsBlogBlock,
    CmsContactHeroSection,
    CmsGrid12,
    CmsGrid3X3X3X3,
    CmsGrid4X4X4,
    CmsGrid4X8,
    CmsGrid6X6,
    CmsNavigationBar,
    CmsOneColumnSection,
    CmsQuery,
    CmsRegionListDetailsSection,
    CmsSearchHomeHeroSection,
    CmsThreeColumnSearchHomeHeroSection,
    CmsTwoColumnSection,
} from '../../types/contentful-cms-types'

import { DocumentNode } from 'graphql'
import { InvalidSwitchError } from '../../utils/invalidSwithError'
import { RequestBasicHeroSection } from '../../schema/requestBasicHeroSection'
import { RequestContactHeroSection } from '../../schema/requestContactHeroSection'
import { RequestGrid12 } from '../../schema/requestGrid12'
import { RequestGrid3x3x3x3 } from '../../schema/requestGrid3x3x3x3'
import { RequestGrid4x4x4 } from '../../schema/requestGrid4x4x4'
import { RequestGrid4x8 } from '../../schema/requestGrid4x8'
import { RequestGrid6x6 } from '../../schema/requestGrid6x6'
import { RequestListingRegionDetailsSection } from '../../schema/requestListingRegionDetailsSection'
import { RequestNavigationBarSection } from '../../schema/requestNavigationBarSection'
import { RequestOneColumnSection } from '../../schema/requestOneColumnSection'
import { RequestSearchHomeHeroSection } from '../../schema/requestSearchHomeHeroSection'
import { RequestTwoColumnSection } from '../../schema/requestTwoColumnSection'
import { RequestBlogBlock } from '../../schema/requestBlogBlock'
import { sendContentRequest } from '../contentfulGraphqlClient'
import RequestTwoColumnLeftSection from '../../schema/fragmentTwoColumnLeftSection'
import RequestTwoColumnRightSection from '../../schema/fragmentTwoColumnRightSection'
import { RequestAgedCareNavigator } from '../../schema/requestAgedCareNavigator'
import { RequestThreeColumnSearchHomeHeroSection } from '../../schema/requestThreeColumnSeachHomeSection'

/**
 * Supported sections are those that can be displayed on website.
 * Sections not in this list will be ignored.
 */
type SupportedSection =
    | CmsContactHeroSection
    | CmsGrid12
    | CmsGrid3X3X3X3
    | CmsGrid4X4X4
    | CmsGrid4X8
    | CmsGrid6X6
    | CmsOneColumnSection
    | CmsNavigationBar
    | CmsSearchHomeHeroSection
    | CmsTwoColumnSection
    | CmsRegionListDetailsSection
    | CmsBasicHeroSection
    | CmsBlogBlock
    | CmsAgedCareNavigator
    | CmsThreeColumnSearchHomeHeroSection

const requestTwoColumnSection= async (id: string, showPreviewContent: boolean) => {
        let data = {} as CmsQuery;

        data = await sendContentRequest({
            showPreviewContent,
            query: RequestTwoColumnSection,
            variables: { id, preview: showPreviewContent },
            requestId: `requestCommonSectionData: "TwoColumnSection"`,
        })
        const left = await sendContentRequest({
            showPreviewContent,
            query: RequestTwoColumnLeftSection,
            variables: { id, preview: showPreviewContent },
            requestId: `requestLeftSectionData: "TwoColumnSection"`,
        })
        const leftColumnCollection = left?.twoColumnSection?.leftColumnCollection;

        const right = await sendContentRequest({
            showPreviewContent,
            query: RequestTwoColumnRightSection,
            variables: { id, preview: showPreviewContent },
            requestId: `requestRightSectionData: "TwoColumnSection"`,
        })
        const rightColumnCollection = right?.twoColumnSection?.rightColumnCollection;

        if (data?.twoColumnSection) { 
            data.twoColumnSection.leftColumnCollection = leftColumnCollection;
            data.twoColumnSection.rightColumnCollection = rightColumnCollection;
        }
        return data
}

export const requestSectionData = async ({
    id,
    __typename,
    showPreviewContent = false,
}: {
    id: string
    __typename: string
    showPreviewContent?: boolean
}) => {
    const request = getRequest(__typename)
    if (!request) {
        console.warn(`Section not supported: "${__typename}"`)
        return undefined
    }
    let data = {} as CmsQuery;
    if (__typename === 'TwoColumnSection') {
        data = await requestTwoColumnSection(id, showPreviewContent)
    } else {
        data = await sendContentRequest({
            showPreviewContent,
            query: request,
            variables: { id, preview: showPreviewContent },
            requestId: `requestSectionData: "${__typename}"`,
        })
    }

    const asSupportedType = __typename as SupportedSection['__typename']

    switch (asSupportedType) {
        case 'ContactHeroSection':
            return data?.contactHeroSection
        case 'Grid12':
            return data?.grid12
        case 'Grid3X3X3X3':
            return data?.grid3X3X3X3
        case 'Grid4X4X4':
            return data?.grid4X4X4
        case 'Grid4X8':
            return data?.grid4X8
        case 'Grid6X6':
            return data?.grid6X6
        case 'OneColumnSection':
            return data?.oneColumnSection
        case 'NavigationBar':
            return data?.navigationBar
        case 'SearchHomeHeroSection':
            return data?.searchHomeHeroSection
        case 'TwoColumnSection':
            return data?.twoColumnSection
        case 'RegionListDetailsSection':
            return data?.regionListDetailsSection
        case 'BasicHeroSection':
            return data?.basicHeroSection
        case 'BlogBlock':
            return data?.blogBlock
        case 'AgedCareNavigator':
            return data?.agedCareNavigator
        case 'ThreeColumnSearchHomeHeroSection':
            return data?.threeColumnSearchHomeHeroSection
        default:
            throw new InvalidSwitchError(
                asSupportedType,
                'Case statement not handled'
            )
    }
}

const LookupObject: Record<SupportedSection['__typename'], DocumentNode> = {
    ContactHeroSection: RequestContactHeroSection,
    Grid12: RequestGrid12,
    Grid3X3X3X3: RequestGrid3x3x3x3,
    Grid4X4X4: RequestGrid4x4x4,
    Grid4X8: RequestGrid4x8,
    Grid6X6: RequestGrid6x6,
    OneColumnSection: RequestOneColumnSection,
    NavigationBar: RequestNavigationBarSection,
    SearchHomeHeroSection: RequestSearchHomeHeroSection,
    TwoColumnSection: RequestTwoColumnSection,
    RegionListDetailsSection: RequestListingRegionDetailsSection,
    BasicHeroSection: RequestBasicHeroSection,
    BlogBlock: RequestBlogBlock,
    AgedCareNavigator: RequestAgedCareNavigator,
    ThreeColumnSearchHomeHeroSection: RequestThreeColumnSearchHomeHeroSection,
}

const getRequest = (key: string): DocumentNode | undefined => {
    return (LookupObject as any)[key]
}
