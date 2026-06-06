import { createClient } from './contentfulGraphqlClient'
import RequestPageById from '../schema/requestPageById'

export const requestPageById = async (id: string) => {
    const client = createClient(false)

    try {
        const { data, error } = await client.query({
            query: RequestPageById,
            variables: { id: id },
            fetchPolicy: 'no-cache',
            // Ignore errors coming from draft as they trip up apollo
            errorPolicy: 'ignore',
        })

        if (error) {
            throw new Error('Error requesting page data', error)
        }

        if (!data) {
            return
        }
        return data.page
    } catch (error) {
        console.error('requestPageData:', JSON.stringify(error, undefined, 2))
        throw error
    }
}
