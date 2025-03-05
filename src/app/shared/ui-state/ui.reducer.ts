import { createReducer, on } from "@ngrx/store";
import { initialUiState } from "./ui.state";
import * as uiActions from "./ui.actions"


export const uiReducer = createReducer(
    initialUiState,
    on(uiActions.showSuccessPopup , (state , {message}) => ({
        ...state,
        shownSuccessPopup : true,
        successPopupMessage : message
    })),
    on(uiActions.hideSuccessPopup , (state) => ({
        ...state,
        shownSuccessPopup : false,
        successPopupMessage : ""
    })),
    on(uiActions.showFailurePopup , (state , {errors}) => ({
        ...state ,
        errors : errors
    })),
    on(uiActions.hideFailurePopup , (state) => ({
        ...state ,
        shownFailurePopup : false
    }))
)