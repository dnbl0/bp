import "./FieldSuccessTick.scss";

import * as React from "react";

import { ClassNameProp } from "../../types/general";
import { SVGCheckMark } from "lexus-style-guide/Components/SVGIcons/icons/static/SVGCheckMark";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { lxColor } from "lexus-style-guide/colors/variables";

const bem = createBemFn("field-success-tick");

const FieldSuccessTick: React.FC<ClassNameProp> = ({ className }) => (
    <div className={classnames(bem(), className)}>
        <SVGCheckMark color={lxColor("white")} width={12} height={12} />
    </div>
);

export default FieldSuccessTick;
