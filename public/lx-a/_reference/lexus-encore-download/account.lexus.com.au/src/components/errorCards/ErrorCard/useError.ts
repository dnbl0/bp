import { StateSelector } from "../../../types/general";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const alwaysUndefined = () => undefined;

export const useError = (selector?: StateSelector<Error | undefined>): Error | undefined => {
    const error = useSelector(selector || alwaysUndefined);
    const [cachedError, setCachedError] = useState<Error | undefined>(error);

    useEffect(() => {
        if (error !== undefined) {
            setCachedError(error);
        }
    }, [error]);
    return cachedError;
};
