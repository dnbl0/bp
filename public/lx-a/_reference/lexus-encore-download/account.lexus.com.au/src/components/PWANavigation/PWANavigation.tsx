import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import * as React from "react";
import { ClassNameProp } from "Types/general";
import "./PWANavigation.scss";
import { Box, Stack, SVGEncoreSmall, SVGGrille, SVGHome, SVGUser, Typography } from "@tmca/lexus-kit/css-in-js";
import OuterGrid from "Components/OuterGrid/OuterGrid";
import {
    isDisabledRouteForExpiredMembership,
    isDisabledRouteForErrorVehicle,
    RouteSection,
    routeString,
    isDisabledRouteForVehicleError,
} from "Helpers/routes";
import { NavLink } from "react-router-dom";
import { isStandAlone } from "Helpers/general";
import { useVehicles } from "Hooks/useVehicles";
import { isUnverified } from "Helpers/vehicle";
import { useSelector } from "react-redux";
import { dashboardBannerStatesSelector } from "ReduxSlices/user";

const bem = createBemFn("pwa-navigation");

type Props = ClassNameProp;

const PWANavigation: React.FC<React.PropsWithChildren<Props>> = ({ className }) => {
    const isPWA = isStandAlone();
    const pwaNavIconSize = 20;
    const vehicles = useVehicles(true);
    const isUnverifiedVehicle = !!isUnverified(vehicles);
    const { membershipStatus } = useSelector(dashboardBannerStatesSelector);
    const checkIsRouteDisabled = (route: RouteSection) =>
        isDisabledRouteForExpiredMembership(route, membershipStatus) ||
        isDisabledRouteForErrorVehicle(route, vehicles, isUnverifiedVehicle) ||
        isDisabledRouteForVehicleError(route, vehicles);

    return !isPWA ? null : (
        <div className={classnames(bem(), className)}>
            <OuterGrid withMargin>
                <Box
                    component={Stack}
                    px="none"
                    py="2xs"
                    spacing="2xs"
                    direction="row"
                    justifyContent="space-between"
                    className={bem("nav-grid")}
                >
                    <NavLink
                        to={routeString(RouteSection.Dashboard)}
                        className={classnames(bem("link"), ({ isActive }: { isActive: boolean }) =>
                            isActive ? "active" : ""
                        )}
                    >
                        <Stack component="span" direction="column" alignItems="center" spacing="3xs">
                            <SVGHome height={pwaNavIconSize} width={pwaNavIconSize} />
                            <Typography variant="l2">Dashboard</Typography>
                        </Stack>
                    </NavLink>
                    <NavLink
                        to={routeString(RouteSection.Vehicle)}
                        className={classnames(
                            bem("link"),
                            ({ isActive }: { isActive: boolean }) => (isActive ? "active" : ""),
                            { [`${bem("link")}--isDisabled`]: checkIsRouteDisabled(RouteSection.Vehicle) }
                        )}
                    >
                        <Stack component="span" direction="column" alignItems="center" spacing="3xs">
                            <SVGGrille height={pwaNavIconSize} width={pwaNavIconSize} />
                            <Typography variant="l2">Vehicle</Typography>
                        </Stack>
                    </NavLink>
                    <NavLink
                        to={routeString(RouteSection.Encore)}
                        className={classnames(
                            bem("link"),
                            ({ isActive }: { isActive: boolean }) => (isActive ? "active" : ""),
                            { [`${bem("link")}--isDisabled`]: checkIsRouteDisabled(RouteSection.Encore) }
                        )}
                    >
                        <Stack component="span" direction="column" alignItems="center" spacing="3xs">
                            <SVGEncoreSmall height={pwaNavIconSize} width={pwaNavIconSize} />
                            <Typography variant="l2">Encore</Typography>
                        </Stack>
                    </NavLink>
                    <NavLink
                        to={routeString(RouteSection.AccountSettings)}
                        className={classnames(bem("link"), ({ isActive }: { isActive: boolean }) =>
                            isActive ? "active" : ""
                        )}
                    >
                        <Stack component="span" direction="column" alignItems="center" spacing="3xs">
                            <SVGUser height={pwaNavIconSize} width={pwaNavIconSize} />
                            <Typography variant="l2">Account</Typography>
                        </Stack>
                    </NavLink>
                </Box>
            </OuterGrid>
        </div>
    );
};

export default PWANavigation;
