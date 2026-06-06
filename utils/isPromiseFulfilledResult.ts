export const isPromiseFulfilledResult = <T>(
    value: PromiseSettledResult<T>
): value is PromiseFulfilledResult<T> => {
    return value.status === 'fulfilled'
}
