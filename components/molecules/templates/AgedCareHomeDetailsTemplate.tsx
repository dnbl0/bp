import { AnyCmsElement, CmsElement } from '../CmsElement'
import {
    CmsAgedCareHomeDetailsTemplate,
    CmsAgedCareHomeDetailsTemplateNearbyHomesCollection,
    CmsContactCard,
    CmsLocation,
    CmsTestimonialCard,
} from '../../../types/contentful-cms-types'
import { AreaTypeProvider } from '../../../hooks/useAreaTypeContext'
import { MemoizedImageGallery } from '../blocks/ImageGallery'
import { NavigationBar } from '../sections/NavigationBar'
import { TestimonialCardBlock } from '../blocks/TestimonialCardBlock'
import { NearbyCardBlock } from '../blocks/NearbyCardBlock'
import { ScrollTargetAnchor } from '../sections/NavigationBar/ScrollTargetAnchor'
import { Section } from '../../atoms/Section'
import { TagsBlock } from '../blocks/TagsBlock'
import { isDefined } from '../../../utils/typeguards'

export const AgedCareHomeDetailsTemplate = ({
    component,
}: {
    component: CmsAgedCareHomeDetailsTemplate
}) => {
    const {
        name,
        customTagBlockCollection,
        contactCard,
        primaryContentCollection,
        galleryCollection,
        floatingNavigation,
        location,
        nearbyHomesCollection,
        gmProfile,
        socialEmbeddedCode
    } = component

    const primaryBlocks = primaryContentCollection?.items.filter(isDefined)
    return (
        <div className="overflow-visible">
            {floatingNavigation && (
                <NavigationBar component={floatingNavigation} />
            )}
            <ScrollTargetAnchor anchorId={'gallery'}>
                <div className="flex flex-col md:flex-col-reverse mt-8">
                    <div className="flex flex-col gap-4 mb-10">
                        <MemoizedImageGallery gallery={galleryCollection!} />
                    </div>
                    <Section>
                        <h1 className="text-heading-l font-medium mb-5">
                            {name}
                        </h1>
                        {customTagBlockCollection?.items && (
                            <TagsBlock component={customTagBlockCollection} />
                        )}
                    </Section>
                </div>
            </ScrollTargetAnchor>
            <Section>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4 md:col-start-9">
                        <SidebarItemOne contactCard={contactCard} />
                        <SidebarItemTwo gmProfile={gmProfile} />
                        {location && nearbyHomesCollection && (
                            <SidebarItemThree
                            location={location}
                            nearbyHomesCollection={nearbyHomesCollection}
                            />
                        )}
                    <SidebarItemFour socialEmbeddedCode={socialEmbeddedCode?.json.content[0].content[0].value} />
                    </div>
                    <PrimaryContent blocks={primaryBlocks} />
                </div>
            </Section>
        </div>
    )
}

const SidebarItemOne = ({
    contactCard,
}: {
    contactCard: CmsContactCard | undefined | null
}) => {
    if (!contactCard) {
        return null
    }
    return (
        <div 
        className="mt-6"
        >
            <CmsElement component={{ block: contactCard }}></CmsElement>
        </div>
    )
}

const SidebarItemTwo = ({
    gmProfile,
}: {
    gmProfile: CmsTestimonialCard | undefined | null
}) => {
    if (!gmProfile) {
        return null
    }
    return (
        <div 
        className="mt-6"
        >
            {gmProfile && <TestimonialCardBlock component={gmProfile} />}
        </div>
    )
}


//create sidebareitem three for social post that display a social url like: https://www.facebook.com/share/p/1F8m3iNZM2/ 
const SidebarItemFour = ({
    socialEmbeddedCode,
}: {
    socialEmbeddedCode: string | undefined | null
}) => {
    if (!socialEmbeddedCode) {
        return null
    }

    return (            
            <div 
            className=' mt-6 iframe-container' 
            dangerouslySetInnerHTML={{__html: socialEmbeddedCode}}/>
        )
}


const SidebarItemThree = ({
    location,
    nearbyHomesCollection,
}: {
    location: CmsLocation
    nearbyHomesCollection: CmsAgedCareHomeDetailsTemplateNearbyHomesCollection
}) => {
    return (
        <div className="mt-6">
            <NearbyCardBlock
                location={location}
                nearbyHomes={nearbyHomesCollection}
            />
        </div>
    )
}

const PrimaryContent = ({
    blocks,
}: {
    blocks: AnyCmsElement[] | undefined
}) => {
    if (!blocks || blocks.length === 0) {
        return null
    }
    return (
        <AreaTypeProvider areaType="Column">
            <div className="col-span-12 md:col-span-8 md:col-start-1 md:row-start-1 md:row-span-4">
                <div className="flex flex-col gap-4">
                    {blocks.map((block, index) => (
                        <div key={index}>
                            <CmsElement component={{ block }} />
                        </div>
                    ))}
                </div>
            </div>
        </AreaTypeProvider>
    )
}
