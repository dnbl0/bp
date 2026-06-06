import { createClient } from './contentfulGraphqlClient'
import { RequestAgedCareHomeRooms } from '../schema/requestAgedCareHomeRooms'
import { CmsQuery } from '../types/contentful-cms-types'
import { isDefined } from '../utils/typeguards'

export const requestAgedCareHomeRooms = async (
    showPreviewContent: boolean,
    name?: string | null
) => {
    try {
        const client = createClient(showPreviewContent)

        const { data, error } = await client.query<CmsQuery>({
            query: RequestAgedCareHomeRooms,
            variables: name ? { name } : {},
            fetchPolicy: 'cache-first',
            // Ignore errors coming from draft as they trip up apollo
            errorPolicy: 'ignore',
        })

        if (error) {
            throw new Error('Error requesting resource set', error)
        }

        const agedCareHomes =
            data.agedCareHomeDetailsTemplateCollection?.items.filter(isDefined)
        // .shift()
        // ?.resourcesCollection?.items?.filter(isDefined)

        return agedCareHomes
    } catch (error) {
        console.error(
            'requestAgedCareHomeRooms:',
            JSON.stringify(error, undefined, 2)
        )
        throw error
    }
}
