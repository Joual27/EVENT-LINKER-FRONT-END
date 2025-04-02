import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, CreateDmDTO, DmResponseDTO, DmWithLastMessage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DmsService {
  private http = inject(HttpClient);

  fetchUserDMs() : Observable<ApiResponse<DmWithLastMessage[]>>{
    return this.http.get<ApiResponse<DmWithLastMessage[]>>("/api/DMs")
  }

  createOrFindDM(userIds: number[]): Observable<ApiResponse<DmResponseDTO>> {
    const payload: CreateDmDTO = { userIds }
    return this.http.post<ApiResponse<DmResponseDTO>>(`/api/DMs`, payload)
  }
}
