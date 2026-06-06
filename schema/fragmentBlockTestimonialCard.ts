import { gql } from '@apollo/client'

const FragmentBlockTestimonialCard = gql`
    fragment fragmentBlockTestimonialCard on TestimonialCard {
        __typename
        isBottom
        from
        title
        locationText
        locationHref
        bodyRichText {
            json
        }
        icon {
            __typename
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
`

export default FragmentBlockTestimonialCard
