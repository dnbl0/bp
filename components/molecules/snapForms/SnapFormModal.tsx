import { useClickAway, useKey, useLockBodyScroll } from 'react-use'
import { useEffect, useRef, useState } from 'react'
import { useSnapFormDispatch, useSnapFormState } from './SnapFormContext'

import { CloseIcon } from '../../atoms/icons/CloseIcon'
import { FullScreenModal } from '../../atoms/FullScreenModal'
import { cx } from '../../../utils/cx'
import { firstValue } from '../../../utils/firstValue'
import { updateSearchParams as updateUrlSearchParams } from '../../../utils/urlState'
import { useRouter } from 'next/router'

export const SnapFormModal = ({}: {}) => {
    const [isLeaving, setIsLeaving] = useState(false)

    const dispatch = useSnapFormDispatch()

    const modalBodyRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        const closeModal = () => {
            updateUrlSearchParams(router, null)
            dispatch({ type: 'hideForm' })
            setIsLeaving(false)
        }
        if (isLeaving) {
            const id = setTimeout(closeModal, 500)
            return () => clearTimeout(id)
        }
    }, [isLeaving, dispatch, router])

    useClickAway(modalBodyRef, () => setIsLeaving(true))
    useKey('Escape', () => setIsLeaving(true))

    const formUrl = useSnapFormUrl()

    const isSnapFormVisible = !!formUrl

    useLockBodyScroll(isSnapFormVisible)

    if (!isSnapFormVisible) return null

    return (
        <FullScreenModal>
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]">
                <div
                    className={cx(
                        'absolute top-0 right-0 bottom-0',
                        'w-full lg:max-w-[990px]',
                        'bg-white',
                        'flex flex-col',
                        isLeaving ? 'animate-slide-out' : 'animate-slide-in'
                    )}
                    ref={modalBodyRef}
                >
                    <div className="text-right md:px-12">
                        <div className={cx('my-6 mr-6')}>
                            <button
                                className="px-4 py-4 bg-white rounded-full"
                                onClick={() => setIsLeaving(true)}
                            >
                                <span className="sr-only">Close</span>
                                <CloseIcon className="fill-navy scale-150" />
                            </button>
                        </div>
                    </div>

                    <div
                        className={cx(
                            'flex-grow md:px-12',
                            'animate-fade-in animation-delay-1000 animation-fill-both'
                        )}
                    >
                        <iframe
                            src={formUrl}
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                </div>
            </div>
        </FullScreenModal>
    )
}

const useSnapFormUrl = (): string | undefined => {
    const state = useSnapFormState()
    const router = useRouter()

    const formPrefix = process.env.NEXT_PUBLIC_SNAP_FORM_PREFIX
    const calendlyDomain = process.env.NEXT_PUBLIC_CALENDLY_PREFIX
        ? process.env.NEXT_PUBLIC_CALENDLY_PREFIX
        : ''
    let formUrl = undefined

    if (!formPrefix) {
        console.error('Cannot find Snap Forms prefix')
        return undefined
    }

    const snapFormId =
        state.formId !== undefined
            ? state.formId
            : firstValue(router.query['snap'])

    const queryString = router.asPath.split('?')[1]

    const isSnapForm = firstValue(router.query['snap']) ? true : false

    if (isSnapForm) {
        formUrl =
            formPrefix && snapFormId && queryString
                ? formPrefix + snapFormId + `?${queryString}`
                : undefined
    } else {
        formUrl =
            formPrefix && calendlyDomain && snapFormId
                ? calendlyDomain + snapFormId
                : ''
    }

    return formUrl
}
