import "./SecondaryNavigationLink.scss";

import * as React from "react";

import { NavLink, NavLinkProps } from "react-router-dom";

import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("secondary-navigation-link");
interface SecondaryNavigationLinkProps extends NavLinkProps {
    disabled?: boolean;
}

const SecondaryNavigationLink: React.FC<SecondaryNavigationLinkProps> = ({ children, className, ...rest }) => (
    <NavLink
        className={({ isActive }) =>
            classnames(
                bem(),
                "link-uppercase",
                className,
                bem(undefined, rest.disabled ? "disabled" : isActive ? "active" : "")
            )
        }
        {...rest}
    >
        {children}
    </NavLink>
);
export default SecondaryNavigationLink;
