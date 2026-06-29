import * as React from "react";
import ErrorCardFinePrint from "../ErrorCard/ErrorCardFinePrint/ErrorCardFinePrint";
import ErrorCard from "../ErrorCard/ErrorCard";
import { useSettingsPromise } from "Hooks/usePromiseState";

const MaintenanceErrorCard: React.FC = () => {
    const generalSettings = useSettingsPromise(settings => settings.general);

    return (
        <ErrorCard title={generalSettings?.webOutageTitle}>
            <ErrorCardFinePrint>{generalSettings?.webOutageMessage}</ErrorCardFinePrint>
        </ErrorCard>
    );
};

export default MaintenanceErrorCard;
