import { TestBed } from '@angular/core/testing';

import { FriendshipStatusService } from './friendship-status.service';

describe('FriendshipStatusService', () => {
  let service: FriendshipStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendshipStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
