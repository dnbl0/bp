import { cx } from '../../utils/cx'
export const HeaderStyle = ({
    children,
    headerStyle,
    className,
    textColour,
}: {
    children?: string
    headerStyle?: string | null
    className?: string
    textColour?: string
}) => {
    switch (headerStyle) {
        case 'H1':
            return (
                <h1 className={cx(textColour || 'text-white', 'text-heading-l', className)}>
                    {children}
                </h1>
            )
        case 'H2':
            return (
                <h2 className={cx(textColour || 'text-white', 'text-heading-m', className)}>
                    {children}
                </h2>
            )
        case 'H3':
            return (
                <h3 className={cx(textColour || 'text-white', 'text-heading-s', className)}>
                    {children}
                </h3>
            )
        default:
            return (
                <h2 className={cx(textColour || 'text-white', 'text-heading-m', className)}>
                    {children}
                </h2>
            )
    }
}
