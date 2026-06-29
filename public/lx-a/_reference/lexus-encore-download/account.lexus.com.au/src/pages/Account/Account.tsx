import "./Account.scss";
import * as React from "react";
import { MapDispatchToProps, MapStateToProps, connect, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteSection, redirectToApp, routeString } from "Helpers/routes";
import {
    attemptLoginThunk,
    encoreTierSelector,
    fetchMagicLinkBasicUserInfoThunk,
    guestDetailsSelector,
    magicLinkBasicUserInfoSelector,
    resetMagicLinkDetails,
    salesforceAccountIdSelector,
    setMagicLinkSalesforceParameters,
    verifyVehicleThunk,
} from "ReduxSlices/user";
import { defaultScreen, getAccountPageTitle } from "./accountScreens";

import { AccountManager } from "lexus-style-guide/Components/Account/Providers/AccountManager";
import { AppState } from "ReduxSlices/index";
import { Dispatch } from "Types/general";
import { Forgot } from "lexus-style-guide/Components/Account/ForgotPassword/Forgot";
import { IdentityProvider } from "lexus-style-guide/Components/Account/Providers/IdentityProvider";
import Layout from "Components/Layout/Layout";
import { Login } from "lexus-style-guide/Components/Account/Login/Login";
import { Registration } from "lexus-style-guide/Components/Account/Register/Registration";
import Spinner from "Components/Spinner/Spinner";
import { UserEncoreTiers } from "Helpers/users";
import { isIFrameSelector, isNativeAppSelector } from "ReduxSlices/general";
import { noop } from "lodash";
import { pushToGTMTermsAndConditionFormSubmitted } from "Helpers/gtm";
import { registerGuestUrl } from "../../apiHref";
import { useSettingsPromise } from "Hooks/usePromiseState";
import { useThunkDispatch } from "Hooks/thunk";
import { isStandAlone } from "Helpers/general";
import { guestServiceDemoUser } from "Helpers/demoUser";
import { postLoginMessage } from "Helpers/silentSignOnHelpers";

const salesforceTokenParamName = "token";

type OwnProps = {
    navigate: ReturnType<typeof useNavigate>;
};

interface StateProps {
    basicUserInfo?: LXS.BasicGuestDetails;
}

