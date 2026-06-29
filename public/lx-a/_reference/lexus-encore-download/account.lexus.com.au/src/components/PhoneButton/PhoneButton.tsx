import { ButtonShade, ButtonStyle } from "lexus-style-guide/buttons/shared";
import React from "react";

import { LinkButtonWithIcon } from "lexus-style-guide/buttons/IconButton";
import { SVGPhone } from "lexus-style-guide/Components/SVGIcons/icons/static/SVGPhone";
import classnames from "classnames";
import { formatPhoneNumber } from "../../helpers/string";
import { lxColor } from "lexus-style-guide/colors/variables";

interface Props extends LXS.Button.ButtonProps {
    phoneNumber?: string;
}

export const PhoneButton: React.FC<Props> = React.memo(({ phoneNumber, className, buttonStyle, shade }) => {
    if (phoneNumber === undefined) {
        return null;
    }

    const iconColor =
        buttonStyle === undefined ||
        (buttonStyle === ButtonStyle.Primary && shade === ButtonShade.Light) ||
        (buttonStyle === ButtonStyle.Secondary && shade === ButtonShade.Dark)
            ? lxColor("smoke")
            : lxColor("deep-blue");

    return (
        <LinkButtonWithIcon
            className={classnames(className)}
            href={`tel:${phoneNumber}`}
            icon={{ Component: SVGPhone, props: { color: iconColor } }}
            buttonStyle={buttonStyle}
            shade={shade}
        >
            {formatPhoneNumber(phoneNumber)}
        </LinkButtonWithIcon>
    );
});
