import { createAction, props } from "@ngrx/store";
import { UserProfile } from "../models";


export const profileDataFetchedSuccess = createAction(
    "[Profile] profile data fetched succesfully ",
    props<{data : UserProfile}>() 
)

export const fetchProfileData = createAction(
    "[Profile] Fetch profile data ",
    props<{id : number}>()
)


// update profile state stricture and
