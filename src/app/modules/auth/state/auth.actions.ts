import { createAction, props } from "@ngrx/store";
import { User, UserProfile } from "../../../shared/models";


export const loginSuccess = createAction(
    "[Auth] user logged in successfully" ,
    props<{user : User}>()
)

export const fetchUserProfileData= createAction(
    "[Auth] fetch user profile infos",
    props<{id : number}>()
)

export const ProfileDataFetchedSuccess = createAction(
    "[Auth] profile data fetched succesfully ",
    props<{data : UserProfile}>() 
)

