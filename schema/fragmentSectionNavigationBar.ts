import { gql } from '@apollo/client'

const FragmentSectionNavigationBar = gql`
    fragment fragmentSectionNavigationBar on NavigationBar {
        sticky
        cta {
            caption
            href
            openInNewTab
            ctaColour
        }
        linksCollection {
            items {
                sys {
                    id
                }
                href
                openInNewTab
                caption
            }
        }
    }
`

export default FragmentSectionNavigationBar
