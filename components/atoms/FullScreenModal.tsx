import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useIsAfterFirstRender } from '../../hooks/useIsAfterFirstRender'

export const FullScreenModal = ({
    children,
}: {
    children?: React.ReactNode
}) => {
    const isAfterFirstRender = useIsAfterFirstRender()
    const isClientSide = typeof document !== 'undefined'
    const [container] = useState(isClientSide && document.createElement('div'))

    useEffect(() => {
        if (container) {
            document.body.appendChild(container)
            return () => {
                document.body.removeChild(container)
            }
        }
    }, [container])

    const content = (
        <div className="fixed inset-0 z-modal-backdrop">{children}</div>
    )

    return container && isAfterFirstRender
        ? createPortal(content, container)
        : null
}
