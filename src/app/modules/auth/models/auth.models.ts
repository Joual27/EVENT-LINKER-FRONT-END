import { User } from "../../../shared/models";


export interface AuthState {
    authErrors : string[],
    signedInUser : User
}


export interface registrationData {
    username : string , 
    email : string ,
    password : string ,
    organizationName ?: string, 
    isOrganization ?: boolean 
}