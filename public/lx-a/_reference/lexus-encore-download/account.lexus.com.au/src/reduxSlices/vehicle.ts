import { Dispatch, StateSelector } from "../types/general";
import {
    FetchAction,
    FetchActionPayload,
    FetchContainer,
    PromiseThunk,
    authorizedFetch,
    createCachedFetchThunk,
    fetchActionPayloadToContainer,
    getFetchContainerValue,
    initialFetchContainer,
    json,
    status,
} from "../helpers/fetch";
import {
    GuestVehicle,
    OnlineServiceBookingPayload,
    OnlineServiceBookingState,
    Vehicle,
    VehicleStatus,
} from "Types/index";
import { RouteSection, routeString } from "../helpers/routes";
import {
    vehicleUnitByVinUrl as getVehicleUnitByVinUrl,
    vehicleUnitGetGuestVehiclesUrl as getVehicleUnitGetGuestVehiclesUrl,
} from "../apiHref";

import { LoadStatus } from "../types/loadStatus";
import { RootLevelAction } from "./rootLevelAction";
import { compose } from "redux";
import { createSelector } from "reselect";
import history from "../history";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUuIdQs } from "Helpers/uuId";
import { normalizeError } from "Helpers/error";

export type FetchVehiclesPayload = Vehicle[];
type FetchVehiclesFetchActionPayload = FetchActionPayload<FetchVehiclesPayload>;
type VehiclesFetchContainer = FetchContainer<FetchVehiclesPayload>;

export enum VehicleAction {
    FetchVehicles = "fetchVehicles",
    SetOnlineServiceBookingPayload = "setOnlineServiceBookingPayload",
    SetOnlineServiceBookingState = "setOnlineBookingServiceState",
    SetIsOSBEnabled = "setIsOSBEnabled",
}

export interface VehicleState {
    vehicles: VehiclesFetchContainer;
    onlineServiceBookingPayload: OnlineServiceBookingPayload;
    onlineServiceBookingState: OnlineServiceBookingState;
    isSpaOSBEnabled?: boolean;
}

export interface ConfirmVehicleReponse {
    isSuccess: boolean;
    error: {
        code: string;
        description: string;
    } | null;
    confirmUserResponse: {
        message: string | null;
        paylink: string;
        status: string;
    } | null;
}

export const initialVehicleState: VehicleState = {
    vehicles: initialFetchContainer,
    onlineServiceBookingPayload: {},
    onlineServiceBookingState: OnlineServiceBookingState.BOOK_A_SERVICE_FIRST_LOADING,
};

const handleFetchVehiclesError = async (dispatch: Dispatch, error: Error) => {
    const url = routeString(RouteSection.Notify, RouteSection.NonRecoverableError);
    history.push(url);
};

export const fetchVehiclesThunk: PromiseThunk<FetchVehiclesPayload, Record<string, unknown>> = async (
    dispatch: Dispatch
) => {
    const dispatchAction = compose(dispatch, fetchVehicles);
    dispatchAction({
        action: FetchAction.Fetch,
    });

    try {
        const vehicleUnitGetGuestVehiclesUrl = await getVehicleUnitGetGuestVehiclesUrl();
        const vehicleUnitGetGuestVehiclesUrlWithUuId = addUuIdQs(vehicleUnitGetGuestVehiclesUrl);
        const vehicleUnitByVinUrl = await getVehicleUnitByVinUrl();

        const guestVehicles = await authorizedFetch(vehicleUnitGetGuestVehiclesUrlWithUuId).then(status).then(json);

        const vehicles: FetchVehiclesPayload = await Promise.all(
            guestVehicles.map(async (guestVehicle: GuestVehicle) => {
                if (guestVehicle.status === VehicleStatus.Verified) {
                    const vehicleUnit = await authorizedFetch(`${vehicleUnitByVinUrl}/${guestVehicle.vin}`)
                        .then(status)
                        .then(json)
                        .then(data => {
                            return {
                                ...data,
                                vehicleUnitLoadStatus: LoadStatus.Success,
                            };
                        })
                        .catch(() => ({ vehicleUnitLoadStatus: LoadStatus.Failure }));
                    return {
                        ...guestVehicle,
                        ...vehicleUnit,
                    };
                } else {
                    return guestVehicle;
                }
            })
        );

        dispatchAction({
            action: FetchAction.Success,
            value: vehicles,
        });

        return vehicles;
    } catch (error) {
        const errorObj = normalizeError(error);
        dispatchAction({
            action: FetchAction.Failure,
            value: errorObj,
        });
        handleFetchVehiclesError(dispatch, errorObj);
        return [];
    }
};

export const vehiclesContainerSelector: StateSelector<VehiclesFetchContainer> = state => state.vehicle.vehicles;

export const vehiclesFetchStatusSelector: StateSelector<LoadStatus> = state => vehiclesContainerSelector(state).status;

export const vehiclesSelector: StateSelector<FetchVehiclesPayload | undefined> = createSelector(
    vehiclesContainerSelector,
    getFetchContainerValue
);

export const onlineServiceBookingPayloadSelector: StateSelector<OnlineServiceBookingPayload> = state =>
    state.vehicle.onlineServiceBookingPayload;

export const onlineServiceBookingStateSelector: StateSelector<OnlineServiceBookingState> = state =>
    state.vehicle.onlineServiceBookingState;

export const fetchVehiclesThunkCached = createCachedFetchThunk(fetchVehiclesThunk, vehiclesFetchStatusSelector);

export const isOSBEnabledSelector: StateSelector<boolean | undefined> = state => state.vehicle.isSpaOSBEnabled;

export const VEHICLE_SLICE_NAME = "vehicle";

const vehicleSlice = createSlice({
    name: VEHICLE_SLICE_NAME,
    initialState: initialVehicleState,
    reducers: {
        [VehicleAction.FetchVehicles]: (state, action: PayloadAction<FetchVehiclesFetchActionPayload>) => {
            state.vehicles = fetchActionPayloadToContainer(action.payload);
        },
        [VehicleAction.SetOnlineServiceBookingPayload]: (state, action: PayloadAction<OnlineServiceBookingPayload>) => {
            state.onlineServiceBookingPayload = action.payload;
        },
        [VehicleAction.SetOnlineServiceBookingState]: (state, action: PayloadAction<OnlineServiceBookingState>) => {
            state.onlineServiceBookingState = action.payload;
        },
        [VehicleAction.SetIsOSBEnabled]: (state, action: PayloadAction<boolean>) => {
            state.isSpaOSBEnabled = action.payload;
        },
        [RootLevelAction.Reset]: () => initialVehicleState,
    },
});

export const { fetchVehicles, setOnlineServiceBookingPayload, setOnlineBookingServiceState, setIsOSBEnabled } =
    vehicleSlice.actions;

export const { reducer: vehicleReducer } = vehicleSlice;
