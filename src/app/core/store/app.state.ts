import { AuthState } from "../../modules/auth/models";
import { UiState } from "../../shared/models";


export interface AppState {
    ui : UiState,
    auth : AuthState
}