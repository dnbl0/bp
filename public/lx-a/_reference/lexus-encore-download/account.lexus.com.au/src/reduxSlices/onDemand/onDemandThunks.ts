import * as A from "./onDemandReducers";
import * as I from "./onDemandInterfaces";
import * as S from "./onDemandSelectors";

import {
    CreateFetchThunk,
    FetchAction,
    PromiseThunk,
    authorizedFetch,
    createCachedFetchThunk,
    createFetchThunk,
    json,
    status,
} from "../../helpers/fetch";
import { Dispatch, GetState } from "../../types/general";
import { RouteSection, toastUrl, toastUrlFromPath } from "../../helpers/routes";
import {
    dateToHHMM,
    dateToYYYYMMDD,
    epochAndOffsetToDate,
    isDateTimeOutsideOriginalDateTime,
} from "../../helpers/dateTime";
import {
    emailSelector,
    encoreTierSelector,
    firstNameSelector,
    lastNameSelector,
    salesforceAccountIdSelector,
} from "../user";
import { getDefaultPaymentMethodSelector, getPaymentMethodsThunk } from "../payments";
import {
    onDemandCancelBookingUrl,
    onDemandGetAccountInfoUrl as onDemandCheckAvailabilityUrl,
    onDemandGetBookingHistoryUrl,
    onDemandGetLocationsUrl,
    onDemandMakeBookingUrl,
    onDemandPublicHolidayUrl,
    onDemandUpdateBookingUrl,
    onDemandUpdateUserUrl,
    onDemandVehiclesUrl,
    onDemandFlexiBookingUrl,
} from "../../apiHref";
import { pushToGTMBookingCreated, pushToGTMBookingUpdated } from "./../../helpers/gtm";

import { TOAST_PARAM_ON_UPDATE } from "../../pages/Encore/EncoreBookingDetailsPage/constant";
import { UserEncoreTiers } from "Helpers/users";
import history from "../../history";
import { stripeCustomerIdSelector } from "../user";
import { setOnDemandFlexiCheckedDates } from "./onDemandReducers";

//#region thunks
export const createOnDemandFetchThunk: CreateFetchThunk<number> = (
    url,
    actionCreator,
    extraRequestInit = {},
    useJwt = true
) => {
    const thunk = <R>(dispatch: Dispatch<number>, getState: GetState, attempt = 1): Promise<R> => {
        dispatch(
            actionCreator({
                action: FetchAction.Fetch,
            })
        );

        const token = S.onDemandTokenSelector(getState());
        const extraRequestInitHeaders = extraRequestInit.headers || {};
        const fetchInit = { ...extraRequestInit, headers: { ...extraRequestInitHeaders, token } };

        const fetchFn = useJwt ? authorizedFetch : fetch;

        return fetchFn(url, fetchInit)
            .then(status)
            .then(json)
            .then(value => {
                dispatch(
                    actionCreator({
                        action: FetchAction.Success,
                        value,
                    })
                );
                return value;
            })
            .catch(error => {
                if (attempt < 2 && error.code === "token_required") {
                    return dispatch(getAccountInfoThunk).then(() => {
                        return thunk(dispatch, getState, attempt + 1);
                    });
                }
                dispatch(
                    actionCreator({
                        action: FetchAction.Failure,
                        value: error,
                    })
                );

                return Promise.reject(error);
            });
    };
    return thunk;
};

export const handleGenericOnDemandError = (error: Error): never => {
    const url = toastUrlFromPath(RouteSection.OnDemandError, location.pathname);
    if (location.pathname !== url) {
        history.push(url);
    }
    throw error;
};
const handleGetAccountInfoThunkError = (error: Error) => {
    const caseNumber = (error as any).caseNumber;
    if (caseNumber && caseNumber.trim().length > 0) {
        const url = toastUrlFromPath(RouteSection.OnDemandRedemptionBalanceError, location.pathname);
        history.push(url);
    } else {
        handleGenericOnDemandError(error);
    }

    throw error;
};

export const getAccountInfoThunk: PromiseThunk<I.GetAccountInfoPayload> = async (dispatch, getState) => {
    const state = getState();
    const accountId = salesforceAccountIdSelector(state);
    const name = `${firstNameSelector(state)} ${lastNameSelector(state)}`;
    const email = emailSelector(state);

    if (accountId === undefined || name === undefined || email === undefined) {
        const missingValues = [];
        accountId === undefined && missingValues.push("salesforceAccountId");
        name === undefined && missingValues.push("name");
        email === undefined && missingValues.push("email");
        return Promise.reject(
            new Error(`${getAccountInfoThunk.name} missing values in redux store: ${missingValues.join(", ")}`)
        );
    }

    return dispatch(
        createFetchThunk(await onDemandCheckAvailabilityUrl(accountId, name, email), A.getAccountInfo)
    ).catch(handleGetAccountInfoThunkError);
};

