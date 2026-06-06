import type { GetStaticProps, NextPage } from 'next'
import { ErrorMessageWrapper } from '../components/atoms/ErrorMessageWrapper'
import { SmallSearchInput } from '../components/atoms/SmallSearchInput'
import { Header } from '../components/organisms/Header'
import { PrimaryPageTemplate } from '../components/templates/PrimaryPageTemplate'
import { useWindowAvailable } from '../hooks/useWindowAvailable'
import { readResourceBoolean, readResourceString } from '../lib/cmsResource'
import { FooterData, requestFooterData } from '../lib/requestFooterData'
import { requestResourceSet } from '../lib/requestResourceSet'
import { NextPageWithLayout } from '../types/nextLayout'

const defaultHeading = 'Unlucky. Page not found.'
const defaultBody =
    "We can't find the page you were looking for. Try and search for what you need below."
const defaultSearchEnabled = true
const defaultButtonText = 'Go to homepage'
const defaultButtonHref = '/'

interface PageProps {
    heading: string
    body: string
    isSearchEnabled: boolean
    buttonText: string
    buttonHref: string
    footerData?: FooterData
}

export const getStaticProps: GetStaticProps<PageProps> = async context => {
    const showPreviewContent = false

    const resourceSet = await requestResourceSet('404', showPreviewContent)

    const footerData = await requestFooterData(showPreviewContent)

    return {
        props: {
            heading: readResourceString(resourceSet, 'Heading', defaultHeading),
            body: readResourceString(resourceSet, 'Body', defaultBody),
            isSearchEnabled: readResourceBoolean(
                resourceSet,
                'Enable Search',
                defaultSearchEnabled
            ),
            buttonText: readResourceString(
                resourceSet,
                'Button Text',
                defaultButtonText
            ),
            buttonHref: readResourceString(
                resourceSet,
                'Button href',
                defaultButtonHref
            ),
            footerData,
        },
    }
}

const View: NextPage<PageProps> = ({
    heading,
    body,
    isSearchEnabled,
    buttonText,
    buttonHref,
    footerData,
}) => {
    const title = 'Page not found'

    const SearchInput = useWindowAvailable(
        <SmallSearchInput
            allowEmptySearch
            focusOnMount={false}
            placeholder="Search"
        />
    )

    return (
        <PrimaryPageTemplate
            isPreview={false}
            pageData={{ title, breadCrumbsEnabled: true }}
            footerData={footerData}
        >
            <ErrorMessageWrapper>
                <div className="flex flex-col items-center">
                    <h1 className="mb-8 text-heading-m font-semibold">
                        {heading}
                    </h1>

                    <p className="mb-6 mx-6 max-w-sm text-center">{body}</p>

                    {isSearchEnabled && (
                        <div className="mb-12">{SearchInput}</div>
                    )}

                    <div>
                        <a className="button" href={buttonHref}>
                            {buttonText}
                        </a>
                    </div>
                </div>
            </ErrorMessageWrapper>
        </PrimaryPageTemplate>
    )
}

export default View
;(View as NextPageWithLayout).headerComponent = Header
