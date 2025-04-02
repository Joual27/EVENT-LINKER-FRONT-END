import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementApplicationsListComponent } from './announcement-applications-list.component';

describe('AnnouncementApplicationsListComponent', () => {
  let component: AnnouncementApplicationsListComponent;
  let fixture: ComponentFixture<AnnouncementApplicationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementApplicationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
