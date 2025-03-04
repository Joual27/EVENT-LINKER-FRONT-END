import { createSelector } from "@ngrx/store";
import { AppState } from "../../core/store/app.state";


export const selectUiState = (state : AppState) => state.ui;

export const selectShownSuccessPopup = createSelector(
    selectUiState,
    (state) => state.shownSuccessPopup
)


export const selectSuccessPopupMessage = createSelector(
    selectUiState ,
    (state) => state.successPopupMessage
)