import { createAction } from "@reduxjs/toolkit";

export enum RootLevelAction {
    Reset = "reset",
    ResetAll = "reset_all",
}

export const resetAll = createAction(RootLevelAction.ResetAll);
export const reset = createAction(RootLevelAction.Reset);
