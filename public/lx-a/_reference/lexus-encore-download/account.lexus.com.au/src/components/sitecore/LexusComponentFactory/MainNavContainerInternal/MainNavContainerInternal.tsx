import * as React from "react";
import { ComponentRendering, Placeholder } from "@sitecore-jss/sitecore-jss-react";

interface Props {
    rendering: ComponentRendering;
}

const MainNavContainerInternal: React.FC<Props> = ({ rendering }) => {
    return <Placeholder name="lexus-feature-sitenavigation-main" rendering={rendering} />;
};

export default MainNavContainerInternal;
