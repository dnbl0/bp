import * as React from "react";

import { PrimaryNav } from "lexus-style-guide";

interface Props {
    model?: LXS.PrimaryNavProps;
    rendering?: {
        model?: LXS.PrimaryNavProps;
    };
}

const getFixedModel = (props: Props) => {
    const model = props.model || (props.rendering && props.rendering.model);
    if (model === undefined) {
        return undefined;
    }

    const logo = model.logo ? { ...model.logo, url: "https://www.lexus.com.au/" } : undefined;
    return { ...model, logo };
};

const PrimaryNavInternal: React.FC<Props> = props => {
    const model = getFixedModel(props);

    return model ? <PrimaryNav {...model} /> : null;
};

export default PrimaryNavInternal;
