import { createContext, useContext } from 'react'
import { Brand, core } from './brands'

/*
    Carries the active brand to the documentation primitives. The layout
    resolves the brand from the router path once and provides it here, so the
    sidebar, breadcrumbs, prev/next pager and search can stay brand-aware
    without each page threading a brand prop through.
*/
const BrandContext = createContext<Brand>(core)

export const BrandProvider = BrandContext.Provider

export const useBrand = (): Brand => useContext(BrandContext)
