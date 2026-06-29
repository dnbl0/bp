import { getAppMode } from "Helpers/general";
import { UserEncoreStatus, UserEncoreTiers } from "Helpers/users";
import { MakeBookingRequest, UpdateBookingRequest } from "ReduxSlices/onDemand/onDemandInterfaces";

import TagManager from "react-gtm-module";
import { format } from "date-fns";

const createTimeStamps = () => ({
    timeStamp: format(new Date(), "dd-LL-yyyy, kk:mm:ss"),
    timeStampMS: Date.now(),
});

//#region enum
export enum GTMEvents {
    FORM_FIELD_CHANGED = "formFieldChanged",
    FORM_SUBMITTED = "formSubmitted",
    ACCOUNT_CREATED = "accountCreated",
    VEHICLE_ASSOCIATED = "vehicleAssociated",
    BOOKING_CREATED = "bookingCreated",
    BOOKING_UPDATED = "bookingUpdated",
    EXTERNAL_LINK_CLICKED = "externalLinkClicked",
    COMMUNICATION_PREFERENCE_UPDATED = "communicationPreferenceUpdated",
    ON_CLICK = "gtm.click",
    REWARD_CARD_CLICKED = "rewardTileClicked",
    ENCORE_ELEVATE_INTEREST = "encoreElevateInterest",
    ENCORE_BANNER_BUTTON_CLICK = "bannerButtonClick",
    ENCORE_ELEVATE_PURCHASE = "elevatePurchase",
    ENCORE_UNAVAILABLE_BANNER = "unavailable_booking_banner",
    ENCORE_SUCCESSFUL_ONDEMAND_BOOKING = "successful_booking_created",
    ENCORE_VIEW_MODEL_AVAILABILITY = "view_model_availability",
    ENCORE_FLEXI_BOOKING_START = "flexi_booking_start",
    ENCORE_TOTAL_BOOKING_ATTEMPT = "total_booking_attempt",
    ENCORE_LOGIN = "encore_login",
}

export enum GTMForms {
    REGISTRATION = "Registration",
    CHANGE_PASSWORD = "Change Password",
    CURRENT_PASSWORD = "Current Password",
    NEW_PASSWORD = "New Password",
    REPEAT_NEW_PASSWORD = "Repeat New Password",

    ADD_PAYMENT_CARD = "Add Payment Card Details",
    CARDHOLDER_NAME = "Card Holder Name",
    CARD_NUMBER = "Card Number",

    ADDRESS = "Address",
    MOBILE_NUMBER = "Mobile Number",
    BOOK_DRIVER_DETAILS = "Book Vehicle Driver Details",
    BOOK_FLIGHT_DETAILS = "Book Flight Details",
    VIN_OR_REGISTRATION = "Vin Or Registration",
    VIN = "Vin",
}

enum GTMSteps {
    personalDetail = "Personal Info",
    acceptTC = "Accept Term & Conditions",
}

enum GTMBookingTypes {
    FLEXI = "Flexi booking",
    STANDARD = "Standard booking",
}
//#endregion

/**
 * push a FormFieldCompleteEvent to data layer
 */
const pushToGTM = (
    event: GTMEvents,
    userTier = UserEncoreTiers.NONE.toLocaleUpperCase(),
    accountId: string,
    { ...payload }
) =>
    TagManager.dataLayer({
        dataLayer: {
            event,
            userTier: userTier.toLocaleUpperCase(),
            accountId,
            appMode: getAppMode(),
            ...payload,
        },
    });

export const pushToGTMTermsAndConditionFormSubmitted = (userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.FORM_SUBMITTED, userTier, accountId, {
        formName: GTMForms.REGISTRATION,
        stepCompleted: GTMSteps.acceptTC,
    });

export const pushToGTMSignUpFormSubmitted = (userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.FORM_SUBMITTED, userTier, accountId, {
        formName: GTMForms.REGISTRATION,
        stepCompleted: GTMSteps.personalDetail,
    });

