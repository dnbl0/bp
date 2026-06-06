export class InvalidSwitchError extends Error {
    constructor(value: never, msg: string = '') {
        super(`Case value not handled: ${value} ${msg}`)
    }
}
