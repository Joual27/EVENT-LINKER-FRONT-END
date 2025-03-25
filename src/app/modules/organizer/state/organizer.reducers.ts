import { createReducer, on } from "@ngrx/store";
import { initialOrganizerState } from "./organizer.state";
import * as organizerActions from "./organizer.actions"


export const organizerReducer = createReducer(
    initialOrganizerState ,
    on(organizerActions.EventsFetchedSuccessfully , (state , {events}) => ({
        ...state,
        events : events
    }))
)