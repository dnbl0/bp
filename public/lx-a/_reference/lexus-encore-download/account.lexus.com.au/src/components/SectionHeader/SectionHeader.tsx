import "./SectionHeader.scss";

import * as React from "react";

import classnames, { Argument } from "classnames";

import { BreakpointContext } from "Context/BreakpointContext";
import OuterGrid from "../OuterGrid/OuterGrid";
import { PageType } from "Types/general";
import SectionHeaderBackIcon from "./SectionHeaderBackIcon/SectionHeaderBackIcon";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("section-header");

type SectionHeaderProps = {
    Title: React.ComponentType;
    hideOnMobile?: boolean;
    className?: Argument;
    Extra?: React.ComponentType;
} & SectionHeaderContextProps;

export type SectionHeaderContextProps =
    | {
          pageType: PageType.Main;
          backRoute?: never;
          backRouteOverride?: never;
      }
    | {
          pageType: PageType.Main | PageType.Sub;
          backRoute?: string | false;
          backRouteOverride?: never;
      }
    | {
          pageType: PageType.Sub | PageType.Flow;
          // sometimes we don't want to have a backRoute,
          // but having to explicitly pass false prevents it from being accidentally forgotten
          backRoute: string | false;
          backRouteOverride?: () => void;
      };

interface SectionHeaderContextInterface {
    pageType: PageType;
    backRoute: string | false;
    backRouteOverride?: () => void;
}

export const SectionHeaderContext = React.createContext<SectionHeaderContextInterface>({
    pageType: PageType.Main,
    backRoute: false,
    backRouteOverride: () => {
        return null;
    },
});

const SectionHeader: React.FC<SectionHeaderProps> = ({
    className,
    Title,
    Extra,
    hideOnMobile,
    pageType,
    backRoute,
    backRouteOverride,
}) => {
    const isMobile = React.useContext(BreakpointContext);

    return (
        <OuterGrid
            className={classnames(
                bem(),
                className,
                { [bem(undefined, "hide-on-mobile")]: hideOnMobile },
                bem(undefined, pageType),
                { [bem(undefined, "no-back")]: backRoute === false }
            )}
        >
            <SectionHeaderContext.Provider value={{ pageType, backRoute: backRoute || false, backRouteOverride }}>
                <div className={bem("content")}>
                    {pageType === PageType.Sub && isMobile && backRoute !== false && (
                        <SectionHeaderBackIcon
                            className={bem("mobile-sub-back-icon")}
                            backRouteOverride={backRouteOverride}
                        />
                    )}
                    <div className={bem("title-area")}>
                        <Title />
                    </div>
                    {Extra && (
                        <div className={bem("extra-area")}>
                            <Extra />
                        </div>
                    )}
                </div>
            </SectionHeaderContext.Provider>
        </OuterGrid>
    );
};

export default SectionHeader;
