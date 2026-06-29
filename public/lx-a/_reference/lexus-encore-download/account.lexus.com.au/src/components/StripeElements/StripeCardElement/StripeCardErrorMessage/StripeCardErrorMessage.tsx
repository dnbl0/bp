import "./StripeCardErrorMessage.scss";

import * as React from "react";

import { CardElementValidationErrorCodes } from "../../../../types/payment";
import { ClassNameProp } from "../../../../types/general";
import { RawCvcLink } from "../StripeCardCVCLink/StripeCardCVCLink";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";

import Error = stripe.Error;

interface Props extends ClassNameProp {
    error?: Error | null;
}

const bem = createBemFn("stripe-card-error-message");

const ErrorCodeMap = new Map([
    [
        CardElementValidationErrorCodes.INVALID_NUMBER,
        "Card number is invalid. Please check the card details or use a different card.",
    ],
    [CardElementValidationErrorCodes.INVALID_EXPIRY_MONTH_PAST, "Expiration date is invalid, must be in the future."],
    [CardElementValidationErrorCodes.INVALID_EXPIRY_YEAR_PAST, "Expiration date is invalid, must be in the future."],
    [
        CardElementValidationErrorCodes.INCOMPLETE_CVC,
        "Card's security code is invalid. Please check the card's security code. ",
    ],
]);

const StripeCardErrorMessage: React.FC<Props> = ({ error }) => {
    const isIncompleteCvc = error && error.code === CardElementValidationErrorCodes.INCOMPLETE_CVC;

    const errorMessage = error ? ErrorCodeMap.get(error.code as CardElementValidationErrorCodes) : "";

    return (
        <div className={classnames(bem(), "lxs-field-below")}>
            <span className="lxs-field-below__message lxs-field-below__message--show">
                {errorMessage}
                {isIncompleteCvc ? <RawCvcLink className={bem("error-cvc-link")} /> : null}
            </span>
        </div>
    );
};

export default StripeCardErrorMessage;
