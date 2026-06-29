import "./StripeCardDetail.scss";

import * as React from "react";

import { PaymentMethod } from "../../../../types/payment";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { getCardImage } from "../../../PaymentMethods/CardPaymentMethod/CardPaymentMethod";

const bem = createBemFn("stripe-card-detail");

interface Props {
    data: PaymentMethod;
    onClick: () => void;
}

const StripeCardDetail: React.FC<Props> = ({ data, onClick }) => {
    const year = data.card ? data.card.expYear.toString().substring(2) : "YY";
    const month = data.card
        ? data.card.expMonth.toString().length < 2
            ? `0${data.card.expMonth}`
            : data.card.expMonth
        : "MM";
    return (
        <div className={bem()} onClick={onClick}>
            <img className={bem("card-image")} src={getCardImage(data.card.type)} />
            <p className={bem("text")}>
                <span className={bem("card-last4-digit")}>{data.card.last4}</span>
            </p>
            <p className={bem("text")}>
                <span className={bem("expire")}>{`${month} / ${year}`}</span>
            </p>
        </div>
    );
};
export default StripeCardDetail;
