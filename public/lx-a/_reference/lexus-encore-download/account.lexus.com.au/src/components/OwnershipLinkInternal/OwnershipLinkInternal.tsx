import "./OwnershipLinkInternal.scss";

import * as React from "react";

import classnames, { Argument } from "classnames";

import { NavLink } from "react-router-dom";
import { createBemFn } from "lexus-style-guide/utilities/bem";

export enum OwnershipLinkInternalSize {
    Small = "small",
    Normal = "normal",
    Large = "large",
    ExtraLarge = "extra-large",
}

export interface OwnershipLinkInternalProps {
    href?: string;
    size?: OwnershipLinkInternalSize;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    className?: Argument;
    style?: React.CSSProperties;
}

const bem = createBemFn("ownership-link-internal");

const OwnershipLinkInternal: React.FC<React.PropsWithChildren<OwnershipLinkInternalProps>> = ({
    href,
    size = OwnershipLinkInternalSize.Normal,
    onClick,
    children,
    className,
    ...rest
}) => {
    const getClassName = (isActive = false) =>
        classnames(className, bem(undefined, isActive ? "active" : ""), "ownership-link", `ownership-link--${size}`);

    const props = {
        className: getClassName(),
        onClick,
    };

    return href === undefined ? (
        <span {...rest} {...props}>
            {children}
        </span>
    ) : (
        <NavLink {...rest} {...props} to={href} className={({ isActive }) => getClassName(isActive)}>
            {children}
        </NavLink>
    );
};

export default OwnershipLinkInternal;
