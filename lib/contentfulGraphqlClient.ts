import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    QueryOptions,
    OperationVariables,
    NormalizedCacheObject,
    from
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { invariant } from '@apollo/client/utilities/globals'
import { CmsQuery } from '../types/contentful-cms-types'
import { sha256 } from 'crypto-hash';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
export const createClient = (showPreviewContent: boolean, environment:string | undefined = undefined) => {
    const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    environment = environment ? environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
    const accessToken = showPreviewContent
        ? process.env.NEXT_PUBLIC_CONTENT_PREVIEW_ACCESS_TOKEN
        : process.env.NEXT_PUBLIC_CONTENT_DELIVERY_ACCESS_TOKEN

    invariant(spaceId, 'spaceId not defined')
    invariant(environment, 'environment not defined')
    invariant(accessToken, 'accessToken not defined')

    const httpLink = createHttpLink({
        uri: `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`,
        credentials: 'same-origin',
    })

    const authLink = setContext((_, { headers }) => {
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${accessToken}`,
            },
        }
    })
const persistedQueryLink = createPersistedQueryLink({ sha256 });
    return new ApolloClient({
        link: from([persistedQueryLink, authLink.concat(httpLink)]), // Use 'from' to chain them
        cache: new InMemoryCache(),
    })
}

let globalPreviewClient: ApolloClient<NormalizedCacheObject>
let globalPublishedClient: ApolloClient<NormalizedCacheObject>

const getGlobalClient = (showPreviewContent: boolean, environment:string | undefined = undefined) => {
    if (!globalPreviewClient && showPreviewContent) {
        globalPreviewClient = createClient(showPreviewContent,environment)
    }
    if (!globalPublishedClient && !showPreviewContent) {
        globalPublishedClient = createClient(showPreviewContent,environment)
    }
    return showPreviewContent ? globalPreviewClient : globalPublishedClient
}

export const sendContentRequest = async ({
    showPreviewContent,
    query,
    variables,
    requestId,
    environment,
}: {
    showPreviewContent: boolean
    query: QueryOptions<OperationVariables, CmsQuery>['query']
    variables: QueryOptions<OperationVariables, CmsQuery>['variables']
    requestId: string
    environment?: string | undefined
}) => {
    try {
        const client = getGlobalClient(showPreviewContent,environment)

        const { data, error } = await client.query<CmsQuery>({
            query,
            variables,
            fetchPolicy: 'no-cache',
            // Ignore errors coming from draft as they trip up apollo
            errorPolicy: 'ignore',
        })

        if (error) {
            throw new Error(
                `Appollo error for content request: "${requestId}"`,
                error
            )
        }

        return data
    } catch (error) {
        // Log the error to help diagnose Contentful request problems.
        console.error(
            `Content request error: "${requestId}"`,
            JSON.stringify(error, undefined, 2)
        )
        throw error
    }
}
