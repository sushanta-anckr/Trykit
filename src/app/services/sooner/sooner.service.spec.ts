import { TestBed } from '@angular/core/testing';

import { SoonerService } from './sooner.service';

describe('SoonerService', () => {
  let service: SoonerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoonerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
