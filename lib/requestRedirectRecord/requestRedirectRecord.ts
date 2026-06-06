import { Redirect } from 'next'
import { CmsQuery, CmsResource } from '../../types/contentful-cms-types'
import { isDefined } from '../../utils/typeguards'
import { createClient } from '../contentfulGraphqlClient'
import REQUEST_RESOURCE_QUERY from './requestResource.gql'

// RedirectStatusCode must equal the status codes in the Redirect type.
// See Redirect['statusCode'] in "next"
type RedirectStatusCode = 301 | 302 | 303 | 307 | 308

interface RedirectRecord {
    redirectUrl: string
    statusCode: RedirectStatusCode
}

// Hardcoded to match the name of the resource in Contentful
const RedirectsResourceName = 'Redirects'

export const requestRedirectRecord = async (
    slug: string
): Promise<RedirectRecord | undefined> => {
    const client = createClient(false)

    const { data, error } = await client.query<CmsQuery>({
        query: REQUEST_RESOURCE_QUERY,
        variables: { key: RedirectsResourceName },
        fetchPolicy: 'no-cache',
        // Ignore errors coming from draft as they trip up apollo
        errorPolicy: 'ignore',
    })

    if (error) {
        throw new Error('GraphQL error requesting redirects record', error)
    }

    const resource = data?.resourceCollection?.items?.filter(isDefined).shift()

    if (!resource) {
        console.error(
            `Redirects resource not found. Does it exist in Contentful? Is it named "${RedirectsResourceName}"?`
        )
        return undefined
    }

    const redirectRecord = findRedirectRecord(resource, slug)

    return redirectRecord
}

const findRedirectRecord = (
    redirects: CmsResource,
    slug: string
): RedirectRecord | undefined => {
    const newLineRegex = /\r?\n/
    const lines = redirects.value?.split(newLineRegex)
    const redirectRecordAsString = lines?.find(line => {
        const [from] = line.split(',')
        const isSlugMatch = from.trim() === slug
        return isSlugMatch
    })

    if (redirectRecordAsString) {
        const [_from, to, codeAsString] = redirectRecordAsString.split(',')
        const codeAsNumber = Number(codeAsString)
        if (to && isValidStatusCode(codeAsNumber)) {
            const redirectRecord: RedirectRecord = {
                redirectUrl: to.trim(),
                statusCode: codeAsNumber,
            }
            return redirectRecord
        } else {
            console.error(
                `Redirect record is invalid: "${redirectRecordAsString}"`
            )
        }
    }
    return undefined
}

const isValidStatusCode = (code: number): code is RedirectStatusCode => {
    const isValidCode = [301, 302, 303, 307, 308].includes(Number(code))
    return isValidCode
}
