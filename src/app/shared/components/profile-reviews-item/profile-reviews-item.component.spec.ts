import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReviewsItemComponent } from './profile-reviews-item.component';

describe('ProfileReviewsItemComponent', () => {
  let component: ProfileReviewsItemComponent;
  let fixture: ComponentFixture<ProfileReviewsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileReviewsItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileReviewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
