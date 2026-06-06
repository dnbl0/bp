import { CmsAsset } from '../../types/contentful-cms-types'
import Link from 'next/link'
import { PlayArrow } from '../atoms/icons/PlayArrow'
import { ResponsiveImage } from '../atoms/ResponsiveImage'
import { cx } from '../../utils/cx'
import { useState } from 'react'

export const YouTubeVideo = ({
    video,
    autoplay,
    placeholder,
    title,
}: {
    video: string
    autoplay: boolean
    placeholder?: CmsAsset | null
    title: string
}) => {
    const [status, setStatus] = useState('idle')
    const videoPlaceHolder: CmsAsset = placeholder
        ? placeholder
        : {
              url: `https://img.youtube.com/vi/${video}/hqdefault.jpg`,
              description: title,
              title: title,
              __typename: 'Asset',
              width: 480,
              height: 360,
              contentfulMetadata: {
                  __typename: 'ContentfulMetadata',
                  tags: [],
                  concepts: [],
              },
              sys: {
                  __typename: 'Sys',
                  environmentId: 'dynamic',
                  id: '52766',
                  spaceId: '52766',
              },
          }
    return (
        <div
            className={cx('cursor text-center bg-cover aspect-video relative')}
        >
            {status === 'idle' ? (
                <div
                    className="absolute h-full w-full top-0 left-0 rounded overflow-hidden"
                    onClick={e => setStatus('playing')}
                >
                    {videoPlaceHolder && (
                        <ResponsiveImage
                            image={videoPlaceHolder}
                            layout="fill"
                        />
                    )}
                    <div
                        className={cx(
                            'absolute',
                            'h-full w-full',
                            'top-0 left-0',
                            'cursor-pointer',
                            'group'
                        )}
                    >
                        <div
                            className={cx(
                                'h-full w-full',
                                'opacity-20 bg-black group-hover:opacity-0'
                            )}
                        ></div>

                        <div
                            className={cx(
                                'absolute',
                                'h-full ',
                                '-right-0.5 top-0',
                                'flex flex-col justify-center'
                            )}
                            onClick={e => setStatus('playing')}
                        >
                            <a
                                className="border-2 border-white p-3.5 pl-5 fill-white group-hover:bg-cyan"
                                title="Play video"
                            >
                                <span className="sr-only">Play video</span>
                                <PlayArrow />
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="absolute h-full w-full top-0 left-0 rounded overflow-hidden">
                    <iframe
                        title={title || ''}
                        src={`https://www.youtube.com/embed/${video}?autoplay=${
                            autoplay || false
                        }&autohide=1&border=0&wmode=opaque&enablejsapi=1`}
                        className="player"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; encrypted-media"
                    />
                </div>
            )}
        </div>
    )
}
