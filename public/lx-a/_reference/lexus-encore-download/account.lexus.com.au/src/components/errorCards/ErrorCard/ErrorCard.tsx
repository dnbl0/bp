import "./ErrorCard.scss";

import { ClassNameProp } from "../../../types/general";
import React from "react";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("error-card");
const defaultTitle = "something went wrong";

interface Props extends ClassNameProp {
    title?: string;
}

const ErrorCard: React.FC<React.PropsWithChildren<Props>> = ({ children, className, title = defaultTitle }) => {
    return (
        <div className={classnames(bem(), className)}>
            <h4 className={bem("title")}>{title}</h4>
            {children}
        </div>
    );
};

export default ErrorCard;
