import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../../models/worker.models';
import { WorkerService } from '../../services/worker.service';
import { ApiResponse } from '../../../../shared/models';

@Component({
  selector: 'app-worker-layout',
  imports: [],
  templateUrl: './worker-layout.component.html',
  styleUrl: './worker-layout.component.css'
})
export class WorkerLayoutComponent {
  applications$!: Observable<ApiResponse<Application[]>>;
  private workerService = inject(WorkerService);

  ngOnInit(): void {
  
    this.workerService.getWorkerApplications(0, 10).subscribe({
      next: (res) => console.log('API Response:', res),
      error: (err) => console.error('API Error:', err)
    });
  }
}
