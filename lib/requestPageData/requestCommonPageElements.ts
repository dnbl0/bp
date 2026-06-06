import { createClient } from '../contentfulGraphqlClient'
import { CmsQuery } from '../../types/contentful-cms-types'
import { isDefined } from '../../utils/typeguards'
import { gql } from '@apollo/client'

const request = gql`
    query ($slug: String, $preview: Boolean!) {
        pageCollection(limit: 1, where: { slug: $slug }, preview: $preview) {
            items {
                title
                slug
                backToTopEnabled
                indexForSearching
                topNotificationBar {
                    json
                }
                breadCrumbsEnabled
                breadCrumbParent {
                    caption
                    href
                    openInNewTab
                }
                template {
                    __typename
                }
                metaDescription
                seoStructuredDataMarkup
                openGraphTitle
                openGraphDescription
                openGraphImage {
                    __typename
                    title
                    description
                    contentType
                    fileName
                    size
                    url
                    width
                    height
                }
                canonicalTag
                hideStickyBar
                pageBackground
            }
        }
    }
`

export const requestCommonPageComponents = async (
    slug: string,
    showPreviewContent: boolean
) => {
    const client = createClient(showPreviewContent)

    try {
        const { data, error } = await client.query<CmsQuery>({
            query: request,
            variables: { slug, preview: showPreviewContent },
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
