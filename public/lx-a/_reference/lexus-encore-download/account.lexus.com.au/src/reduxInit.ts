import "lexus-style-guide/icons/load-icons.scss";
import "lexus-style-guide/typography/load-fonts.scss";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { initialState, rootReducer } from "./reduxSlices";

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: true, serializableCheck: false }).concat(thunk),
    devTools: typeof process !== "undefined" && process.env?.ENVIRONMENT !== "production", // Enable DevTools only in development
});
