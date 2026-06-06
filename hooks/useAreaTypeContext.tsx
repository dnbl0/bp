import React from 'react'
import { createContext } from 'react'

// Here AreaType is used in BannerSection for the custom styles
export type AreaType = 'Column'

export const AreaTypeContext = createContext<AreaType | undefined>(undefined)

export const useAreaTypeContext = () => {
    const context = React.useContext(AreaTypeContext)
    if (!context) {
        throw new Error(
            'useAreaTypeContext must be used within a AreaTypeProvider'
        )
    }
    return context
}

export const AreaTypeProvider = ({
    areaType,
    children,
}: {
    areaType: AreaType
    children: React.ReactNode
}) => {
    return (
        <AreaTypeContext.Provider value={areaType}>
            {children}
        </AreaTypeContext.Provider>
    )
}
