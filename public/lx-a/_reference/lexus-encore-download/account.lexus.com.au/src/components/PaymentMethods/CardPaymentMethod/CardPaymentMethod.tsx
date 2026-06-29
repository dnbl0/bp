/* eslint-disable comma-dangle */

import "./CardPaymentMethod.scss";

import * as React from "react";

import { CardType, PaymentMethod } from "../../../types/payment";

import FieldSuccessTick from "../../FieldSuccessTick/FieldSuccessTick";
import { SVGChevronRight } from "lexus-style-guide/Components/SVGIcons/icons/static/SVGChevronRight";
import amex from "../../../assets/images/amex.svg";
import blankCard from "../../../assets/images/blank-card.svg";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { lxColor } from "lexus-style-guide/colors/variables";
import mastercard from "../../../assets/images/mastercard.svg";
import visa from "../../../assets/images/visa.svg";

export const getCardImage = (type: CardType): string => {
    switch (type) {
        case CardType.VISA:
            return visa;
        case CardType.MASTERCARD:
            return mastercard;
        case CardType.AMEX:
            return amex;
        default:
            return blankCard;
    }
};

interface Props {
    paymentMethod: PaymentMethod;
    onClick?: () => void;
    editable?: boolean;
}

const bem = createBemFn("card-payment-method");

const CardPaymentMethod: React.FC<Props> = ({ paymentMethod, onClick, editable }) => {
    const Indicator = () =>
        editable ? (
            <SVGChevronRight width={15} height={15} className={bem("arrow")} color={lxColor("smoke", "dark")} />
        ) : (
            <FieldSuccessTick />
        );
    return (
        <div className={bem()} onClick={onClick}>
            {paymentMethod.isDefault && <Indicator />}
            <img className={bem("card-image")} src={getCardImage(paymentMethod.card.type)} />
            <p className={bem("text")}>
                Ending in:
                <span className={bem("card-last4-digit")}>{paymentMethod.card.last4}</span>
            </p>
        </div>
    );
};

export default CardPaymentMethod;
