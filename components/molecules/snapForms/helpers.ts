export const getSnapFormId = (searchQueryStr: string): string | undefined => {
    const searchParams = Object.fromEntries(new URLSearchParams(searchQueryStr))
    const snapFormId = searchParams['snap']
    return snapFormId
}
