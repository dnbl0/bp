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

const FragmentGrid3x3x3x3 = gql`
    fragment fragmentSection3x3x3x3 on Grid3X3X3X3 {
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
        }
        content4 {
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
`

export default FragmentGrid3x3x3x3
