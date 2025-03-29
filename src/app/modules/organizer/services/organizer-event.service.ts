import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, PaginationResponse } from '../../../shared/models';
import { OrganizerEvent } from '../models/organizer.models';

@Injectable({
  providedIn: 'root'
})
export class OrganizerEventService {
   
  private http = inject(HttpClient);


  getEvents(page:number) : Observable<ApiResponse<PaginationResponse<OrganizerEvent[]>>> {
    return this.http.get<ApiResponse<PaginationResponse<OrganizerEvent[]>>>(`/api/organizer/events?page=${page}&size=3`)
  }

  createEvent(data : FormData) : Observable<ApiResponse<OrganizerEvent>> {
    return this.http.post<ApiResponse<OrganizerEvent>>("/api/organizer/events" , data);
  }

  updateEvent(data : FormData) : Observable<ApiResponse<OrganizerEvent>> {
    return this.http.put<ApiResponse<OrganizerEvent>>(`/api/organizer/events/${data.get('id')}` , data);
  }

  deleteEvent(id : string) : Observable<ApiResponse<OrganizerEvent>> {
    return this.http.delete<ApiResponse<OrganizerEvent>>(`/api/organizer/events/${id}`);
  }
}
