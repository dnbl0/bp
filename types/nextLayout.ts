import type { ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

type LayoutComponent = (props: { children?: ReactNode }) => JSX.Element
type HeaderComponent = (props: { children?: ReactNode }) => JSX.Element

// Extending the `NextPage` type is the suggested method for
// supporting per page layouts with Next.js version 12.
// https://nextjs.org/docs/basic-features/layouts#per-page-layouts
export type NextPageWithLayout = NextPage & {
    // The `layoutComponent` is the per-page layout component as defined
    // by the page template.
    layoutComponent?: LayoutComponent
    headerComponent?: HeaderComponent
    isContentfulApp?: boolean
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
