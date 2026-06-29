import {
    FetchAction,
    PromiseThunk,
    authorizedFetch,
    createFetchThunk,
    fetchActionPayloadToContainer,
    getFetchContainerError,
    getFetchContainerValue,
    initialFetchContainer,
    json,
    status,
} from "Helpers/fetch";
import {
    FetchMagicLinkBasicUserInfoFetchActionPayload,
    GuestInfoFetchContainer,
    MagicLinkBasicUserInfoFetchContainer,
    DashboardBannerState,
    PartialCommPrefFetchActionPayload,
    PartialDashboardBannerActionPayload,
    SetMagicLinkSalesforceParametersPayload,
    SetStripeCustomerDetailsPayload,
    User,
    VerifyVehicleFetchActionPayload,
    VerifyVehicleFetchContainer,
    VerifyVehiclePayload,
} from "./userInterfaces";
import { resetAll, RootLevelAction } from "./rootLevelAction";
import { commPrefUrl, getGuestDetailsUrl, updateGuestDetailsUrl, verifyVehicleUrl } from "../apiHref";
import { pushToGTMAccountCreation, pushToGTMFormSignInSuccess, pushToGTMVehicleAssociation } from "Helpers/gtm";

import { AccountManager } from "lexus-style-guide/Components/Account/Providers/AccountManager";
import { ErrorConstants } from "Helpers/ErrorConstants";
import { GuestAccountType } from "lexus-style-guide/Components/Account/enums";
import { LoadStatus } from "Types/loadStatus";
import { SalesforceError } from "lexus-style-guide/Components/Account/Errors/SalesforceError";
import { StateSelector } from "Types/general";
import { UserEncoreStatus, UserEncoreTiers } from "Helpers/users";
import { createSelector } from "reselect";
import { settingsPromise } from "../settings";
import { postLogoutSuccessMessage, postLogoutFailureMessage } from "Helpers/silentSignOnHelpers";
import { IS_SHOWN_BANNER, IS_SHOWN_EXTRA_BANNER, IS_DEMO_USER } from "../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const termsAndPrivacyVersions = async () => ({ ...(await settingsPromise()).general });
export enum AuthSection {
    Verifying = "Verifying",
    Account = "Account",
    App = "App",
    SalesforceError = "SalesforceError",
    BFFError = "BFFError",
    Error = "Error",
}

export enum UserAction {
    GuestDetails = "guestDetails",
    GuestError = "guestError",
    VerifyVehicle = "verifyVehicle",
    FetchMagicLinkBasicUserInfo = "fetchMagicLinkBasicUserInfo",
    SetMagicLinkSalesforceParameters = "setMagicLinkSalesforceParameters",
    ResetMagicLinkDetails = "resetMagicLinkDetails",
    SaveCommPref = "saveCommPref",
    SetAuthSection = "setAuthSection",
    SetStripeCustomerDetails = "setStripeCustomerDetails",
    UpdateGuestDetails = "updateGuestDetails",
    DashboardBannerStates = "dashboardBannerStates",
    IsMembershipEnabled = "isMembershipEnabled",
    ToggleDashboardBanner = "toggleDashboardBanner",
    ToggleExtraDashboardBanner = "toggleExtraDashboardBanner",
    SetDashboardBannerStates = "setDashboardBannerStates",
    SetIsMembershipEnabled = "setIsMembershipEnabled",
    SetEncoreTier = "setEncoreTier",
}

export const initialUserState: User = {
    guestDetails: undefined,
    verifyVehicle: initialFetchContainer,
    magicLinkBasicUserInfo: initialFetchContainer,
    guestInfo: initialFetchContainer,
    authSection: AuthSection.Verifying,
    isMembershipEnabled: false,
    dashboardBannerStates: {
        showBanner: false,
        extraBannerContent: {
            showExtraBanner: false,
            membershipStatus: UserEncoreStatus.ACTIVE,
        },
        membershipStatus: UserEncoreStatus.ACTIVE,
        expiryDate: undefined,
        ctaDisabled: false,
    },
};

