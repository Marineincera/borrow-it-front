import { TestBed } from '@angular/core/testing';

import { LoanStatusService } from './loan-status.service';

describe('LoanStatusService', () => {
  let service: LoanStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
