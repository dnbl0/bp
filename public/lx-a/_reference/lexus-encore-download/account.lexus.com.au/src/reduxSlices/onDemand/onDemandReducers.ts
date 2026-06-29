import {
    FetchAction,
    fetchActionPayloadToContainer,
    fetchActionPayloadToFetchStatusAndError,
    initialFetchContainer,
    initialFetchStatusAndError,
} from "../../helpers/fetch";
import { RootLevelAction } from "../rootLevelAction";
import * as I from "./onDemandInterfaces";
import { OnDemandAction } from "./onDemandConstants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getVehicleFeaturesText = (vehicle: I.OnDemandVehicle): string => {
    const defaultValue = "";
    if (vehicle) {
        try {
            return vehicle.features
                .map(f => f.name)
                .reduce((currentFeature, nextFeature) => `${currentFeature}, ${nextFeature}`);
        } catch {
            return defaultValue;
        }
    } else {
        return defaultValue;
    }
};

const onDemandUserPayloadToOnDemandUser = (user: I.OnDemandUserPayload): I.OnDemandUser => {
    const licenceExpiryDay = parseInt(user.licenceExpiryDay);
    const licenceExpiryMonth = parseInt(user.licenceExpiryMonth);
    const licenceExpiryYear = parseInt(user.licenceExpiryYear);
    return {
        isNew: user.isNew,
        id: user.id,
        name: user.name,
        licenceNumber: user.licenceNumber,
        licenceState: user.licenceState,
        licenceExpiryDay: !isNaN(licenceExpiryDay) ? licenceExpiryDay : undefined,
        licenceExpiryMonth: !isNaN(licenceExpiryMonth) ? licenceExpiryMonth : undefined,
        licenceExpiryYear: !isNaN(licenceExpiryYear) ? licenceExpiryYear : undefined,
    };
};

export const findLocationById = (
    id: string | undefined,
    locations: I.Location[] | undefined
): I.Location | undefined => {
    if (id && locations) {
        return locations.find(location => {
            return location.id === id;
        });
    } else {
        return undefined;
    }
};

export const initialOnDemandState: I.OnDemand = {
    locations: initialFetchContainer,
    publicHolidays: initialFetchContainer,
    updateUser: initialFetchStatusAndError,
    getAccountInfo: initialFetchStatusAndError,
    bookingInProgress: {
        selectedLocation: undefined,
        selectedVehicle: undefined,
        pickUpDateTime: undefined,
        dropOffDateTime: undefined,
        returnFlightNumber: undefined,
        departureFlightNumber: undefined,
        bookedDates: initialFetchContainer,
        checkedDates: [],
        unavailableDates: [],
    },
    makeBooking: initialFetchContainer,
    vehicles: initialFetchContainer,
    bookingHistory: initialFetchContainer,
    processingUpdateUser: false,
    cancelBooking: initialFetchContainer,
    updateBooking: initialFetchContainer,
    flexiBookingType: false,
    settings: {
        hiddenLocationIds: [],
    },
};

