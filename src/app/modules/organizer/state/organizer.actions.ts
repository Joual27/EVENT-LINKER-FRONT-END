import { createAction, props } from "@ngrx/store";
import { PaginationResponse } from "../../../shared/models";
import { OrganizerEvent } from "../models/organizer.models";



export const fetchEvents = createAction(
    "[Organizer Events Page] fetch organizer events",
    props<{page : number}>()
)

export const EventsFetchedSuccessfully = createAction(
    "[Organizer Events Page] Events Fetched successfully !",
    props<{events : PaginationResponse<OrganizerEvent[]>}>()
)

export const createEvent = createAction(
    "[Organizer events page] Create event" , 
    props<{data : FormData}>()
)

export const updateEvent = createAction(
    "[Organizer events page] Update event" , 
    props<{data : FormData}>()
)

export const deleteEvent = createAction(
    "[Organizer events page] delete event" , 
    props<{id : string}>()
)

export const eventCreatedSuccessfully = createAction(
    "[[Organizer events page] Event Created Successfully !]",
    props<{data : OrganizerEvent}>()
)


