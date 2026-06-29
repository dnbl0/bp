import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RouteSection } from "../../helpers/routes";
import { routeString } from "../../helpers/routes";
import { isErrorCodeOfMagicLink } from "../../helpers/account";
import { isRegisterGuestErrorSelector, registerGuestErrorCodeSelector } from "ReduxSlices/user";

const ErrorGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
    const isRegisterGuestError = useSelector(isRegisterGuestErrorSelector);
    const errorCode = useSelector(registerGuestErrorCodeSelector);
    const isMagicLinkError = isErrorCodeOfMagicLink(errorCode);

    if (isRegisterGuestError) {
        const errorRoute = routeString(
            isMagicLinkError ? RouteSection.LinkExpiredError : RouteSection.TrailingWildcard,
            RouteSection.Notify
        );

        return (
            <Routes>
                <Route path={routeString(RouteSection.TrailingWildcard)} element={<Navigate to={errorRoute} />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path={routeString(RouteSection.TrailingWildcard)} element={children} />
                <Route
                    path={routeString(RouteSection.TrailingWildcard)}
                    element={<Navigate to={routeString(RouteSection.Dashboard)} />}
                />
            </Routes>
        );
    }
};

export default ErrorGuard;