const doLoginThunk =
    (isAutoLogin: boolean): PromiseThunk<void> =>
    async dispatch => {
        const guest = await AccountManager.current.getGuestAsync(false);

        if (!guest) {
            if (isAutoLogin) {
                dispatch(setAuthSection(AuthSection.Account));
            }
            return;
        }
        try {
            try {
                const guestDetailsData = await guest.getOrUpdateDetailsAsync();
                dispatch(guestDetails(guestDetailsData));
            } catch (e) {
                dispatch(guestError(e instanceof Error ? e : new Error(String(e))));
                throw e;
            }

            // manual login will do transition before being in AuthSection.App
            if (isAutoLogin) {
                dispatch(setAuthSection(AuthSection.App));
            }
        } catch (e) {
            if (e instanceof Error && e.message?.includes(ErrorConstants.BFFDownError)) {
                dispatch(setAuthSection(AuthSection.BFFError));
            } else {
                dispatch(setAuthSection(AuthSection.Error));
            }
        }
    };

const handleLoginGAEvent =
    ({ isAutoLogin }: { isAutoLogin: boolean }): PromiseThunk<void> =>
    async (dispatch, getState) => {
        await dispatch(doLoginThunk(isAutoLogin));
        const state = getState();
        const userInfo = guestDetailsSelector(state);
        if (userInfo?.accountId) {
            pushToGTMFormSignInSuccess({
                userTier: userInfo.encoreTier || UserEncoreTiers.NONE,
                accountId: userInfo.accountId,
                isAutoLogin,
            });
        }
        return;
    };

export const attemptAutoLoginThunk: PromiseThunk<void> = handleLoginGAEvent({ isAutoLogin: true });

export const attemptLoginThunk: PromiseThunk<void> = handleLoginGAEvent({ isAutoLogin: false });

export const termsAcceptedThunk: PromiseThunk<void> = async (dispatch, getState) => {
    try {
        const state = getState();
        const basicUser = magicLinkBasicUserInfoSelector(state);
        //check if user is registered via deferred link
        const source = basicUser?.accountId && basicUser?.vehicleOwnershipId ? "deferred-link" : "normal";
        const { termsAndConditionsVersion, privacyPolicyVersion } = await termsAndPrivacyVersions();

        const updateGuestDetails: Partial<LXS.GuestDetails> = {
            termsAndConditionsVersion,
            privacyPolicyVersion,
        };
        const guestDetailsData = await AccountManager.current.updateGuestDetailsAsync(updateGuestDetails);
        dispatch(guestDetails(guestDetailsData));
        const accountTier = guestDetailsData.encoreTier || UserEncoreTiers.NONE;

        pushToGTMAccountCreation(source, accountTier, guestDetailsData.accountId);
        await dispatch(verifyVehicleThunk);
    } catch (e) {
        // TODO: fully logged in but register guest failed
    }
};

export const verifyVehicleThunk: PromiseThunk<VerifyVehiclePayload | undefined> = async (dispatch, getState) => {
    const state = getState();
    const basicUser = magicLinkBasicUserInfoSelector(state);

    const salesforceId = basicUser && basicUser.accountId ? basicUser.accountId : null;

    const vehicleOwnershipId = basicUser && basicUser.vehicleOwnershipId ? basicUser.vehicleOwnershipId : null;

    if (salesforceId === null || vehicleOwnershipId === null) {
        return;
    }

    const url = await verifyVehicleUrl();

    const payload = await dispatch(
        createFetchThunk(url, verifyVehicle, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                sfId: salesforceId,
                voId: vehicleOwnershipId,
            }),
        })
    );

    vehicleOwnershipId &&
        pushToGTMVehicleAssociation(vehicleOwnershipId, payload.isSuccess, UserEncoreTiers.NONE, salesforceId ?? "");
    if (AccountManager.current.guest) {
        const guestDetailsData = await AccountManager.current.guest?.getOrUpdateDetailsAsync({});
        dispatch(guestDetails(guestDetailsData));
    }
    return payload;
};

