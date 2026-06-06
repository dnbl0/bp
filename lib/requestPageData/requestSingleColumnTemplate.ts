import {
    CmsQuery,
    CmsSingleColumnTemplate,
    CmsSingleColumnTemplateSectionsCollection,
    CmsSingleColumnTemplateSectionsItem,
    Maybe,
} from '../../types/contentful-cms-types'

import { RequestSingleColumnPage } from '../../schema/requestSingleColumnPage'
import RequestSingleColumnTemplateByIdQuery  from '../../schema/requestSingleColumnTemplateById'
import { invariant } from '@apollo/client/utilities/globals'
import { isCmsSingleColumnTemplate } from '../cmsTypeGuards'
import { isDefined } from '../../utils/typeguards'
import { requestSectionData } from '../requestSectionData'
import { sendContentRequest } from '../contentfulGraphqlClient'

export const requestSingleColumnTemplate = async (
    slug: string,
    showPreviewContent: boolean
): Promise<CmsSingleColumnTemplate | undefined> => {
    const data = await sendContentRequest({
        showPreviewContent,
        query: RequestSingleColumnPage,
        variables: { slug, preview: showPreviewContent },
        requestId: 'SingleColumnPage',
    })
    return await requestSingleColumnTemplateDataByPage(data, showPreviewContent)
}

export const requestSingleColumnTemplateById = async (
    id: string,
    showPreviewContent: boolean
): Promise<CmsSingleColumnTemplate | undefined> => {
    const data = await sendContentRequest({
        showPreviewContent,
        query: RequestSingleColumnTemplateByIdQuery,
        variables: { id, preview: showPreviewContent },
        requestId: 'SingleColumnPage',
    })
    return await requestSingleColumnTemplateDataByTemplate(data,showPreviewContent)
}

const requestSectionsCollection = async (
    sectionsCollection: Maybe<CmsSingleColumnTemplateSectionsCollection> | undefined,
    showPreviewContent: boolean
) => {
    const sectionRequests = (sectionsCollection?.items || [])
    .filter(isDefined)
    .filter(requireSectionId)
    .map(item => ({
        __typename: item.__typename,
        id: item.sys.id,
        showPreviewContent,
    }))
    .map(requestSectionData)
    
    return (await Promise.all(sectionRequests)).filter(isDefined)
}

const requestSingleColumnTemplateDataByTemplate = async (
    data: CmsQuery,
    showPreviewContent: boolean
): Promise<CmsSingleColumnTemplate | undefined> => {

    if (!data.singleColumnTemplate) {
        return undefined
    }

    const template: CmsSingleColumnTemplate = data.singleColumnTemplate

    const sectionsCollection = template.sectionsCollection

    if (!sectionsCollection) {
        return undefined
    }

    const sectionRequests = await requestSectionsCollection(sectionsCollection,showPreviewContent)

    const sectionItems = (await Promise.all(sectionRequests)).filter(isDefined)

    const returnData = {
        ...template,
        sectionsCollection: sectionsCollection && {
            ...sectionsCollection,
            items: sectionItems,
        },
    }

    return returnData
}

const requestSingleColumnTemplateDataByPage = async (
    data: CmsQuery,
    showPreviewContent: boolean
): Promise<CmsSingleColumnTemplate | undefined> => {
    const page = data.pageCollection?.items.filter(isDefined).shift()

    const template = page?.template

    if (!template) return undefined

    invariant(isCmsSingleColumnTemplate(template))

    const sectionsCollection = template.sectionsCollection

    const sectionRequests = await requestSectionsCollection(sectionsCollection,showPreviewContent)

    const sectionItems = (await Promise.all(sectionRequests)).filter(isDefined)

    return {
        ...template,
        sectionsCollection: sectionsCollection && {
            ...sectionsCollection,
            items: sectionItems,
        },
    }
}

const requireSectionId = (section: CmsSingleColumnTemplateSectionsItem) => {
    if (!section.sys?.id) {
        console.error(`Section missing ID: "${section.__typename}"`)
        return false
    }
    return true
}
