import { identity } from "lodash";
import { settingsPromise, Settings } from "../settings";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ErrorConstants } from "Helpers/ErrorConstants";
import { AuthSection, setAuthSection } from "ReduxSlices/user";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

type AppDispatch = ThunkDispatch<any, any, Action>;

export const usePromiseState = <T, V>(
    promise: Promise<T>,
    selector: (data: T) => V = identity,
    errorHandler?: (e: unknown) => void
): V | undefined => {
    const [value, setValue] = useState<V | undefined>(undefined);
    useEffect(() => {
        const processedPromise = promise.then(data => {
            setValue(selector(data));
        });
        if (errorHandler) {
            processedPromise.catch(errorHandler);
        }
    }, []);
    return value;
};

export const useSettingsPromise = <V>(selector: (settings: Settings) => V = identity): V | undefined => {
    const dispatch: AppDispatch = useDispatch();
    return usePromiseState(settingsPromise(), selector, e => {
        if (e instanceof Error && e.message?.includes(ErrorConstants.BFFDownError)) {
            dispatch(setAuthSection(AuthSection.BFFError));
        } else {
            dispatch(setAuthSection(AuthSection.Error));
        }
    });
};
