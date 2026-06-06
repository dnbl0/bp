import { useThrottle } from './useThrottle'

export const useSizesForImage = (width: number) => {
    const sizes = width !== 0 ? `${width}px` : undefined

    const isEnabled = width !== 0

    const intervalMS = 1000

    const throttledValue = useThrottle(sizes, intervalMS, isEnabled)

    return throttledValue
}
