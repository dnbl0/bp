import { CmsImageBlock } from '../../../types/contentful-cms-types'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'

export const ImageBlock = ({ component }: { component: CmsImageBlock }) => {
    const { image } = component
    if (!image) return null
    return <ResponsiveImage image={image} layout="responsive" />
}
