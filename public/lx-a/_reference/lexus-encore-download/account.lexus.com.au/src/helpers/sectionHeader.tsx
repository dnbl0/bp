import * as React from "react";
import SectionHeader, { SectionHeaderContextProps } from "Components/SectionHeader/SectionHeader";
import AccountSettingsSubPageSectionHeaderTitle from "Pages/AccountSettings/AccountSettingsSubPageSectionHeader/AccountSettingsSubPageSectionHeader";
import { Argument } from "classnames";
import { PageType } from "Types/general";
import SectionHeaderTitle from "Components/SectionHeader/SectionHeaderTitle/SectionHeaderTitle";
import { BreakpointContext } from "../context/BreakpointContext";

type CreateSectionHeaderOptions = {
    title: string | React.ReactElement;
    subtitle?: string;
    className?: Argument;
    hideTitleSenkei?: boolean;
    centered?: boolean;
} & SectionHeaderContextProps;

export const createSectionHeader: (options: CreateSectionHeaderOptions) => React.FC =
    ({ title, subtitle, className, hideTitleSenkei = false, centered, ...sectionHeaderContextProps }) =>
    () =>
        (
            <SectionHeader
                className={className}
                Title={() => (
                    <SectionHeaderTitle
                        isReactElement={typeof title !== "string"}
                        subtitle={subtitle}
                        hideSenkei={hideTitleSenkei}
                        centered={centered}
                    >
                        {title}
                    </SectionHeaderTitle>
                )}
                {...sectionHeaderContextProps}
            />
        );

export const createAccountSettingsSubPageSectionHeader: (title: string, backRoute?: string) => React.FC =
    (title, backRoute) => () => {
        const isMobile = React.useContext(BreakpointContext);
        const pageType = isMobile ? PageType.Sub : PageType.Main;
        const sectionHeaderContextProps: SectionHeaderContextProps = {
            pageType: pageType,
            backRoute: backRoute || false,
        };

        return (
            <SectionHeader
                {...sectionHeaderContextProps}
                Title={() => <AccountSettingsSubPageSectionHeaderTitle title={title} />}
            />
        );
    };
