import "./App.scss";

import * as React from "react";
import { useScrollToTop } from "Hooks/helpers";
import {
    AuthSection,
    attemptAutoLoginThunk,
    encoreTierSelector,
    logoutThunk,
    guestDetailsSelector,
    salesforceAccountIdSelector,
    setAuthSection,
} from "ReduxSlices/user";
import { useEffect, useMemo } from "react";
import { RouteSection, isNativeAppRequest, isIFrameRequest } from "Helpers/routes";
import {
    getPrimaryNavigationDataThunk,
    isIFrame as isIFrameAction,
    isNativeApp,
    loadFontsThunk,
} from "ReduxSlices/general";

import { IENotSupported } from "Pages/IENotSupported/IENotSupported";
import Routes from "../route/Routes/Routes";
import TagManager from "react-gtm-module";
import { ToastContext } from "lexus-style-guide/Components/Toast/Toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "Hooks/thunk";
import { darkTheme, GlobalStylesScope, LinkContextProvider } from "@tmca/lexus-kit/css-in-js";
import { useDeepLinking } from "Hooks/deepLinking";
import { pushToGTMUserTierAndAccountId } from "Helpers/gtm";
import { fetchVehiclesThunk } from "ReduxSlices/vehicle";
import { isDemoUser } from "Helpers/demoUser";

const tagManagerArgs = {
    gtmId: "GTM-532XZXM",
};

TagManager.initialize(tagManagerArgs);

const SpaLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, href, ...props }) => {
    return !href ? null : (
        <Link {...props} to={href}>
            {children}
        </Link>
    );
};

const App: React.FC = () => {
    const dispatch = useThunkDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    useScrollToTop();
    useDeepLinking();
    const isIE = typeof window !== "undefined" && !!window.MSInputMethodContext && !!document.documentMode;
    const isIFrame = isIFrameRequest(location.search);
    const userTier = useSelector(encoreTierSelector);
    const accountId = useSelector(salesforceAccountIdSelector);
    const hasGuestDetails = !!useSelector(guestDetailsSelector);

    useEffect(() => {
        const unloadCallback = () => {
            const destinationURL =
                document?.activeElement instanceof HTMLAnchorElement ? document.activeElement.href : undefined;
            const currentDomain = window.location.hostname;
            const isDemo = isDemoUser();
            if (isDemo && destinationURL && currentDomain && !destinationURL.includes(currentDomain)) {
                dispatch(logoutThunk);
            }
        };
        window && window.addEventListener("beforeunload", unloadCallback);
        return () => {
            window.removeEventListener("beforeunload", unloadCallback);
        };
    }, [dispatch]);

    useEffect(() => {
        if (!location.pathname.includes(RouteSection.SignOut)) {
            if (isNativeAppRequest(location.search)) {
                // Native app only uses `/signin` page and we need to show it
                dispatch(isNativeApp(true));
                dispatch(setAuthSection(AuthSection.Account));
            } else {
                if (isIFrame) {
                    dispatch(isIFrameAction(true));
                }

                dispatch(attemptAutoLoginThunk);
            }
        }
        dispatch(loadFontsThunk);
        if (!isIFrame) {
            dispatch(getPrimaryNavigationDataThunk);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (hasGuestDetails) {
            dispatch(fetchVehiclesThunk);
        }
    }, [dispatch, hasGuestDetails]);

    useEffect(() => {
        const pageName = location.pathname.replace(/^\//, "");

        const sfCustomEvent = new CustomEvent("encore-spa-change", { detail: { pageName } });
        window.document.dispatchEvent(sfCustomEvent);
    }, [location]);

    useEffect(() => {
        userTier && accountId && pushToGTMUserTierAndAccountId(userTier, accountId);
    }, [userTier, accountId]);

    useEffect(() => {
        // Check if the URL has a trailing slash and it's not the root URL
        if (location.pathname.endsWith("/") && location.pathname !== "/") {
            // Remove the trailing slash
            navigate(location.pathname.slice(0, -1) + location.search, { replace: true });
        }
    }, [location.pathname, location.search, navigate]);

    const toastContextValue = useMemo(() => {
        const root = document.querySelector("#root");
        if (root instanceof HTMLElement) {
            return { appElement: root };
        }
        return { appElement: undefined };
    }, []);

    return !isIE ? (
        <ToastContext.Provider value={toastContextValue}>
            <LinkContextProvider linkComponent={SpaLink}>
                <GlobalStylesScope themeDefinition={darkTheme}>
                    <Routes />
                </GlobalStylesScope>
            </LinkContextProvider>
        </ToastContext.Provider>
    ) : (
        <IENotSupported />
    );
};

export default App;
