import { createAction, props } from "@ngrx/store";
import { PaginationResponse } from "../../../shared/models";
import { Announcement, CreateAndUpdateAnnouncementDTO, OrganizerEvent } from "../models/organizer.models";



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
    "[Organizer events page] Event Created Successfully !]",
    props<{data : OrganizerEvent}>()
)

export const fetchAnnouncements = createAction(
    "[Organizer Announcements Page] fetch organizer announcements",
    props<{page: number}>()
  );
  
  export const AnnouncementsFetchedSuccessfully = createAction(
    "[Organizer Announcements Page] Announcements Fetched successfully!",
    props<{announcements: PaginationResponse<Announcement[]>}>()
  );
  
  export const createAnnouncement = createAction(
    "[Organizer announcements page] Create announcement",
    props<{data: CreateAndUpdateAnnouncementDTO}>()
  );
  
  export const updateAnnouncement = createAction(
    "[Organizer announcements page] Update announcement",
    props<{data: CreateAndUpdateAnnouncementDTO}>()
  );
  
  export const deleteAnnouncement = createAction(
    "[Organizer announcements page] delete announcement",
    props<{id: number}>()
  );
  
  export const announcementCreatedSuccessfully = createAction(
    "[Organizer announcements page] Announcement Created Successfully!",
    props<{data: Announcement}>()
  );

