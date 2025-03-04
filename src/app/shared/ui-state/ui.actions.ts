import { createAction, props } from "@ngrx/store";


export const shownSuccessPopup = createAction(
    "[UI] show success Popup" , 
    props<{message : string}>()
)

export const hideSuccessPopup = createAction(
    "[UI] hide success Popup" , 
)