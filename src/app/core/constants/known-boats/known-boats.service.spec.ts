import { TestBed } from '@angular/core/testing';

import { KnownBoatsService } from './known-boats.service';

describe('KnownBoatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KnownBoatsService = TestBed.get(KnownBoatsService);
    expect(service).toBeTruthy();
  });
});
