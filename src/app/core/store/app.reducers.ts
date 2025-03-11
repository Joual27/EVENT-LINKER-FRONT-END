import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { uiReducer } from "../../shared/ui-state/ui.reducer";
import { authReducer } from "../../modules/auth/state/auth.reducers";


export const reducers : ActionReducerMap<AppState> = {
    ui : uiReducer , 
    auth : authReducer
}