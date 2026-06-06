import { createClient } from './contentfulGraphqlClient'
import { CmsQuery, CmsResource } from '../types/contentful-cms-types'
import { isDefined } from '../utils/typeguards'
import { gql } from '@apollo/client'

const request = gql`
    query ($name: String) {
        resourceSetCollection(limit: 1, where: { name: $name }) {
            items {
                resourcesCollection {
                    items {
                        __typename
                        ...resource
                        ...resourceRichText
                        ...booleanResource
                    }
                }
            }
        }
    }

    fragment resource on Resource {
        key
        value
    }

    fragment resourceRichText on ResourceRichText {
        key
        anchorId
        valueRichText {
            json
        }
    }

    fragment booleanResource on ResourceBoolean {
        key
        valueBoolean
    }
`

export const requestResourceSet = async (
    name: string,
    showPreviewContent: boolean
) => {
    const client = createClient(showPreviewContent)

    try {
        const { data, error } = await client.query<CmsQuery>({
            query: request,
            variables: { name },
            fetchPolicy: 'no-cache',
            // Ignore errors coming from draft as they trip up apollo
            errorPolicy: 'ignore',
        })

        if (error) {
            throw new Error('Error requesting resource set', error)
        }

        const resourceSet = data.resourceSetCollection?.items
            .filter(isDefined)
            .shift()
            ?.resourcesCollection?.items?.filter(isDefined)

        return resourceSet
    } catch (error) {
        console.error(
            'requestResourceSet:',
            JSON.stringify(error, undefined, 2)
        )
        throw error
    }
}
