import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Scalars } from '../../types/contentful-cms-types'
import { cx } from '../../utils/cx'
import {
    formattingOptions,
    formattingOptionsForColouredCard,
} from '../../utils/formattingOptions'

/** Renders Contentful's rich text field type  */
export const RichTextContent = ({
    json,
    className,
    isColouredCard,
}: {
    json: Scalars['JSON']
    className?: string
    isColouredCard?: boolean
}) => {
    const defaultStyle = cx(
        'prose max-w-none',
        'prose-a:text-cyan',
        'hover:prose-a:text-[#005497]',
        'focus:prose-a:text-[#00254F]',
        'focus:prose-a:bg-focus-blue',
        'focus:prose-a:outline-none',
        'visited:prose-a:text-[#57148D]',
        'prose-li:marker:text-navy',
        '[&>*:last-child]:mb-0'
    )

    return (
        <div className={className || defaultStyle}>
            {isColouredCard
                ? documentToReactComponents(
                      json,
                      formattingOptionsForColouredCard
                  )
                : documentToReactComponents(json, formattingOptions)}
        </div>
    )
}
