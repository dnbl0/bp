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
import FragmentPricingCalculatorCard from './fragmentPricingCalculatorCard'

const FragmentGrid6x6 = gql`
    fragment fragmentSection6x6 on Grid6X6 {
        __typename
        sys {
            id
        }
        anchorId
        backgroundColour
        verticalPadding
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
            ...fragmentPricingCalculatorCard
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
            ...fragmentPricingCalculatorCard
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
    ${FragmentPricingCalculatorCard}
`

export default FragmentGrid6x6
