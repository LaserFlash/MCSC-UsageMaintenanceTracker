import { TestBed, inject } from '@angular/core/testing';

import { SafetyDocsService } from './safety-docs.service';

describe('SafetyDocsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafetyDocsService]
    });
  });

  it('should be created', inject([SafetyDocsService], (service: SafetyDocsService) => {
    expect(service).toBeTruthy();
  }));
});
