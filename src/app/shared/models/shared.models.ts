export interface UiState {
    shownSuccessPopup : boolean,
    successPopupMessage : string,
    shownFailurePopup : boolean , 
    errors : string[]
}



export interface User {
    id : number , 
    token : string ,
    role : string
}
