import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmConversationComponent } from './dm-conversation.component';

describe('DmConversationComponent', () => {
  let component: DmConversationComponent;
  let fixture: ComponentFixture<DmConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmConversationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
