import { json, status } from "./helpers/fetch";

import { ErrorConstants } from "./helpers/ErrorConstants";

export interface HotelPartnership {
    [key: string]: {
        url: string;
        title: string;
        description: string;
        image: string;
    };
}

export interface Settings {
    gtmid: string;
    airportLounge: {
        apiBaseUrl: string;
        getBalance: string;
    };
    valet: {
        apiBaseUrl: string;
        listPartners: string;
        getBalance: string;
        howDoesItWork: string;
        isUsingIframe: boolean;
    };
    vehicleUnit: {
        apiBaseUrl: string;
        getGuestVehicle: string;
        getVehicleByRegoAndState: string;
        associateVehicle: string;
        getVehicleUnitByVin: string;
        verifyVehicle: string;
        confirmVehicle: string;
        alerts: {
            confirmDeliveredText: string;
            confirmDeliveredTitle: string;
            successTitle: string;
            successParagraphOne: string;
            successParagraphTwo: string;
        };
    };
    guestRetailProfile: {
        apiBaseUrl: string;
        getGuestDetails: string;
        guestDetailsV2: string;
        register: string;
        createCase: string;
        communicationPreferences: string;
        oauth2Callback: string;
        accountDeletion: string;
        choovieMovieUrl: string;
        choovieSso: string;
    };
    errors: {
        url500: string;
    };
    general: {
        bffBaseUrl: string;
        suburbLookup: string;
        termsAndConditionsUrl: string;
        termsAndConditionsVersion: string;
        privacyPolicyUrl: string;
        privacyPolicyVersion: string;
        lcacContactNumber: string;
        lexusBrandBaseUrl: string;
        mainsiteBaseUrl?: string;
        primaryNavigationContentPath: string;
        primaryNavigationSC10ContentPath: string;
        isSpaOSBEnabled: boolean;
        isMembershipEnabled: boolean;
        dealerLookup: string;
        webHasOutage?: boolean;
        webOutageTitle?: string;
        webOutageMessage?: string;
        appHasOutage?: boolean;
        appOutageTitle?: string;
        appOutageMessage?: string;
    };
    reward: {
        fuelDiscountCents: number;
        apiBaseUrl: string;
        getCaltexCoupon: string;
        getVehicles?: string;
        getRewardCoupon: string;
        termsAndConditionsUrl: string;
        isEnabled: boolean;
        caltaxFinderUrl: string;
        isRewardsEnabled: boolean;
        getAllRewards: string;
        categories: string;
    };
    onDemand: {
        apiBaseUrl: string;
        checkAvailability: string;
        isEnabled: boolean;
        getLocations: string;
        hiddenLocationIds?: string[];
        updateUser: string;
        makeBooking: string;
        getPublicHoliday: string;
        getBookingHistory: string;
        getVehicles: string;
        termsAndConditionsUrl: string;
        cancelBooking: string;
        feesAndChargesUrl: string;
        maxBookingDurationInDays: number;
        availableBookingPeriodInMonths: number;
        minCancelTimeBeforeVoucherExpiredInHours: number;
        minTimeBeforeBookingInDays: number;
        updateBooking: string;
        isEditBookingEnabled: boolean;
        isNzBookingEnabled: boolean;
        benefit: {
            baseSiteUrl: string;
            vehicleBenefits: {
                [key: string]: {
                    url: string;
                    title: string;
                    description: string;
                    image: string;
                };
            };
            hotelPartnership: HotelPartnership;
        };
    };
    payments: {
        apiBaseUrl: string;
        setupIntent: string;
        addPaymentMethod: string;
        getPaymentMethods: string;
        publishableKey: string;
        isEnabled: boolean;
    };
    dummyAccounts: {
        id: string;
        vin: string;
    }[];
    chargingLocationFinder: {
        iframeUrl: string;
    };
}
export const settingsPromise: () => Promise<Settings> = (() => {
    let hasError = false;
    let response: Promise<Settings>;

    return () => {
        if (response && !hasError) {
            return response;
        }

        response = new Promise(resolve => {
            fetch(`${process.env.BFF_HOST || ""}`, { credentials: "include" })
                .then(status)
                .then(json)
                .then(res => resolve(res))
                .catch(err => {
                    hasError = true;
                    throw new Error(ErrorConstants.BFFDownError);
                });
        });
        return response;
    };
})();
