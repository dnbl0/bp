import { useEffect, useState } from 'react'

export const useIsAfterFirstRender = () => {
    const [isAfterFirstRender, setIsAfterFirstRender] = useState(false)

    useEffect(() => {
        setIsAfterFirstRender(true)
    }, [])

    return isAfterFirstRender
}
