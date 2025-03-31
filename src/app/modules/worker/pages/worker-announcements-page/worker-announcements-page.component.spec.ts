import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAnnouncementsPageComponent } from './worker-announcements-page.component';

describe('WorkerAnnouncementsPageComponent', () => {
  let component: WorkerAnnouncementsPageComponent;
  let fixture: ComponentFixture<WorkerAnnouncementsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerAnnouncementsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerAnnouncementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
