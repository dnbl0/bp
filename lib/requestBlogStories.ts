import { createClient } from './contentfulGraphqlClient'
import { RequestBlogStories } from '../schema/requestBlogStories'
import { CmsQuery } from '../types/contentful-cms-types'
import { isDefined } from '../utils/typeguards'

export const requestBlogStories = async (
    showPreviewContent: boolean,
    tagName: string,
    start: number
) => {
    try {
        const client = createClient(showPreviewContent)

        const { data, error } = await client.query<CmsQuery>({
            query: RequestBlogStories,
            variables: { tagName, start },
            fetchPolicy: 'cache-first',
            // Ignore errors coming from draft as they trip up apollo
            errorPolicy: 'ignore',
        })

        if (error) {
            throw new Error('Error requesting resource set', error)
        }

        const blogStories = data.pageCollection

        return blogStories
    } catch (error) {
        console.error(
            'requestBlogStories:',
            JSON.stringify(error, undefined, 2)
        )
        throw error
    }
}
