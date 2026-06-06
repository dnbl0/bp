import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import {
    QueryClient as ReactQueryClient,
    QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { NavigationBarContextProvider } from '../components/molecules/sections/NavigationBar/NavigationBarContext'
import { SnapFormContextProvider } from '../components/molecules/snapForms/SnapFormContext'
import { SnapFormModal } from '../components/molecules/snapForms/SnapFormModal'
import { LinkHandler } from '../components/organisms/LinkHandler'
import { ImageSupportMatrixContextProvider } from '../hooks/useImageSupportMatrix/useImageSupportMatix'
import { createClient } from '../lib/contentfulGraphqlClient'
import { AppPropsWithLayout } from '../types/nextLayout'
import { resetTagManagerEvents } from '../utils/tagManager'

type ContextFactoryFunc = (props: { children?: ReactNode }) => JSX.Element

const reactQueryClient = new ReactQueryClient()

const contextProviders: Array<ContextFactoryFunc> = [
    ({ children }) => (
        <ReactQueryClientProvider client={reactQueryClient}>
            {children}
        </ReactQueryClientProvider>
    ),
    ({ children }) => (
        <ApolloProvider client={createClient(false)}>{children}</ApolloProvider>
    ),
    ImageSupportMatrixContextProvider,
    SnapFormContextProvider,
    NavigationBarContextProvider,
    LinkHandler,
]

const withContextProviders = (children: React.ReactNode): React.ReactNode => {
    const reversedArray = [...contextProviders].reverse()
    return reversedArray.reduce(
        (acc, ContextProvider) => <ContextProvider>{acc}</ContextProvider>,
        children
    )
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    const Header = Component.headerComponent
    const router = useRouter()
    const isContentfulAppRoute = Component.isContentfulApp === true

    /**
     * Add custom events here when the the app navigates to a another page.
     */
    useEffect(() => {
        resetTagManagerEvents()
    }, [router.asPath])

    if (isContentfulAppRoute) {
        return <Component {...pageProps} key={router.asPath} />
    }

    return withContextProviders(
        <>
            <div className="h-full flex flex-col">
                {Header && <Header />}
                <Component {...pageProps} key={router.asPath} />
            </div>
            <SnapFormModal />
        </>
    )
}

export default App
