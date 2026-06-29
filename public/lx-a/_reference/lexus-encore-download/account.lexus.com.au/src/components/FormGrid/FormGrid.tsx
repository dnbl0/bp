import "./FormGrid.scss";

import * as React from "react";

import classnames, { Argument } from "classnames";

import OuterGrid from "../OuterGrid/OuterGrid";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("form-grid");

interface Props {
    form: React.ReactNode;
    className?: Argument;
}

const FormGrid: React.FC<React.PropsWithChildren<Props>> = ({ form, className, children }) => {
    return (
        <OuterGrid className={classnames(bem(), className)}>
            <div className={bem("form-container")}>
                <div className={classnames(bem("form"), "is-bg-type-dark")}>{form}</div>
            </div>
            {children}
        </OuterGrid>
    );
};

export default FormGrid;
