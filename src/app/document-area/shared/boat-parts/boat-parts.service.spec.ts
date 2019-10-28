import { TestBed, inject } from '@angular/core/testing';

import { BoatPartsService } from './boat-parts.service';

describe('BoatPartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoatPartsService]
    });
  });

  it('should be created', inject([BoatPartsService], (service: BoatPartsService) => {
    expect(service).toBeTruthy();
  }));
});
