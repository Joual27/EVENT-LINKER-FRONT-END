import { User } from "../../../shared/models";


export interface AuthState {
    authErrors : string[],
    signedInUser : User
}