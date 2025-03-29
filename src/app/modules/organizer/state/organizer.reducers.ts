import { createReducer, on } from "@ngrx/store";
import { initialOrganizerState } from "./organizer.state";
import * as organizerActions from "./organizer.actions"
import { state } from "@angular/animations";


export const organizerReducer = createReducer(
    initialOrganizerState ,
    on(organizerActions.EventsFetchedSuccessfully , (state , {events}) => ({
        ...state,
        events : events
    })) ,
    on(organizerActions.AnnouncementsFetchedSuccessfully , (state , {announcements}) => ({
        ...state,
        announcements : announcements
    }))
)