import { RouteSection, baseRoutes } from "./helpers/routes";
import { VehicleStatus } from "./types/vehicle";

const routesForUserWithNoVerifiedVehicles = [
    "/",
    RouteSection.Dashboard,
    RouteSection.AccountSettings,
    RouteSection.SignIn,
    RouteSection.SignOut,
    RouteSection.Register,
    `${RouteSection.Vehicle}/:subroute`,
    RouteSection.LinkExpiredError,
];

// Key is an account status, value is an array of routes that the account is
// allowed to access.
export const routeAccess: Record<VehicleStatus, (string | RouteSection)[]> = {
    [VehicleStatus.Unverified]: routesForUserWithNoVerifiedVehicles,
    [VehicleStatus.Error]: routesForUserWithNoVerifiedVehicles,
    [VehicleStatus.Verified]: baseRoutes,
};
