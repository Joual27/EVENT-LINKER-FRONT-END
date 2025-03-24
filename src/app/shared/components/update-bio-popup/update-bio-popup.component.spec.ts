import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBioPopupComponent } from './update-bio-popup.component';

describe('UpdateBioPopupComponent', () => {
  let component: UpdateBioPopupComponent;
  let fixture: ComponentFixture<UpdateBioPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBioPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBioPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
