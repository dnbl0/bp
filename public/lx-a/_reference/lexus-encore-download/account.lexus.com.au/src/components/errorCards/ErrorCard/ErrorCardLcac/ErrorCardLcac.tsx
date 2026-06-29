import * as React from "react";

import { ButtonShade, ButtonStyle } from "lexus-style-guide/buttons/shared";

import { PhoneButton } from "../../../PhoneButton/PhoneButton";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { formatPhoneNumber } from "../../../../helpers/string";
import { useSettingsPromise } from "../../../../hooks/usePromiseState";

const bem = createBemFn("error-card-lcac");

const ErrorCardLcac: React.FC = () => {
    const lcacNumber = useSettingsPromise(settings => settings.general.lcacContactNumber);

    if (lcacNumber === undefined) {
        return null;
    }

    return (
        <>
            <p className={classnames(bem("description"), "lx-tg-fine-print")}>
                If this error continues please call the Lexus Customer Assistance Centre.
            </p>
            <PhoneButton
                className={bem("phone-button")}
                phoneNumber={formatPhoneNumber(lcacNumber) || undefined}
                buttonStyle={ButtonStyle.Secondary}
                shade={ButtonShade.Light}
            />
        </>
    );
};

export default ErrorCardLcac;
