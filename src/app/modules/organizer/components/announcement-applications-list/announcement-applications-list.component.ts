import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../../shared/models';
import { Application } from '../../../worker/models/worker.models';

@Component({
  selector: 'app-announcement-applications-list',
  imports: [],
  templateUrl: './announcement-applications-list.component.html',
  styleUrl: './announcement-applications-list.component.css'
})
export class AnnouncementApplicationsListComponent {
  applications !: Observable<PaginationResponse<Application> | null>; 
}
