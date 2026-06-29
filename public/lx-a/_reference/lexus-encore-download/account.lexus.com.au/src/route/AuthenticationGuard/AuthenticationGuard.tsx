import Spinner from "Components/Spinner/Spinner";
import { RouteSection, routeString, toastUrlFromPath } from "Helpers/routes";
import { defaultLoggedOutRoute } from "Pages/Account/accountScreens";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AuthSection, authSectionSelector, guestDetailsSelector } from "ReduxSlices/user";
import { vehiclesFetchStatusSelector } from "ReduxSlices/vehicle";
import { LoadStatus } from "Types/loadStatus";
import { isStandAlone } from "Helpers/general";
import { vehicleAssociationStatusSelector } from "ReduxSlices/addVehicleFlow";

const AuthenticationGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const authSection = useSelector(authSectionSelector);
    const guestDetails = useSelector(guestDetailsSelector);
    const vehicleStatus = useSelector(vehiclesFetchStatusSelector);
    const associationStatus = useSelector(vehicleAssociationStatusSelector);

    const [authVerified, setAuthVerified] = React.useState(false);

    const loggedOutRedirect = isStandAlone() ? routeString(RouteSection.Welcome) : defaultLoggedOutRoute;

    React.useEffect(() => {
        if (authSection === AuthSection.App) {
            setAuthVerified(true);
        }
        if (authSection === AuthSection.Account) {
            navigate(loggedOutRedirect);
        }
        if (authSection === AuthSection.BFFError) {
            navigate(toastUrlFromPath(RouteSection.Error, RouteSection.Notify));
        }
        if (authSection === AuthSection.SalesforceError) {
            navigate(toastUrlFromPath(RouteSection.GuestRegistrationError, RouteSection.Notify));
        }
        if (authSection === AuthSection.Error) {
            navigate(toastUrlFromPath(RouteSection.Error, RouteSection.Notify));
        }
    }, [authSection]);

    const guestStatus = !!guestDetails?.accountId;

    return !guestStatus ||
        !authVerified ||
        (vehicleStatus === LoadStatus.InProgress && associationStatus !== LoadStatus.Success) ? (
        <Spinner />
    ) : (
        <>{children}</>
    );
};
export default AuthenticationGuard;
