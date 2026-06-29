/* eslint-disable no-console */
//Remove the above line later after testing
import {
    loadScript
} from "Helpers/loadScript";

const typeQs = new URLSearchParams(window.location.search).get("type");

//Only load SF script when SPA is not used as an iframe for now.
if (typeQs !== "iframe" && process.env.SF_PERSONALISATION_SDK) {
    loadScript(process.env.SF_PERSONALISATION_SDK).catch(err => {
        console.error(err);
    });
}