const onDemandSlice = createSlice({
    name: "onDemand",
    initialState: initialOnDemandState,
    reducers: {
        [OnDemandAction.GetAccountInfo]: (state, action: PayloadAction<I.GetAccountInfoFetchActionPayload>) => {
            state.getAccountInfo = fetchActionPayloadToFetchStatusAndError(action.payload);
            state.user =
                action.payload.action === FetchAction.Success
                    ? onDemandUserPayloadToOnDemandUser(action.payload.value.user)
                    : state.user;
            state.accountInfo =
                action.payload.action === FetchAction.Success
                    ? {
                          redemptionsRemaining: action.payload.value.redemptionsRemaining,
                          offerId: action.payload.value.offerId,
                          token: action.payload.value.token,
                      }
                    : state.accountInfo;
        },
        [OnDemandAction.FetchLocations]: (state, action: PayloadAction<I.FetchLocationsPayload>) => {
            state.locations = fetchActionPayloadToContainer(action.payload);
        },
        [OnDemandAction.UpdateUser]: (state, action: PayloadAction<I.UpdateUserFetchActionPayload>) => {
            state.updateUser = fetchActionPayloadToFetchStatusAndError(action.payload);
            if (action.payload.action === FetchAction.Success) {
                state.user = onDemandUserPayloadToOnDemandUser(action.payload.value);
            }
        },
        [OnDemandAction.FetchPublicHolidays]: (state, action: PayloadAction<I.FetchPublicHolidayPayload>) => {
            state.publicHolidays = fetchActionPayloadToContainer(action.payload);
        },
        [OnDemandAction.SetSelectedLocation]: (state, action: PayloadAction<string>) => {
            state.bookingInProgress.selectedLocation = action.payload;
            state.vehicles = initialOnDemandState.vehicles;
        },
        [OnDemandAction.SetBookingInProgressPickUpAndDropOffDateTimes]: (
            state,
            action: PayloadAction<I.SetBookingInProgressPickUpAndDropOffDateTimesPayload>
        ) => {
            state.bookingInProgress.pickUpDateTime = action.payload.pickUpDateTime;
            state.bookingInProgress.dropOffDateTime = action.payload.dropOffDateTime;
            state.vehicles = initialOnDemandState.vehicles;
        },
        [OnDemandAction.ResetBookingInProgressPickUpAndDropOffDateTimes]: state => {
            state.bookingInProgress.pickUpDateTime = undefined;
            state.bookingInProgress.dropOffDateTime = undefined;
            state.bookingInProgress.selectedVehicle = undefined;
        },
        [OnDemandAction.SetBookingInProgressFlightNumbers]: (
            state,
            action: PayloadAction<I.SetBookingInProgressFlightNumbersPayload>
        ) => {
            state.bookingInProgress.returnFlightNumber = action.payload.returnFlightNumber;
            state.bookingInProgress.departureFlightNumber = action.payload.departureFlightNumber;
        },
        [OnDemandAction.ResetBookingInProgressFlightNumbers]: state => {
            state.bookingInProgress.returnFlightNumber = undefined;
            state.bookingInProgress.departureFlightNumber = undefined;
        },
        [OnDemandAction.MakeBooking]: (state, action: PayloadAction<I.MakeBookingFetchActionPayload>) => {
            state.makeBooking = fetchActionPayloadToContainer(action.payload);
        },
        [OnDemandAction.FetchOnDemandVehicles]: (
            state,
            action: PayloadAction<I.OnDemandVehiclesFetchActionPayload>
        ) => {
            state.vehicles = fetchActionPayloadToContainer(action.payload);
        },
        [OnDemandAction.FetchOnDemandFlexiBooking]: (
            state,
            action: PayloadAction<I.GetFlexiBookingDateActionPayload>
        ) => {
            if (action.payload.action === FetchAction.Success && "value" in state.bookingInProgress.bookedDates) {
                action.payload.value = Array.isArray(state.bookingInProgress.bookedDates.value)
                    ? [...state.bookingInProgress.bookedDates.value, ...action.payload.value]
                    : action.payload.value;
            }
            state.bookingInProgress.bookedDates = fetchActionPayloadToContainer(action.payload);
            if (action.payload.action === FetchAction.Success) {
                state.bookingInProgress.unavailableDates = [
                    ...state.bookingInProgress.unavailableDates,
                    ...action.payload.value,
                ];
            }
        },
        [OnDemandAction.ResetFlexiBooking]: state => {
            state.bookingInProgress.bookedDates = initialOnDemandState.bookingInProgress.bookedDates;
        },
        [OnDemandAction.SetOnDemandFlexiCheckedDates]: (
            state,
            action: PayloadAction<I.SetFetchOnDemandFlexiCheckedDates>
        ) => {
            state.bookingInProgress.checkedDates = [
                ...state.bookingInProgress.checkedDates,
                ...action.payload.checkedDates,
            ];
        },
        [OnDemandAction.ResetOnDemandFlexiCheckedDates]: state => {
            state.bookingInProgress.checkedDates = initialOnDemandState.bookingInProgress.checkedDates;
            state.bookingInProgress.unavailableDates = initialOnDemandState.bookingInProgress.unavailableDates;
        },
        [OnDemandAction.SetSelectedVehicle]: (state, action: PayloadAction<string>) => {
            state.bookingInProgress.selectedVehicle = action.payload;
        },
        [OnDemandAction.ResetSelectedVehicle]: state => {
            state.bookingInProgress.selectedVehicle = undefined;
        },
        [OnDemandAction.ResetBookVehicle]: state => {
            state.bookingInProgress = initialOnDemandState.bookingInProgress;
            state.makeBooking = initialOnDemandState.makeBooking;
            state.vehicles = initialOnDemandState.vehicles;
        },
        [OnDemandAction.GetBookingHistory]: (state, action: PayloadAction<I.GetBookingHistoryFetchActionPayload>) => {
            state.bookingHistory = fetchActionPayloadToContainer(action.payload);
        },
        [OnDemandAction.ResetCancelBooking]: state => {
            state.cancelBooking = initialOnDemandState.cancelBooking;
        },
        [OnDemandAction.CancelBooking]: (state, action: PayloadAction<I.CancelBookingFetchActionPayload>) => {
            state.cancelBooking = fetchActionPayloadToContainer(action.payload);
        },
        [OnDemandAction.ResetBookingHistory]: state => {
            state.bookingHistory = initialOnDemandState.bookingHistory;
        },
        [OnDemandAction.InitializeBookingInProgress]: (
            state,
            action: PayloadAction<I.InitializeBookingInProgressActionPayload>
        ) => {
            const {
                selectedLocation,
                selectedVehicle,
                pickUpDateTime,
                dropOffDateTime,
                returnFlightNumber,
                departureFlightNumber,
            } = action.payload;

            state.bookingInProgress = {
                ...initialOnDemandState.bookingInProgress,
                selectedVehicle,
                selectedLocation,
                dropOffDateTime,
                pickUpDateTime,
                returnFlightNumber,
                departureFlightNumber,
            };
        },
        [OnDemandAction.SetCurrentBooking]: (state, action: PayloadAction<I.CurrentBooking>) => {
            state.currentBooking = action.payload;
        },
        [OnDemandAction.ResetCurrentBooking]: state => {
            state.currentBooking = undefined;
        },
        [OnDemandAction.UpdateBooking]: (state, action: PayloadAction<I.UpdateBookingFetchActionPayload>) => {
            state.updateBooking = fetchActionPayloadToContainer(action.payload);
        },
        [OnDemandAction.FlexiBookingType]: (state, action: PayloadAction<boolean>) => {
            state.flexiBookingType = action.payload;
        },
        [OnDemandAction.SetOnDemandSettings]: (state, action: PayloadAction<I.OnDemandSettings>) => {
            state.settings = action.payload;
        },
        [RootLevelAction.Reset]: () => initialOnDemandState,
    },
});

export const {
    cancelBooking,
    fetchLocations,
    fetchOnDemandVehicles,
    fetchOnDemandFlexiBooking,
    fetchPublicHolidays,
    flexiBookingType,
    getAccountInfo,
    getBookingHistory,
    initializeBookingInProgress,
    makeBooking,
    resetBookVehicle,
    resetBookingHistory,
    resetBookingInProgressFlightNumbers,
    resetBookingInProgressPickUpAndDropOffDateTimes,
    resetCancelBooking,
    resetCurrentBooking,
    resetSelectedVehicle,
    resetFlexiBooking,
    setOnDemandFlexiCheckedDates,
    resetOnDemandFlexiCheckedDates,
    setBookingInProgressFlightNumbers,
    setBookingInProgressPickUpAndDropOffDateTimes,
    setCurrentBooking,
    setSelectedLocation,
    setSelectedVehicle,
    setOnDemandSettings,
    updateBooking,
    updateUser,
} = onDemandSlice.actions;

export const { reducer: onDemandReducer } = onDemandSlice;
