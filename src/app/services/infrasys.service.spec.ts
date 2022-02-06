import { TestBed } from '@angular/core/testing';

import { InfrasysService } from './infrasys.service';

describe('InfrasysService', () => {
  let service: InfrasysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfrasysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
