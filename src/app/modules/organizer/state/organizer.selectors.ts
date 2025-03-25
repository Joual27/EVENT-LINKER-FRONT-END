import { AppState } from "../../../core/store/app.state";
import { createSelector } from "@ngrx/store";


export const selectOrganizerState = (state : AppState) => state.organizer;

export const selectOrganizerEvents = createSelector(
    selectOrganizerState,
    (state) => state.events
)