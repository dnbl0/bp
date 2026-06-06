import { gql } from "@apollo/client"
import fragmentBlockPricing from "./fragmentBlockPricing"
import FragmentGrid6x6 from "./fragmentGrid6x6"
import fragmentBlockTestimonialCard from "./fragmentBlockTestimonialCard"
import fragmentBlockVideoCard from "./fragmentBlockVideoCard"
import fragmentBlockColouredCard from "./fragmentBlockColouredCard"
import fragmentBlockAccordion from "./fragmentBlockAccordion"
import fragmentBlockCta from "./fragmentBlockCta"
import fragmentBlockHeading from "./fragmentBlockHeading"
import fragmentBlockPromotionCard from "./fragmentBlockPromotionCard"
import fragmentBlockRichText from "./fragmentBlockRichText"
import fragmentBlockImageCard from "./fragmentBlockImageCard"
import fragmentBlockImage from "./fragmentBlockImage"
import fragmentBlockContactCard from "./fragmentBlockContactCard"
import FragmentGrid4x4x4 from "./fragmentGrid4x4x4"

const RequestTwoColumnLeftSection = gql`
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
    ${FragmentGrid6x6}
    ${FragmentGrid4x4x4}
    ${fragmentBlockPricing}

    query ($id: String!, $preview: Boolean!) {
            twoColumnSection(id: $id, preview: $preview) {
                leftColumnCollection {
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
                        ...fragmentPricingCalculatorCard
                        ...fragmentSection6x6
                        ...fragmentSection4x4x4
                    }
                }
            }
    }
`

export default RequestTwoColumnLeftSection
