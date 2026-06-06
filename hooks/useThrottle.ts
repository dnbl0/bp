import { useState } from 'react'
import { useInterval } from 'react-use'

export const useThrottle = <T>(
    receivedValue: T,
    intervalMS: number = 200,
    isEnabled: boolean = true
): T => {
    const [currentValue, setCurrentValue] = useState<T>(receivedValue)
    const [nextValue, setNextValue] = useState<T>(receivedValue)
    const [isRunning, setIsRunning] = useState<boolean>(false)

    useInterval(
        () => {
            setCurrentValue(nextValue)
            setIsRunning(false)
        },
        isRunning ? intervalMS : null
    )

    if (isEnabled && nextValue !== receivedValue) {
        setNextValue(receivedValue)
        if (!isRunning) {
            setCurrentValue(receivedValue)
            setIsRunning(true)
            return receivedValue
        }
    }

    return currentValue
}
