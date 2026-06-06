import React, { useEffect, useState } from 'react'
import { BlogData } from '../../../pages/api/blog-stories'
import { CmsImageCard, CmsPage } from '../../../types/contentful-cms-types'
import { ImageCardBlock } from './ImageCardBlock'
import { LoadingSpinnerIcon } from '../../atoms/icons/LoadingSpinnerIcon'

export const BlogComponent = ({ tagName }: { tagName?: string | null }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [blogs, setBlogs] = useState<CmsPage[]>()
    const [total, setTotal] = useState(0)
    const [loadedBlogs, setLoadedBlogs] = useState(0)
    const [start, setStart] = useState(0)
    const isMore = loadedBlogs < total

    useEffect(() => {
        setIsLoading(true)
        const fetchUrl =
            `/api/blog-stories?start=${start}` +
            (tagName ? '&name=' + tagName : '')
        fetch(fetchUrl)
            .then(res => res.json())
            .then((data: BlogData) => {
                if (data.success) {
                    const newBlogs = blogs
                        ? blogs.concat(data.blogs)
                        : data.blogs
                    setBlogs(newBlogs)
                    setTotal(data.total)
                    setLoadedBlogs(loadedBlogs + data.blogs.length)
                }
                setIsLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagName, start])

    const loadMore = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (blogs && blogs?.length < total) {
            e.preventDefault
            const newStart = blogs.length
            setStart(newStart)
        }
    }
    return (
        <div className="blog-component">
            {isLoading && loadedBlogs === 0 ? (
                <div>...Loading</div>
            ) : (
                <div className="h-full pb-8">
                    <div className="py-2 m-auto flex flex-col gap-4 grid-cols-12 md:grid [&>*]:col-span-6 xl:[&>*]:col-span-4 justify-items-stretch items-stretch">
                        {blogs?.map(blog => {
                            const imageCard: CmsImageCard = {
                                _id: '52766',
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
                                __typename: 'ImageCard',
                                heading: blog.title
                                    ? blog.title.split(' |')[0]
                                    : '',
                                body: blog.metaDescription,
                                buttonHref: blog.slug,
                                buttonText: 'Read more',
                                image: blog.openGraphImage,
                            }
                            return (
                                <div key={blog.sys.id} className="flex">
                                    <ImageCardBlock component={imageCard} />
                                </div>
                            )
                        })}
                    </div>
                    {isMore && (
                        <div className="flex flex-row justify-center mt-8">
                            <a
                                className="button button--secondary justify-center cursor-pointer"
                                onClick={e => loadMore(e)}
                            >
                                <span>Load more</span>
                                {isLoading && (
                                    <LoadingSpinnerIcon className="animate-spin fill-cyan" />
                                )}
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