export const pushToGTMSignUpFormFieldChanged = (
    fieldName: string,
    valid: boolean,
    userTier: string,
    accountId: string
): void => pushToGTM(GTMEvents.FORM_FIELD_CHANGED, userTier, accountId, { fieldName, valid });

export const pushToGTMFormFieldChanged = (fieldName: string, userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.FORM_FIELD_CHANGED, userTier, accountId, { fieldName });

export const pushToGTMChangePasswordFormFieldSubmitted = (userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.FORM_SUBMITTED, userTier, accountId, { formName: GTMForms.CHANGE_PASSWORD });

export const pushToGTMAddPaymentFormFieldSubmitted = (userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.FORM_SUBMITTED, userTier, accountId, { formName: GTMForms.ADD_PAYMENT_CARD });

export const pushToGTMBookVehicleDriverDetailsFormFieldSubmitted = (userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.FORM_SUBMITTED, userTier, accountId, { formName: GTMForms.BOOK_DRIVER_DETAILS });

export const pushToGTMBookFlightDriverDetailsFormFieldSubmitted = (userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.FORM_SUBMITTED, userTier, accountId, { formName: GTMForms.BOOK_FLIGHT_DETAILS });

export const pushToGTMVinOrRegistration = (userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.FORM_SUBMITTED, userTier, accountId, { formName: GTMForms.VIN_OR_REGISTRATION });

export const pushToGTMAccountCreation = (source: string, userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.ACCOUNT_CREATED, userTier, accountId, { registrationSource: source });

type SignInSuccessProps = { userTier: string; accountId: string; isAutoLogin: boolean };
export const pushToGTMFormSignInSuccess = ({ userTier, accountId, isAutoLogin }: SignInSuccessProps): void =>
    pushToGTM(GTMEvents.ENCORE_LOGIN, userTier, accountId, {
        appVersion: process.env.GIT_HASH || "dev", // TODO: LEC-2815 Refactor to use ServiceWorker version numbering
        autoLogin: isAutoLogin ? "yes" : "no",
        ...createTimeStamps(),
    });

export const pushToGTMVehicleAssociation = (
    vehicleOwnershipId: string,
    verificationStatus: boolean,
    userTier: string,
    accountId: string
): void => pushToGTM(GTMEvents.VEHICLE_ASSOCIATED, userTier, accountId, { vehicleOwnershipId, verificationStatus });

export const pushToGTMBookingCreated = (
    makeBookingRequest: MakeBookingRequest,
    userTier: string,
    accountId: string
): void => pushToGTM(GTMEvents.BOOKING_CREATED, userTier, accountId, { ...makeBookingRequest });

export const pushToGTMBookingUpdated = (
    updateBookingRequest: UpdateBookingRequest,
    userTier: string,
    accountId: string
): void => pushToGTM(GTMEvents.BOOKING_UPDATED, userTier, accountId, { ...updateBookingRequest });

export const pushToGTMExternalURLVisited = (url: string, userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.EXTERNAL_LINK_CLICKED, userTier, accountId, { target: url });

export const pushToGTMCommunicationPreference = (
    communicationPreferences: LXS.GuestCommunicationPreferences,
    userTier: string,
    accountId: string
): void => pushToGTM(GTMEvents.COMMUNICATION_PREFERENCE_UPDATED, userTier, accountId, { ...communicationPreferences });

export const pushToGTMButtonClicked = (text: string, userTier: string, accountId: string): void =>
    pushToGTM(GTMEvents.ON_CLICK, userTier, accountId, { text, "gtm.element": "BUTTON" });

export const pushToGTMRewardCardClick = (
    dataLayer: { [key: string]: string },
    userTier: string,
    accountId: string
): void => pushToGTM(GTMEvents.REWARD_CARD_CLICKED, userTier, accountId, dataLayer);

export const pushToGTMEncoreButtonClicked = (
    userTier: string,
    accountId: string,
    renewalRequestStatus: string,
    elevateOffer: string,
    buttonText: string
): void =>
    pushToGTM(GTMEvents.ENCORE_ELEVATE_INTEREST, userTier, accountId, {
        renewalRequestStatus: renewalRequestStatus.toLocaleUpperCase(),
        elevateOffer: elevateOffer.toLocaleUpperCase(),
        buttonText,
    });

