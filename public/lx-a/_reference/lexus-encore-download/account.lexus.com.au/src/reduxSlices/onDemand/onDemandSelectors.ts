import { FetchStatusAndError, getFetchContainerValue, getFetchStatusAndErrorError } from "../../helpers/fetch";
import { LoadStatus } from "../../types/loadStatus";
import { StateSelector } from "../../types/general";
import { getDate, isFutureDate, dateWithOffset } from "../../helpers/dateTime";
import { createSelector } from "reselect";
import * as I from "./onDemandInterfaces";
import { findLocationById } from "./onDemandReducers";
import { isEqual } from "date-fns";

//#region selectors
export const redemptionsRemainingSelector: StateSelector<number | undefined> = state => {
    if (state.onDemand.accountInfo) {
        return state.onDemand.accountInfo.redemptionsRemaining;
    } else {
        return undefined;
    }
};

export const getAccountInfoContainerSelector: StateSelector<FetchStatusAndError> = state =>
    state.onDemand.getAccountInfo;

export const accountInfoStatusSelector: StateSelector<LoadStatus> = state => {
    return state.onDemand.getAccountInfo.status;
};

export const accountInfoErrorSelector: StateSelector<Error | undefined> = createSelector(
    getAccountInfoContainerSelector,
    getFetchStatusAndErrorError
);

export const onDemandUserIsNewSelector: StateSelector<boolean | undefined> = state => {
    return state.onDemand.user !== undefined && state.onDemand.user.isNew !== null
        ? state.onDemand.user.isNew
        : undefined;
};

export const accountInfoOfferIdSelector: StateSelector<string | undefined> = state => {
    const value = state.onDemand.accountInfo;
    return value === undefined || value.offerId === null ? undefined : value.offerId;
};
export const onDemandTokenSelector: StateSelector<string | undefined> = state => {
    const value = state.onDemand.accountInfo;
    return value === undefined || value.token === null ? undefined : value.token;
};

export const onDemandUserSelector: StateSelector<I.OnDemandUser | undefined> = state => {
    return state.onDemand.user;
};

export const onDemandUserLicenceStateSelector: StateSelector<string | undefined> = state => {
    const user = onDemandUserSelector(state);
    return user !== undefined ? user.licenceState : undefined;
};
const getIsLicenceExpired = (driver?: I.OnDemandUser) => {
    const licenceExpiry =
        driver !== undefined &&
        driver.licenceExpiryDay !== undefined &&
        driver.licenceExpiryMonth !== undefined &&
        driver.licenceExpiryYear !== undefined
            ? getDate(driver.licenceExpiryDay, driver.licenceExpiryMonth, driver.licenceExpiryYear)
            : undefined;

    return !isFutureDate(licenceExpiry);
};

export const isLicenceExpiredSelector: StateSelector<boolean | undefined> = createSelector(
    onDemandUserSelector,
    getIsLicenceExpired
);
// -- locations selectors
const onDemandLocationsContainerSelector: StateSelector<I.LocationsFetchContainer> = state => state.onDemand.locations;
const onDemandHiddenLocationIdsSelector: StateSelector<string[]> = state => state.onDemand.settings.hiddenLocationIds;

export const onDemandLocationsSelector: StateSelector<I.LocationsPayload | undefined> = createSelector(
    onDemandLocationsContainerSelector,
    onDemandHiddenLocationIdsSelector,
    (container, hiddenIds) => {
        const locations = getFetchContainerValue(container);
        if (!locations || hiddenIds.length === 0) {
            return locations;
        }
        const deny = new Set(hiddenIds);
        return locations.filter(location => !deny.has(location.id));
    }
);

export const onDemandLocationsStatusSelector: StateSelector<LoadStatus> = state =>
    onDemandLocationsContainerSelector(state).status;
const onDemandPublicHolidaysContainerSelector: StateSelector<I.PublicHolidaysFetchContainer> = state =>
    state.onDemand.publicHolidays;

export const onDemandPublicHolidaysSelector: StateSelector<I.PublicHolidaysPayload | undefined> = createSelector(
    onDemandPublicHolidaysContainerSelector,
    getFetchContainerValue
);

export const onDemandPublicHolidaysStatusSelector: StateSelector<LoadStatus> = state =>
    onDemandPublicHolidaysContainerSelector(state).status;

export const onDemandUserIdSelector: StateSelector<string | undefined> = state => {
    const value = state.onDemand.user;
    return value === undefined || value.id === null ? undefined : value.id;
};

export const selectedLocationSelector: StateSelector<I.Location | undefined> = state => {
    const selectedLocationId = state.onDemand.bookingInProgress.selectedLocation;
    const locationsValue = onDemandLocationsSelector(state);
    return findLocationById(selectedLocationId, locationsValue);
};

