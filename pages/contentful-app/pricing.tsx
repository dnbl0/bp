import { NextPage } from 'next'
import { ComponentType, useEffect, useState } from 'react'
import { NextPageWithLayout } from '../../types/nextLayout'
import { BlankLayout } from '../../components/templates/BlankLayout'

const View: NextPage = () => {
    const [PricingApp, setPricingApp] = useState<
        ComponentType<{ onReady?: () => void }> | null
    >(null)
    const [appMounted, setAppMounted] = useState(false)
    const [loadError, setLoadError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        import('../../components/molecules/locations/pricing/PricingApp')
            .then(module => {
                if (isMounted) {
                    setPricingApp(() => module.PricingApp)
                }
            })
            .catch(error => {
                console.error('Failed to load PricingApp', error)
                if (isMounted) {
                    setLoadError(
                        error instanceof Error
                            ? error.message
                            : 'Unknown load error'
                    )
                }
            })

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div data-contentful-app-root="">
            {!appMounted && (
                <div className="p-4">
                    <p>Loading Contentful pricing app...</p>
                    {loadError ? (
                        <p className="mt-3">
                            Failed to load the pricing app bundle: {loadError}
                        </p>
                    ) : (
                        <p className="mt-3">
                            If you opened this page directly in the browser, it
                            will not fully load until it is launched inside the
                            Contentful app iframe.
                        </p>
                    )}
                </div>
            )}
            {PricingApp && <PricingApp onReady={() => setAppMounted(true)} />}
        </div>
    )
}

export default View
;(View as NextPageWithLayout).layoutComponent = BlankLayout
;(View as NextPageWithLayout).isContentfulApp = true
