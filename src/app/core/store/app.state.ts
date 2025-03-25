import { AuthState } from "../../modules/auth/models";
import { OrganizerState } from "../../modules/organizer/models/organizer.models";
import { ProfileState, UiState } from "../../shared/models";


export interface AppState {
    ui : UiState,
    auth : AuthState,
    profile : ProfileState, 
    organizer : OrganizerState
}