import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementApplicationsItemComponent } from './announcement-applications-item.component';

describe('AnnouncementApplicationsItemComponent', () => {
  let component: AnnouncementApplicationsItemComponent;
  let fixture: ComponentFixture<AnnouncementApplicationsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementApplicationsItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementApplicationsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
