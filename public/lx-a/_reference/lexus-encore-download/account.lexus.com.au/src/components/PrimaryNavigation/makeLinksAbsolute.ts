import { dropLeadingSlash, dropTrailingSlash } from "Helpers/string";
import { isEqual, mapValues, some, startsWith } from "lodash";
import { PrimaryNavRawData } from "@tmca/lexus-kit/css-in-js";

import { takeLast } from "Helpers/array";

const keyPathsToReplace = [
    ["src"],
    ["url"],
    ["href"],
    ["linkUrl"],
    ["dealerLink"],
    ["searchResultPage"],
    ["path", "value"],
    ["contentPath", "value"],
];

const keyPathShouldBeReplaced = (keyPath: (string | number)[]) =>
    some(keyPathsToReplace, x => isEqual(x, takeLast(keyPath, x.length)));

type MakeLinksAbsolute<T> = (linkReplacement: string, value: T, keyPath?: (string | number)[]) => T;

export const makeLinksAbsolute: MakeLinksAbsolute<PrimaryNavRawData> = (linkReplacementBase, value) => {
    const linkReplacementBaseFixed = dropTrailingSlash(linkReplacementBase);

    return makeLinksAbsoluteHelper(linkReplacementBaseFixed, value);
};

const makeLinksAbsoluteHelper: MakeLinksAbsolute<any> = (linkReplacementBase, value, keyPath = []) => {
    const currentKey = keyPath.length > 0 ? keyPath[keyPath.length - 1] : undefined;
    if (Array.isArray(value)) {
        return value.map((v, key) => makeLinksAbsoluteHelper(linkReplacementBase, v, [...keyPath, key]));
    } else if (typeof value === "object" && value !== null) {
        return mapValues(value as any as Record<string, unknown>, (v, key) =>
            makeLinksAbsoluteHelper(linkReplacementBase, v, [...keyPath, key])
        );
    } else if (
        typeof value === "string" &&
        typeof currentKey === "string" &&
        keyPathShouldBeReplaced(keyPath) &&
        !startsWith(value, "http") &&
        !startsWith(value, "data:") &&
        !startsWith(value, "#")
    ) {
        const valueFixed = dropLeadingSlash(value);
        return `${linkReplacementBase}/${valueFixed}`;
    }

    return value;
};
