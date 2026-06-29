import "./SectionHeaderTitle.scss";

import * as React from "react";

import classnames, { Argument } from "classnames";

import { BreakpointContext } from "Context/BreakpointContext";
import { PageType } from "Types/general";
import SectionHeaderBackIcon from "../SectionHeaderBackIcon/SectionHeaderBackIcon";
import { SectionHeaderContext } from "../SectionHeader";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("section-header-title");

interface SectionHeaderTitleProps {
    subtitle?: string;
    className?: Argument;
    hideSenkei?: boolean;
    isReactElement?: boolean;
    centered?: boolean;
}

const SectionHeaderTitle: React.FC<React.PropsWithChildren<SectionHeaderTitleProps>> = ({
    subtitle,
    children,
    className,
    hideSenkei = false,
    isReactElement,
    centered = false,
}) => {
    const isMobile = React.useContext(BreakpointContext);
    const { pageType, backRoute } = React.useContext(SectionHeaderContext);

    return (
        <>
            <div className={classnames(bem(), className, centered && "centered")}>
                {backRoute !== false && (pageType === PageType.Flow || (pageType === PageType.Sub && !isMobile)) && (
                    <SectionHeaderBackIcon className={bem("icon")} />
                )}
                {!isReactElement ? (
                    <h1
                        className={classnames(bem("text"), {
                            "senkei-line--desktop": pageType === PageType.Main && !hideSenkei,
                        })}
                    >
                        {children}
                    </h1>
                ) : (
                    <>{children}</>
                )}
            </div>
            {subtitle ? <h6 className={bem("subtitle")}>{subtitle}</h6> : null}
        </>
    );
};

export default SectionHeaderTitle;
