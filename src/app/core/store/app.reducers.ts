import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { uiReducer } from "../../shared/ui-state/ui.reducer";
import { authReducer } from "../../modules/auth/state/auth.reducers";
import { profileReducer } from "../../shared/state/profile/profile.reducers";
import { organizerReducer } from "../../modules/organizer/state/organizer.reducers";
import { workerReducer } from "../../modules/worker/state/worker.reducers";
import { dmsReducer } from "../../shared/state/DMs/DMs.reducers";


export const reducers : ActionReducerMap<AppState> = {
    ui : uiReducer , 
    auth : authReducer,
    profile : profileReducer,
    organizer : organizerReducer,
    worker : workerReducer,
    dms : dmsReducer
}