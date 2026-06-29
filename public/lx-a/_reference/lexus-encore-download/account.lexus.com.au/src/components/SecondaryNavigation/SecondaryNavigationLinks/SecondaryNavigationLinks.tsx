import "./SecondaryNavigationLinks.scss";

import * as React from "react";

import { featuredSecondaryNavigationItem, getSecondaryNavigationPrimaryItems } from "../secondaryNavigationItems";

import {
    isDisabledRouteForExpiredMembership,
    isDisabledRouteForErrorVehicle,
    RouteSection,
    isDisabledRouteForVehicleError,
} from "Helpers/routes";
import SecondaryNavigationLink from "../SecondaryNavigationLink/SecondaryNavigationLink";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { removeDash } from "Helpers/string";
import { routeString } from "Helpers/routes";
import { useVehicles } from "Hooks/useVehicles";
import { useSelector } from "react-redux";
import { dashboardBannerStatesSelector } from "ReduxSlices/user";
import { isUnverified } from "Helpers/vehicle";

const bem = createBemFn("secondary-navigation-links");

const SecondaryNavigationLinks: React.FC = () => {
    const vehicles = useVehicles(true);
    const allowedRoutes = getSecondaryNavigationPrimaryItems(vehicles) as RouteSection[];
    const { membershipStatus } = useSelector(dashboardBannerStatesSelector);
    const isVehicleUnverified = !!isUnverified(vehicles);

    return (
        <nav className={bem()}>
            {allowedRoutes
                .filter(route => route !== featuredSecondaryNavigationItem)
                .map(route => {
                    const isDisabled =
                        isDisabledRouteForErrorVehicle(route, vehicles, isVehicleUnverified) ||
                        isDisabledRouteForExpiredMembership(route, membershipStatus) ||
                        isDisabledRouteForVehicleError(route, vehicles);
                    return (
                        <SecondaryNavigationLink
                            to={routeString(route)}
                            className={classnames(bem("link"), { disabled: isDisabled })}
                            disabled={isDisabled}
                            key={route}
                        >
                            {removeDash(route)}
                        </SecondaryNavigationLink>
                    );
                })}
        </nav>
    );
};

export default SecondaryNavigationLinks;
