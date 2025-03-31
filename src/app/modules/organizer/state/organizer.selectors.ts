import { AppState } from "../../../core/store/app.state";
import { createSelector } from "@ngrx/store";


export const selectOrganizerState = (state : AppState) => state.organizer;

export const selectOrganizerEvents = createSelector(
    selectOrganizerState,
    (state) => state.events
)


export const selectOrganizerAnnouncements = createSelector(
    selectOrganizerState,
    (state) => state.announcements
);



export const selectAnnouncementApplications = createSelector(
    selectOrganizerState,
    (state) => state.applications
)