import { Selector, createSelector } from "reselect";
import { PromiseThunk } from "../helpers/fetch";
import {
    FetchContainer,
    initialFetchContainer,
    FetchActionPayload,
    fetchActionPayloadToContainer,
    createFetchThunk,
    getFetchContainerValue,
    getFetchContainerError,
} from "../helpers/fetch";
import { valetProvidersUrl, valetProviderBalanceUrl } from "../apiHref";
import { AppState } from "ReduxSlices/index";
import { RootLevelAction } from "./rootLevelAction";
import { LoadStatus } from "../types/loadStatus";
import { ValetProviderBalance, ValetProvider } from "../types/valet";
import { vehiclesSelector } from "./vehicle";
import { getLatestVerifiedVehicle } from "../helpers/vehicle";
import { Dispatch, StateSelector } from "../types/general";
import { toastUrlFromPath, RouteSection } from "../helpers/routes";
import history from "../history";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProviderBalancePayload = ValetProviderBalance[];
type ProviderBalanceFetchActionPayload = FetchActionPayload<ProviderBalancePayload>;
type ProviderBalanceFetchContainer = FetchContainer<ProviderBalancePayload>;

type FetchValetProvidersPayload = ValetProvider[];
type FetchValetProvidersFetchActionPayload = FetchActionPayload<FetchValetProvidersPayload>;
type ValetProviders = FetchContainer<FetchValetProvidersPayload>;

enum ValetAction {
    fetchValetProviderBalance = "fetchValetProviderBalance",
    fetchValetProviders = "fetchValetProviders",
}

export interface ValetState {
    providerBalance: ProviderBalanceFetchContainer;
    valetProviders: ValetProviders;
}

export const initialValetState: ValetState = {
    providerBalance: initialFetchContainer,
    valetProviders: initialFetchContainer,
};

const handleFetchValetProviderBalanceError = (error: Error) => {
    const url = toastUrlFromPath(RouteSection.ValetRedemptionBalanceError, location.pathname);
    history.push(url);
    throw error;
};

export const fetchValetProviderBalanceThunk: PromiseThunk<void, Record<string, unknown>> = async (
    dispatch: Dispatch<Record<string, unknown>>,
    getState
) => {
    const appState = getState();
    const vehicles = vehiclesSelector(appState);
    const latestVehicle = getLatestVerifiedVehicle(vehicles || []);
    const vehicleOwnershipId = latestVehicle && latestVehicle.vehicleOwnershipId;
    if (vehicleOwnershipId) {
        const url = await valetProviderBalanceUrl(vehicleOwnershipId);
        dispatch(createFetchThunk(url, fetchValetProviderBalance)).catch(handleFetchValetProviderBalanceError);
    }
};

export const fetchValetProvidersThunk: PromiseThunk<void> = async dispatch => {
    const url = await valetProvidersUrl();
    const thunk = createFetchThunk(url, fetchValetProviders);
    dispatch(thunk);
};

const valetProviderBalanceContainerSelector: Selector<AppState, ProviderBalanceFetchContainer> = state =>
    state.valet.providerBalance;

export const valetProviderBalancesSelector: Selector<AppState, ValetProviderBalance[] | undefined> = createSelector(
    valetProviderBalanceContainerSelector,
    getFetchContainerValue
);

export const valetProviderBalanceStatusSelector: Selector<AppState, LoadStatus> = state =>
    state.valet.providerBalance.status;

export const valetProviderBalanceErrorSelector: Selector<AppState, Error | undefined> = createSelector(
    valetProviderBalanceContainerSelector,
    getFetchContainerError
);

const valetProvidersContainerSelector: StateSelector<ValetProviders> = state => state.valet.valetProviders;

export const valetProvidersSelector: Selector<AppState, ValetProvider[]> = state =>
    createSelector(valetProvidersContainerSelector, getFetchContainerValue)(state) || [];

export const valetTotalBalanceSelector: Selector<AppState, number | undefined> = state => {
    const balances = valetProviderBalancesSelector(state) || [];
    try {
        // `balances` could be an empty array, when it is, `reduce` will
        // throw an exception.
        return balances.map(b => b.balance).reduce((prev, curr) => prev + curr);
    } catch (error) {
        return undefined;
    }
};

const valetSlice = createSlice({
    name: "valet",
    initialState: initialValetState,
    reducers: {
        [ValetAction.fetchValetProviderBalance]: (state, action: PayloadAction<ProviderBalanceFetchActionPayload>) => {
            state.providerBalance = fetchActionPayloadToContainer(action.payload);
        },
        [ValetAction.fetchValetProviders]: (state, action: PayloadAction<FetchValetProvidersFetchActionPayload>) => {
            state.valetProviders = fetchActionPayloadToContainer(action.payload);
        },
        [RootLevelAction.Reset]: () => initialValetState,
    },
});

const { fetchValetProviderBalance, fetchValetProviders } = valetSlice.actions;

export const { reducer: valetReducer } = valetSlice;
