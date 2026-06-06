import { cx } from '../../../utils/cx'

const StickyBar = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div
            className={cx(
                'bg-alert text-white font-semibold text-sm fixed left-0 right-0 bottom-0 flex p-2 max-h-20 w-full z-sticky'
            )}
        >
            <div className="text-center flex-1">{children}</div>
        </div>
    )
}

export default StickyBar
