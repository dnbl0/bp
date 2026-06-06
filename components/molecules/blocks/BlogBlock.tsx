import { CmsBlogBlock } from '../../../types/contentful-cms-types'
import { ScrollTargetAnchor } from '../sections/NavigationBar/ScrollTargetAnchor'
import { BlogComponent } from './BlogComponent'

export const BlogBlock = ({ component }: { component: CmsBlogBlock }) => {
    const { title, tagName, anchorId } = component

    return (
        <>
            {anchorId && (
                <ScrollTargetAnchor anchorId={anchorId}></ScrollTargetAnchor>
            )}{' '}
            <BlogComponent tagName={tagName} />
        </>
    )
}
