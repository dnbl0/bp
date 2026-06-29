import "./PageContent.scss";

import * as React from "react";

import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("page-content");

const PageContent: React.FC<React.PropsWithChildren> = ({ children }) => <div className={bem()}>{children}</div>;

export default PageContent;
