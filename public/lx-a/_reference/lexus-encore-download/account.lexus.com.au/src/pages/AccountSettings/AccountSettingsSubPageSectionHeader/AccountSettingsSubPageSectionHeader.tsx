import * as React from "react";
/*eslint-disable max-len*/
import SectionHeaderTitle from "../../../components/SectionHeader/SectionHeaderTitle/SectionHeaderTitle";
import { BreakpointContext } from "../../../context/BreakpointContext";
/*eslint-enable max-len*/

interface AccountSettingsTitleProps {
    title: string;
}

const AccountSettingsSubPageSectionHeaderTitle: React.FC<AccountSettingsTitleProps> = ({ title }) => {
    const isMobile = React.useContext(BreakpointContext);
    return <SectionHeaderTitle hideSenkei={true}>{isMobile ? title : "Account Settings"}</SectionHeaderTitle>;
};

export default AccountSettingsSubPageSectionHeaderTitle;
