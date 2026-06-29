import * as React from "react";

import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("error-card-fine-print");

const ErrorCardFinePrint: React.FC<React.PropsWithChildren> = ({ children }) => (
    <p className={classnames(bem(), "lx-tg-fine-print")}>{children}</p>
);

export default ErrorCardFinePrint;
