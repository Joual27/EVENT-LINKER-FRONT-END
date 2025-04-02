import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmItemComponent } from './dm-item.component';

describe('DmItemComponent', () => {
  let component: DmItemComponent;
  let fixture: ComponentFixture<DmItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
