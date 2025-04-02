import { EmbeddedUser, PaginationResponse } from "../../../shared/models"
import { Announcement } from "../../organizer/models/organizer.models"

export enum ApplicationStatus {
    PENDING ,
    ACCEPTED ,
    REFUSED,
    CONFIRMED,
    UNCONFIRMED,
    ONGOING
}

export interface WorkerState {
    announcements : PaginationResponse<Announcement[]> | null
}

export interface Application {
    id : number , 
    price : number,
    status : ApplicationStatus,
    createdAt : Date,
    letter : string
    applicant ?: EmbeddedUser
}

export interface ApplicationRequest {
    announcementId: number
    price: number
    letter: string
}