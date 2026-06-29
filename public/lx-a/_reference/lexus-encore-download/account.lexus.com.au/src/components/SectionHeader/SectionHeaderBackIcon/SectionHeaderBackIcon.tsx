import "./SectionHeaderBackIcon.scss";

import * as React from "react";

import { ClassNameProp } from "../../../types/general";
import { SVGChevronLeft } from "lexus-style-guide/Components/SVGIcons/icons/static/SVGChevronLeft";
import { SectionHeaderContext } from "../SectionHeader";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { BreakpointContext } from "Context/BreakpointContext";
import { useNavigate } from "react-router-dom";

const mobileIconSize = 24;
const desktopIconSize = 32;
const bem = createBemFn("section-header-back-icon");

type SectionHeaderBackIconProps = ClassNameProp & {
    backRouteOverride?: () => void;
};

const SectionHeaderBackIcon: React.FC<SectionHeaderBackIconProps> = ({ className }) => {
    const navigate = useNavigate();
    const { backRoute, backRouteOverride } = React.useContext(SectionHeaderContext);
    const isMobile = React.useContext(BreakpointContext);
    const iconSize = isMobile ? mobileIconSize : desktopIconSize;
    if (backRoute === false) {
        return null;
    }

    const handleOnClick = () => {
        typeof backRouteOverride === "function" ? backRouteOverride() : navigate(backRoute);
    };

    return (
        <SVGChevronLeft
            className={classnames(className, bem())}
            onClick={handleOnClick}
            width={iconSize}
            height={iconSize}
        />
    );
};

export default SectionHeaderBackIcon;
