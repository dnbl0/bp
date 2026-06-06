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
import FragmentGrid3x3x3x3 from './fragmentGrid3x3x3x3'
import FragmentGrid4x4x4 from './fragmentGrid4x4x4'
import FragmentGrid4x8 from './fragmentGrid4x8'
import FragmentGrid6x6 from './fragmentGrid6x6'
import FragmentGrid12 from './fragmentGrid12'
import FragmentContactHeroSection from './fragmentContactHeroSection'
import FragmentSearchHomeHeroSection from './fragmentSearchHomeHeroSection'
import FragmentSectionNavigationBar from './fragmentSectionNavigationBar'
import fragmentBlogBlock from './fragmentBlogBlock'
import FragmentThreeColumnSearchHomeSection from './fragmentThreeColumnSeachHomeSection'
import { RequestAgedCareNavigator } from './requestAgedCareNavigator'

const fragmentSingleColumnTemplate = gql`
    fragment singleColumnTemplate on SingleColumnTemplate {
        __typename
        name
        sectionsCollection {
            items {
                ... on OneColumnSection {
                    sys {
                        id
                    }
                    __typename
                }

                ... on TwoColumnSection {
                    sys {
                        id
                    }
                    __typename
                }

                ... on Grid3X3X3X3 {
                    sys {
                        id
                    }
                    __typename
                }

                ... on Grid4X4X4 {
                    sys {
                        id
                    }
                    __typename
                }

                ... on Grid6X6 {
                    sys {
                        id
                    }
                    __typename
                }

                ... on Grid4X8 {
                    sys {
                        id
                    }
                    __typename
                }

                ... on Grid12 {
                    sys {
                        id
                    }
                    __typename
                }

                ... on ContactHeroSection {
                    sys {
                        id
                    }
                    __typename
                }

                ... on SearchHomeHeroSection {
                    sys {
                        id
                    }
                    __typename
                }

                ... on BasicHeroSection {
                    sys {
                        id
                    }
                }

                ... on NavigationBar {
                    sys {
                        id
                    }
                    __typename
                }

                ... on RegionListDetailsSection {
                    sys {
                        id
                    }
                    __typename
                }

                ... on BlogBlock {
                    sys {
                        id
                    }
                    __typename
                }

                ... on AgedCareNavigator {
                    sys {
                        id
                    }
                    __typename
                }
                
                ... on ThreeColumnSearchHomeHeroSection {
                    sys {
                        id
                    }
                    __typename
                }
            }
        }
    }
`

export default fragmentSingleColumnTemplate

