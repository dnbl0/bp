import { DealerLookupResponse, SuburbAutoCompleteResponse } from "Types/index";
import { HotelPartnership, settingsPromise } from "./settings";

import { ErrorConstants } from "Helpers/ErrorConstants";
import { secondsInMinute } from "Helpers/dateTime";

export const vehicleUnitGetGuestVehiclesUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.vehicleUnit.apiBaseUrl}${settings.vehicleUnit.getGuestVehicle}`;
};
export const getConfirmGuestVehicleUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.vehicleUnit.apiBaseUrl}${settings.vehicleUnit.confirmVehicle}`;
};
export const airportLoungeBalanceUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.airportLounge.apiBaseUrl}${settings.airportLounge.getBalance}`;
};
export const valetProvidersUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.valet.apiBaseUrl}${settings.valet.listPartners}`;
};
export const valetProviderBalanceUrl = async (vehicleOwnershipId: string): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.valet.apiBaseUrl}${settings.valet.getBalance}?vehicleOwnershipId=${vehicleOwnershipId}`;
};
export const valetHowDoesItWorkUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.valet.howDoesItWork}`;
};
export const getGuestDetailsUrl = async (token: string): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.guestRetailProfile.apiBaseUrl}${settings.guestRetailProfile.guestDetailsV2}/${token}`;
};
export const registerGuestUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.guestRetailProfile.apiBaseUrl}${settings.guestRetailProfile.register}`;
};
export const getOauth2CallbackUrl = async (): Promise<string> =>
    (await settingsPromise()).guestRetailProfile.oauth2Callback;

export const vehicleUnitUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.vehicleUnit.apiBaseUrl}${settings.vehicleUnit.getVehicleByRegoAndState}`;
};
export const associateVehicleUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.vehicleUnit.apiBaseUrl}${settings.vehicleUnit.associateVehicle}`;
};

export const createVehicleCaseUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.guestRetailProfile.apiBaseUrl}${settings.guestRetailProfile.createCase}`;
};
export const vehicleUnitByVinUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.vehicleUnit.apiBaseUrl}${settings.vehicleUnit.getVehicleUnitByVin}`;
};
export const verifyVehicleUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.vehicleUnit.apiBaseUrl}${settings.vehicleUnit.verifyVehicle}`;
};
export const getRewardCouponUrl = async (vin: string): Promise<string> => {
    const settings = await settingsPromise();
    const url = new URL(`${settings.reward.apiBaseUrl}${settings.reward.getRewardCoupon}`);
    url.searchParams.append("vin", vin);
    return url.href;
};
export const getCaltexCouponUrl = async (caltexId: string): Promise<string> => {
    const settings = await settingsPromise();
    const url = new URL(`${settings.reward.apiBaseUrl}${settings.reward.getCaltexCoupon}/${caltexId}/validate`);
    return url.href;
};

export const getAllRewardsCategoriesUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    const url = new URL(`${settings.reward.apiBaseUrl}${settings.reward.categories}`);
    return url.href;
};

export const getRewardsOnCategoryUrl = async (category: string): Promise<string> => {
    const settings = await settingsPromise();
    const url = new URL(`${settings.reward.apiBaseUrl}${settings.reward.getAllRewards}`);
    url.searchParams.append("category", category);
    return url.href;
};

export const commPrefUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.guestRetailProfile.apiBaseUrl}${settings.guestRetailProfile.communicationPreferences}`;
};

export const onDemandGetAccountInfoUrl = async (accountId: string, name: string, email: string): Promise<string> => {
    const offsetInSeconds = new Date().getTimezoneOffset() * secondsInMinute;
    const settings = await settingsPromise();
    const queryParams = `accountId=${accountId}&name=${name}&email=${email}&offset=${offsetInSeconds}`;
    return `${settings.onDemand.apiBaseUrl}${settings.onDemand.checkAvailability}?${queryParams}`;
};

export const onDemandGetLocationsUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.onDemand.apiBaseUrl}${settings.onDemand.getLocations}`;
};

export const onDemandUpdateUserUrl = async (userId: string): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.onDemand.apiBaseUrl}${settings.onDemand.updateUser}/${userId}`;
};

export const onDemandVehiclesUrl = async (
    locationId: string,
    fromDate: string,
    fromTime: string,
    toDate: string,
    toTime: string
): Promise<string> => {
    const settings = await settingsPromise();

    /* eslint-disable max-len */
    return `${settings.onDemand.apiBaseUrl}${settings.onDemand.getLocations}/${locationId}/vehicles/${fromDate}/${fromTime}/${toDate}/${toTime}`;
};

