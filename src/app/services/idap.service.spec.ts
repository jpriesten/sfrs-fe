import { TestBed } from '@angular/core/testing';

import { IdapService } from './idap.service';

describe('IdapService', () => {
  let service: IdapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
