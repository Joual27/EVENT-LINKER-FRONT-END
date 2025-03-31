import { createReducer, on } from "@ngrx/store";
import { initialWorkerState } from "./worker.state";
import * as workerActions from "./worker.actions";



export const workerReducer = createReducer(
    initialWorkerState ,
    on(workerActions.AnnouncementsFetchedSuccessfully , (state , {announcements}) => ({
        ...state,
        announcements : announcements
    }))
)