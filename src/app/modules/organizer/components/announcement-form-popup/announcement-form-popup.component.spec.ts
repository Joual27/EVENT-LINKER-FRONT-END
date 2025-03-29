import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementFormPopupComponent } from './announcement-form-popup.component';

describe('AnnouncementFormPopupComponent', () => {
  let component: AnnouncementFormPopupComponent;
  let fixture: ComponentFixture<AnnouncementFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementFormPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
