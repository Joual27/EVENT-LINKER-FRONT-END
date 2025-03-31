import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPopupComponent } from './application-popup.component';

describe('ApplicationPopupComponent', () => {
  let component: ApplicationPopupComponent;
  let fixture: ComponentFixture<ApplicationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
