import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import * as authActions from "./auth.actions"
import { profileDataFetchedSuccess } from "../../../shared/state/profile.actions";

export const authReducer = createReducer(
    initialAuthState,
    on(authActions.loginSuccess , (state , {user}) =>({
        ...state,
        signedInUser : user
    })),
    on(profileDataFetchedSuccess , (state , {data}) => ({
        ...state,
        userProfile : data
    })),
    on(authActions.loggedOutSuccess , (state) => ({
        ...state , 
        signedInUser : null,
        userProfile : null
    }) )
)