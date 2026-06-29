import { AccountManager } from "lexus-style-guide/Components/Account/Providers/AccountManager";
import { UnauthorizedError } from "lexus-style-guide/Components/Account/Errors/UnauthorizedError";
import { ThunkAction } from "redux-thunk";
import { AppState } from "ReduxSlices/index";
import { StateSelector } from "Types/general";
import { LoadStatus } from "Types/loadStatus";
import { PayloadAction } from "@reduxjs/toolkit";
import { resetAll } from "ReduxSlices/rootLevelAction";
import { getDemoResponse, isDemoUser } from "Helpers/demoUser";

const SUCCESS = 200;
const REDIRECT = 300;

export const status = (response: Response): Promise<Response> => {
    if (response.status >= SUCCESS && response.status < REDIRECT) {
        return Promise.resolve(response);
    } else {
        return response.json().then(body => Promise.reject(body));
    }
};

export const json = (response: Response): Promise<any> => {
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    } else {
        return Promise.resolve();
    }
};

type Fetch = (input: RequestInfo, init?: RequestInit, idToken?: string) => Promise<Response>;
/**
 * This function is exactly the same as vanilla fetch, it just adds the id
 * token to the Authorization header for api calls and add credentials
 * "includes" for CORS.
 */
export const authorizedFetch: Fetch = async (input, initArg, idToken) => {
    const initArgHeaders = (initArg && initArg.headers) || {};

    if (isDemoUser()) {
        // If the user is a demo user, we don't do an Authorized fetch
        // because the demo user doesn't have a valid idToken.
        // Simulate a fetch-like Response for demo users
        return getDemoResponse(input);
    }

    const token = idToken || (await AccountManager.current.getGuestAsync(true)).idToken;

    const init: RequestInit = {
        ...initArg,
        headers: {
            ...initArgHeaders,
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    };

    return fetch(input, init);
};

export type CreateFetchThunk<E = unknown> = <SuccessPayload, FailurePayload = Error>(
    url: RequestInfo,
    actionCreator: FetchActionCreator<SuccessPayload, FailurePayload>,
    extraRequestInit?: any,
    useJwt?: boolean
) => PromiseThunk<SuccessPayload, E>;

export const createFetchThunk: CreateFetchThunk = (url, actionCreator, extraRequestInit, useAuthentication = true) => {
    return dispatch => {
        dispatch(
            actionCreator({
                action: FetchAction.Fetch,
            })
        );

        const fetchInit = extraRequestInit || {};
        fetchInit.credentials = "include";

        const fetchFn = useAuthentication ? authorizedFetch : fetch;

        return fetchFn(url, fetchInit)
            .then(status)
            .then(json)
            .then(value => {
                dispatch(actionCreator({ action: FetchAction.Success, value }));
                return value;
            })
            .catch(error => {
                dispatch(actionCreator({ action: FetchAction.Failure, value: error }));

                if (error instanceof UnauthorizedError) {
                    dispatch(resetAll());
                }

                return Promise.reject(error);
            });
    };
};

export enum FetchAction {
    Fetch = "Fetch",
    Success = "Success",
    Failure = "Failure",
}

export type FetchActionPayload<SuccessPayload, FailurePayload = Error> =
    | {
          action: FetchAction.Fetch;
      }
    | {
          action: FetchAction.Success;
          value: SuccessPayload;
      }
    | {
          action: FetchAction.Failure;
          value: FailurePayload;
      };

export type FetchActionCreator<SuccessPayload, FailurePayload = Error> = (
    payload: FetchActionPayload<SuccessPayload, FailurePayload>
) => PayloadAction<FetchActionPayload<SuccessPayload, FailurePayload>>;

export type FetchContainer<SuccessValue, FailureValue = Error> =
    | {
          status: LoadStatus.NotStarted | LoadStatus.InProgress;
      }
    | {
          status: LoadStatus.Success;
          value: SuccessValue;
      }
    | {
          status: LoadStatus.Failure;
          value: FailureValue;
      };

export const getFetchContainerValue: <S, F>(container: FetchContainer<S, F>) => S | undefined = container =>
    container.status === LoadStatus.Success ? container.value : undefined;

export const getFetchContainerError: <S, F>(container: FetchContainer<S, F>) => F | undefined = container =>
    container.status === LoadStatus.Failure ? container.value : undefined;

export const getFetchActionPayloadValue = <S, F>(payload?: FetchActionPayload<S, F>): S | undefined =>
    payload !== undefined && payload.action === FetchAction.Success ? payload.value : undefined;

export const getFetchActionPayloadError = <S, F>(payload?: FetchActionPayload<S, F>): F | undefined =>
    payload !== undefined && payload.action === FetchAction.Failure ? payload.value : undefined;

export const getFetchActionPayloadStatus = <S, F>(payload?: FetchActionPayload<S, F>): LoadStatus =>
    payload !== undefined ? fetchActionToLoadStatus(payload.action) : LoadStatus.NotStarted;

export const initialFetchContainer: FetchContainer<any, any> = {
    status: LoadStatus.NotStarted,
};

// this can be used when SuccessPayload = SuccessValue && FailurePayload = FailureValue, and there is no extra logic.
export const fetchActionPayloadToContainer = <SuccessPayload, FailurePayload>(
    payload: FetchActionPayload<SuccessPayload, FailurePayload>
): FetchContainer<SuccessPayload, FailurePayload> =>
    payload.action === FetchAction.Success
        ? {
              status: LoadStatus.Success,
              value: payload.value,
          }
        : payload.action === FetchAction.Failure
        ? {
              status: LoadStatus.Failure,
              value: payload.value,
          }
        : {
              status: LoadStatus.InProgress,
          };

export const fetchActionToLoadStatus = (fetchAction?: FetchAction): LoadStatus => {
    switch (fetchAction) {
        case FetchAction.Fetch:
            return LoadStatus.InProgress;
        case FetchAction.Failure:
            return LoadStatus.Failure;
        case FetchAction.Success:
            return LoadStatus.Success;
        default:
            return LoadStatus.NotStarted;
    }
};

export type Thunk<T, E = unknown> = ThunkAction<T, AppState, E, PayloadAction<any>>;
export type PromiseThunk<T, E = unknown> = Thunk<Promise<T>, E>;

export const createCachedFetchThunk: <T, E = unknown>(
    thunk: PromiseThunk<T, E>,
    statusSelector: StateSelector<LoadStatus>
) => PromiseThunk<T | undefined, E> = (thunk, statusSelector) => (dispatch, getState) => {
    const status = statusSelector(getState());
    if (status === LoadStatus.InProgress || status === LoadStatus.Success) {
        return Promise.resolve(undefined);
    }

    return dispatch(thunk);
};

export type FetchStatusAndError<FailureValue = Error> =
    | {
          status: LoadStatus.NotStarted | LoadStatus.InProgress | LoadStatus.Success;
      }
    | {
          status: LoadStatus.Failure;
          error: FailureValue;
      };

export const initialFetchStatusAndError: FetchStatusAndError = {
    status: LoadStatus.NotStarted,
};

export const fetchActionPayloadToFetchStatusAndError: <S, F>(
    payload: FetchActionPayload<S, F>
) => FetchStatusAndError<F> = payload =>
    payload.action === FetchAction.Failure
        ? {
              status: LoadStatus.Failure,
              error: payload.value,
          }
        : {
              status: payload.action === FetchAction.Fetch ? LoadStatus.InProgress : LoadStatus.Success,
          };

export const getFetchStatusAndErrorError = <F>(container: FetchStatusAndError<F>): F | undefined =>
    container.status === LoadStatus.Failure ? container.error : undefined;

export const isLoadCompleted = (status: LoadStatus): boolean =>
    status === LoadStatus.Success || status === LoadStatus.Failure;
