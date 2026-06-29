/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="@welldone-software/why-did-you-render" />

import React from "react";
import { useSelector } from "react-redux";

if (process.env.ENVIRONMENT === "development") {
    const whyDidYouRender = require("@welldone-software/why-did-you-render");
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackExtraHooks: [[{ useSelector }, "useSelector"]],
    });
}
