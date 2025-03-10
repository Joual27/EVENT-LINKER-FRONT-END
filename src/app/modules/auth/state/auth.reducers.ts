import { createReducer, on } from "@ngrx/store";
import { initialAuthState } from "./auth.state";
import * as authAction from "./auth.actions"

export const authReducer = createReducer(
    initialAuthState,
    on(authAction.loginSuccess , (state , {user}) =>({
        ...state,
        signedInUser : user
    }))
)