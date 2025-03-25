import { TestBed } from '@angular/core/testing';

import { OrganizerEventService } from './organizer-event.service';

describe('OrganizerEventService', () => {
  let service: OrganizerEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizerEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
