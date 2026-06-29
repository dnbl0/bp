/* eslint-disable comma-dangle */

import { ApiResponse, Dispatch, StateSelector } from "../types/general";
import {
    FetchAction,
    FetchActionPayload,
    FetchContainer,
    PromiseThunk,
    createFetchThunk,
    fetchActionPayloadToContainer,
    getFetchContainerValue,
    initialFetchContainer,
} from "../helpers/fetch";
import {
    addPaymentMethodUrl,
    getCacheDeleteCreditCardUrl,
    getCheckDeleteCreditCardUrl,
    getDeleteCreditCardUrl,
    getPaymentMethodsUrl,
} from "../apiHref";
import { createOnDemandFetchThunk, getAccountInfoThunk } from "./onDemand/onDemandThunks";
import { emailSelector, salesforceAccountIdSelector, setStripeCustomerDetails, stripeCustomerIdSelector } from "./user";

import { LoadStatus } from "../types/loadStatus";
import { PaymentMethod } from "../types/payment";
import { ReactStripeElements } from "react-stripe-elements";
import { RootLevelAction } from "./rootLevelAction";
import { confirmStripeCardSetup } from "../helpers/stripe";
import { createSelector } from "reselect";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddStripePaymentMethodPayload {
    customerId: string;
}

interface GetPaymentMethodsPayload {
    paymentMethods: PaymentMethod[];
}

type AddStripePaymentMethodFetchContainer = FetchContainer<AddStripePaymentMethodPayload>;
type AddStripePaymentMethodFetchActionPayload = FetchActionPayload<AddStripePaymentMethodPayload>;
type GetPaymentMethodsFetchContainer = FetchContainer<GetPaymentMethodsPayload>;
type GetPaymentMethodsFetchActionPayload = FetchActionPayload<GetPaymentMethodsPayload>;
type CheckDeleteCreditCardFetchContainer = FetchContainer<ApiResponse<boolean>>;
type DeleteCreditCardFetchContainer = FetchContainer<ApiResponse<PaymentMethod>>;

export interface PaymentsState {
    addStripePaymentMethod: AddStripePaymentMethodFetchContainer;
    getPaymentMethods: GetPaymentMethodsFetchContainer;
    checkDeleteCreditCard: CheckDeleteCreditCardFetchContainer;
    deleteCreditCard: DeleteCreditCardFetchContainer;
}

export const initialPaymentsState: PaymentsState = {
    addStripePaymentMethod: initialFetchContainer,
    getPaymentMethods: initialFetchContainer,
    checkDeleteCreditCard: initialFetchContainer,
    deleteCreditCard: initialFetchContainer,
};

enum PaymentsAction {
    AddStripePaymentMethod = "addStripePaymentMethod",
    GetPaymentMethod = "getPaymentMethod",
    CheckDeleteCreditCard = "checkDeleteCreditCard",
    DeleteCreditCard = "deleteCreditCard",
    DeleteCreditCardDeleteCache = "deleteCreditCardDeleteCache",
}

const handleAddPaymentMethodError = (dispatch: Dispatch<unknown>) => (error: Error) => {
    dispatch(
        addStripePaymentMethod({
            action: FetchAction.Failure,
            value: error,
        })
    );
    throw error;
};

const handleAPIError =
    <E = Record<string, unknown>>(dispatch: Dispatch<E>) =>
    (response: ApiResponse<any>) => {
        if (response.error) {
            dispatch(
                addStripePaymentMethod({
                    action: FetchAction.Failure,
                    value: {
                        name: response.error.code,
                        message: response.error.description,
                    },
                })
            );
        }
        throw response.error;
    };

export const addStripePaymentMethodThunk =
    (stripe: ReactStripeElements.StripeProps, cardholderName: string): PromiseThunk<AddStripePaymentMethodPayload> =>
    async (dispatch: Dispatch<unknown>, getState) => {
        dispatch(
            addStripePaymentMethod({
                action: FetchAction.Fetch,
            })
        );

        return confirmStripeCardSetup(stripe, cardholderName)
            .then(async ({ paymentMethodId }) => {
                const state = getState();
                const accountId = salesforceAccountIdSelector(state);
                const customerId = stripeCustomerIdSelector(state);
                const email = emailSelector(state);
                return dispatch(
                    createFetchThunk(await addPaymentMethodUrl(), addStripePaymentMethod, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            accountId,
                            customerId,
                            paymentMethodId,
                            cardholderName,
                            email,
                        }),
                    })
                )
                    .then(payload => {
                        dispatch(
                            setStripeCustomerDetails({
                                stripeCustomerId: payload.customerId,
                            })
                        );
                        return payload;
                    })
                    .catch(handleAddPaymentMethodError(dispatch));
            })
            .catch(handleAddPaymentMethodError(dispatch));
    };

