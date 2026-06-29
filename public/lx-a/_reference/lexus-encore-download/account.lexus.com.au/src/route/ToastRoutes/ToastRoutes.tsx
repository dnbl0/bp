import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import GuestRegistrationErrorToast from "../../toast/GuestRegistrationErrorToast/GuestRegistrationErrorToast";
import { RouteSection } from "../../helpers/routes";
import NonRecoverableErrorToast from "../../toast/NonRecoverableErrorToast/NonRecoverableErrorToast";
import MagicLinkErrorToast from "../../toast/MagicLinkErrorToast/MagicLinkErrorToast";

const ToastRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path={RouteSection.NonRecoverableError} element={<NonRecoverableErrorToast />} />
            <Route path={RouteSection.Error} element={<NonRecoverableErrorToast />} />
            <Route path={RouteSection.MagicLinkError} element={<MagicLinkErrorToast />} />
            <Route path={RouteSection.GuestRegistrationError} element={<GuestRegistrationErrorToast />} />
            <Route path={RouteSection.TrailingWildcard} element={<Navigate to={RouteSection.Error} />} />
        </Routes>
    );
};

export default ToastRoutes;
