export const phoneNumberFormatExpectedLength = 10;
export const phoneNumberFormatFirstSplit = 4;
export const phoneNumberFormatSecondSplit = 7;
export const formatPhoneNumber = (phoneNumber?: string): string | null => {
    if (!phoneNumber) {
        return null;
    }

    if (phoneNumber.length !== phoneNumberFormatExpectedLength) {
        return phoneNumber;
    }

    return [
        phoneNumber.slice(0, phoneNumberFormatFirstSplit),
        phoneNumber.slice(phoneNumberFormatFirstSplit, phoneNumberFormatSecondSplit),
        phoneNumber.slice(phoneNumberFormatSecondSplit),
    ].join(" ");
};

export const removeDash = (link: string): string => link.replace("-", " ");

export const snakeToTitle = (str: string): string =>
    str
        .split("-")
        .map(x => (x.length === 0 ? x : `${x.charAt(0).toUpperCase()}${x.slice(1, x.length)}`))
        .join(" ");

export const firstCharIsAlphanumeric = (str: string): boolean => /^[a-z0-9]$/i.test(str.charAt(0));

export const hasNonWhiteSpaceCharacters = (str: string): boolean => str.trim().length > 0;

export const stateShorthandLength = 3;
export const dayShorthandLength = 3;

export const dropTrailingSlash = (str: string): string =>
    str.length > 0 && str.charAt(str.length - 1) === "/" ? str.slice(0, str.length - 1) : str;

export const dropLeadingSlash = (str: string): string => (str.length > 0 && str.charAt(0) === "/" ? str.slice(1) : str);

export const changeToAlphaNumericNoSpaces = (value: string, maxLength = 0): string => {
    let result = value.split("").filter(firstCharIsAlphanumeric).join("");
    result = maxLength === 0 ? result : result.slice(0, maxLength);
    return result;
};
