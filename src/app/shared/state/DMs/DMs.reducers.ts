import { createReducer, on } from "@ngrx/store";
import { initialDMsState } from "./DMs.state";
import * as dmsActions from "./DMs.actions"


export const dmsReducer = createReducer(
    initialDMsState,
    on(dmsActions.userDMsFetchedSuccessfully , (state , {dms}) => ({
        ...state,
        DMs : dms
    }))
)