import * as React from "react";
import Toast from "Components/Toast/Toast";
import MaintenanceErrorCard from "Components/errorCards/MaintenanceErrorCard/MaintenanceErrorCard";

const MaintenanceErrorToast: React.FC = () => {
    return (
        <Toast>
            <MaintenanceErrorCard />
        </Toast>
    );
};

export default MaintenanceErrorToast;
