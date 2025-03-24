import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormPopupComponent } from './event-form-popup.component';

describe('EventFormPopupComponent', () => {
  let component: EventFormPopupComponent;
  let fixture: ComponentFixture<EventFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFormPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
