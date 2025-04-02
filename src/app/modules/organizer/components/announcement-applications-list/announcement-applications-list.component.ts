import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../../shared/models';
import { Application } from '../../../worker/models/worker.models';
import { CommonModule } from '@angular/common';
import { AnnouncementApplicationsItemComponent } from '../announcement-applications-item/announcement-applications-item.component';

@Component({
  selector: 'app-announcement-applications-list',
  imports: [CommonModule , AnnouncementApplicationsItemComponent],
  templateUrl: './announcement-applications-list.component.html',
  styleUrl: './announcement-applications-list.component.css'
})
export class AnnouncementApplicationsListComponent {
  @Input() applications$ !: Observable<PaginationResponse<Application[]> | null>; 
}
