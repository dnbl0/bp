import { Action } from "redux";
import { AppState } from "ReduxSlices/index";
import { Selector } from "reselect";
import { ThunkDispatch } from "redux-thunk";
import { Value } from "classnames";

export type StateSelector<S> = Selector<AppState, S>;

export type Dispatch<E = Record<string, unknown>> = ThunkDispatch<AppState, E, Action<any>>;
export type GetState = () => AppState;

export interface ClassNameProp {
    className?: Value;
}

export enum PageType {
    Main = "main-page",
    Sub = "sub-page",
    Flow = "flow-page",
}

export type OrNullOrUndefined<T> = {
    [P in keyof T]?: T[P] | null;
};

export type NotNullOrUndefined<T> = Required<{
    [P in keyof T]: NonNullable<T[P]>;
}>;

export interface ApiResponse<T> {
    result: T;
    succeed: boolean;
    error: {
        code: string;
        description: string;
        caseNumber: string;
    };
}
