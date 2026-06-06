import { SDKProvider } from '@contentful/react-apps-toolkit/dist/SDKProvider'
import { useSDK } from '@contentful/react-apps-toolkit/dist/useSDK'
import { locations, PageExtensionSDK } from '@contentful/app-sdk'
import { useEffect, useState } from 'react'
import { Page } from './Page'
import { Field } from './Field'

export const PricingApp = ({ onReady }: { onReady?: () => void }) => {
    useEffect(() => {
        onReady?.()
    }, [onReady])

    return (
        <SDKProvider loading={<PricingAppLoading />}>
            <PageComponent />
        </SDKProvider>
    )
}

const PricingAppLoading = () => {
    const [showHelp, setShowHelp] = useState(false)

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setShowHelp(true)
        }, 4000)

        return () => window.clearTimeout(timer)
    }, [])

    const search = typeof window !== 'undefined' ? window.location.search : ''
    const looksLikeContentfulLaunch =
        search.includes('spaceId=') ||
        search.includes('entryId=') ||
        search.includes('fieldId=') ||
        search.includes('contentfulApp=')

    return (
        <div className="p-4">
            <p>Loading Contentful pricing app...</p>
            {showHelp && (
                <div className="mt-3">
                    <p>
                        The Contentful SDK has not initialized yet.
                    </p>
                    <p className="mt-2">
                        {looksLikeContentfulLaunch
                            ? 'This looks like a Contentful launch URL, so the app may be waiting on iframe initialization.'
                            : 'This page may have been opened outside the Contentful app iframe, so the SDK context is unavailable.'}
                    </p>
                </div>
            )}
        </div>
    )
}

const PageComponent = () => {
    const sdk = useSDK<PageExtensionSDK>()

    if (sdk.location.is(locations.LOCATION_PAGE)) {
        return <Page />
    }

    if (sdk.location.is(locations.LOCATION_ENTRY_FIELD)) {
        return <Field />
    }

    return <div>Not available in this location</div>
}
