import { SitecoreContext } from "@sitecore-jss/sitecore-jss-react";
import Layout from "Components/Layout/Layout";
import MobileAddPaymentCardIFrame from "Components/MobileAddPaymentCardIFrame";
import PopTart from "Components/PopTart/PopTart";
import LexusComponentFactory from "Components/sitecore/LexusComponentFactory/LexusComponentFactory";
import Spinner from "Components/Spinner/Spinner";
import {
    defaultLoggedInRoute,
    isIFrameRequest,
    RouteSection,
    routeString,
    toastPath,
    toastUrlFromPath,
} from "Helpers/routes";
import { useSettingsPromise } from "Hooks/usePromiseState";
import Account from "Pages/Account/Account";
import { allAccountRoutes } from "Pages/Account/accountScreens";
import { SignOut } from "Pages/SignOut/SignOut";
import * as React from "react";
import { Suspense } from "react";
import Media from "react-media";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { breakpointNumeric } from "../../constants";
import { BreakpointContext } from "../../context/BreakpointContext";
import MaintenanceErrorToast from "../../toast/MaintenanceErrorToast/MaintenanceErrorToast";
import ErrorGuard from "../ErrorGuard/ErrorGuard";
import PageRoutes from "../PageRoutes/PageRoutes";
import ToastRoutes from "../ToastRoutes/ToastRoutes";
import { AuthSection, authSectionSelector } from "ReduxSlices/user";
import { useSelector } from "react-redux";
import AuthenticationGuard from "src/route/AuthenticationGuard/AuthenticationGuard";
import { PwaLoader } from "Components/PwaLoader/PwaLoader";

const WelcomeScreen = React.lazy(() =>
    import("../../pages/WelcomeScreen/WelcomeScreen.js").then(module => ({
        default: module.WelcomeScreen,
    }))
);

const RootRoutes: React.FC = () => {
    const navigate = useNavigate();
    const hasOutage = useSettingsPromise(
        settings => settings.general.webHasOutage && !!settings.general.webOutageMessage
    );
    const authSection = useSelector(authSectionSelector);
    const disableLoggedInRedirect = isIFrameRequest(location.search);

    const renderRoutes = () => {
        switch (authSection) {
            case AuthSection.SalesforceError:
                return (
                    <>
                        <Route
                            path={toastPath(RouteSection.GuestRegistrationError, RouteSection.TrailingWildcard)}
                            element={<ToastRoutes />}
                        />
                        <Route
                            path={routeString(RouteSection.TrailingWildcard)}
                            element={
                                <Navigate
                                    to={toastUrlFromPath(RouteSection.GuestRegistrationError, location.pathname)}
                                />
                            }
                        />
                    </>
                );
            case AuthSection.BFFError:
                return (
                    <>
                        <Route
                            path={toastPath(RouteSection.Notify, RouteSection.TrailingWildcard)}
                            element={<ToastRoutes />}
                        />
                        <Route
                            path={toastPath(RouteSection.Error, RouteSection.TrailingWildcard)}
                            element={<ToastRoutes />}
                        />
                        <Route
                            path={routeString(RouteSection.TrailingWildcard)}
                            element={<Navigate to={toastUrlFromPath(RouteSection.Error, location.pathname)} />}
                        />
                    </>
                );
            case AuthSection.Error:
                return (
                    <>
                        <Route
                            path={toastPath(RouteSection.NonRecoverableError, RouteSection.TrailingWildcard)}
                            element={<ToastRoutes />}
                        />
                        <Route
                            path={routeString(RouteSection.TrailingWildcard)}
                            element={
                                <Navigate to={toastUrlFromPath(RouteSection.NonRecoverableError, location.pathname)} />
                            }
                        />
                    </>
                );
            case AuthSection.App:
                return (
                    <>
                        {allAccountRoutes.map(route => (
                            <Route
                                key={route}
                                path={route}
                                element={disableLoggedInRedirect ? null : <Navigate to={defaultLoggedInRoute} />}
                            />
                        ))}
                        <Route
                            path={toastPath(RouteSection.Notify, RouteSection.TrailingWildcard)}
                            element={<ToastRoutes />}
                        />
                    </>
                );
            case AuthSection.Account:
            default:
                return (
                    <>
                        {allAccountRoutes.map(route => (
                            <Route
                                key={route}
                                path={`${route}/${RouteSection.TrailingWildcard}`}
                                element={<Account navigate={navigate} />}
                            />
                        ))}
                        <Route
                            path={routeString(RouteSection.Welcome)}
                            element={
                                <Suspense fallback={<PwaLoader />}>
                                    <WelcomeScreen />
                                </Suspense>
                            }
                        />
                        <Route
                            path={routeString(RouteSection.TrailingWildcard)}
                            element={<Navigate to={RouteSection.SignIn} />}
                        />
                    </>
                );
        }
    };

    return (
        <SitecoreContext componentFactory={LexusComponentFactory as any}>
            <PopTart />
            <Suspense fallback={<Spinner />}>
                <Routes>
                    {hasOutage && (
                        <>
                            <Route
                                path={routeString(RouteSection.MaintenanceError)}
                                element={
                                    <>
                                        <Layout />
                                        <MaintenanceErrorToast />
                                    </>
                                }
                            />
                            <Route
                                path={routeString(RouteSection.TrailingWildcard)}
                                element={<Navigate to={routeString(RouteSection.MaintenanceError)} />}
                            />
                        </>
                    )}
                    <Route
                        path={routeString(RouteSection.MobileAddPaymentCardIFrame, RouteSection.TokenParamOptional)}
                        element={<MobileAddPaymentCardIFrame />}
                    />
                    <Route
                        path={routeString(RouteSection.ChangePassword)}
                        element={
                            <Navigate
                                to={routeString(
                                    RouteSection.AccountSettings,
                                    RouteSection.AccountDetails,
                                    RouteSection.ChangePassword
                                )}
                            />
                        }
                    />
                    <Route path={routeString(RouteSection.SignOut)} element={<SignOut />} />
                    <Route
                        path={routeString(RouteSection.TrailingWildcard)}
                        element={
                            <AuthenticationGuard>
                                <Routes>
                                    <Route
                                        path={routeString(RouteSection.TrailingWildcard)}
                                        element={
                                            <ErrorGuard>
                                                <Media query={{ maxWidth: breakpointNumeric - 1 }}>
                                                    {isMobile => (
                                                        <BreakpointContext.Provider value={isMobile}>
                                                            <PageRoutes />
                                                        </BreakpointContext.Provider>
                                                    )}
                                                </Media>
                                            </ErrorGuard>
                                        }
                                    />
                                </Routes>
                            </AuthenticationGuard>
                        }
                    />
                    {renderRoutes()}
                </Routes>
            </Suspense>
        </SitecoreContext>
    );
};

export default RootRoutes;
