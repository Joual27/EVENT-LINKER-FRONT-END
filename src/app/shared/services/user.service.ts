import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, UserProfile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  constructor() { }

  getUserProfileData(id : number) : Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(`/api/users/${id}`);
  }
}
