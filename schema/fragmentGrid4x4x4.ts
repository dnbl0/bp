import { gql } from '@apollo/client'
import FragmentBlockCard from './fragmentBlockCard'
import FragmentBlockColouredCard from './fragmentBlockColouredCard'
import FragmentBlockImageCard from './fragmentBlockImageCard'
import FragmentBlockContactCard from './fragmentBlockContactCard'
import FragmentBlockVideoCard from './fragmentBlockVideoCard'
import FragmentBlockAccordion from './fragmentBlockAccordion'
import FragmentBlockTestimonialCard from './fragmentBlockTestimonialCard'
import FragmentBlockRichText from './fragmentBlockRichText'
import FragmentBlockImage from './fragmentBlockImage'
import FragmentBlockForm from './fragmentBlockForm'
import FragmentCarousel from './fragmentCarousel'
import FragmentPricingCalculatorCard from './fragmentPricingCalculatorCard'


const FragmentGrid4x4x4 = gql`
    fragment fragmentSection4x4x4 on Grid4X4X4 {
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
        content3 {
            ...fragmentBlockCard
            ...fragmentBlockColouredCard
            ...fragmentBlockImageCard
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

export default FragmentGrid4x4x4
