import { CmsSearchHomeHeroSection } from '../../../../types/contentful-cms-types'
import { ScrollTargetAnchor } from '../NavigationBar/ScrollTargetAnchor'
import { HeroBanner } from '../../HeroBanner'
import { LargeSearchInput } from './LargeSearchInput'
import { HeaderStyle } from '../../../atoms/HeaderStyle'

export const SearchHomeHeroSection = ({
    component,
}: {
    component: CmsSearchHomeHeroSection
}) => {
    const {
        heading,
        headerStyle,
        subheading,
        searchCallToAction,
        searchButtonText,
        searchInputPlaceholder,
        searchEndpoint,
        image,
        anchorId,
    } = component

    if (!searchInputPlaceholder || !searchEndpoint || !searchButtonText) {
        return null
    }
    const headerSize = headerStyle ? headerStyle : 'H1'

    const searchWrapper = (
        <div className="grid grid-cols-12 gap-4 w-content m-auto">
            <div className="col-span-12 lg:col-span-8">
                <div className="bg-white rounded shadow-depth-hover">
                    <div className="p-6">
                        <h2 className="text-heading font-medium mb-3">
                            {searchCallToAction}
                        </h2>
                        <LargeSearchInput
                            placeholder={searchInputPlaceholder}
                            searchButtonText={searchButtonText}
                            searchEndpoint={searchEndpoint}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    const bannerText = (
        <div className="py-6 md:py-[100px]">
            <div className="flex flex-col-reverse justify-between gap-3">
                {heading && (
                    <HeaderStyle headerStyle={headerSize}>
                        {heading}
                    </HeaderStyle>
                )}
                <h3 className="text-white text-heading-s">{subheading}</h3>
            </div>
        </div>
    )

    return (
        <ScrollTargetAnchor anchorId={anchorId}>
            <HeroBanner
                image={image || undefined}
                foreground={searchWrapper}
                bannerText={bannerText}
            />
        </ScrollTargetAnchor>
    )
}
