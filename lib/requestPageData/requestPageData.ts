import {
    CmsAgedCareHomeDetailsTemplate,
    CmsPage,
    CmsPageTemplate,
    CmsSingleColumnTemplate,
} from '../../types/contentful-cms-types'
import { AnyCmsElement } from '../../components/molecules/CmsElement'
import { requestAgedCareHomeDetailsTemplate as requestAgedCareHomeDetailsTemplate } from './requestAgedCareHomeDetailsTemplate'
import { requestSingleColumnTemplate } from './requestSingleColumnTemplate'
import { requestCommonPageComponents } from './requestCommonPageElements'

export const requestPageData = async (
    slug: string,
    showPreviewContent: boolean
): Promise<CmsPage | undefined> => {
    const commonPageElements = await requestCommonPageComponents(
        slug,
        showPreviewContent
    )

    if (!commonPageElements) {
        return undefined
    }

    const templateType = commonPageElements.template?.__typename
    const templateLoaderFunc = templateType && getLoaderFunc(templateType)

    if (!templateLoaderFunc) {
        console.warn(`Template loader function not found: "${templateType}"`)
        return undefined
    }

    const template = await templateLoaderFunc(
        slug,
        showPreviewContent,
        templateType
    )

    if (!template) {
        console.warn(`Could not load template: "${templateType}"`)
        return undefined
    }

    return {
        ...commonPageElements,
        template,
    }
}

type SupportedTemplate =
    | CmsSingleColumnTemplate
    | CmsAgedCareHomeDetailsTemplate

type TemplateLoaderFunc = (
    slug: string,
    showPreviewContent: boolean,
    templateType: AnyCmsElement['__typename'] | undefined
) => Promise<CmsPageTemplate | undefined>

const LookupObject: Record<
    SupportedTemplate['__typename'],
    TemplateLoaderFunc
> = {
    AgedCareHomeDetailsTemplate: requestAgedCareHomeDetailsTemplate,
    SingleColumnTemplate: requestSingleColumnTemplate,
}

const getLoaderFunc = (key: string): TemplateLoaderFunc | undefined => {
    return (LookupObject as any)[key]
}