export const selectedLocationIdSelector: StateSelector<string | undefined> = state => {
    const location = selectedLocationSelector(state);
    if (location === undefined) {
        return;
    }

    return location.id;
};

export const bookingInProgressFlightReturnSelector: StateSelector<string | undefined> = state => {
    return state.onDemand.bookingInProgress.returnFlightNumber;
};

export const bookingInProgressFlightDepartureSelector: StateSelector<string | undefined> = state => {
    return state.onDemand.bookingInProgress.departureFlightNumber;
};

const findVehicleById = (id: string | undefined, vehicles: I.OnDemandVehicle[] | undefined) => {
    if (id && vehicles) {
        return vehicles.find(vehicle => {
            return vehicle.id === id;
        });
    } else {
        return undefined;
    }
};

export const selectedVehicleSelector: StateSelector<I.OnDemandVehicle | undefined> = state => {
    const selectedVehicleId = state.onDemand.bookingInProgress.selectedVehicle;
    const vehiclesValue = onDemandVehiclesSelector(state);
    return findVehicleById(selectedVehicleId, vehiclesValue);
};

export const selectedVehicleIdSelector: StateSelector<string | undefined> = state => {
    const vehicle = selectedVehicleSelector(state);
    if (vehicle === undefined) {
        return;
    }

    return vehicle.id;
};
// -- update user selectors

export const updateUserStatusSelector: StateSelector<LoadStatus> = state => state.onDemand.updateUser.status;
// -- booking in progress selectors

export const bookingInProgressPickUpDateTimeSelector: StateSelector<Date | undefined> = state =>
    state.onDemand.bookingInProgress.pickUpDateTime;

export const bookingInProgressDropOffDateTimeSelector: StateSelector<Date | undefined> = state =>
    state.onDemand.bookingInProgress.dropOffDateTime;

export const bookingInProgressSelectedVehicleIdSelector: StateSelector<string | undefined> = state => {
    return state.onDemand.bookingInProgress.selectedVehicle;
};

export const bookingInProgressSelectedVehicleSelector: StateSelector<I.OnDemandVehicle | undefined> = state => {
    const id = bookingInProgressSelectedVehicleIdSelector(state);
    const vehicles = onDemandVehiclesSelector(state);
    if (id === undefined || vehicles === undefined) {
        return;
    }

    return vehicles.find(vehicle => vehicle.id === id);
};

export const isBookingInProgressSelector: StateSelector<boolean> = state => {
    const { dropOffDateTime, pickUpDateTime, selectedVehicle, selectedLocation } = state.onDemand.bookingInProgress;
    return (
        dropOffDateTime !== undefined &&
        pickUpDateTime !== undefined &&
        selectedVehicle !== undefined &&
        selectedLocation !== undefined
    );
};
// -- make booking selectors
const makeBookingContainerSelector: StateSelector<I.MakeBookingFetchContainer> = state => state.onDemand.makeBooking;

export const makeBookingStatusSelector: StateSelector<LoadStatus> = state => makeBookingContainerSelector(state).status;
// -- vehicle selectors
const onDemandVehiclesContainerSelector: StateSelector<I.OnDemandVehiclesContainer> = state => state.onDemand.vehicles;
export const onDemandVehiclesStatusSelector: StateSelector<LoadStatus> = state =>
    onDemandVehiclesContainerSelector(state).status;
export const onDemandVehiclesSelector: StateSelector<I.OnDemandVehiclesPayload | undefined> = createSelector(
    onDemandVehiclesContainerSelector,
    getFetchContainerValue
);

export const createDetailViewVehicleSelector = (
    vehicleId: string | undefined
): StateSelector<I.OnDemandVehicle | undefined> => {
    return state => {
        const onDemandVehicles = onDemandVehiclesSelector(state);

        if (onDemandVehicles) {
            return onDemandVehicles.find(v => v.id === vehicleId);
        } else {
            return undefined;
        }
    };
};
// -- booking history selectors
const onDemandBookingHistoryContainerSelector: StateSelector<I.GetBookingHistoryFetchContainer> = state =>
    state.onDemand.bookingHistory;

export const onDemandBookingHistoryStatusSelector: StateSelector<LoadStatus> = state =>
    onDemandBookingHistoryContainerSelector(state).status;

export const onDemandBookingHistorySelector: StateSelector<I.Booking[] | undefined> = createSelector(
    onDemandBookingHistoryContainerSelector,
    getFetchContainerValue
);

