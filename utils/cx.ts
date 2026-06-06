type ClassName = string | false | null | undefined

/** A minimal utility function to construct CSS className strings
 *
 *  For example:
 *  ```jsx
 *     <div className={cx('my-component', isVisible && 'visible')}> </div>
 *  ```
 * @returns string
 */
export const cx = (...args: ClassName[]): string => {
    return args.reduce<string>(classNameReducer, '')
}

const classNameReducer = (previous: string, current: ClassName): string => {
    if (current) {
        return previous ? `${previous} ${current}` : current
    }
    return previous
}
