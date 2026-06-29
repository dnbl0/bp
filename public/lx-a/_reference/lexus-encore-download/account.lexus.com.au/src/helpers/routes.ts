import { Location } from "react-router-dom";
import { identity, takeWhile } from "lodash";
import { compose } from "redux";
import { getOauth2CallbackUrl } from "../apiHref";
import { FetchVehiclesPayload } from "ReduxSlices/vehicle";
import { UserEncoreStatus } from "./users";
import { VehicleStatus } from "Types/vehicle";

export enum RouteSection {
    LexusMainSite = "//www.lexus.com.au",
    TrailingWildcard = "*",
    SignIn = "signin",
    SignOut = "sign-out",
    Register = "register",
    TermsAndConditions = "terms-and-conditions",
    TermsOfUse = "terms-of-use",
    PrivacyPolicy = "privacy-policy",
    ForgotPassword = "forgot-password",
    Dashboard = "dashboard",
    Encore = "encore",
    Vehicle = "vehicle",
    Settings = "settings",
    GuestRegistrationError = "guest-registration-error",
    MagicLinkError = "magic-link-error",
    LinkExpiredError = "link-expired-error",
    Email = "email",
    Success = "success",
    Add = "add",
    Update = "update",
    Confirm = "confirm",
    Error = "error",
    FuelDiscount = "fuel-offer",
    Communications = "communications",
    PaymentMethods = "payment-methods",
    Valet = "valet",
    WheresMyVin = "where-is-my-vin",
    Redemptions = "redemptions",
    Locations = "locations",
    HowDoesItWork = "how-does-it-work",
    Providers = "providers",
    ChangePassword = "change-password",
    ProviderParameter = ":provider",
    LocationParameter = ":location",
    OnDemand = "on-demand",
    WhatsOnDemand = "whats-on-demand",
    Bookings = "bookings",
    BookingReferenceParameter = ":bookingReference",
    Cancel = "cancel",
    FAQ = "faq",
    FeesAndCharges = "fees-and-charges",
    Driver = "driver",
    Licence = "licence",
    TimeDate = "time-date",
    Vehicles = "vehicles",
    VehicleParameter = ":vehicle",
    Complete = "complete",
    Notify = "notify",
    OnDemandTsAndCs = "on-demand-terms-and-conditions",
    ValetRedemptionBalanceError = "valet-redemption-balance-error",
    OnDemandRedemptionBalanceError = "on-demand-redemption-balance-error",
    OnDemandError = "on-demand-error",
    OnDemandVehicleAlreadyBookedError = "on-demand-vehicle-already-booked-error",
    NonRecoverableError = "error",
    MaintenanceError = "maintenance",
    CancelBookingError = "cancel-booking-error",
    BookVehicleClearProgressError = "clear-progress-error",
    ToastParam = ":toastParam",
    SelectPayment = "select-payment",
    AddPaymentCard = "add-card",
    AddPaymentCardError = "add-card-error",
    VehicleUnavailable = "vehicle-unavailable",
    DiscardUpdateBooking = "discard-update-booking",
    MobileAddPaymentCardIFrame = "mobile-add-payment-card-iframe",
    FlightDetails = "flight-details",
    TokenParamOptional = ":token?",
    EncoreRewards = "encore-rewards",
    EncoreInterest = "encore-interest",
    PlatinumBenefitsExpiring = "platinum-benefits-expiring",
    // Owners Routes
    Owners = "owners",
    Benefits = "benefits",
    VehicleBenefits = "benefits/vehicle-benefits",
    HotelPartnerships = "benefits/hotel-partnerships",
    Jackalope = "#jackalope",
    Raes = "#raes",
    OneOnly = "#one-only",
    CappedPriceServicing = "#capped-price-servicing",
    ServiceLoanCar = "#service-loan-car",
    Drivecare = "#drivecare",
    // Contact
    Contact = "contact",
    Service = "service",
    FindADealer = "find-a-dealer",
    // Account Setting
    AccountSettings = "account-settings",
    AccountDetails = "account-details",
    AccountRequestDelete = "account-request-delete",
    EditDetails = "edit-details",
    // Online Service Booking
    OnlineServiceBooking = "online-service-booking",
    OnlineServiceBookingBack = "online-service-booking-back",
    SearchForADealer = "search-for-a-dealer",
    WhatsBookAService = "whats-book-a-service",
    //Charging Location Finder
    ChargingLocationFinder = "charging-location-finder",
    //PWA Opening Screen
    Welcome = "welcome",
    Movies = "movies",
    NoDemoBooking = "no-demo-booking",
    Wait = "wait",
}

export const baseRoutes = [
    RouteSection.SignIn,
    RouteSection.SignOut,
    RouteSection.Register,
    RouteSection.ForgotPassword,
    RouteSection.ChangePassword,
    RouteSection.Dashboard,
    RouteSection.Encore,
    RouteSection.Vehicle,
    RouteSection.PlatinumBenefitsExpiring,
    RouteSection.AccountSettings,
    RouteSection.Settings,
    RouteSection.GuestRegistrationError,
    RouteSection.LinkExpiredError,
];