export const onDemandBookingDetailsSelector =
    (bookingReference?: string): StateSelector<I.Booking | undefined> =>
    state => {
        if (!bookingReference) return undefined;
        const bookingHistory = onDemandBookingHistorySelector(state);
        return bookingHistory && bookingHistory.find(booking => booking.bookingReference === bookingReference);
    };
const cancelBookingContainerSelector: StateSelector<I.CancelBookingFetchContainer> = state =>
    state.onDemand.cancelBooking;

export const cancelBookingStatusSelector: StateSelector<LoadStatus> = state =>
    cancelBookingContainerSelector(state).status;

export const cancelBookingSelector: StateSelector<I.CancelBookingPayload | undefined> = createSelector(
    cancelBookingContainerSelector,
    getFetchContainerValue
);
// update booking selectors

export const currentBookingSelector: StateSelector<I.CurrentBooking | undefined> = state =>
    state.onDemand.currentBooking;

export const isUpdateBookingInProgress: StateSelector<boolean> = state => {
    const { dropOffDateTime, pickUpDateTime, selectedVehicle, selectedLocation } = state.onDemand.bookingInProgress;
    return (
        (dropOffDateTime !== undefined && pickUpDateTime !== undefined) ||
        selectedVehicle !== undefined ||
        selectedLocation !== undefined
    );
};

export const currentBookedVehicle: StateSelector<I.VehicleBase | undefined> = state =>
    state.onDemand.currentBooking?.vehicle;

export const hasCurrentBookingDateAndTimeChangedSelector: StateSelector<boolean> = state => {
    const pickUpDate = bookingInProgressPickUpDateTimeSelector(state);
    const dropOffDate = bookingInProgressDropOffDateTimeSelector(state);
    const currentBooking = currentBookingSelector(state);

    const isSamePickUpDate = (booking: I.CurrentBooking): boolean => {
        const currentBookingPickUpDate = dateWithOffset(booking.start, booking.startOffset);
        return pickUpDate !== undefined && isEqual(pickUpDate, currentBookingPickUpDate);
    };

    const isSameDropOffDate = (booking: I.CurrentBooking): boolean => {
        const currentBookingDropOffDate = dateWithOffset(booking.end, booking.endOffset);
        return dropOffDate !== undefined && isEqual(dropOffDate, currentBookingDropOffDate);
    };

    return currentBooking !== undefined && (!isSamePickUpDate(currentBooking) || !isSameDropOffDate(currentBooking));
};

export const hasCurrentBookingVehicleChangedSelector: StateSelector<boolean> = state => {
    const selectedVehicleId = bookingInProgressSelectedVehicleIdSelector(state);
    const currentBooking = currentBookingSelector(state);

    return currentBooking !== undefined && currentBooking.vehicle.id !== selectedVehicleId;
};

export const hasCurrentBookingFlightChangedSelector: StateSelector<boolean> = state => {
    const flightReturn = bookingInProgressFlightReturnSelector(state);
    const flightDeparture = bookingInProgressFlightDepartureSelector(state);

    const currentBooking = currentBookingSelector(state);

    return (
        currentBooking !== undefined &&
        ((currentBooking.returnFlightNumber ?? "") !== flightReturn ||
            (currentBooking.departureFlightNumber ?? "") !== flightDeparture)
    );
};

export const hasCurrentBookingChangedSelector: StateSelector<boolean> = state =>
    hasCurrentBookingDateAndTimeChangedSelector(state) ||
    hasCurrentBookingVehicleChangedSelector(state) ||
    hasCurrentBookingFlightChangedSelector(state);
// -- processing update user selectors

export const processingUpdateUserSelector: StateSelector<boolean> = state => state.onDemand.processingUpdateUser;

export const flexiBookingTypeSelector: StateSelector<boolean> = state => state.onDemand.flexiBookingType;

export const onDemandFlexiCheckedDatesSelector: StateSelector<Date[]> = state =>
    state.onDemand.bookingInProgress.checkedDates;

export const onDemandFlexiBookedDatesContainerSelector: StateSelector<
    I.OnDemandFlexiBookingVehiclesContainer
> = state => state.onDemand.bookingInProgress.bookedDates;

export const onDemandFlexiBookedDatesStatusSelector: StateSelector<LoadStatus> = state =>
    onDemandFlexiBookedDatesContainerSelector(state).status;
export const onDemandFlexiBookedDatesSelector: StateSelector<I.OnDemandFlexiBookingVehiclesPayload | undefined> =
    createSelector(onDemandFlexiBookedDatesContainerSelector, getFetchContainerValue);

export const onDemandFlexiBookedUnavailableDatesSelector: StateSelector<I.VehicleBookedDates[] | undefined> = state =>
    state.onDemand.bookingInProgress.unavailableDates;

//#endregion
