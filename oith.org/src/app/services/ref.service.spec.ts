import { TestBed } from '@angular/core/testing';

import { RefService } from './ref.service';

describe('RefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefService = TestBed.get(RefService);
    expect(service).toBeTruthy();
  });
});
