import { find } from "instantsearch.js/es/lib/utils";

/**
 * Searches the object for the value specified by the key. If the key is found
 * at any level of nesting, the corresponding value is returned. If the key is
 * not found, undefined is returned.
 *
 * @param object - The object to search.
 * @param key - The key to search for.
 * @returns The value associated with the key if found, or undefined if not found.
 *
 * @example
 * const obj = { a: { b: { c: 42 } } };
 * const value = findDeepValue(obj, 'c'); // returns 42
 */
export const findDeepValue = (object: any, key: string, path = ''): any => {    
    var value;
    Object.keys(object).some(function(k) {
        if (k === key) {
            // console.log(`Found key "${key}" at path "${path}.${key}" with value:`, object[k]);
            value = object[k];
            return true;
        }
        if (object[k] && typeof object[k] === 'object') {
            value = findDeepValue(object[k], key, path + '.' + k);
            return value !== undefined;
        }
    });
    return value;
};


export const findDeepValueForPathname = (object: any, key: string): any => {
    const resolvedProp = findDeepValue(object, object.pathname);
    return findDeepValue(resolvedProp, key);
};
