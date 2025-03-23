import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, PaginationResponse, Review, UserProfile, UserStats, } from '../models';

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
  
  updateProfile(data : FormData) : Observable<ApiResponse<UserProfile>>{
    return this.http.put<ApiResponse<UserProfile>>(`/api/users/profile` , data);
  }

  getUserReviews(id : number , page : number) : Observable<ApiResponse<PaginationResponse<Review []>>>{
    return this.http.get<ApiResponse<PaginationResponse<Review []>>>(`/api/reviews/${id}?page=${page}&size=2`)
  }
  
}
