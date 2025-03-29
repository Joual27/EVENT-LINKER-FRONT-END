import { TestBed } from '@angular/core/testing';

import { OrganizerAnnouncementsService } from './organizer-announcements.service';

describe('OrganizerAnnouncementsService', () => {
  let service: OrganizerAnnouncementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizerAnnouncementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
