import { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { useNavigationBarDispatch } from './NavigationBarContext'

/** Creates a scroll target for the floating navigation component. */
export const ScrollTargetAnchor = ({
    anchorId,
    children,
}: {
    anchorId: string | undefined | null
    children?: React.ReactNode
}) => {
    return (
        <div>
            {anchorId && <Anchor anchorId={anchorId} />}

            {children}
        </div>
    )
}

const Anchor = ({ anchorId }: { anchorId: string }) => {
    const dispatch = useNavigationBarDispatch()

    const ref = useRef<HTMLDivElement>(null)

    const intersection = useIntersection(ref, {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    })

    const isVisible = intersection && intersection.intersectionRatio >= 1

    useEffect(() => {
        const element = ref.current

        if (element) {
            dispatch({
                type: 'updateAnchor',
                isVisible: !!isVisible,
                anchor: {
                    id: anchorId,
                    element: element,
                },
            })
        }

        return () => {
            if (element) {
                dispatch({
                    type: 'updateAnchor',
                    isVisible: false,
                    anchor: {
                        id: anchorId,
                        element: element,
                    },
                })
            }
        }
    }, [dispatch, isVisible, anchorId])

    return (
        <div className="relative" ref={ref}>
            {/*
                The `anchorId` is the scroll target. We offset it vertically
                to avoid it being obscured by the navigation bar, which will
                be stuck to the top of the page.
            */}
            <div id={anchorId} className="absolute -top-[4.6rem]" />
        </div>
    )
}
