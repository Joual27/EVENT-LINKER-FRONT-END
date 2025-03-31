import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAnnouncementItemComponent } from './worker-announcement-item.component';

describe('WorkerAnnouncementItemComponent', () => {
  let component: WorkerAnnouncementItemComponent;
  let fixture: ComponentFixture<WorkerAnnouncementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerAnnouncementItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerAnnouncementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
