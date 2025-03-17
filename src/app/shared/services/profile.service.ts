import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, OrganizerStats, UserProfile, UserStats, WorkerStats } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);

  constructor() {}

  getUserProfileData(id : number) : Observable<ApiResponse<UserProfile>>{
    return this.http.get<ApiResponse<UserProfile>>(`/api/users/${id}`);
  }

  getUserStats(id : number) : Observable<ApiResponse<WorkerStats | OrganizerStats>>{
    return this.http.get<ApiResponse<WorkerStats | OrganizerStats>>(`/api/users/stats/${id}`);
  }
  
}
