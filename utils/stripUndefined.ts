// return the object with any undefined fields removed.
export const stripUndefined = <T extends Record<string, unknown>>(
    obj: T
): T => {
    const entries = Object.entries(obj).filter(
        ([, value]) => value !== undefined
    )
    return Object.fromEntries(entries) as T
}
