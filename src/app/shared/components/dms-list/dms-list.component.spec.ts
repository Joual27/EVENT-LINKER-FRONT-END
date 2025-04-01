import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsListComponent } from './dms-list.component';

describe('DmsListComponent', () => {
  let component: DmsListComponent;
  let fixture: ComponentFixture<DmsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
