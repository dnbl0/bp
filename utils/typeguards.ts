export const isRecord = (value: unknown): value is Record<any, unknown> => {
    return typeof value === 'object' && value !== null
}

export const isDefined = <T>(value: T | null | undefined): value is T => {
    return value !== null && value !== undefined
}