export const pushToGTMEncoreDashboardButtonClicked = ({
    accountId = "",
    encoreTier,
    bannerTitle,
    buttonText,
    membershipStatus,
}: {
    encoreTier?: string;
    accountId?: string;
    membershipStatus: UserEncoreStatus;
    bannerTitle: string;
    buttonText: string;
}): void =>
    pushToGTM(GTMEvents.ENCORE_BANNER_BUTTON_CLICK, encoreTier, accountId, {
        membershipStatus: membershipStatus.toLocaleUpperCase(),
        bannerTitle: bannerTitle.toLocaleUpperCase(),
        buttonText: buttonText.toLocaleUpperCase(),
        banner: "MEMBERSHIP BANNER",
    });

export const pushToGTMEncoreMembershipCardButtonClicked = ({
    accountId = "",
    encoreTier,
    buttonText,
    membershipStatus,
}: {
    encoreTier?: string;
    accountId?: string;
    membershipStatus: string | undefined;
    buttonText: string;
}): void =>
    pushToGTM(GTMEvents.ENCORE_ELEVATE_PURCHASE, encoreTier, accountId, {
        membershipStatus: membershipStatus?.toLocaleUpperCase(),
        buttonText: buttonText.toLocaleUpperCase(),
    });

type CommonTimePayload = {
    accountId?: string;
    userTier: string;
    locationId: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
};

type UnavailableBannerEvent = {
    type: GTMEvents.ENCORE_UNAVAILABLE_BANNER;
    data: CommonTimePayload;
};

type SuccessfulBookingEvent = {
    type: GTMEvents.ENCORE_SUCCESSFUL_ONDEMAND_BOOKING;
    data: CommonTimePayload & { model: string; flexiBookingType: boolean };
};

type UnavailableModelEvent = {
    type: GTMEvents.ENCORE_VIEW_MODEL_AVAILABILITY;
    data: CommonTimePayload & { model: string; flexiBookingType: boolean };
};

type FlexiBookingStart = {
    type: GTMEvents.ENCORE_FLEXI_BOOKING_START;
    data: CommonTimePayload & { model: string; flexiBookingType: boolean };
};

type TotalBookingAttemptEvent = {
    type: GTMEvents.ENCORE_TOTAL_BOOKING_ATTEMPT;
    data: CommonTimePayload;
};

export type GTMEncoreEvent =
    | UnavailableBannerEvent
    | SuccessfulBookingEvent
    | UnavailableModelEvent
    | FlexiBookingStart
    | TotalBookingAttemptEvent;

export const pushToGTMEncoreOnDemandBookingEvent = (event: GTMEncoreEvent): void => {
    const { accountId = "", userTier, locationId, startDate, endDate, startTime, endTime } = event.data;

    const basePayload = {
        locationId,
        startDate,
        endDate,
        startTime,
        endTime,
        ...createTimeStamps(),
        appMode: getAppMode(),
    };

    switch (event.type) {
        case GTMEvents.ENCORE_UNAVAILABLE_BANNER:
        case GTMEvents.ENCORE_TOTAL_BOOKING_ATTEMPT:
            pushToGTM(event.type, userTier, accountId, basePayload);
            break;
        case GTMEvents.ENCORE_SUCCESSFUL_ONDEMAND_BOOKING:
        case GTMEvents.ENCORE_FLEXI_BOOKING_START:
        case GTMEvents.ENCORE_VIEW_MODEL_AVAILABILITY:
            pushToGTM(event.type, userTier, accountId, {
                ...basePayload,
                model: event.data.model,
                bookingType: event.data.flexiBookingType ? GTMBookingTypes.FLEXI : GTMBookingTypes.STANDARD,
            });
            break;
    }
};

export const pushToGTMUserTierAndAccountId = (userTier: string, accountId: string): void =>
    TagManager.dataLayer({ dataLayer: { userTier, accountId } });
