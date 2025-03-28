import { User, UserProfile } from "../../../shared/models";


export interface AuthState {
    signedInUser : User | null , 
    userProfile : UserProfile | null
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

export interface RefreshTokenResponse {
    id : number ,
    tokens : {
        accessToken : string,
        refreshToken : string
    },
    role : string
}

export interface DecodedToken {
    roles: string[];
    username: string;
    email: string;
    sub: string;
    iat: number;
    exp: number;
}

export type RegistrationResponse = AuthResponse | string [] | object ;
