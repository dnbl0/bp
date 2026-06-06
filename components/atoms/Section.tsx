import { cx } from '../../utils/cx'

export const Section = ({
    children,
    standard,
    wide,
    fullBleed,
    className,
}: {
    children?: React.ReactNode // `standard` page content width.
    standard?: React.ReactNode // `standard` page content width, can be used instead of `children`.
    wide?: React.ReactNode // `wide` content expands to the width of screen with a small margin.
    fullBleed?: React.ReactNode // `fullBleed` content spans the entire width of the browser.
    className?: string
}) => {
    return (
        <div className={cx('grid', className)}>
            {fullBleed && (
                <div className="row-start-1 col-start-1 h-full">
                    {fullBleed}
                </div>
            )}
            {wide && (
                <div className="row-start-1 col-start-1 w-wide-content m-auto h-full">
                    {wide}
                </div>
            )}
            {(children || standard) && (
                <div className="row-start-1 col-start-1 w-content m-auto h-full">
                    {children || standard}
                </div>
            )}
        </div>
    )
}
