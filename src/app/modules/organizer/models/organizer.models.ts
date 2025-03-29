import { PaginationResponse } from "../../../shared/models"

export interface OrganizerEvent {
    id: string
    title: string
    description: string
    date: string
    location: string
    imgUrl: string
}

export interface OrganizerState{
  events : PaginationResponse<OrganizerEvent[]> | null;
  announcements : PaginationResponse<Announcement[]> | null; 
}

export  enum AnnouncementStatus {
  PENDING ,
  ACTIVE ,
  REFUSED ,
  EXPIRED
}


export interface Announcement {
  id: number
  title: string
  description: string
  createdAt: string
  status: AnnouncementStatus
  event: OrganizerEvent
  announcementSkills : {
    skill : {
      id : number ,
      name : string
    }
    acceptsNonOrganizations : boolean
  }
}

export interface Skill {
  id : number ,
  name ? : string,
  acceptsNonOrganizations : boolean
}

export interface CreateAndUpdateAnnouncementDTO {
  id ?: number
  title: string
  description: string
  skills : Skill[]
  eventId ?: string
}

