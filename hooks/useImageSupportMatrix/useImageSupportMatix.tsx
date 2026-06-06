// React hook to check if the browser supports Webp and AVIF format images.
//
// References:
// - https://developers.google.com/speed/webp/faq
// - https://stackoverflow.com/a/71874221/395461

import { createContext, useContext, useEffect, useState } from 'react'
import { isPromiseFulfilledResult } from '../../utils/isPromiseFulfilledResult'

export type ImageSupportMatrix = {
    avif?: boolean
    'webp::alpha'?: boolean
    'webp::animation'?: boolean
    'webp::lossless'?: boolean
    'webp::lossy'?: boolean
}

type Feature =
    | 'avif'
    | 'webp::alpha'
    | 'webp::animation'
    | 'webp::lossless'
    | 'webp::lossy'

const isFormatSupported = async (feature: Feature) => {
    return new Promise<{ feature: Feature; supported: boolean }>(resolve => {
        const imageFormat = {
            avif: 'avif',
            'webp::alpha': 'webp',
            'webp::animation': 'webp',
            'webp::lossless': 'webp',
            'webp::lossy': 'webp',
        }
        const imageData = {
            avif: 'AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=',
            'webp::alpha':
                'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
            'webp::animation':
                'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
            'webp::lossless':
                'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
            'webp::lossy':
                'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
        }
        const img = new Image()
        img.onload = function () {
            const supported = img.width > 0 && img.height > 0
            resolve({ feature, supported })
        }
        img.onerror = function () {
            const supported = false
            resolve({ feature, supported })
        }
        img.src = `data:image/${imageFormat[feature]};base64,${imageData[feature]}` // Load the test image
    })
}

const getSupportedImageFormats = async (): Promise<ImageSupportMatrix> => {
    const promises = await Promise.allSettled([
        isFormatSupported('avif'),
        isFormatSupported('webp::alpha'),
        isFormatSupported('webp::animation'),
        isFormatSupported('webp::lossless'),
        isFormatSupported('webp::lossy'),
    ])
    const supportedImages = promises
        .filter(isPromiseFulfilledResult)
        .map(result => result.value)
        .reduce<ImageSupportMatrix>((prev, value) => {
            return {
                ...prev,
                [value.feature]: value.supported,
            }
        }, {})
    return supportedImages
}

const initialState: ImageSupportMatrix = {}

const StateContext = createContext<ImageSupportMatrix>(undefined as any)

const ContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [state, setState] = useState<ImageSupportMatrix>(initialState)

    useEffect(() => {
        getSupportedImageFormats().then(setState)
    }, [])

    return (
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
    )
}

export const ImageSupportMatrixContextProvider = ContextProvider
export const useImageSupportMatrix = () => useContext(StateContext)
