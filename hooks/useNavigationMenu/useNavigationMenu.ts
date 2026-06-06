import { useQuery } from '@apollo/client'
import { useEffect, useMemo, useRef } from 'react'
import { flattenCmsNavigationMenuCollection } from '../../lib/cmsNav'
import { CmsQuery } from '../../types/contentful-cms-types'
import { MenuItem } from '../../types/menuItem'

import NAVIGATION_MENU_REQUEST from './requestNavigationMenu.gql'

/**
 * Requests and returns the named menu from Contentful.
 */
export const useNavigationMenu = (menuName: string) => {
    const queryOptions = {
        variables: {
            name: menuName,
        },
    }

    const {
        data: responseData,
        loading,
        error,
    } = useQuery<CmsQuery>(NAVIGATION_MENU_REQUEST, queryOptions)

    useEffect(() => {
        if (error) {
            console.error('useNavigationMenu Error:', error)
        }
    }, [error])

    const dataRef = useRef<MenuItem[]>()

    const menuData = useMemo(() => {
        if (!loading) {
            dataRef.current = flattenCmsNavigationMenuCollection(
                responseData && responseData.navigationMenuCollection
            )
        }
        return dataRef.current
    }, [responseData, loading])

    return { data: menuData, loading }
}
