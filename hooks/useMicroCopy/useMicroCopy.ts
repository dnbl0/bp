import { useQuery } from '@apollo/client'
import { useEffect, useMemo, useRef } from 'react'
import { CmsQuery, CmsResource } from '../../types/contentful-cms-types'
import { isDefined } from '../../utils/typeguards'

import REQUEST_RESOURCE_QUERY from './requestResource.gql'

export const useMicroCopy = (key: string) => {
    const queryOptions = {
        variables: { key },
    }

    const {
        data: responseData,
        loading,
        error,
    } = useQuery<CmsQuery>(REQUEST_RESOURCE_QUERY, queryOptions)

    useEffect(() => {
        if (error) {
            console.error('useMicroCopy Error:', error)
        }
    }, [error])

    const dataRef = useRef<string>()

    const resourceValue = useMemo(() => {
        if (!loading) {
            const resourceCollection = responseData?.resourceCollection
            const resourceItem = resourceCollection?.items
                .filter(isDefined)
                .shift()
            dataRef.current =
                resourceItem && readResourceItemValue(resourceItem)
        }
        return dataRef.current
    }, [responseData, loading])

    return { data: resourceValue, loading }
}

const readResourceItemValue = (resourceItem: CmsResource) => {
    return isDefined(resourceItem.value) ? resourceItem.value : undefined
}
