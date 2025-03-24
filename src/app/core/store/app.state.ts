import { AuthState } from "../../modules/auth/models";
import { ProfileState, UiState } from "../../shared/models";


export interface AppState {
    ui : UiState,
    auth : AuthState,
    profile : ProfileState, 
    
}