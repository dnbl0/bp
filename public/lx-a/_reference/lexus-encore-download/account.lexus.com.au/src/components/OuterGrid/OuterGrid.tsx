import "./OuterGrid.scss";

import * as React from "react";

import classnames, { Argument } from "classnames";

import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("outer-grid");

interface OuterGridProps {
    fullHeight?: boolean;
    withMargin?: boolean;
    className?: Argument;
    style?: React.CSSProperties;
}

const OuterGrid: React.FC<React.PropsWithChildren<OuterGridProps>> = ({
    fullHeight = false,
    withMargin = true,
    className,
    children,
    style,
}) => {
    return (
        <div
            className={classnames(bem(), { [bem(undefined, "full-height")]: fullHeight }, "lxs-grid-row", className)}
            style={style}
        >
            <div className={classnames(bem("grid"), "lxs-grid", { "lxs-grid--with-margin": withMargin })}>
                {children}
            </div>
        </div>
    );
};

export default OuterGrid;
