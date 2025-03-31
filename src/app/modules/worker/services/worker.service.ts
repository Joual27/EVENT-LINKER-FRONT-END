import { inject, Injectable } from '@angular/core';
import { ApiResponse, PaginationResponse } from '../../../shared/models';
import { Application } from '../models/worker.models';
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
}
