import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, UserProfile, UserStats, } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);

  constructor() {}

  getUserProfileData(id : number) : Observable<ApiResponse<UserProfile>>{
    return this.http.get<ApiResponse<UserProfile>>(`/api/users/${id}`);
  }

  getUserStats(id : number) : Observable<ApiResponse<UserStats>>{
    return this.http.get<ApiResponse<UserStats>>(`/api/users/stats/${id}`);
  }
  
}
