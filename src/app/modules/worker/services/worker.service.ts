import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { ApiResponse } from '../../../shared/models';
import { Application } from '../models/worker.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  apiUrl = environments.apiUrl;
  private http = inject(HttpClient);
  
  constructor() {}

  getWorkerApplications(page : number , size : number) : Observable<ApiResponse<Application[]>>{
    return this.http.get<ApiResponse<Application[]>>(`${this.apiUrl}/worker/applications?page=${page}&size=${size}` ,{
      withCredentials : true
    })
  }
}