export const valetTabs = {
    left: RouteSection.Redemptions,
    right: RouteSection.Locations,
};

export const routeString = (...route: RouteSection[]): string => `/${route.join("/")}`;

export const routeStringFromBase =
    (base: string): { (...sections: RouteSection[]): string } =>
    (...sections: RouteSection[]) =>
        routeString(...(base.split("/").filter(identity) as RouteSection[]), ...sections);

export const valetStateTab = (location: Location<{ tab?: string }>): RouteSection =>
    location.state && location.state.tab === valetTabs.right ? valetTabs.right : valetTabs.left;

type ValetModalRoute = {
    pathname: string;
    state: {
        tab: RouteSection;
    };
};

export const valetModalRoute = (location: Location<{ tab?: string }>, path: string): ValetModalRoute => ({
    pathname: path,
    state: { tab: valetStateTab(location) },
});

export const defaultLoggedInRoute = routeString(RouteSection.Dashboard);

// The first and last elements of the array can be empty strings if
// there is leading or trailing slashes in the url, remove the empty
// strings.
export const getParentRoute = (route: string): string => {
    const urlSegments = route.split("/").filter(elem => elem);
    urlSegments.pop();
    const nextUrl = routeString(...(urlSegments as RouteSection[]));
    return nextUrl;
};

const takeRouteSectionsUntilToast = (sections: RouteSection[]) =>
    takeWhile(sections, (str: string) => str !== RouteSection.Notify) as RouteSection[];

const getRouteSections = (path: string) => path.split("/").filter(identity) as RouteSection[];

const getRouteSectionsWithoutToast = compose(takeRouteSectionsUntilToast, getRouteSections);

export const closeToastUrl = (path: string): string => routeString(...getRouteSectionsWithoutToast(path));

export const toastPath = (toastName: RouteSection, ...baseArg: RouteSection[]): string => {
    const base = baseArg.length > 0 ? baseArg : [RouteSection.TrailingWildcard];
    return routeString(...base, RouteSection.Notify, toastName);
};

export const toastUrlFromPath = (toastName: RouteSection, path: string, toastParam?: string): string =>
    toastParam
        ? routeString(...getRouteSectionsWithoutToast(path), RouteSection.Notify, toastName, toastParam as RouteSection)
        : routeString(...getRouteSectionsWithoutToast(path), RouteSection.Notify, toastName);

export const toastUrl = (toastName: RouteSection, ...base: RouteSection[]): string =>
    routeString(...takeRouteSectionsUntilToast(base), RouteSection.Notify, toastName);

export const makeBookingRoute = routeString(RouteSection.Encore, RouteSection.OnDemand, RouteSection.Bookings);
export const makeFaqRoute = routeString(RouteSection.Encore, RouteSection.OnDemand, RouteSection.FAQ);
export const isNativeAppRequest = (search: string): boolean => new URLSearchParams(search).get("type") === "app";

export const isIFrameRequest = (search: string): boolean => new URLSearchParams(search).get("type") === "iframe";

export const redirectToApp = async (guest: LXS.Guest): Promise<void> => {
    const appCallbackUrl = await getOauth2CallbackUrl();
    if (typeof window !== "undefined") {
        window.location.href = `${appCallbackUrl}?id_token=${guest.idToken}&refresh_token=${guest.refreshToken}&scope=tmca&type=${guest.type}`;
    }
};

export const isDisabledRouteForErrorVehicle = (
    route: RouteSection | string,
    vehicles: FetchVehiclesPayload | undefined,
    isUnverifiedVehicle: boolean
) => {
    const vehicle = vehicles && vehicles[0];
    for (const r of [RouteSection.Encore, RouteSection.Vehicle]) {
        if (
            route.includes(r) &&
            ((vehicles && vehicles.length === 0) ||
                (vehicle?.encorePackages === null && vehicle?.caseNumber === null) ||
                isUnverifiedVehicle)
        ) {
            return true;
        }
    }
    return false;
};

export const isDisabledRouteForVehicleError = (
    route: RouteSection | string,
    vehicles: FetchVehiclesPayload | undefined
) => {
    if (!vehicles || vehicles.length === 0) {
        return false;
    }
    for (const r of [RouteSection.Encore, RouteSection.Vehicle]) {
        if (route.includes(r) && vehicles[0].status === VehicleStatus.Error) {
            return true;
        }
    }
    return false;
};

export const isDisabledRouteForExpiredMembership = (route: RouteSection | string, membershipStatus: UserEncoreStatus) =>
    route.includes(RouteSection.Encore) && membershipStatus === UserEncoreStatus.EXPIRED;

export const isDisabledRouteForDemoUser = (route: RouteSection | string, isDemo: boolean) =>
    isDemo && route.includes(routeString(RouteSection.Contact, RouteSection.Service));
