import { gql } from '@apollo/client'
import FragmentBlockColouredCard from './fragmentBlockColouredCard'
import FragmentBlockImageCard from './fragmentBlockImageCard'
import FragmentBlockPromotionCard from './fragmentBlockPromotionCard'
import FragmentBlockContactCard from './fragmentBlockContactCard'
import FragmentBlockVideoCard from './fragmentBlockVideoCard'
import FragmentBlockAccordion from './fragmentBlockAccordion'
import FragmentBlockTestimonialCard from './fragmentBlockTestimonialCard'
import FragmentBlockRichText from './fragmentBlockRichText'
import FragmentBlockHeading from './fragmentBlockHeading'
import FragmentBlockCta from './fragmentBlockCta'
import FragmentBlockImage from './fragmentBlockImage'
import FragmentBlockPricing from './fragmentBlockPricing'
import FragmentBlockForm from './fragmentBlockForm'
import fragmentBlockCalendly from './fragmentBlockCalendly'

export const RequestOneColumnSection = gql`
    query ($id: String!, $preview: Boolean!) {
        oneColumnSection(id: $id, preview: $preview) {
            ...fragmentOneColumnSection
        }
    }

    fragment fragmentOneColumnSection on OneColumnSection {
        __typename
        anchorId
        backgroundColour
        contentCollection {
            items {
                ...fragmentBlockColouredCard
                ...fragmentBlockImageCard
                ...fragmentBlockPromotionCard
                ...fragmentBlockContactCard
                ...fragmentBlockVideoCard
                ...fragmentBlockAccordion
                ...fragmentBlockTestimonialCard
                ...fragmentBlockRichText
                ...fragmentBlockHeading
                ...fragmentBlockCta
                ...fragmentBlockImage
                ...fragmentBlockPricing
                ...fragmentBlockForm
                ...fragmentBlockCalendly
            }
        }
    }

    ${FragmentBlockColouredCard}
    ${FragmentBlockImageCard}
    ${FragmentBlockPromotionCard}
    ${FragmentBlockContactCard}
    ${FragmentBlockVideoCard}
    ${FragmentBlockAccordion}
    ${FragmentBlockTestimonialCard}
    ${FragmentBlockRichText}
    ${FragmentBlockHeading}
    ${FragmentBlockCta}
    ${FragmentBlockImage}
    ${FragmentBlockPricing}
    ${FragmentBlockForm}
    ${fragmentBlockCalendly}
`
