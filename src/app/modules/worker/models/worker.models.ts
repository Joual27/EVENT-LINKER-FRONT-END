export enum ApplicationStatus {
    PENDING ,
    ACCEPTED ,
    REFUSED,
    CONFIRMED,
    UNCONFIRMED,
    ONGOING
}

export interface Application {
    id : number , 
    price : number,
    status : ApplicationStatus,
    createdAt : Date,
    letter : string
}

export interface ApplicationRequest {
    announcementId: number
    price: number
    coverLetter: string
  }