import { createAction, props } from "@ngrx/store";
import { UserProfile } from "../models";


export const profileDataFetchedSuccess = createAction(
    "[Auth] profile data fetched succesfully ",
    props<{data : UserProfile}>() 
)

export const fetchProfileData = createAction(
    "[Auth] profile data fetched succesfully ",
    props<{id : number}>()
)


// update profile state stricture and
