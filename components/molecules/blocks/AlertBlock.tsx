import { CloseIcon } from '../../atoms/icons/CloseIcon'
import { cx } from '../../../utils/cx'
import { useState } from 'react'

const AlertBlock = ({ children }: { children?: React.ReactNode }) => {
    const [isClosed, setIsClosed] = useState(false)

    return (
        <div
            className={cx(
                'bg-alert text-white text-sm font-semibold transition-[max-height padding] duration-300 flex',
                isClosed ? 'p-0 max-h-0' : 'p-2 max-h-20'
            )}
        >
            <div className="text-center flex-1">{children}</div>
            <div className="flex content-center">
                <button
                    className="cursor-pointer"
                    onClick={() => {
                        setIsClosed(true)
                    }}
                    data-link-type="alert-close"
                >
                    <span className="sr-only">Close</span>
                    <CloseIcon className="fill-white" />
                </button>
            </div>
        </div>
    )
}

export default AlertBlock
