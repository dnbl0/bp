import { CmsFormBlock } from '../../../types/contentful-cms-types'

const defaultFormHeight = '500px'

export const FormBlock = ({ component }: { component: CmsFormBlock }) => {
    const { formUrl, formHeight } = component
    const src = formUrl && getFullFormUrl(formUrl)
    if (!src) return null

    return (
        <div>
            <iframe
                src={src}
                width="100%"
                height={formHeight || defaultFormHeight}
            ></iframe>
        </div>
    )
}

/*
 * Returns the full URL for the Snap Form, including the query string.
 */
const getFullFormUrl = (formUrl: string): string | undefined => {
    // The formUrl value is expected to be in the format of something like:
    //
    // ?snap=x5Q0lB7nHp&my%20enquiry%20is%20regarding=live%20in%20a%20care%20home%20%28permanent%29&select%20which%20care%20home%20you%20are%20interested%20in=bupa%20kempsey
    //
    // It will be in this form because that's how forms are linked to from
    // other elements in the CMS. We do the same for the FormBlock component
    // for consistency.
    //
    // See the `LinkHandler` component to see how URLs beginning with
    // a question mark are normally handled.
    //
    // In this case, we are using the `formUrl` but not as a link. We're
    // opening the form directly in an iframe.

    const formPrefix = process.env.NEXT_PUBLIC_SNAP_FORM_PREFIX

    if (!formPrefix) {
        console.error('Cannot find Snap Forms prefix')
        return undefined
    }

    const urlParams = new URLSearchParams(formUrl)

    const snapFormId = urlParams.get('snap')

    const queryString = formUrl.split('?')[1]

    const fullUrl =
        formPrefix && snapFormId && queryString
            ? formPrefix + snapFormId + `?${queryString}`
            : undefined

    return fullUrl
}
