import { TestBed } from '@angular/core/testing';

import { GameConsoleService } from './game-console.service';

describe('GameConsoleService', () => {
  let service: GameConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
