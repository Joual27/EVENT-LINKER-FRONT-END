import { createAction, props } from "@ngrx/store";
import { User, UserProfile } from "../../../shared/models";


export const loginSuccess = createAction(
    "[Auth] user logged in successfully" ,
    props<{user : User}>()
)

export const loggedInUserProfileDataFetchedSuccessfully = createAction(
    "[Auth] profile data fetched succesfully ",
    props<{data : UserProfile}>() 
)

export const logout = createAction(
    "[Auth] logout"
)

export const loggedOutSuccess = createAction(
    "[Auth] logged out successfully ! "
)

