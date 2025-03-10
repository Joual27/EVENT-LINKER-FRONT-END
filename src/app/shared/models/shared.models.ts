export interface UiState {
    shownSuccessPopup : boolean,
    successPopupMessage : string,
    shownFailurePopup : boolean , 
    errors : string[]
}

export interface User {
    id : number,
    username : string ,
    email : string ,
    role : string
}

export interface UserData {
    id : number , 
    token : string ,
    role : string
}
