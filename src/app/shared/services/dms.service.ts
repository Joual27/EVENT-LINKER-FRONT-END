import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, DmResponseDTO, DmWithLastMessage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DmsService {
  private http = inject(HttpClient);

  fetchUserDMs() : Observable<ApiResponse<DmWithLastMessage[]>>{
    return this.http.get<ApiResponse<DmWithLastMessage[]>>("/api/DMs")
  }
}
