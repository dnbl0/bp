import { createContext, ReactNode, useContext } from 'react'
import {
    AgedCareHomeLocationTag,
    AgedCareHomeSummary,
} from '../../types/homeSummary'

export interface GlobalPageData {
    agedCareHomesSummary?: AgedCareHomeSummary[]
    agedCareHomeLocationTags?: AgedCareHomeLocationTag[]
}

const StateContext = createContext<GlobalPageData>({agedCareHomesSummary:[],agedCareHomeLocationTags:[]})

const ContextProvider = ({
    data,
    children,
}: {
    data: GlobalPageData
    children?: ReactNode
}) => {
    return (
        <StateContext.Provider value={data}>{children}</StateContext.Provider>
    )
}

export const GlobalPageDataProvider = ContextProvider
export const useGlobalPageData = () => useContext(StateContext)
