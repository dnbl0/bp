import "./DemoBanner.scss";
import { Container, SVGWarning } from "@tmca/lexus-kit/css-in-js";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("demo-banner");

export const DemoBanner = () => (
    <Container className={bem()} maxWidth="none">
        <div className={bem("content")}>
            <span className={bem("svg-frame")}>
                <SVGWarning height={16} width={16} className={bem("svg")} />
            </span>
            <span className={bem("caption")}>You are in Demo mode</span>
        </div>
    </Container>
);
