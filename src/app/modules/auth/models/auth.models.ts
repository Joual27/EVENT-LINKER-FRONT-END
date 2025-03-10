import { User } from "../../../shared/models";


export interface AuthState {
    authErrors : string[],
    signedInUser : User
}


export interface RegistrationData {
    username : string , 
    email : string ,
    password : string ,
    organizationName ?: string, 
    isOrganization ?: boolean 
}

export interface AuthResponse {
    data : {
        id : number ,
        tokens : {
            accessToken : string,
            refreshToken : string
        },
        role : string
    }
}

export type RegistrationResponse = AuthResponse | string [] | object ;