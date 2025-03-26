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
}

export  enum AnnouncementStatus {
  PENDING ,
  ACTIVE ,
  REFUSED ,
  EXPIRED
}

export interface AnnouncementSkill {
  id: number
  name: string
  level?: string
}

export interface Announcement {
  id: number
  title: string
  description: string
  createdAt: string
  status: AnnouncementStatus
  event: OrganizerEvent
  announcementSkills: AnnouncementSkill[]
}

export interface CreateAnnouncementDTO {
  title: string
  description: string
  skills: { id: number; level: string }[]
  eventId: string
}

