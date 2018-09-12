import { TestBed, inject } from '@angular/core/testing';

import { BoatUsageService } from './boat-usage.service';

describe('BoatUsageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoatUsageService]
    });
  });

  it('should be created', inject([BoatUsageService], (service: BoatUsageService) => {
    expect(service).toBeTruthy();
  }));
});