export const fetchMagicLinkBasicUserInfoThunk =
    (token: string): PromiseThunk<LXS.BasicGuestDetails> =>
    async dispatch => {
        const url = new URL(await getGuestDetailsUrl(token));
        return dispatch(createFetchThunk(url.href, fetchMagicLinkBasicUserInfo, undefined, false));
    };

export const saveCommPrefThunk = (pref: Partial<LXS.GuestCommunicationPreferences>): PromiseThunk<void> => {
    return async dispatch => {
        dispatch(saveCommPref({ action: FetchAction.Fetch }));

        // FZ: This REST api doesn't return a body when a POST is successful, so
        // have to use authorizedFetch to include the payload.
        return authorizedFetch(await commPrefUrl(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pref),
        })
            .then(status)
            .then(() => {
                dispatch(saveCommPref({ action: FetchAction.Success, value: pref }));
            })
            .catch(error => {
                dispatch(saveCommPref({ action: FetchAction.Failure, value: error }));
            });
    };
};

export const logoutThunk: PromiseThunk<boolean> = (dispatch, getState) =>
    new Promise(resolve => {
        try {
            const authSection = authSectionSelector(getState());
            const isLoggedInToAccount = authSection === AuthSection.App || authSection === AuthSection.SalesforceError;
            if (isLoggedInToAccount) {
                AccountManager.current.logOut();
                sessionStorage.removeItem(IS_SHOWN_BANNER);
                sessionStorage.removeItem(IS_SHOWN_EXTRA_BANNER);

                dispatch(resetAll());
                resolve(true);
            } else {
                resolve(false);
            }

            postLogoutSuccessMessage();
        } catch (err) {
            postLogoutFailureMessage();
            throw err;
        }
    });

export const updateGuestDetailsThunk =
    (userDetail: Partial<LXS.GuestDetails>): PromiseThunk<boolean> =>
    async (dispatch, getState) => {
        const url = await updateGuestDetailsUrl();
        const value = guestDetailsSelector(getState());
        const updatedGuestDetail = {
            ...value,
            ...userDetail,
            postalSameAsHome: false,
        };
        await authorizedFetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedGuestDetail),
        })
            .then(status)
            .then(json)
            .then(res => dispatch(updateGuestDetails(res)))
            .catch(() => Promise.reject(false));
        return Promise.resolve(true);
    };

export const isMembershipEnabledSelector: StateSelector<boolean> = state => state.user.isMembershipEnabled;

export const guestDetailsSelector: StateSelector<LXS.GuestDetails | undefined> = state => state.user.guestDetails;

export const guestErrorSelector: StateSelector<Error | undefined> = state => state.user.guestError;

export const dashboardBannerStatesSelector: StateSelector<DashboardBannerState> = state =>
    state.user.dashboardBannerStates;

export const salesforceAccountIdSelector: StateSelector<string | undefined> = state =>
    guestDetailsSelector(state)?.accountId || undefined;

export const firstNameSelector: StateSelector<string | undefined> = state =>
    guestDetailsSelector(state)?.firstname || undefined;

export const lastNameSelector: StateSelector<string | undefined> = state =>
    guestDetailsSelector(state)?.lastname || undefined;

export const encoreTierSelector: StateSelector<UserEncoreTiers | undefined> = state =>
    (guestDetailsSelector(state)?.encoreTier as UserEncoreTiers) || undefined;

export const emailSelector: StateSelector<string | undefined> = state => guestDetailsSelector(state)?.email;

export const mobileNumberSelector: StateSelector<string | undefined> = state =>
    guestDetailsSelector(state)?.mobileNumber || undefined;

