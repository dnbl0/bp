import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
    Specifications,
} from '../../../styleguide-components/primitives'
import { PlayArrow } from '../../../components/atoms/icons/PlayArrow'
import { videoCardDefaultSpecs } from '../../../styleguide-components/specs/video-card.specs'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const PlaceholderCard = () => (
    <div className="relative w-full max-w-[200px] aspect-video rounded-lg overflow-hidden bg-charcoal">
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <PlayArrow className="w-5 h-5 fill-navy" />
            </span>
        </div>
    </div>
)

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
            <Example
                surface="paper"
                code={`<div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden bg-charcoal">
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
      <PlayArrow className="w-7 h-7 fill-navy" />
    </span>
  </div>
</div>`}
            >
                <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden bg-charcoal">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                            <PlayArrow className="w-7 h-7 fill-navy" />
                        </span>
                    </div>
                </div>
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={videoCardDefaultSpecs} withTable>
                <PlaceholderCard />
            </Specifications>
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

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Always show a clear play affordance over the poster so it reads as a video, not a static image.">
                    <PlaceholderCard />
                </Do>
                <Dont note="Don't autoplay the embedded video — load it only after the user taps the play control.">
                    <div className="relative w-full max-w-[200px] aspect-video rounded-lg overflow-hidden bg-charcoal" />
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default VideoCard
