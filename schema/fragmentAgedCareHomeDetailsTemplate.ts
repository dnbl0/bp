import { gql } from '@apollo/client'
import FragmentBlockAccordion from './fragmentBlockAccordion'
import FragmentBlockColouredCard from './fragmentBlockColouredCard'
import FragmentBlockContactCard from './fragmentBlockContactCard'
import FragmentBlockCta from './fragmentBlockCta'
import FragmentBlockForm from './fragmentBlockForm'
import FragmentBlockHeading from './fragmentBlockHeading'
import fragmentBlockPricing from './fragmentBlockPricing'
import FragmentBlockPromotionCard from './fragmentBlockPromotionCard'
import FragmentBlockRichText from './fragmentBlockRichText'
import FragmentBlockTestimonialCard from './fragmentBlockTestimonialCard'
import FragmentBlockVideoCard from './fragmentBlockVideoCard'
import FragmentGrid6x6 from './fragmentGrid6x6'
import FragmentSectionNavigationBar from './fragmentSectionNavigationBar'
import FragmentBlockCard from './fragmentBlockCard'
import FragmentBlockImageCard from './fragmentBlockImageCard'
import FragmentCarousel from './fragmentCarousel'
import fragmentBlogBlock from './fragmentBlogBlock'
import fragmentBlockCalendly from './fragmentBlockCalendly'

const fragmentAgedCareHomeDetailsTemplate = gql`
    ${FragmentBlockAccordion}
    ${FragmentBlockColouredCard}
    ${FragmentBlockContactCard}
    ${FragmentBlockCta}
    ${FragmentBlockForm}
    ${FragmentBlockHeading}
    ${fragmentBlockPricing}
    ${FragmentBlockPromotionCard}
    ${FragmentBlockRichText}
    ${FragmentBlockTestimonialCard}
    ${FragmentBlockVideoCard}
    ${FragmentGrid6x6}
    ${FragmentSectionNavigationBar}
    ${FragmentBlockCard}
    ${FragmentBlockImageCard}
    ${FragmentCarousel}
    ${fragmentBlogBlock}
    ${fragmentBlockCalendly}

    fragment agedCareHomeDetailsTemplate on AgedCareHomeDetailsTemplate {
        __typename
        name
        customTagBlockCollection {
            items {
                sys {
                    id
                }
                title
                href
                openInNewTab
                bgColor
                textColor
            }
        }
        galleryCollection {
            items {
                sys {
                    id
                }
                title
                description
                contentType
                fileName
                size
                url
                width
                height
            }
        }
        contactCard {
            ...fragmentBlockContactCard
        }
        socialEmbeddedCode {
            json
        }
        gmProfile {
            ...fragmentBlockTestimonialCard
        }
        floatingNavigation {
            ...fragmentSectionNavigationBar
        }
        primaryContentCollection(limit: 50) {
            items {
                ...fragmentBlockAccordion
                ...fragmentBlockColouredCard
                ...fragmentBlockCta
                ...fragmentBlockForm
                ...fragmentBlockHeading
                ...fragmentBlockPricing
                ...fragmentBlockPromotionCard
                ...fragmentBlockRichText
                ...fragmentBlockTestimonialCard
                ...fragmentBlockVideoCard
                ...fragmentSection6x6
                ...fragmentBlockCard
                ...fragmentBlockImageCard
                ...fragmentCarousel
                ...fragmentBlogBlock
                ...fragmentBlockCalendly
            }
        }
        location {
            lat
            lon
        }
        nearbyHomesCollection {
            items {
                name
                location {
                    lat
                    lon
                }
                homeDisplayPage {
                    slug
                }
                galleryCollection(limit: 1) {
                    items {
                        sys {
                            id
                        }
                        title
                        description
                        contentType
                        fileName
                        size
                        url
                        width
                        height
                    }
                }
            }
        }
    }
`

export default fragmentAgedCareHomeDetailsTemplate
