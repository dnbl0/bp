import * as React from "react";
import Toast from "Components/Toast/Toast";
import NonRecoverableErrorCard from "Components/errorCards/NonRecoverableErrorCard/NonRecoverableErrorCard";

const NonRecoverableErrorToast: React.FC = () => {
    return (
        <Toast>
            <NonRecoverableErrorCard />
        </Toast>
    );
};

export default NonRecoverableErrorToast;
