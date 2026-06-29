import "./OwnershipLinkInternalWithArrow.scss";

import * as React from "react";

import OwnershipLinkInternal, { OwnershipLinkInternalProps } from "../OwnershipLinkInternal/OwnershipLinkInternal";

import { NavLink } from "react-router-dom";
import { SVGChevronRight } from "lexus-style-guide/Components/SVGIcons/icons/static/SVGChevronRight";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { lxColor } from "lexus-style-guide/colors/variables";

interface OwnershipLinkInternalWithArrowProps extends OwnershipLinkInternalProps {
    circleArrow?: boolean;
}

const bem = createBemFn("ownership-link-internal-with-arrow");

const OwnershipLinkInternalWithArrow: React.FC<React.PropsWithChildren<OwnershipLinkInternalWithArrowProps>> = ({
    circleArrow = false,
    href,
    onClick,
    className,
    style,
    ...rest
}) => {
    const iconSize = 24;

    const getClassName = (isActive = false) =>
        classnames(className, bem(), { [bem(undefined, "circle-arrow")]: circleArrow }, isActive ? "active" : "");

    const props = {
        className: getClassName(),
        onClick,
        style,
    };
    const children = (
        <>
            <OwnershipLinkInternal {...rest} />
            <SVGChevronRight
                width={iconSize}
                height={iconSize}
                className={bem("arrow")}
                color={lxColor("smoke", "dark")}
            />
        </>
    );

    return href === undefined ? (
        <div {...props}>{children}</div>
    ) : (
        <NavLink {...props} to={href} className={({ isActive }) => getClassName(isActive)}>
            {children}
        </NavLink>
    );
};

export default OwnershipLinkInternalWithArrow;