interface DispatchProps {
    fetchMagicLinkBasicUserInfo: (token: string) => void;
    attemptLogin: () => void;
    setMagicLinkSalesforceParameters: (token: string) => void;
    resetMagicLinkDetails: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const hasSalesforceToken = (search: string) => new URLSearchParams(search).has(salesforceTokenParamName);

enum ContainerType {
    APP,
    IFRAME,
    NONE,
}

// Initializing IdentityProvider. At this point we can't handle an exception as we have no interface rendered.
// In case of settingsPromise failure it will trigger a toast on global app level
registerGuestUrl()
    .then(async guestServiceUrl => {
        const demoUser = await guestServiceDemoUser();
        IdentityProvider.current.init({ guestServiceUrl, guestServiceDemoUrl: demoUser });
    })
    .catch(noop);

const useHandleLogin = (containerType: ContainerType, attemptLogin: () => void) =>
    React.useCallback(
        (guest: LXS.Guest) => {
            AccountManager.current.guest = guest;
            switch (containerType) {
                case ContainerType.APP:
                    redirectToApp(guest);
                    break;
                case ContainerType.IFRAME:
                    postLoginMessage(guest);
                    break;
                default:
                    attemptLogin();
            }
        },
        [attemptLogin, containerType]
    );

const useFlowSwitchers = () => {
    const navigate = useNavigate();

    const handleRegistrationRequired = React.useCallback(
        (e?: React.MouseEvent<HTMLAnchorElement>) => {
            e?.preventDefault();
            navigate(routeString(RouteSection.Register));
        },
        [navigate]
    );
    const handleSignInRequired = React.useCallback(
        (e?: React.MouseEvent<HTMLAnchorElement>) => {
            e?.preventDefault();
            navigate(routeString(RouteSection.SignIn));
        },
        [navigate]
    );
    const handleForgotRequired = React.useCallback(
        (e?: React.MouseEvent<HTMLAnchorElement>) => {
            e?.preventDefault();
            navigate(routeString(RouteSection.ForgotPassword));
        },
        [navigate]
    );
    return { handleRegistrationRequired, handleSignInRequired, handleForgotRequired };
};

const Account: React.FC<Props> = ({
    basicUserInfo,
    attemptLogin,
    fetchMagicLinkBasicUserInfo,
    setMagicLinkSalesforceParameters,
}) => {
    const location = useLocation();
    const generalSettings = useSettingsPromise(settings => settings.general);
    const dispatch = useThunkDispatch();
    const loading = (hasSalesforceToken(location.search) && !basicUserInfo) || !generalSettings;
    const isApp = useSelector(isNativeAppSelector);
    const isIFrame = useSelector(isIFrameSelector);
    const containerType = isApp ? ContainerType.APP : isIFrame ? ContainerType.IFRAME : ContainerType.NONE;
    const handleLogin = useHandleLogin(containerType, attemptLogin);
    const encoreTier = useSelector(encoreTierSelector);
    const accountId = useSelector(salesforceAccountIdSelector);
    const guestEmailRef = React.useRef<string>();
    const handleTnCs = React.useCallback(() => {
        pushToGTMTermsAndConditionFormSubmitted(encoreTier || UserEncoreTiers.NONE, accountId ?? "");
        dispatch(verifyVehicleThunk);
    }, [accountId, dispatch, encoreTier]);
    const { handleRegistrationRequired, handleSignInRequired, handleForgotRequired } = useFlowSwitchers();
    const loggingInApp = isStandAlone() && accountId !== undefined;

    React.useEffect(() => {
        const title = getAccountPageTitle(location.pathname) ?? defaultScreen.pageTitle;
        if (document.title !== title) {
            document.title = title;
        }
        const searchParams = new URLSearchParams(location.search);
        const salesforceToken = searchParams.get(salesforceTokenParamName);
        if (salesforceToken) {
            fetchMagicLinkBasicUserInfo(salesforceToken);
            setMagicLinkSalesforceParameters(salesforceToken);
        }
    }, [fetchMagicLinkBasicUserInfo, location, setMagicLinkSalesforceParameters]);

    const hasGuestDetails = !!useSelector(guestDetailsSelector);

    if (!generalSettings) return null;

    const renderRouteContent = () => {
        switch (location.pathname) {
            case routeString(RouteSection.Register):
            case routeString(RouteSection.Register, RouteSection.Email):
                return (
                    <Registration
                        key={basicUserInfo ? "1" : "0"}
                        termsAndPrivacyConfig={generalSettings}
                        onTermsAccepted={handleTnCs}
                        onLogin={handleLogin}
                        onSignInRequired={handleSignInRequired}
                        signInHref={routeString(RouteSection.SignIn)}
                        knownBasicDetails={basicUserInfo}
                        guestEmailRef={guestEmailRef}
                    />
                );

            case routeString(RouteSection.ForgotPassword):
                return (
                    <Forgot
                        onLogin={handleLogin}
                        onSignInRequired={handleSignInRequired}
                        signInHref={routeString(RouteSection.SignIn)}
                        termsAndPrivacyConfig={generalSettings}
                        onTermsAccepted={handleTnCs}
                        guestEmailRef={guestEmailRef}
                    />
                );
            case routeString(RouteSection.SignIn):
            default:
                return (
                    <Login
                        title="ENCORE LOG IN"
                        keepLoggedInText="Stay logged in?"
                        btnText="LOG IN"
                        onLogin={handleLogin}
                        onTermsAccepted={handleTnCs}
                        termsAndPrivacyConfig={generalSettings}
                        onRegistrationRequired={handleRegistrationRequired}
                        registrationHref={routeString(RouteSection.Register)}
                        enablePermanentSignIn={!isApp}
                        knownBasicDetails={basicUserInfo?.email ? { email: basicUserInfo.email } : undefined}
                        onForgotRequired={handleForgotRequired}
                        forgotHref={routeString(RouteSection.ForgotPassword)}
                        guestEmailRef={guestEmailRef}
                    />
                );
        }
    };

    return (
        <Layout playTransition={hasGuestDetails} appLoading={loggingInApp}>
            {loading ? (
                <div className="account__spinner-container">
                    <Spinner />
                </div>
            ) : (
                renderRouteContent()
            )}
        </Layout>
    );
};

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = state => ({
    basicUserInfo: magicLinkBasicUserInfoSelector(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch: Dispatch, { navigate }) => ({
    fetchMagicLinkBasicUserInfo: (token: string) =>
        dispatch(fetchMagicLinkBasicUserInfoThunk(token)).catch(() => {
            navigate(routeString(RouteSection.Notify, RouteSection.MagicLinkError));
        }),
    attemptLogin: () => dispatch(attemptLoginThunk),
    setMagicLinkSalesforceParameters: (token: string) => dispatch(setMagicLinkSalesforceParameters({ token })),
    resetMagicLinkDetails: () => dispatch(resetMagicLinkDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
