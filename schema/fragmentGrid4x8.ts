import { gql } from '@apollo/client'
import FragmentBlockCard from './fragmentBlockCard'
import FragmentBlockColouredCard from './fragmentBlockColouredCard'
import FragmentBlockImageCard from './fragmentBlockImageCard'
import FragmentBlockPromotionCard from './fragmentBlockPromotionCard'
import FragmentBlockContactCard from './fragmentBlockContactCard'
import FragmentBlockVideoCard from './fragmentBlockVideoCard'
import FragmentBlockAccordion from './fragmentBlockAccordion'
import FragmentBlockTestimonialCard from './fragmentBlockTestimonialCard'
import FragmentBlockRichText from './fragmentBlockRichText'
import FragmentBlockImage from './fragmentBlockImage'
import FragmentBlockForm from './fragmentBlockForm'
import FragmentCarousel from './fragmentCarousel'

const FragmentGrid4x8 = gql`
    fragment fragmentSection4x8 on Grid4X8 {
        __typename
        sys {
            id
        }
        anchorId
        backgroundColour
        verticalPadding
        largeFirst
        content1 {
            ...fragmentBlockCard
            ...fragmentBlockColouredCard
            ...fragmentBlockImageCard
            ...fragmentBlockPromotionCard
            ...fragmentBlockContactCard
            ...fragmentBlockVideoCard
            ...fragmentBlockAccordion
            ...fragmentBlockTestimonialCard
            ...fragmentBlockRichText
            ...fragmentBlockImage
            ...fragmentBlockForm
            ...fragmentCarousel
        }
        content2 {
            ...fragmentBlockCard
            ...fragmentBlockColouredCard
            ...fragmentBlockImageCard
            ...fragmentBlockPromotionCard
            ...fragmentBlockContactCard
            ...fragmentBlockVideoCard
            ...fragmentBlockAccordion
            ...fragmentBlockTestimonialCard
            ...fragmentBlockRichText
            ...fragmentBlockImage
            ...fragmentBlockForm
            ...fragmentCarousel
        }
    }
    ${FragmentBlockCard}
    ${FragmentBlockColouredCard}
    ${FragmentBlockImageCard}
    ${FragmentBlockPromotionCard}
    ${FragmentBlockContactCard}
    ${FragmentBlockVideoCard}
    ${FragmentBlockAccordion}
    ${FragmentBlockTestimonialCard}
    ${FragmentBlockRichText}
    ${FragmentBlockImage}
    ${FragmentBlockForm}
    ${FragmentCarousel}
`

export default FragmentGrid4x8
