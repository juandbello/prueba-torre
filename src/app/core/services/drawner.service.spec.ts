import { TestBed } from '@angular/core/testing';

import { DrawnerService } from './drawner.service';

describe('DrawnerService', () => {
  let service: DrawnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
