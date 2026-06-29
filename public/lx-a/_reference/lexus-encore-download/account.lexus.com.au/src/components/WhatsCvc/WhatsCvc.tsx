import "./WhatsCvc.scss";

import * as React from "react";

import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import sampleCard from "../../assets/images/whats-cvc-card.svg";

const bem = createBemFn("whats-cvc");

const WhatsCvc: React.FC = () => {
    return (
        <div>
            <h4 className={bem("title")}>CVC</h4>
            <p className={classnames(bem("description"), "lx-tg-fine-print")}>
                A three-digit code on the back of your credit card. We've outlined its position below in red.
            </p>
            <div className={bem("card")}>
                <img src={sampleCard} />
            </div>
        </div>
    );
};

export default WhatsCvc;