export const getPaymentMethodsThunk =
    (customerId: string): PromiseThunk<GetPaymentMethodsPayload> =>
    async dispatch => {
        const url = await getPaymentMethodsUrl(customerId);
        return dispatch(createFetchThunk(url, getPaymentMethod));
    };

export const checkDeleteCreditCardThunk =
    (keazId: string | undefined): PromiseThunk<ApiResponse<boolean>, number> =>
    async dispatch => {
        const keazCustomerId = keazId === undefined ? (await dispatch(getAccountInfoThunk)).user.id : keazId;
        const url = await getCheckDeleteCreditCardUrl(keazCustomerId ? keazCustomerId : "");
        return dispatch(createOnDemandFetchThunk(url, checkDeleteCreditCard)).catch(error => {
            throw error;
        });
    };
export const deleteCreditCardDeleteCacheThunk =
    (keazId?: string): PromiseThunk<ApiResponse<boolean>, number> =>
    async dispatch => {
        const keazCustomerId = keazId || (await dispatch(getAccountInfoThunk)).user.id;
        const url = await getCacheDeleteCreditCardUrl(keazCustomerId || "");
        return dispatch(
            createOnDemandFetchThunk(url, deleteCreditCardDeleteCache, {
                method: "DELETE",
            })
        );
    };

export const deleteCreditCardThunk =
    (keazId: string, paymentMethodId: string): PromiseThunk<ApiResponse<boolean>, number> =>
    async (dispatch: Dispatch<number>) => {
        const url = await getDeleteCreditCardUrl(keazId, paymentMethodId);
        return dispatch(
            createOnDemandFetchThunk(url, deleteCreditCard, {
                method: "DELETE",
            })
        ).catch(handleAPIError(dispatch));
    };

const addStripePaymentMethodContainerSelector: StateSelector<AddStripePaymentMethodFetchContainer> = state =>
    state.payments.addStripePaymentMethod;

export const addStripePaymentMethodStatusSelector: StateSelector<LoadStatus> = state =>
    addStripePaymentMethodContainerSelector(state).status;

const getPaymentMethodsContainerSelector: StateSelector<GetPaymentMethodsFetchContainer> = state =>
    state.payments.getPaymentMethods;

export const getPaymentMethodsStatusSelector: StateSelector<LoadStatus> = state =>
    getPaymentMethodsContainerSelector(state).status;

const getPaymentMethodsValueSelector: StateSelector<GetPaymentMethodsPayload | undefined> = createSelector(
    getPaymentMethodsContainerSelector,
    getFetchContainerValue
);

export const getDefaultPaymentMethodSelector: StateSelector<PaymentMethod | undefined> = state => {
    const value = getPaymentMethodsValueSelector(state);
    return value ? value.paymentMethods.find(paymentMethod => paymentMethod.isDefault) : undefined;
};

export const getDefaultPaymentMethodFromStripeResponse = (
    value: GetPaymentMethodsPayload
): PaymentMethod | undefined => {
    return value?.paymentMethods?.find(paymentMethod => paymentMethod.isDefault);
};

const paymentSlice = createSlice({
    name: "payment",
    initialState: initialPaymentsState,
    reducers: {
        [PaymentsAction.AddStripePaymentMethod]: (
            state,
            action: PayloadAction<AddStripePaymentMethodFetchActionPayload>
        ) => {
            state.addStripePaymentMethod = fetchActionPayloadToContainer(action.payload);
        },
        [PaymentsAction.GetPaymentMethod]: (state, action: PayloadAction<GetPaymentMethodsFetchActionPayload>) => {
            state.getPaymentMethods = fetchActionPayloadToContainer(action.payload);
        },
        [PaymentsAction.CheckDeleteCreditCard]: (
            _,
            action: PayloadAction<FetchActionPayload<ApiResponse<boolean>>>
            // eslint-disable-next-line @typescript-eslint/no-empty-function
        ) => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        [PaymentsAction.DeleteCreditCard]: (_, action: PayloadAction<FetchActionPayload<ApiResponse<boolean>>>) => {},
        [PaymentsAction.DeleteCreditCardDeleteCache]: (
            _,
            action: PayloadAction<FetchActionPayload<ApiResponse<boolean>>>
            // eslint-disable-next-line @typescript-eslint/no-empty-function
        ) => {},
        [RootLevelAction.Reset]: () => initialPaymentsState,
    },
});

export const {
    addStripePaymentMethod,
    getPaymentMethod,
    checkDeleteCreditCard,
    deleteCreditCard,
    deleteCreditCardDeleteCache,
} = paymentSlice.actions;

export const { reducer: paymentsReducer } = paymentSlice;
