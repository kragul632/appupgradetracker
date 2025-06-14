import { TestBed } from '@angular/core/testing';

import { EffortSubmissionService } from './effort-submission.service';

describe('EffortSubmissionService', () => {
  let service: EffortSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EffortSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
