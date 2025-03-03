import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { uiReducer } from "../../shared/ui-state/ui.reducer";


export const reducers : ActionReducerMap<AppState> = {
    ui : uiReducer
}