import "./StripeCardCVCLink.scss";

import * as React from "react";

import OwnershipLinkInternal, { OwnershipLinkInternalSize } from "../../../OwnershipLinkInternal/OwnershipLinkInternal";

import { ClassNameProp } from "../../../../types/general";
import Toast from "../../../Portal/Toast";
import WhatsCvc from "../../../WhatsCvc/WhatsCvc";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("stripe-card-cvc-link");

const RawCvcLink: React.FC<ClassNameProp> = ({ className }) => {
    const [hasToast, setHasToast] = React.useState(false);
    const closeHandler = () => setHasToast(p => !p);

    return (
        <>
            {hasToast && (
                <Toast close={closeHandler}>
                    <WhatsCvc />
                </Toast>
            )}
            <OwnershipLinkInternal className={className} size={OwnershipLinkInternalSize.Small} onClick={closeHandler}>
                What's CVC?
            </OwnershipLinkInternal>
        </>
    );
};

const StripeCardCVCLink: React.FC<ClassNameProp> = () => {
    return (
        <div className={bem("whats-cvc")}>
            <RawCvcLink />
        </div>
    );
};

export { StripeCardCVCLink, RawCvcLink };
