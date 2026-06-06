import { createClient } from './contentfulGraphqlClient'
import { RequestSingleColumnPage } from '../schema/requestSingleColumnPage'
import { RequestAgedCareHomePage } from '../schema/requestAgedCareHomePage'
import {
    CmsAgedCareHomeDetailsTemplate,
    CmsQuery,
    CmsSingleColumnTemplate,
} from '../types/contentful-cms-types'
import { isDefined } from '../utils/typeguards'
import { AnyCmsElement } from '../components/molecules/CmsElement'
import { DocumentNode } from 'graphql'

export const requestPageData = async (
    slug: string,
    showPreviewContent: boolean,
    templateType: AnyCmsElement['__typename'] | undefined
) => {
    const client = createClient(showPreviewContent)

    const request = templateType && getRequest(templateType)

    if (!request) {
        console.warn('Request handler for template not found')
        return undefined
    }

    try {
        const { data, error } = await client.query<CmsQuery>({
            query: request,
            variables: { slug },
            fetchPolicy: 'no-cache',
            // Ignore errors coming from draft as they trip up apollo
            errorPolicy: 'ignore',
        })

        if (error) {
            throw new Error('Error requesting page data', error)
        }

        const page = data.pageCollection?.items.filter(isDefined).shift()
        return page
    } catch (error) {
        console.error('requestPageData:', JSON.stringify(error, undefined, 2))
        throw error
    }
}

type SupportedTemplate =
    | CmsSingleColumnTemplate
    | CmsAgedCareHomeDetailsTemplate

const RequestLookObject: Record<SupportedTemplate['__typename'], DocumentNode> =
    {
        AgedCareHomeDetailsTemplate: RequestAgedCareHomePage,
        SingleColumnTemplate: RequestSingleColumnPage,
    }

const getRequest = (key: string): DocumentNode | undefined => {
    return (RequestLookObject as any)[key]
}
