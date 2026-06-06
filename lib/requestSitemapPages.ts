import { createClient } from './contentfulGraphqlClient'
import { CmsQuery } from '../types/contentful-cms-types'
import { gql } from '@apollo/client'
import { isDefined } from '../utils/typeguards'

const request = gql`
    query {
        pageCollection(where: { indexForSearching_not: false } limit:500) {
            items {
                slug
                sys {
                    publishedAt
                }
            }
        }
    }
`

export const requestSitemapPages = async (showPreviewContent: boolean) => {
    try {
        const client = createClient(showPreviewContent)

        const { data, error } = await client.query<CmsQuery>({
            query: request,
            fetchPolicy: 'cache-first',
            // Ignore errors coming from draft as they trip up apollo
            errorPolicy: 'ignore',
        })

        if (error) {
            throw new Error('Error requesting resource set', error)
        }

        return data?.pageCollection?.items?.filter(isDefined)
    } catch (error) {
        console.error(
            'request sitemap pages:',
            JSON.stringify(error, undefined, 2)
        )
        throw error
    }
}
