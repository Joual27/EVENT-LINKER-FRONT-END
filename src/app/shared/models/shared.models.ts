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
    role : Role
}

export enum Role {
    'worker' ,
    'organizer' ,
    'admin'
}