export const addressSelector: StateSelector<LXS.Address | undefined> = state =>
    guestDetailsSelector(state)?.address || undefined;

export const postalAddressSelector: StateSelector<LXS.Address | undefined> = state =>
    guestDetailsSelector(state)?.postalAddress || undefined;

export const interestsSelector: StateSelector<string | undefined> = state =>
    guestDetailsSelector(state)?.interests || undefined;

export const stripeCustomerIdSelector: StateSelector<string | undefined> = state =>
    guestDetailsSelector(state)?.stripeCustomerId || undefined;

export const isDemoUserSelector: StateSelector<boolean> = state => guestDetailsSelector(state)?.isDemoUser || false;

export const basicUserInfoSelector: StateSelector<LXS.BasicGuestDetails | undefined> = state => {
    const value = guestDetailsSelector(state);
    return value !== undefined
        ? {
              email: value.email,
              firstname: value.firstname,
              lastname: value.lastname,
              mobileNumber: value.mobileNumber,
              accountId: value.accountId,
              vehicleOwnershipId: value.vehicleOwnershipId,
              encoreTier: value.encoreTier,
          }
        : undefined;
};

const guestInfoContainerSelector: StateSelector<GuestInfoFetchContainer> = state => state.user.guestInfo;

export const guestInfoValueSelector: StateSelector<LXS.Guest | undefined> = createSelector(
    guestInfoContainerSelector,
    getFetchContainerValue
);

export const salesforceParametersSelector: StateSelector<SetMagicLinkSalesforceParametersPayload | undefined> = state =>
    state.user.magicLinkSalesforceParameters;

export const isSocialAccountSelector: StateSelector<boolean> = state => {
    const guestInfo = guestInfoValueSelector(state);
    return guestInfo?.type === GuestAccountType.Social;
};

export const isRegisterGuestErrorSelector: StateSelector<boolean> = state => !!guestErrorSelector(state);

export const registerGuestErrorCodeSelector: StateSelector<number> = state => {
    const error = guestErrorSelector(state);
    const errorCode = Number(error instanceof SalesforceError ? error.errorCode : undefined);
    return !isNaN(errorCode) ? errorCode : 0;
};

export const registerGuestErrorCaseNumberSelector: StateSelector<string> = state => {
    const error = guestErrorSelector(state);
    return error instanceof SalesforceError ? error.caseNumber || "" : "";
};

export const verifyVehicleContainerSelector: StateSelector<VerifyVehicleFetchContainer> = state =>
    state.user.verifyVehicle;

export const verifyVehicleStatusSelector: StateSelector<LoadStatus> = state =>
    verifyVehicleContainerSelector(state).status;

export const magicLinkBasicUserInfoContainerSelector: StateSelector<MagicLinkBasicUserInfoFetchContainer> = state =>
    state.user.magicLinkBasicUserInfo;

export const magicLinkBasicUserInfoSelector: StateSelector<LXS.BasicGuestDetails | undefined> = createSelector(
    magicLinkBasicUserInfoContainerSelector,
    getFetchContainerValue
);

export const magicLinkBasicUserInfoErrorSelector: StateSelector<Error | undefined> = createSelector(
    magicLinkBasicUserInfoContainerSelector,
    getFetchContainerError
);

export const authSectionSelector: StateSelector<AuthSection> = state => state?.user?.authSection;

const defaultCommunicationPreferences = {
    doNotContact: false,
    doNotCall: false,
    productInformation: false,
    exclusiveEvents: false,
};
export const communicationPreferencesSelector: StateSelector<LXS.GuestCommunicationPreferences> = state =>
    state.user.guestDetails?.communicationPreferences || defaultCommunicationPreferences;

