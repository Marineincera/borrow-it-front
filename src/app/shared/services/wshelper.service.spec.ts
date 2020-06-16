import { TestBed } from '@angular/core/testing';

import { WshelperService } from './wshelper.service';

describe('WshelperService', () => {
  let service: WshelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WshelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
