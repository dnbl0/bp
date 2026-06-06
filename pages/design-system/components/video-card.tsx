import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
} from '../../../styleguide-components/primitives'
import { PlayArrow } from '../../../components/atoms/icons/PlayArrow'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
]

const VideoCard: NextPageWithLayout = () => (
    <DesignSystemLayout title="Video card" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Video card"
            status="stable"
            intro="A thin wrapper around the YouTube player that shows a placeholder image with a play affordance and loads the video on demand. It renders nothing unless both a video id and a name are provided."
        />

        <ComponentHero name="VideoCardBlock" />

        <Section id="example" title="Example">
            <Example surface="paper">
                <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden bg-charcoal">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <PlayArrow className="w-7 h-7 fill-navy" />
                        </span>
                    </div>
                </div>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                label="Field"
                rows={[
                    { name: 'videoId', type: 'string', required: true, description: 'The YouTube video id. Required to render.' },
                    { name: 'name', type: 'string', required: true, description: 'Accessible title for the player. Required to render.' },
                    { name: 'placeholderImage', type: 'CmsImage', description: 'Poster image shown before playback.' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default VideoCard