export const fetchOnDemandVehiclesThunk: PromiseThunk<I.OnDemandVehiclesPayload, number> = async (
    dispatch,
    getState
) => {
    const state = getState();
    const location = S.selectedLocationSelector(state);
    const pickUpDate = S.bookingInProgressPickUpDateTimeSelector(state);
    const dropOffDate = S.bookingInProgressDropOffDateTimeSelector(state);

    if (!location) {
        throw new Error("location not set");
    }

    if (!pickUpDate) {
        throw new Error("pick up date not set");
    }

    if (!dropOffDate) {
        throw new Error("drop off date not set");
    }

    const fromDate = dateToYYYYMMDD(pickUpDate);
    const fromTime = dateToHHMM(pickUpDate);
    const toDate = dateToYYYYMMDD(dropOffDate);
    const toTime = dateToHHMM(dropOffDate);

    const url = await onDemandVehiclesUrl(location.id, fromDate, fromTime, toDate, toTime);
    const thunk = createOnDemandFetchThunk(url, A.fetchOnDemandVehicles);

    return dispatch(thunk).catch(handleGenericOnDemandError);
};

export const fetchOnDemandFlexiBookingThunk =
    (
        startDate: Date,
        endDate: Date,
        vehicleId: string | undefined
    ): PromiseThunk<I.OnDemandFlexiBookingVehiclesPayload, number> =>
    async (dispatch, getState): Promise<I.OnDemandFlexiBookingVehiclesPayload> => {
        const state = getState();
        const location = S.selectedLocationSelector(state);
        const checkedDates = S.onDemandFlexiCheckedDatesSelector(state);

        if (!vehicleId) {
            throw new Error("vehicle not set");
        }

        if (!location) {
            throw new Error("location not set");
        }

        const fromDate = dateToYYYYMMDD(startDate);
        const fromTime = dateToHHMM(startDate);
        const toDate = dateToYYYYMMDD(endDate);
        const toTime = dateToHHMM(endDate);

        // Check if we have already fetched booked dates for this range
        if (checkedDates && checkedDates.some(date => date >= startDate && date <= endDate)) {
            const cachedBookedDates = S.onDemandFlexiBookedDatesSelector(state);
            return cachedBookedDates ? cachedBookedDates : [];
        }

        const url = await onDemandFlexiBookingUrl(vehicleId, location.id, fromDate, fromTime, toDate, toTime);
        const thunk = createOnDemandFetchThunk(url, A.fetchOnDemandFlexiBooking);

        // Update check dates
        const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        while (current <= endDate) {
            const monthStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`;
            if (!checkedDates.includes(new Date(monthStr))) {
                dispatch(setOnDemandFlexiCheckedDates({ checkedDates: [new Date(monthStr)] }));
            }
            current.setMonth(current.getMonth() + 1);
        }

        return dispatch(thunk).catch(handleGenericOnDemandError);
    };

export const fetchLocationsThunk: PromiseThunk<I.Location[], number> = async dispatch => {
    return dispatch(createOnDemandFetchThunk(await onDemandGetLocationsUrl(), A.fetchLocations)).catch(
        handleGenericOnDemandError
    );
};

export const fetchPublicHolidaysThunk =
    (branchId: string): PromiseThunk<I.PublicHoliday[], number> =>
    async dispatch => {
        return dispatch(createOnDemandFetchThunk(await onDemandPublicHolidayUrl(branchId), A.fetchPublicHolidays));
    };

export const updateUserThunk =
    (data: I.UpdateUserRequest): PromiseThunk<I.OnDemandUserPayload, number> =>
    async (dispatch, getState) => {
        const state = getState();
        const userId = S.onDemandUserIdSelector(state);

        if (userId === undefined) {
            return Promise.reject("attempted to update on demand user without a user id");
        }

        return dispatch(
            createOnDemandFetchThunk(await onDemandUpdateUserUrl(userId), A.updateUser, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
        ).catch(handleGenericOnDemandError);
    };
const handleMakeBookingError = (error: Error) => {
    if ((error as any).code === "vehicle_already_booked") {
        const url = toastUrl(
            RouteSection.OnDemandVehicleAlreadyBookedError,
            RouteSection.Encore,
            RouteSection.OnDemand,
            RouteSection.Bookings
        );
        history.push(url);
    } else {
        handleGenericOnDemandError(error);
    }

    throw error;
};

export const makeBookingThunk: PromiseThunk<I.GetAccountInfoPayload, number> = async (dispatch, getState) => {
    const state = getState();
    const pickUpDateTime = S.bookingInProgressPickUpDateTimeSelector(state);
    const dropOffDateTime = S.bookingInProgressDropOffDateTimeSelector(state);
    const location = S.selectedLocationSelector(state);
    const accountId = salesforceAccountIdSelector(state);
    const encoreTier = encoreTierSelector(state);
    const vehicleId = S.bookingInProgressSelectedVehicleIdSelector(state);
    const offerId = S.accountInfoOfferIdSelector(state);
    const departureFlightNumber = S.bookingInProgressFlightDepartureSelector(state);
    const returnFlightNumber = S.bookingInProgressFlightReturnSelector(state);
    const stripeCustomerId = stripeCustomerIdSelector(state);

    await dispatch(getPaymentMethodsThunk(stripeCustomerId || ""));
    const checkDefaultPaymentMethodStillAvailable = getDefaultPaymentMethodSelector(getState());

    if (
        checkDefaultPaymentMethodStillAvailable === undefined ||
        pickUpDateTime === undefined ||
        dropOffDateTime === undefined ||
        location === undefined ||
        accountId === undefined ||
        vehicleId === undefined ||
        offerId === undefined
    ) {
        const errorReason = "on demand make booking failed, missing data.";
        handleMakeBookingError(new Error(errorReason));
        return Promise.reject(errorReason);
    }

    const locationId = location.id;
    const startDate = dateToYYYYMMDD(pickUpDateTime);
    const startTime = dateToHHMM(pickUpDateTime);
    const endDate = dateToYYYYMMDD(dropOffDateTime);
    const endTime = dateToHHMM(dropOffDateTime);

    const requestData: I.MakeBookingRequest = {
        accountId,
        offerId,
        locationId,
        vehicleId,
        startDate,
        startTime,
        endDate,
        endTime,
        departureFlightNumber,
        returnFlightNumber,
    };

    return dispatch(
        createOnDemandFetchThunk(await onDemandMakeBookingUrl(), A.makeBooking, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
    )
        .then(res => {
            pushToGTMBookingCreated(requestData, encoreTier || UserEncoreTiers.NONE, accountId ?? "");
            return res;
        })
        .then(() => dispatch(getAccountInfoThunk))
        .catch(handleMakeBookingError);
};
const getBookingHistoryThunk = (userId: string) => {
    const thunk: PromiseThunk<I.GetBookingHistoryPayload, number> = async dispatch => {
        return dispatch(
            createOnDemandFetchThunk(await onDemandGetBookingHistoryUrl(userId), A.getBookingHistory)
        ).catch(handleGenericOnDemandError);
    };
    return thunk;
};

export const encoreBookingLoadThunk: PromiseThunk<I.Booking[], number> = async (dispatch, getState) => {
    const getAccountInfoUserIdMissingErrorMessage =
        "encoreBookingLoadThunk failed because fleet management userId is null (from getAccountInfoThunk).";
    try {
        let userId = S.onDemandUserIdSelector(getState());
        if (userId === undefined) {
            const getAccountInfoResponse = await dispatch(getAccountInfoThunk);
            if (!getAccountInfoResponse.user || !getAccountInfoResponse.user.id) {
                return Promise.reject(new Error(getAccountInfoUserIdMissingErrorMessage));
            }
            userId = getAccountInfoResponse.user.id;
        }
        if (userId === undefined) {
            return Promise.reject(getAccountInfoUserIdMissingErrorMessage);
        }
        return dispatch(getBookingHistoryThunk(userId));
    } catch (e) {
        return Promise.reject(e);
    }
};
const handleCancelBookingError = (error: Error) => {
    const url = toastUrlFromPath(RouteSection.CancelBookingError, location.pathname);
    history.push(url);
    throw error;
};

export const cancelBookingThunk: (booking: I.Booking) => PromiseThunk<I.CancelBookingPayload, number> =
    booking => async (dispatch, getState) => {
        const state = getState();
        const accountId = salesforceAccountIdSelector(state);

        if (accountId === undefined) {
            return Promise.reject("cancel booking failed, data missing.");
        }

        return dispatch(
            createOnDemandFetchThunk(
                await onDemandCancelBookingUrl(booking.bookingReference, accountId),
                A.cancelBooking,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                }
            )
        ).catch(handleCancelBookingError);
    };
const handleOverlapUpdateBookingError = (error: Error) => {
    const url = toastUrlFromPath(RouteSection.VehicleUnavailable, location.pathname, TOAST_PARAM_ON_UPDATE);
    history.push(url);
    throw error;
};

export const updateBookingThunk: PromiseThunk<I.UpdateBookingPayload, number> = async (dispatch, getState) => {
    const state = getState();
    const currentBooking = S.currentBookingSelector(state);
    const pickUpDateTime = S.bookingInProgressPickUpDateTimeSelector(state);
    const dropOffDateTime = S.bookingInProgressDropOffDateTimeSelector(state);
    const location = S.selectedLocationSelector(state);
    const accountId = salesforceAccountIdSelector(state);
    const encoreTier = encoreTierSelector(state);
    const vehicleId = S.bookingInProgressSelectedVehicleIdSelector(state);
    const departureFlightNumber = S.bookingInProgressFlightDepartureSelector(state);
    const returnFlightNumber = S.bookingInProgressFlightReturnSelector(state);
    const offerId = S.accountInfoOfferIdSelector(state);

    if (
        currentBooking === undefined ||
        pickUpDateTime === undefined ||
        dropOffDateTime === undefined ||
        location === undefined ||
        accountId === undefined ||
        vehicleId === undefined ||
        offerId === undefined
    ) {
        return Promise.reject("update booking failed, missing data.");
    }

    const locationId = location.id;
    const startDate = dateToYYYYMMDD(pickUpDateTime);
    const startTime = dateToHHMM(pickUpDateTime);
    const endDate = dateToYYYYMMDD(dropOffDateTime);
    const endTime = dateToHHMM(dropOffDateTime);
    const updateFlightNumber = true;

    const requestData: I.UpdateBookingRequest = {
        accountId,
        offerId,
        locationId,
        vehicleId,
        startDate,
        startTime,
        endDate,
        endTime,
        updateFlightNumber,
        departureFlightNumber,
        returnFlightNumber,
    };

    return dispatch(
        createOnDemandFetchThunk(await onDemandUpdateBookingUrl(currentBooking.bookingReference), A.updateBooking, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
    )
        .then(res => {
            const shouldSendToGTM = ["locationId", "vehicleId", "startTime", "endTime"].some(item => {
                switch (item) {
                    case "locationId":
                        return currentBooking.location.id !== requestData.locationId; // Ensure currentBooking has locationId
                    case "vehicleId":
                        return currentBooking.vehicle.id !== requestData.vehicleId; // Ensure currentBooking has vehicleId
                    case "startTime":
                        return currentBooking.start !== new Date(requestData.startDate).getTime(); // Convert to timestamp
                    case "endTime":
                        return currentBooking.end !== new Date(requestData.endDate).getTime(); // Convert to timestamp
                    default:
                        return false; // Fallback case
                }
            });
            if (shouldSendToGTM) {
                pushToGTMBookingUpdated(requestData, encoreTier || UserEncoreTiers.NONE, accountId ?? "");
            }
            return res;
        })
        .catch(error => {
            const isOutsideOriginalBooking = isDateTimeOutsideOriginalDateTime(
                {
                    start: pickUpDateTime,
                    end: dropOffDateTime,
                },
                {
                    start: epochAndOffsetToDate(currentBooking.start, currentBooking.startOffset),
                    end: epochAndOffsetToDate(currentBooking.end, currentBooking.endOffset),
                }
            );

            if (!isOutsideOriginalBooking) {
                dispatch(A.resetSelectedVehicle());
                return handleOverlapUpdateBookingError(error);
            } else {
                return handleGenericOnDemandError(error);
            }
        });
};

export const cachedEncoreBookingLoadThunk = createCachedFetchThunk(
    encoreBookingLoadThunk,
    S.onDemandBookingHistoryStatusSelector
);

export const cachedOnDemandVehiclesThunk = createCachedFetchThunk(
    fetchOnDemandVehiclesThunk,
    S.onDemandVehiclesStatusSelector
);

export const cachedOnDemandLocationsThunk = createCachedFetchThunk(
    fetchLocationsThunk,
    S.onDemandLocationsStatusSelector
);
//#endregion
