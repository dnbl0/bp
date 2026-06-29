import React, { Suspense, useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { RouteSection } from "Helpers/routes";
import Spinner from "Components/Spinner/Spinner";
import { routeString } from "Helpers/routes";
import { getLatestVerifiedVehicle, hasNoVehicles, isUnverified } from "Helpers/vehicle";
import { encoreTierSelector, setDashboardBannerStates, setIsMembershipEnabled } from "ReduxSlices/user";
import { useThunkDispatch } from "Hooks/thunk";
import { useSettingsPromise } from "Hooks/usePromiseState";
import { BreakpointContext } from "Context/BreakpointContext";
import PlatinumBenefitsExpiring from "Pages/PlatinumBenefitsExpiring/PlatinumBenefitsExpiring";
import { mapEncorePackageToBannerContent } from "Pages/Dashboard/DashboardBanner/utils";
import { useSelector } from "react-redux";
import { UserEncoreStatus, UserEncoreTiers } from "Helpers/users";
import { IS_SHOWN_BANNER, IS_SHOWN_EXTRA_BANNER } from "../../constants";
import { vehiclesContainerSelector, vehiclesFetchStatusSelector } from "ReduxSlices/vehicle";
import { LoadStatus } from "Types/loadStatus";
import { getAccountInfoThunk } from "ReduxSlices/onDemand/onDemandThunks";
import { fetchValetProviderBalanceThunk } from "ReduxSlices/valet";
import { Vehicle as VehicleType } from "Types/index";

const Encore = React.lazy(() => import("../../pages/Encore/Encore.js").then(module => ({ default: module.Encore })));
const Vehicle = React.lazy(() =>
    import("../../pages/Vehicle/Vehicle.js").then(module => ({ default: module.Vehicle }))
);
const AccountSettings = React.lazy(() =>
    import("../../pages/AccountSettings/AccountSettings.js").then(module => ({ default: module.AccountSettingsRoute }))
);
const SignOut = React.lazy(() =>
    import("../../pages/SignOut/SignOut.js").then(module => ({ default: module.SignOut }))
);
const DashboardRoute = React.lazy(() =>
    import("../../pages/Dashboard/Dashboard.js").then(module => ({ default: module.DashboardRoute }))
);
const LinkExpiredErrorPage = React.lazy(() =>
    import("../../pages/LinkExpiredErrorPage/LinkExpiredErrorPage.js").then(module => ({
        default: module.LinkExpiredErrorPage,
    }))
);

const PageRoutes = (): JSX.Element => {
    const vehicleStatus = useSelector(vehiclesFetchStatusSelector);
    let vehicles: VehicleType[] = [];
    const vehicleStates = useSelector(vehiclesContainerSelector);
    if (vehicleStates.status === LoadStatus.Success) {
        vehicles = vehicleStates.value;
    }
    const isVehicleUnverified = isUnverified(vehicles);
    const isNoVehicle = hasNoVehicles(vehicles);
    const isMobile = useContext(BreakpointContext);
    const encoreTier = useSelector(encoreTierSelector) as UserEncoreTiers;
    const dispatch = useThunkDispatch();
    const isMembershipEnabled = !!useSettingsPromise(settings => settings.general.isMembershipEnabled);
    const isShownBanner = sessionStorage.getItem(IS_SHOWN_BANNER);
    const isShownExtraBanner = sessionStorage.getItem(IS_SHOWN_EXTRA_BANNER);
    const { bannerState, extraBannerState } =
        mapEncorePackageToBannerContent(encoreTier, getLatestVerifiedVehicle(vehicles), vehicleStatus) || {};

    useEffect(() => {
        dispatch(setIsMembershipEnabled(isMembershipEnabled));
    }, [dispatch, isMembershipEnabled]);

    // onDemand is only for available Platinum and Elevate accounts with active subscriptions.
    const isOnDemandAvailable =
        isMembershipEnabled &&
        bannerState?.status !== UserEncoreStatus.EXPIRED &&
        bannerState?.status !== UserEncoreStatus.NONE &&
        (encoreTier === UserEncoreTiers.PLATINUM || encoreTier === UserEncoreTiers.ELEVATE);

    React.useEffect(() => {
        if (vehicleStatus !== LoadStatus.Success) return;
        // As this hook uses sessionStorage to save data, we wait until the vehicle data is loaded.

        if (bannerState) {
            isShownBanner === null && sessionStorage.setItem(IS_SHOWN_BANNER, JSON.stringify(bannerState.showBanner));
            dispatch(
                setDashboardBannerStates({
                    membershipStatus: bannerState.status,
                    expiryDate: bannerState.packageExpiryDate,
                    paymentLink: bannerState.packagePurchasePaylink,
                    ctaDisabled: bannerState.disableCta,
                    hideCta: bannerState.hideCta,
                    showBanner: isShownBanner !== null ? JSON.parse(isShownBanner) : bannerState.showBanner,
                })
            );
        }

        if (extraBannerState) {
            const bannerStatus = bannerState ? bannerState.status : "";
            const isBannerShowing = bannerState ? bannerState.showBanner : false;
            const showingMainBanner = isShownBanner !== null ? JSON.parse(isShownBanner) : isBannerShowing;
            const isMainBannerSame: boolean = bannerStatus === extraBannerState.status && showingMainBanner;
            isShownExtraBanner === null &&
                sessionStorage.setItem(IS_SHOWN_EXTRA_BANNER, JSON.stringify(!isMainBannerSame));
            dispatch(
                setDashboardBannerStates({
                    extraBannerContent: {
                        showExtraBanner:
                            isShownExtraBanner !== null && !isMainBannerSame
                                ? JSON.parse(isShownExtraBanner)
                                : !isMainBannerSame,
                        membershipStatus: extraBannerState.status,
                    },
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleStatus, bannerState, extraBannerState, isShownBanner, isShownExtraBanner]);

    React.useEffect(() => {
        if (isOnDemandAvailable) {
            dispatch(getAccountInfoThunk);
            dispatch(fetchValetProviderBalanceThunk);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnDemandAvailable]);

    return (
        <>
            {!isMobile && <PlatinumBenefitsExpiring />}
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route
                        path={routeString(RouteSection.Dashboard, RouteSection.TrailingWildcard)}
                        element={<DashboardRoute />}
                    />
                    <Route
                        path={routeString(RouteSection.PlatinumBenefitsExpiring)}
                        element={<PlatinumBenefitsExpiring />}
                    />
                    <Route
                        path={routeString(RouteSection.Encore, RouteSection.TrailingWildcard)}
                        element={
                            bannerState?.status === UserEncoreStatus.EXPIRED || isVehicleUnverified || isNoVehicle ? (
                                <Navigate to={routeString(RouteSection.Dashboard)} />
                            ) : (
                                <Encore />
                            )
                        }
                    />
                    <Route
                        path={routeString(RouteSection.Vehicle, RouteSection.TrailingWildcard)}
                        element={
                            isVehicleUnverified ? <Navigate to={routeString(RouteSection.Dashboard)} /> : <Vehicle />
                        }
                    />
                    <Route
                        path={routeString(RouteSection.AccountSettings, RouteSection.TrailingWildcard)}
                        element={<AccountSettings />}
                    />
                    <Route path={routeString(RouteSection.SignOut)} element={<SignOut />} />
                    <Route path={routeString(RouteSection.LinkExpiredError)} element={<LinkExpiredErrorPage />} />
                    <Route
                        path={routeString(RouteSection.TrailingWildcard)}
                        element={<Navigate to={routeString(RouteSection.Dashboard)} />}
                    />
                </Routes>
            </Suspense>
        </>
    );
};
export default PageRoutes;
