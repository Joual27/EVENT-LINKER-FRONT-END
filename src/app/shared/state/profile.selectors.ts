import { createSelector } from "@ngrx/store";
import { AppState } from "../../core/store/app.state";


export const selectProfileState = (state : AppState) => state.profile;

export const selectProfileData = createSelector(
    selectProfileState,
    (state) => state.activeUserProfile
)