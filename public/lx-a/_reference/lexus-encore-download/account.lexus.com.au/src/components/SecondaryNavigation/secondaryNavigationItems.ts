import { RouteSection } from "../../helpers/routes";
import { Vehicle, VehicleStatus } from "../../types/vehicle";
import { getLatestVerifiedVehicle } from "../../helpers/vehicle";
import { routeAccess } from "../../routeAccess";
import { intersection } from "lodash";

const allSecondaryNavigationPrimaryItems: RouteSection[] = [
    RouteSection.Encore,
    RouteSection.Vehicle,
    RouteSection.AccountSettings,
    RouteSection.Dashboard,
    RouteSection.PlatinumBenefitsExpiring,
];

export const getSecondaryNavigationPrimaryItems = (vehicles: Vehicle[] | undefined): string[] => {
    const latestVehicle = getLatestVerifiedVehicle(vehicles || []);
    const allowedRoutes = routeAccess[latestVehicle ? latestVehicle.status : VehicleStatus.Unverified];
    const intersectingRoutes = intersection(allowedRoutes, allSecondaryNavigationPrimaryItems);

    return [
        intersectingRoutes[0],
        ...[RouteSection.Encore, RouteSection.Vehicle],
        intersectingRoutes[intersectingRoutes.length - 1],
    ];
};

export const allSecondaryNavigationSecondaryItems: RouteSection[] = [];

export const featuredSecondaryNavigationItem = RouteSection.Dashboard;
