import { ReactElement, useEffect, useState } from 'react'

export const useWindowAvailable = (element: ReactElement) => {
    const [showElement, setShowElement] = useState(false)

    const handleWindowAvailable = () => {
        setShowElement(true)
    }
    useEffect(() => {
        handleWindowAvailable()
    }, [])
    return showElement ? element : <></>
}
