import { cx } from "../../utils/cx"
import { getBgColour } from "../../utils/getBgColour"

/**
 * This oddly named component sets up the layout for everything that
 * is rendered below the footer.
 *
 * This component works in conjunction with the layout components
 * (primary layout for example). The intended result is for the
 * footer to always be shown at the bottom of the page, even
 * when there is little or no page content.
 */
export const BelowHeader = ({
    pageContent,
    footerContent,
    backgroundColor,
}: {
    pageContent?: React.ReactNode
    footerContent?: React.ReactNode
    backgroundColor?: string
}) => {
    const bgColorClass = backgroundColor ? getBgColour(backgroundColor) : '';
    return (
        <>
            <div className={cx("flex-grow pb-4 lg:pb-8", bgColorClass)}>{pageContent}</div>
            <div>{footerContent}</div>
        </>
    )
}
