import * as React from "react";
import Toast from "../../components/Toast/Toast";
import { guestErrorSelector } from "ReduxSlices/user";
import NonRecoverableErrorCard from "../../components/errorCards/NonRecoverableErrorCard/NonRecoverableErrorCard";

const GuestRegistrationErrorToast: React.FC = () => {
    return (
        <Toast>
            <NonRecoverableErrorCard errorSelector={guestErrorSelector} />
        </Toast>
    );
};

export default GuestRegistrationErrorToast;
