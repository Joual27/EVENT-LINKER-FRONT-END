export interface UiState {
    shownSuccessPopup : boolean,
    successPopupMessage : string,
    shownFailurePopup : boolean , 
    errors : string[] , 
    isLoading : boolean
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

export interface ProfileState {
    activeUserProfile : UserProfile | null ,
    reviews : PaginationResponse<Review[]> | null
}

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    role: "WORKER" | "ORGANIZER" | "ADMIN"; 
    isOrganization?: boolean;
    balance?: number;
    skills?: SkillDTO[]; 
    organizationName?: string ;
    events?: EventDTO[] ;
    stats : UserStats;
    reviews : Review[];
    bio ?: string;
    profileImgUrl ?: string
}
  
export interface SkillDTO {
   id: number;
   name: string;
}
  
export interface EventDTO {
    title: string;
    description: string;
}

export interface UserStats {
    numberOfReviews : number ,
    avgReview : number,
    numberOfCreatedEvents ?: number,
    completedJobs ?: number
}

enum UploadState {
    Initial,
    Selected,
    Uploading,
    Success,
    Failed
}
  
export interface FileItem {
    file: File;
    name: string;
    size: string;
    progress: number;
    state: UploadState;
}

export interface PaginationResponse<T>{
    hasNext : boolean ;
    hasPrevious : boolean , 
    data : T
}

export interface Review {
    id : number;
    comment : string ;
    rating : number ;
    reviewer : EmbeddedUser;
    createdAt : string | Date
}

export interface EmbeddedUser{
    username : string ;
    profileImgUrl : string
}



