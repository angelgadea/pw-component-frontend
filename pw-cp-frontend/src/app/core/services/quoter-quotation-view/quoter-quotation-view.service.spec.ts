import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuoterQuotationViewService } from './quoter-quotation-view.service';

describe('QuoterQuotationViewService', () => {
  let injector: TestBed;
  let service: QuoterQuotationViewService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule],
    providers: [ QuoterQuotationViewService]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(QuoterQuotationViewService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
