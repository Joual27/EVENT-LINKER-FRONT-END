import { createAction, props } from "@ngrx/store";


export const showSuccessPopup = createAction(
    "[UI] show success Popup" , 
    props<{message : string}>()
)

export const hideSuccessPopup = createAction(
    "[UI] hide success Popup" , 
)

export const showFailurePopup = createAction(
    "[UI] show failure popup" ,
    props<{errors : string[]}>()
)

export const hideFailurePopup = createAction(
    "[UI] hide failure Popup" , 
)

export const appIsLoading = createAction(
    "[UI] app is loading"
)

export const stopLoading = createAction(
    "[UI] stop app loading"
)