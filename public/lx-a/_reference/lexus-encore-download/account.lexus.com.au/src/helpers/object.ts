import { Dictionary, pickBy } from "lodash";

// A function that returns an object, containing only changed properties between prev and next
export const getChanged = <T extends Record<string, unknown>>(prev: T, next: T): Dictionary<unknown> => {
    return pickBy(next, (value, key) => {
        return value !== prev[key];
    });
};

export const hasChangedBeforeAfterStringProps = (
    prevValuesObj: Record<string, unknown>,
    newValuesObj: Record<string, unknown>
): boolean => {
    let hasChanged = false;
    if (!prevValuesObj && !newValuesObj) {
        return hasChanged;
    }
    for (const key in newValuesObj) {
        const vNew = newValuesObj[key];
        const vPre = prevValuesObj[key];
        const bothUndefined = !vPre && !vNew;
        const valueHasChanged = vNew !== vPre;
        hasChanged = !bothUndefined && valueHasChanged;
        if (hasChanged) {
            return hasChanged;
        }
    }
    return hasChanged;
};

type PathLike<S extends string> = S extends `${infer PART}.${infer REST}`
    ? REST extends `.${string}`
        ? never
        : PART extends `${infer _}${string}`
        ? `${PART}.${PathLike<REST>}`
        : never
    : S extends `${infer _}${string}`
    ? S
    : never;

type ObjectWithPath<S extends string> = S extends `${infer PART}.${infer REST}`
    ? REST extends `.${string}`
        ? never
        : PART extends `${infer _}${string}`
        ? { [K in PART]: ObjectWithPath<REST> }
        : never
    : S extends `${infer _}${string}`
    ? { [K in S]: unknown }
    : never;

const hasProperty = <K extends PropertyKey, T extends { [P in K]?: T[P] }>(
    obj: T | unknown,
    propName: K
): obj is T extends { [P in K]?: T[P] } ? T : never =>
    !!(obj && (typeof obj === "object" || typeof obj === "function") && obj.hasOwnProperty(propName));

export const hasPath = <P extends string>(obj: unknown, path: PathLike<P>): obj is ObjectWithPath<P> =>
    path
        ? path
              .split(".")
              .reduce(
                  ({ o }, part) => (hasProperty(o, part) ? { o: o[part], res: true } : { o: undefined, res: false }),
                  { o: obj, res: false }
              ).res
        : false;
