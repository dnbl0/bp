import "../wdyr.config";
import "../sfPersonalisation.config";
import "../newrelic.config";
import "lexus-style-guide/icons/load-icons.scss";
import "lexus-style-guide/typography/load-fonts.scss";
import "./index.scss";

import App from "./App/App";
import { Provider } from "react-redux";
import { unstable_HistoryRouter as Router } from "react-router-dom";
import { store } from "./reduxInit";
import { createRoot } from "react-dom/client";
import history from "./history";

const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
}
