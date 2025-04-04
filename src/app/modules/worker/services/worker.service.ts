import { inject, Injectable } from '@angular/core';
import { ApiResponse, PaginationResponse } from '../../../shared/models';
import { Application, ApplicationRequest } from '../models/worker.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../../organizer/models/organizer.models';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private http = inject(HttpClient);
  
  constructor() {}

  getWorkerApplications(page : number , size : number) : Observable<ApiResponse<Application[]>>{
    return this.http.get<ApiResponse<Application[]>>(`/api/worker/applications?page=${page}&size=${size}` ,{
      withCredentials : true
    })
  }

  getAllAnnouncements(page : number) : Observable<ApiResponse<PaginationResponse<Announcement[]>>>{
    return this.http.get<ApiResponse<PaginationResponse<Announcement[]>>>(`/api/worker/announcements?page=${page}&size=5`)
  }


  filterAnnouncements(page : number , term : string) : Observable<ApiResponse<PaginationResponse<Announcement[]>>>{
    return this.http.get<ApiResponse<PaginationResponse<Announcement[]>>>(`/api/worker/announcements/filter?page=${page}&size=5&term=${term}`)
  }

  apply(req : ApplicationRequest) : Observable<ApiResponse<Application>>{
    return this.http.post<ApiResponse<Application>>("/api/worker/applications" , req);
  }
}
