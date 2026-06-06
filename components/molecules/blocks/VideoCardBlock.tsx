import { CmsVideoCard } from '../../../types/contentful-cms-types'
import { YouTubeVideo } from '../YouTubeVideo'

export const VideoCardBlock = ({ component }: { component: CmsVideoCard }) => {
    const { videoId, placeholderImage, name } = component
    return (
        <>
            {videoId && name && (
                <YouTubeVideo
                    video={videoId}
                    placeholder={placeholderImage}
                    autoplay={true}
                    title={name}
                />
            )}
        </>
    )
}
