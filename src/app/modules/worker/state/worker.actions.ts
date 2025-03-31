import { createAction, props } from "@ngrx/store";
import { PaginationResponse } from "../../../shared/models";
import { Announcement } from "../../organizer/models/organizer.models";


export const fetchAllAnnouncements = createAction(
    "[Find Job Page] Fetch all available announcements",
    props<{page : number}>()
)

export const AnnouncementsFetchedSuccessfully = createAction(
    "[Find Job Page]  announcements fetched !" , 
    props<{announcements : PaginationResponse<Announcement[]>}>()
)

export const filterAnnouncements = createAction(
    "[Find job page] Filter announcements",
    props<{page : number , term : string}>()
)