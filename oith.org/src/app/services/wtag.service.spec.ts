import { TestBed } from '@angular/core/testing';

import { WTagService } from './wtag.service';

describe('WTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WTagService = TestBed.get(WTagService);
    expect(service).toBeTruthy();
  });
});
