import { TestBed } from '@angular/core/testing';

import { LayoutNewQuotationService } from './layout-new-quotation.service';

describe('LayoutNewQuotationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayoutNewQuotationService = TestBed.get(LayoutNewQuotationService);
    expect(service).toBeTruthy();
  });
});
