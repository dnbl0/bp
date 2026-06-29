import { RouteSection, routeString } from "Helpers/routes";

export interface AccountScreen {
    route: string;
    pageTitle: string;
}

export interface AccountScreensProps {
    SignInEmail: AccountScreen;
    RegisterEmail: AccountScreen;
    ForgotPassword: AccountScreen;
    ChangePassword: AccountScreen;
    [key: string]: AccountScreen;
}

export const AccountScreens: AccountScreensProps = {
    SignInEmail: {
        route: routeString(RouteSection.SignIn),
        pageTitle: "Lexus - Sign In",
    },
    RegisterEmail: {
        route: routeString(RouteSection.Register),
        pageTitle: "Lexus - Register",
    },
    ForgotPassword: {
        route: routeString(RouteSection.ForgotPassword),
        pageTitle: "Lexus - Forgot Password",
    },
    ChangePassword: {
        route: routeString(RouteSection.ChangePassword),
        pageTitle: "Lexus - Change Password",
    },
};

export const allAccountScreens: AccountScreen[] = Object.keys(AccountScreens)
    .map((k: string) => AccountScreens[k])
    .sort((a: AccountScreen, b: AccountScreen) => b.route.length - a.route.length);

export const defaultScreen = AccountScreens.SignInEmail;
export const allAccountRoutes = allAccountScreens.map((screen: AccountScreen) => screen.route);
export const defaultLoggedOutRoute = defaultScreen.route;

export const getAccountScreen = (route: string, defaultRes?: AccountScreen): AccountScreen | undefined =>
    allAccountScreens.filter((screen: AccountScreen) => screen.route === route)[0] ?? defaultRes;

export const getAccountPageTitle = (route: string): string | undefined => getAccountScreen(route)?.pageTitle;