export const onDemandFlexiBookingUrl = async (
    vehicleId: string,
    locationId: string,
    fromDate: string,
    fromTime: string,
    toDate: string,
    toTime: string
): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.onDemand.apiBaseUrl}${settings.onDemand.getVehicles}/${vehicleId}/locations/${locationId}/${fromDate}/${fromTime}/${toDate}/${toTime}`;
};
export const onDemandMakeBookingUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.onDemand.apiBaseUrl}${settings.onDemand.makeBooking}`;
};

export const onDemandGetBookingHistoryUrl = async (userId: string): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.onDemand.apiBaseUrl}${settings.onDemand.getBookingHistory}/${userId}/bookings`;
};

export const onDemandTsAndCsUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return settings.onDemand.termsAndConditionsUrl;
};

export const onDemandCancelBookingUrl = async (bookingReference: string, accountId: string): Promise<string> => {
    const settings = await settingsPromise();
    const queryParams = `accountId=${accountId}`;
    return `${settings.onDemand.apiBaseUrl}${settings.onDemand.cancelBooking}/${bookingReference}/cancel?${queryParams}`;
};

export const onDemandUpdateBookingUrl = async (bookingReference: string): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.onDemand.apiBaseUrl}${settings.onDemand.updateBooking}/${bookingReference}`;
};

export const onDemandFeesAndChargesUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return settings.onDemand.feesAndChargesUrl;
};

export const paymentsSetupIntentUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.payments.apiBaseUrl}${settings.payments.setupIntent}`;
};

export const addPaymentMethodUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.payments.apiBaseUrl}${settings.payments.addPaymentMethod}`;
};

export const getPaymentMethodsUrl = async (customerId: string): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.payments.apiBaseUrl}${settings.payments.getPaymentMethods}?customerId=${customerId}`;
};
export const onDemandPublicHolidayUrl = async (branchId: string): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.onDemand.apiBaseUrl}${settings.onDemand.getPublicHoliday}?branchId=${branchId}`;
};

// ! Tech Debt
export const updateGuestDetailsUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.guestRetailProfile.apiBaseUrl}${settings.guestRetailProfile.guestDetailsV2}`;
};

export const deleteAccountRequestUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.guestRetailProfile.apiBaseUrl}${settings.guestRetailProfile.accountDeletion}`;
};

export const getCheckDeleteCreditCardUrl = async (customerId: string): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.payments.apiBaseUrl}/api/v1/Lexus/payment/cards/delete/check/${customerId}`;
};

export const getCacheDeleteCreditCardUrl = async (customerId: string): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.payments.apiBaseUrl}/api/v1/Lexus/payment/cards/delete/cache/${customerId}`;
};

export const getDeleteCreditCardUrl = async (customerId: string, cardId: string): Promise<string> => {
    const settings = await settingsPromise();
    return `${settings.payments.apiBaseUrl}/api/v1/Lexus/payment/cards/${customerId}/${cardId}`;
};

export const getLifestyleBenefit = async (): Promise<HotelPartnership> => {
    const settings = await settingsPromise();
    return settings.onDemand.benefit.hotelPartnership;
};

export const getSuburbAutoComplete = async (input: string): Promise<SuburbAutoCompleteResponse[]> => {
    const settings = await settingsPromise();
    const url = `${settings?.general?.bffBaseUrl}${settings?.general?.suburbLookup}/${input}`;

    return fetch(url).then(response => response.json() as Promise<SuburbAutoCompleteResponse[]>);
};

export const getDealerLookUp = async (postcode: string, suburb: string): Promise<DealerLookupResponse[]> => {
    const settings = await settingsPromise();
    const url = `${settings.general.bffBaseUrl}${settings.general.dealerLookup}/${postcode}/${suburb}`;

    return fetch(url)
        .then(response => response.json() as Promise<DealerLookupResponse[]>)
        .catch(error => {
            throw new Error(ErrorConstants.DealerLookUpError);
        });
};

export const getChoovieMovieSsoJwtUrl = async (): Promise<string> => {
    const settings = await settingsPromise();
    const url = new URL(`${settings.guestRetailProfile.apiBaseUrl}${settings.guestRetailProfile.choovieSso}`);
    return url.href;
};
