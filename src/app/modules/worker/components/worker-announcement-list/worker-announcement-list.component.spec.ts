import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAnnouncementListComponent } from './worker-announcement-list.component';

describe('WorkerAnnouncementListComponent', () => {
  let component: WorkerAnnouncementListComponent;
  let fixture: ComponentFixture<WorkerAnnouncementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerAnnouncementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerAnnouncementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
