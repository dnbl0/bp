/*
 Returns an array of unique objects by key

 @param items: Array of objects
 @param key: Key of object to compare
 @returns Array of unique objects
*/
export const unqiueBy = <T extends Record<string, unknown>>(
    items: T[],
    key: keyof T
) => {
    let seen = new Set()
    return items.filter(item => {
        let value = item[key]
        return seen.has(value) ? false : seen.add(value)
    })
}
