import { gql } from "@apollo/client"
import fragmentBlockTestimonialCard from "./fragmentBlockTestimonialCard"
import fragmentBlockVideoCard from "./fragmentBlockVideoCard"
import fragmentBlockColouredCard from "./fragmentBlockColouredCard"
import fragmentBlockAccordion from "./fragmentBlockAccordion"
import fragmentBlockCta from "./fragmentBlockCta"
import fragmentBlockForm from "./fragmentBlockForm"
import fragmentBlockHeading from "./fragmentBlockHeading"
import fragmentBlockPromotionCard from "./fragmentBlockPromotionCard"
import fragmentBlockRichText from "./fragmentBlockRichText"
import fragmentBlockImageCard from "./fragmentBlockImageCard"
import fragmentBlockCalendly from "./fragmentBlockCalendly"
import fragmentBlockImage from "./fragmentBlockImage"
import fragmentBlockContactCard from "./fragmentBlockContactCard"

const RequestTwoColumnRightSection = gql`
    ${fragmentBlockContactCard}
    ${fragmentBlockTestimonialCard}
    ${fragmentBlockVideoCard}
    ${fragmentBlockColouredCard}
    ${fragmentBlockAccordion}
    ${fragmentBlockCta}
    ${fragmentBlockHeading}
    ${fragmentBlockPromotionCard}
    ${fragmentBlockRichText}
    ${fragmentBlockImageCard}
    ${fragmentBlockImage}
    ${fragmentBlockCalendly}
    ${fragmentBlockForm}

    query ($id: String!, $preview: Boolean!) {
            twoColumnSection(id: $id, preview: $preview) {
                rightColumnCollection {
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
                        ...fragmentBlockForm
                        ...fragmentBlockCalendly
                    }
                }
            }
    }
`

export default RequestTwoColumnRightSection
