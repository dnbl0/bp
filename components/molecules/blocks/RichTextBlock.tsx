import { CmsRichTextBlock } from '../../../types/contentful-cms-types'
import { RichTextContent } from '../../atoms/RichTextContent'

export const RichTextBlock = ({
    component,
}: {
    component: CmsRichTextBlock
}) => {
    const { bodyRichText } = component

    if (!bodyRichText) {
        return null
    }

    return <RichTextContent json={bodyRichText.json} />
}
