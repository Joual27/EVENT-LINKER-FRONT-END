import { createAction, props } from "@ngrx/store";
import { DmResponseDTO, DmWithLastMessage } from "../../models";



export const fetchUserDMs = createAction(
    "[DMs Page] Fetch User dms"
)

export const userDMsFetchedSuccessfully = createAction(
    "[DMs Page]  User dms Fetched",
    props<{dms : DmWithLastMessage[]}>()
)