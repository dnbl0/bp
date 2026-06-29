import { compose, createSelector, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
    PromiseThunk,
    FetchActionPayload,
    FetchContainer,
    initialFetchContainer,
    fetchActionPayloadToContainer,
    FetchAction,
    authorizedFetch,
} from "../helpers/fetch";
import { AppState } from "ReduxSlices/index";
import { RootLevelAction } from "ReduxSlices/rootLevelAction";
import { airportLoungeBalanceUrl } from "../apiHref";
import { Selector } from "react-redux";
import { getFetchContainerValue } from "Helpers/fetch";
import { LoadStatus } from "Types/loadStatus";
import { normalizeError } from "Helpers/error";

export type AirportLoungeBalanceResponse = AirportLoungeBalance[];
type FetchAirportLoungeFetchActionPayload = FetchActionPayload<AirportLoungeBalanceResponse>;
type AirportLoungeFetchContainer = FetchContainer<AirportLoungeBalanceResponse>;

interface AirportLoungeBalance {
    vehicleModel: string;
    vehicleOwnershipOfferDetailsId: string;
    vouchersRemaining: number;
    voucherExpiryDate: string;
}

export enum AirportLoungeAction {
    FetchAirportLoungeBalance = "fetchAirportLoungeBalance",
}

export interface AirportLoungeState {
    airportLoungeBalance: AirportLoungeFetchContainer;
}

export const initialAirportLoungeState: AirportLoungeState = {
    airportLoungeBalance: initialFetchContainer,
};

export const fetchAirportLoungeThunk =
    (rego: string): PromiseThunk<AirportLoungeBalanceResponse, Record<string, unknown>> =>
    async (dispatch: Dispatch) => {
        const dispatchAction = compose(dispatch, fetchAirportLoungeBalance);
        dispatchAction({
            action: FetchAction.Fetch,
        });
        try {
            const airportLoungeApiUrl = await airportLoungeBalanceUrl();

            const response = await authorizedFetch(airportLoungeApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rego }),
            });

            const data: AirportLoungeBalanceResponse = await response.json();

            dispatchAction({
                action: FetchAction.Success,
                value: data,
            });

            return data;
        } catch (error) {
            const errorObj = normalizeError(error);
            dispatchAction({
                action: FetchAction.Failure,
                value: errorObj,
            });
            return [];
        }
    };

const airportLoungeContainerSelector: Selector<AppState, AirportLoungeFetchContainer> = state =>
    state.airportLounge.airportLoungeBalance;

export const airportLoungeBalanceStatusSelector: Selector<AppState, LoadStatus> = state =>
    state.airportLounge.airportLoungeBalance.status;

export const airportLoungeSelector: Selector<AppState, AirportLoungeBalance[] | undefined> = createSelector(
    airportLoungeContainerSelector,
    getFetchContainerValue<AirportLoungeBalance[] | undefined, any>
);

export const airportLoungeBalanceSelector: Selector<AppState, number | undefined> = state => {
    const airportLoungeBalance = airportLoungeSelector(state);
    return airportLoungeBalance?.[0]?.vouchersRemaining;
};

const airportLoungeSlice = createSlice({
    name: "airportLoungeBalance",
    initialState: initialAirportLoungeState,
    reducers: {
        [AirportLoungeAction.FetchAirportLoungeBalance]: (
            state,
            action: PayloadAction<FetchAirportLoungeFetchActionPayload>
        ) => {
            state.airportLoungeBalance = fetchActionPayloadToContainer(action.payload);
        },
        [RootLevelAction.Reset]: () => initialAirportLoungeState,
    },
});

export const { fetchAirportLoungeBalance } = airportLoungeSlice.actions;

export const { reducer: airportLoungeReducer } = airportLoungeSlice;
