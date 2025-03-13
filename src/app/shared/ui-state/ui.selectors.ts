import { createSelector } from "@ngrx/store";
import { AppState } from "../../core/store/app.state";
import { state } from "@angular/animations";


export const selectUiState = (state : AppState) => state.ui;

export const selectShownSuccessPopup = createSelector(
    selectUiState,
    (state) => state.shownSuccessPopup
)

export const selectSuccessPopupMessage = createSelector(
    selectUiState ,
    (state) => state.successPopupMessage
)


export const selectShownFailurePopup = createSelector(
    selectUiState,
    (state) => state.shownFailurePopup
)

export const selectErrors = createSelector(
    selectUiState,
    (state) => state.errors
)

export const selectIsLoading = createSelector(
    selectUiState,
    (state) => state.isLoading
)