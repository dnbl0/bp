import { gql } from '@apollo/client'
import FragmentBlockCard from './fragmentBlockCard'
import FragmentBlockColouredCard from './fragmentBlockColouredCard'
import FragmentBlockTestimonialCard from './fragmentBlockTestimonialCard'
import fragmentBlockImageCard from './fragmentBlockImageCard'

const FragmentCarousel = gql`
    fragment fragmentCarousel on Carousel {
        __typename
        sys {
            id
        }
        anchorId
        title
        slidesPerScreen
        carouselItemsCollection {
            items {
                ...fragmentBlockCard
                ...fragmentBlockColouredCard
                ...fragmentBlockTestimonialCard
                ...fragmentBlockImageCard
            }
        }
    }
    ${FragmentBlockCard}
    ${FragmentBlockColouredCard}
    ${FragmentBlockTestimonialCard}
    ${fragmentBlockImageCard}
`

export default FragmentCarousel
