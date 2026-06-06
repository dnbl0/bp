import { CmsHeadingBlock, Maybe } from '../../../types/contentful-cms-types'
import { cx } from '../../../utils/cx'
import { ScrollTargetAnchor } from '../sections/NavigationBar/ScrollTargetAnchor'

export const HeadingBlock = ({ component }: { component: CmsHeadingBlock }) => {
    const { text, fontSize, fontWeight, anchorId, addTopMargin } = component

    const fallbackAnchorId = text?.replaceAll(' ', '-').toLowerCase()

    const CustomHeader = HeaderStyle(fontSize)

    return (
        <ScrollTargetAnchor anchorId={anchorId || fallbackAnchorId}>
            <CustomHeader
                className={cx(
                    getFontSizeClass(fontSize),
                    getFontWeightCass(fontWeight),
                    addTopMargin && 'mt-12'
                )}
            >
                {text}
            </CustomHeader>
        </ScrollTargetAnchor>
    )
}

const getFontSizeClass = (fontSize: string | undefined | null) => {
    switch (fontSize) {
        case 'Small':
            return 'text-heading-s'
        case 'Medium':
            return 'text-heading-m'
        case 'Large':
            return 'text-heading-l'
        default:
            console.warn(`Unexpected fontSize value: "${fontSize}"`)
            return 'text-heading-s'
    }
}

const getFontWeightCass = (fontWeight: string | undefined | null) => {
    switch (fontWeight) {
        case 'Medium':
            return 'font-medium'
        case 'Semi bold':
            return 'font-semibold'

        default:
            console.warn(`Unexpected fontWeight value: "${fontWeight}"`)
            return 'font-semibold'
    }
}

const HeaderStyle = (fontSize: Maybe<string> | undefined) => {
    switch (fontSize) {
        case 'Small':
            return 'h3'
        case 'Medium':
            return 'h2'
        case 'Large':
            return 'h1'
        default:
            console.warn(`Unexpected fontSize value: "${fontSize}"`)
            return 'h2'
    }
}
