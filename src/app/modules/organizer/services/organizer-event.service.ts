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
}
