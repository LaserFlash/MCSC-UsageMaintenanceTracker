import { TestBed, inject } from '@angular/core/testing';

import { ThemeTrackerService } from './theme-tracker.service';

describe('ThemeTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeTrackerService]
    });
  });

  it('should be created', inject([ThemeTrackerService], (service: ThemeTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
