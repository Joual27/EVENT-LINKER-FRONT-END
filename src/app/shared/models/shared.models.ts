export interface UiState {
    shownSuccessPopup : boolean,
    successPopupMessage : string,
    shownFailurePopup : boolean , 
    errors : string[]
}


export interface ApiResponse<T> {
    status : number ,
    message : string , 
    data : T
}

export interface User {
    id : number , 
    token : string ,
    role : string
}
