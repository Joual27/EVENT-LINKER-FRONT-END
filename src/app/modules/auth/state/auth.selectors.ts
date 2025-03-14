import { createSelector } from "@ngrx/store";
import { AppState } from "../../../core/store/app.state";



export const selectAuthState = (state : AppState) => state.auth;


export const selectSignedInUser = createSelector(
    selectAuthState,
    (state) => state.signedInUser
)


export const selectProfileData = createSelector(
    selectAuthState,
    (state) => state.userProfile
)