export const preferredDealerSelector: StateSelector<string> = state => state.user.guestDetails?.preferredDealer || "";

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        [UserAction.GuestDetails]: (state, action: PayloadAction<LXS.GuestDetails>) => {
            sessionStorage.setItem(IS_DEMO_USER, Boolean(action.payload.isDemoUser) ? "true" : "false");
            state.guestDetails = action.payload;
        },
        [UserAction.GuestError]: (state, action: PayloadAction<Error>) => {
            state.guestError = action.payload;
        },
        [UserAction.VerifyVehicle]: (state, action: PayloadAction<VerifyVehicleFetchActionPayload>) => {
            state.verifyVehicle = fetchActionPayloadToContainer(action.payload);
        },
        [UserAction.FetchMagicLinkBasicUserInfo]: (
            state,
            action: PayloadAction<FetchMagicLinkBasicUserInfoFetchActionPayload>
        ) => {
            state.magicLinkBasicUserInfo = fetchActionPayloadToContainer(action.payload);
        },
        [UserAction.SetMagicLinkSalesforceParameters]: (
            state,
            action: PayloadAction<SetMagicLinkSalesforceParametersPayload>
        ) => {
            state.magicLinkSalesforceParameters = action.payload;
        },
        [UserAction.ResetMagicLinkDetails]: state => {
            state.magicLinkBasicUserInfo = initialFetchContainer;
            state.magicLinkSalesforceParameters = undefined;
        },
        [UserAction.SaveCommPref]: (state, action: PayloadAction<PartialCommPrefFetchActionPayload>) => {
            if (action.payload.action === FetchAction.Success && state.guestDetails?.communicationPreferences) {
                state.guestDetails.communicationPreferences = {
                    ...state.guestDetails.communicationPreferences,
                    ...action.payload.value,
                };
            }
        },
        [UserAction.SetAuthSection]: (state, action: PayloadAction<AuthSection>) => {
            state.authSection = action.payload;
        },
        [UserAction.SetEncoreTier]: (state, action: PayloadAction<string>) => {
            if (state.guestDetails) state.guestDetails.encoreTier = action.payload;
        },
        [UserAction.SetStripeCustomerDetails]: (state, action: PayloadAction<SetStripeCustomerDetailsPayload>) => {
            if (state.guestDetails) state.guestDetails.stripeCustomerId = action.payload.stripeCustomerId;
        },
        [UserAction.UpdateGuestDetails]: (state, action: PayloadAction<LXS.GuestDetails>) => {
            state.guestDetails = { ...state.guestDetails, ...action.payload };
        },
        [UserAction.SetDashboardBannerStates]: (state, action: PayloadAction<PartialDashboardBannerActionPayload>) => {
            state.dashboardBannerStates = { ...state.dashboardBannerStates, ...action.payload };
        },
        [UserAction.SetIsMembershipEnabled]: (state, action: PayloadAction<boolean>) => {
            state.isMembershipEnabled = action.payload;
        },
        [UserAction.ToggleDashboardBanner]: state => {
            state.dashboardBannerStates.showBanner = !state.dashboardBannerStates.showBanner;
        },
        [UserAction.ToggleExtraDashboardBanner]: state => {
            state.dashboardBannerStates.extraBannerContent.showExtraBanner =
                !state.dashboardBannerStates.extraBannerContent.showExtraBanner;
        },
        [RootLevelAction.Reset]: state => {
            state.authSection = AuthSection.Account;
        },
    },
});

export const {
    guestDetails,
    guestError,
    verifyVehicle,
    fetchMagicLinkBasicUserInfo,
    setMagicLinkSalesforceParameters,
    resetMagicLinkDetails,
    saveCommPref,
    setAuthSection,
    setStripeCustomerDetails,
    updateGuestDetails,
    setDashboardBannerStates,
    setEncoreTier,
    setIsMembershipEnabled,
    toggleDashboardBanner,
    toggleExtraDashboardBanner,
    reset,
} = userSlice.actions;

export const { reducer: userReducer } = userSlice;
