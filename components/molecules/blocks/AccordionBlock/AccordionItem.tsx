import { CmsAccordionItem } from '../../../../types/contentful-cms-types'
import { ResponsiveImage } from '../../../atoms/ResponsiveImage'
import { RichTextContent } from '../../../atoms/RichTextContent'
import { AccordionPanel } from './AccordionPanel'

export const AccordionItem = ({
    item,
    itemIndex,
}: {
    item: CmsAccordionItem
    itemIndex: number
}) => {
    const { heading, body, image } = item
    if (!heading) return null
    if (!body && !image) return null

    return (
        <AccordionPanel header={heading} itemIndex={itemIndex}>
            <div className="flex flex-col gap-4">
                {image && (
                    <div style={{ maxWidth: image.width || 1280 }}>
                        <ResponsiveImage image={image} layout="responsive" />
                    </div>
                )}
                {body && (
                    <div>
                        <RichTextContent json={body.json} />
                    </div>
                )}
            </div>
        </AccordionPanel>
    )
}
