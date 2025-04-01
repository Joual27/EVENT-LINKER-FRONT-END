import { createSelector } from "@ngrx/store";
import { AppState } from "../../../core/store/app.state";



export const selectDMsState = (state : AppState) => state.dms

export const selectUserDMs = createSelector(
    selectDMsState,
    (state) => state.DMs
)