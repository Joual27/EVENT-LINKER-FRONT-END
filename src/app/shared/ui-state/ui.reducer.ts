import { createReducer, on } from "@ngrx/store";
import { initialUiState } from "./ui.state";
import * as uiActions from "./ui.actions"


export const uiReducer = createReducer(
    initialUiState,
    on(uiActions.shownSuccessPopup , (state , {message}) => ({
        ...state,
        shownSuccessPopup : true,
        successPopupMessage : message
    })),
    on(uiActions.hideSuccessPopup , (state) => ({
        ...state,
        shownSuccessPopup : false,
        successPopupMessage : ""
    }))
)