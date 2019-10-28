import { TestBed, inject } from '@angular/core/testing';
import { BoatBreakageService } from './boat-breakage.service';

describe('BoatBreakageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoatBreakageService]
    });
  });

  it('should be created', inject([BoatBreakageService], (service: BoatBreakageService) => {
    expect(service).toBeTruthy();
  }));
});
