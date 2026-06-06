import { sendContentRequest } from '../contentfulGraphqlClient'
import { RequestAgedCareHomePage } from '../../schema/requestAgedCareHomePage'
import { isDefined } from '../../utils/typeguards'
import {
    CmsAgedCareHomeDetailsTemplate,
} from '../../types/contentful-cms-types'
import { isCmsAgedCareHomeDetailsTemplate } from '../cmsTypeGuards'

export const requestAgedCareHomeDetailsTemplate = async (
    slug: string,
    showPreviewContent: boolean
): Promise<CmsAgedCareHomeDetailsTemplate | undefined> => {
    const data = await sendContentRequest({
        showPreviewContent,
        query: RequestAgedCareHomePage,
        variables: { slug, preview: showPreviewContent },
        requestId: 'AgedCareHomeDetailsPage',
    })

    const page = data.pageCollection?.items.filter(isDefined).shift()

    const agedCareHomeData = isCmsAgedCareHomeDetailsTemplate(page?.template)
        ? page?.template
        : undefined

    return agedCareHomeData
}
