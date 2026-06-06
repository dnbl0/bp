import { CloseIcon } from '../atoms/icons/CloseIcon'
import Link from 'next/link'

export const PreviewEnabledNotification = ({}: {}) => {
    return (
        <div className="bg-alert text-white">
            <div className="w-content m-auto flex flex-row justify-between items-center py-2">
                <div>Preview enabled</div>
                <Link
                    href="/api/disable-preview"
                    /* Disable prefetch to prevent link from clearing cookie */
                    prefetch={false}
                >
                    <a>
                        <span className="sr-only">Close</span>
                        <CloseIcon />
                    </a>
                </Link>
            </div>
        </div>
    )
}
