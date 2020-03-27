import { TestBed } from '@angular/core/testing';

import { ConstsUrlService } from './consts-url.service';

describe('ConstsUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstsUrlService = TestBed.get(ConstsUrlService);
    expect(service).toBeTruthy();
  });
});
