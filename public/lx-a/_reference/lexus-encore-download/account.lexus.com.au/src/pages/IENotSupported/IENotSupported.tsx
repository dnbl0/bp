import React from "react";
import SVGBrowsers, { isBrowserName } from "./SVGBrowsers";
import "./IENotSupported.scss";
import { SVGChevronRight } from "lexus-style-guide/Components/SVGIcons/icons/static/SVGChevronRight";
import SVGLexusLogo from "./SVGLexusLogo";

export const IENotSupported: React.FC = () => {
    return (
        <div className="supported-browsers__page">
            <SVGLexusLogo className="supported-browsers__logo" />
            <h2 className="supported-browsers__title">Your browser is not supported</h2>
            <p className="supported-browsers__description">
                To view the Lexus app, please update to one of the modern browsers listed below.
            </p>
            <div className="supported-browsers__container">
                {supportedBrowsers.map(browser =>
                    isBrowserName(browser.name) ? (
                        <a className="supported-browsers__browser" key={browser.name} href={browser.downloadUrl}>
                            <SVGBrowsers className="supported-browsers__icon" name={browser.name} />
                            <span className="supported-browsers__text">
                                {browser.name}
                                <SVGChevronRight className="supported-browsers__chevron" width={14} height={20} />
                            </span>
                        </a>
                    ) : null
                )}
            </div>
        </div>
    );
};

const supportedBrowsers = [
    {
        name: "edge",
        downloadUrl: "https://www.microsoft.com/edge",
    },
    {
        name: "chrome",
        downloadUrl: "https://www.google.com/chrome",
    },
    {
        name: "firefox",
        downloadUrl: "https://www.mozilla.org/en-US/firefox/browsers",
    },
];
