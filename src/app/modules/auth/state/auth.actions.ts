import { createAction, props } from "@ngrx/store";
import { User } from "../../../shared/models";



export const loginSuccess = createAction(
    "[Auth] user logged in successfully" ,
    props<{user : User}>()
)