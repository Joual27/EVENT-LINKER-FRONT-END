import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, PaginationResponse } from '../../../shared/models';
import { Announcement, CreateAndUpdateAnnouncementDTO, OrganizerEvent, Skill } from '../models/organizer.models';
import { Application } from '../../worker/models/worker.models';

@Injectable({
  providedIn: 'root'
})
export class OrganizerAnnouncementsService {
   
  private http = inject(HttpClient);

  getAnnouncements(page: number): Observable<ApiResponse<PaginationResponse<Announcement[]>>> {
    return this.http.get<ApiResponse<PaginationResponse<Announcement[]>>>(`/api/organizer/announcements?page=${page}&size=7`);
  }

  createAnnouncement(data: CreateAndUpdateAnnouncementDTO): Observable<ApiResponse<Announcement>> {
    return this.http.post<ApiResponse<Announcement>>("/api/organizer/announcements", data);
  }

  updateAnnouncement(data: CreateAndUpdateAnnouncementDTO): Observable<ApiResponse<Announcement>> {
    return this.http.put<ApiResponse<Announcement>>(`/api/organizer/announcements/${data.id}`, data);
  }

  deleteAnnouncement(id: number): Observable<ApiResponse<Announcement>> {
    return this.http.delete<ApiResponse<Announcement>>(`/api/organizer/announcements/${id}`);
  }

  getAllEvents() : Observable<ApiResponse<OrganizerEvent[]>>{
    return this.http.get<ApiResponse<OrganizerEvent[]>>("/api/organizer/events/no-pagination")
  }

  getAllSkills() : Observable<ApiResponse<Skill[]>> {
    return this.http.get<ApiResponse<Skill[]>>('/api/skills')
  } 

  getAnnouncementApplications(page : number , announcementId : number) : Observable<ApiResponse<PaginationResponse<Application[]>>> {
    return this.http.get<ApiResponse<PaginationResponse<Application[]>>>(`/api/organizer/announcements/applications/${announcementId}?page=${page}&size=2`)
  }
}