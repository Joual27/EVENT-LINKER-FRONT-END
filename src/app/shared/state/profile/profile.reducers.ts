import { createReducer, on } from "@ngrx/store";
import { initialProfileState } from "./profile.state";
import * as profileActions from "./profile.actions"


export const profileReducer = createReducer(
    initialProfileState ,
    on(profileActions.profileDataFetchedSuccess , (state , {data}) => ({
        ...state,
        activeUserProfile : data
    })),
    on(profileActions.ReviewsDataFetchedSuccessfully , (state , {data}) => ({
        ...state,
        reviews : data
    }))
)