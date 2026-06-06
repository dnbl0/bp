import { CmsThreeColumnSearchHomeHeroSection } from './../../../types/contentful-cms-types'
import { ScrollTargetAnchor } from './NavigationBar/ScrollTargetAnchor'
import { HeroBanner } from './../HeroBanner'
import { LargeSearchInput } from './SearchHomeHeroSection/LargeSearchInput'
import { HeaderStyle } from './../../atoms/HeaderStyle'
import { BannerSection } from './BannerSection'
import { paramCase } from 'param-case'
import { CtaBlock } from '../blocks/CtaBlock'
import { MarkdownBlock } from '../blocks/MarkdownBlock'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'

export const ThreeColumnSearchHomeHeroSection = ({
    component,
}: {
    component: CmsThreeColumnSearchHomeHeroSection
}) => {
    const {
        heading,
        headerStyle,
        subheading,
        searchIcon,
        searchHeading,
        searchContent,
        searchButtonText,
        searchInputPlaceholder,
        searchEndpoint,
        image,
        anchorId,
        middleContent,
        middleCta,
        middleHeading,
        middleIcon,
        rightContent,
        rightCta,
        rightHeading,
        rightIcon
    } = component

    if (!searchInputPlaceholder || !searchEndpoint || !searchButtonText) {
        return null
    }
    const headerSize = headerStyle ? headerStyle : 'H1'

    const searchWrapper = (
        <BannerSection bannerLayout="4x4x4">
                <div className="bg-white rounded shadow-depth-hover">
                    <div className="p-6 flex-grow flex flex-col gap-4">
                            {searchIcon &&
                        <div className="grow-0">
                                <ResponsiveImage
                                image={{...searchIcon, width: 48, height: 48}}
                                layout="fixed"
                                />
                        </div>
                            }
                        <div className="flex flex-col gap-2 grow">
                            <h2 className="text-heading-s font-medium text-navy">
                                {searchHeading}
                            </h2>
                            {searchContent && (
                                <MarkdownBlock content={searchContent} />
                            )}
                        </div>
                        <LargeSearchInput
                            placeholder={searchInputPlaceholder}
                            searchButtonText={searchButtonText}
                            searchEndpoint={searchEndpoint}
                        />
                    </div>
                </div>

        <div className="bg-white rounded shadow-depth-hover flex flex-col">
            <div className="p-6 flex-grow flex flex-col gap-4">
                    {middleIcon && 
                        <div className="grow-0">
                        <ResponsiveImage                                
                        image={{...middleIcon, width: 48, height: 48}}
                        layout="fixed"
                        />
                        </div>
                    }
                    <div className="flex flex-col gap-2 grow">
                        {middleHeading && (
                            <h2 className="text-heading-s font-medium text-navy">
                                {middleHeading}
                            </h2>
                        )}
                        {middleContent && (
                            <MarkdownBlock content={middleContent} />
                    )}
                    </div>

                    <div className="">
                        {middleCta && (
                            <CtaBlock component={middleCta} className='w-full grow justify-center' />
                        )}
                    </div>
            </div>
        </div>

        <div className="bg-white rounded shadow-depth-hover flex flex-col">
            <div className="p-6 flex-grow flex flex-col gap-4">
                    {rightIcon && 
                        <div className="grow-0">
                        <ResponsiveImage                                
                        image={{...rightIcon, width: 48, height: 48}}
                        layout="fixed"
                        />
                        </div>
                    }
                    <div className="flex flex-col gap-2 grow">
                        {rightHeading && (
                            <h2 className="text-heading-s font-medium text-navy">
                                {rightHeading}
                            </h2>
                        )}
                        {rightContent && (
                            <MarkdownBlock content={rightContent} />
                        )}
                    </div>
                    <div className="">
                        {rightCta && (
                            <CtaBlock component={rightCta} className='w-full grow justify-center' dataLinkType='cta-button-make-an-enquiry'/>
                        )}
                    </div>
            </div>
        </div>
        </BannerSection>
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
