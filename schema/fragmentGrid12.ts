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
import fragmentBlogBlock from './fragmentBlogBlock'

const FragmentGrid12 = gql`
    fragment fragmentSection12 on Grid12 {
        anchorId
        backgroundColour
        verticalPadding
        __typename
        sys {
            id
        }
        content {
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
            ...fragmentBlogBlock
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
    ${fragmentBlogBlock}
`

export default FragmentGrid12
