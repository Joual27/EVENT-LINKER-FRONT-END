import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsPageComponent } from './dms-page.component';

describe('DmsPageComponent', () => {
  let component: DmsPageComponent;
  let fixture: ComponentFixture<DmsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
