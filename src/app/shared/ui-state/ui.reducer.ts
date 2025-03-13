import { createReducer, on } from "@ngrx/store";
import { initialUiState } from "./ui.state";
import * as uiActions from "./ui.actions"
import { state } from "@angular/animations";


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
        shownFailurePopup : true,
        errors : errors
    })),
    on(uiActions.hideFailurePopup , (state) => ({
        ...state ,
        shownFailurePopup : false
    })),
    on(uiActions.appIsLoading , (state) => ({
        ...state ,
        isLoading : true
    })),
    on(uiActions.stopLoading , (state) => ({
        ...state ,
        isLoading : false
    }))
    
)