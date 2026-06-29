/* eslint-disable comma-dangle */

import "./StripeCardElement.scss";

import * as React from "react";

import { CardElement, ReactStripeElements } from "react-stripe-elements";
import { GTMForms, pushToGTMFormFieldChanged } from "Helpers/gtm";
import { encoreTierSelector, salesforceAccountIdSelector } from "ReduxSlices/user";
import { useRef, useState } from "react";

import { ClassNameProp } from "Types/general";
import { PaymentMethod } from "Types/payment";
import { StripeCardCVCLink } from "./StripeCardCVCLink/StripeCardCVCLink";
import StripeCardDetail from "./StripeCardDetail/StripeCardDetail";
import StripeCardErrorMessage from "./StripeCardErrorMessage/StripeCardErrorMessage";
import { UserEncoreTiers } from "Helpers/users";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { lxColor } from "lexus-style-guide/colors/variables";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import ElementsOptions = ReactStripeElements.ElementsOptions;
import ElementChangeResponse = ReactStripeElements.ElementChangeResponse;

import Error = stripe.Error;

interface Props extends ClassNameProp {
    onComplete?: (complete: boolean) => void;
    onError?: (error: Error) => void;
    onEdit?: () => void;
    data?: PaymentMethod;
    onBlur?: () => void;
}

const bem = createBemFn("stripe-card-element");

const StripeCardElement: React.FC<Props> = ({ className, onComplete, data, onError, onEdit, onBlur }) => {
    const cardElementRef = useRef<CardElement>(null);
    const [error, setError] = useState<Error | null>(null);
    const [showDetail, setShowDetail] = useState(!!data);

    const encoreTier = useSelector(encoreTierSelector) || UserEncoreTiers.NONE;
    const accountId = useSelector(salesforceAccountIdSelector);

    useEffect(() => setShowDetail(!!data), [data]);

    const options: ElementsOptions = {
        classes: {
            focus: bem(undefined, "focus"),
            invalid: bem(undefined, "invalid"),
        },
        style: {
            base: {
                // eslint-disable-next-line quotes
                fontFamily: '"Nobel", Arial, sans-serif',
                fontSize: "19px",
                fontWeight: "300",
                fontSmoothing: "antialiased",
                color: lxColor("smoke"),
                lineHeight: "24px",
                "::placeholder": {
                    fontSize: "13px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    fontWeight: "300",
                    color: lxColor("smoke", "dark"),
                    lineHeight: "24px",
                },
            },
            invalid: {
                color: lxColor("error"),
            },
        },
    };

    const handleOnChange = (event: ElementChangeResponse) => {
        pushToGTMFormFieldChanged(GTMForms.CARD_NUMBER, encoreTier, accountId ?? "");

        onComplete && onComplete(event.complete);
        if (event.error) {
            onError && onError(event.error);
            setError(event.error);
        } else {
            setError(null);
        }
    };

    return (
        <div className={classnames(bem(), className)}>
            {data && showDetail ? (
                <StripeCardDetail
                    data={data}
                    onClick={() => {
                        setShowDetail(prevShowDetail => !prevShowDetail);
                        onEdit && onEdit();
                    }}
                />
            ) : (
                <CardElement
                    onChange={handleOnChange}
                    className={bem("element")}
                    onBlur={onBlur}
                    ref={cardElementRef}
                    {...options}
                />
            )}
            {error ? <StripeCardErrorMessage error={error} /> : <StripeCardCVCLink />}
        </div>
    );
};

export default StripeCardElement;
