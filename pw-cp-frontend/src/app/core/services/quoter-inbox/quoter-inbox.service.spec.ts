import { TestBed } from '@angular/core/testing';

import { QuoterInboxService } from './quoter-inbox.service';

describe('QuoterInboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuoterInboxService = TestBed.get(QuoterInboxService);
    expect(service).toBeTruthy();
  });
});
