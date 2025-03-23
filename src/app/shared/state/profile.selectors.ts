import { createSelector } from "@ngrx/store";
import { AppState } from "../../core/store/app.state";
import { state } from "@angular/animations";


export const selectProfileState = (state : AppState) => state.profile;

export const selectActiveProfileData = createSelector(
    selectProfileState,
    (state) => state.activeUserProfile
)

export const selectReviews = createSelector(
    selectProfileState,
    (state) => state.reviews 
)