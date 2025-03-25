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