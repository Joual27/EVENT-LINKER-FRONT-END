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
    activeUserProfile : UserProfile | null
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
    organizationName?: string | null;
    events?: EventDTO[] | null;
    stats : UserStats
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

