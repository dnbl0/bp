import { CmsContactHeroSection } from '../../../types/contentful-cms-types'
import { ScrollTargetAnchor } from './NavigationBar/ScrollTargetAnchor'
import { ContactCardBlock } from '../blocks/ContactCardBlock'
import { HeroBanner } from '../HeroBanner'
import { HeaderStyle } from '../../atoms/HeaderStyle'

export const ContactHeroSection = ({
    component,
}: {
    component: CmsContactHeroSection
}) => {
    const { heading, headerStyle, image, contactCard, anchorId } = component

    const foreground = contactCard && (
        <div className="grid grid-cols-12 gap-4 w-content m-auto">
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
                <ContactCardBlock component={contactCard} />
            </div>
        </div>
    )

    const bannerText = (
        <div className="py-6 md:pt-[120px] md:pb-12">
            <div className="flex flex-col-reverse justify-between gap-3">
                {heading && (
                    <HeaderStyle headerStyle={headerStyle}>
                        {heading}
                    </HeaderStyle>
                )}
            </div>
        </div>
    )

    return (
        <ScrollTargetAnchor anchorId={anchorId}>
            <HeroBanner
                image={image || undefined}
                foreground={foreground}
                bannerText={bannerText}
            />
        </ScrollTargetAnchor>
    )
}
