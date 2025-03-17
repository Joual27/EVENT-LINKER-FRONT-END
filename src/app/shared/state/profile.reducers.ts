import { createReducer, on } from "@ngrx/store";
import { initialProfileState } from "./profile.state";
import { profileDataFetchedSuccess } from "./profile.actions";


export const profileReducer = createReducer(
    initialProfileState ,
    on(profileDataFetchedSuccess , (state , {data}) => ({
        ...state,
        activeUserProfile : data
    }))
)