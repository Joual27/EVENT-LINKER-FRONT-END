import { AppState } from "../../../core/store/app.state";
import { createSelector } from "@ngrx/store";




export const selectWorkerState = (state : AppState) => state.worker;


export const selectAllAnnouncements = createSelector(
    selectWorkerState,
    (state) => state.announcements
)