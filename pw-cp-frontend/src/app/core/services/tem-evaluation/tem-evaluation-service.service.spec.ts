import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { TemEvaluationService } from './tem-evaluation.service';

const mockUserLoggedIn = {
  employeeId: 1,
  cTop: 1,
  employeeName: 'Ricardo',
  roleFeatureDtoList: [{featureId: 1, featureName: 'login', accessMode: 'N', landingPage: 0},
    {featureId: 2, featureName: 'new-quotation', accessMode: 'W', landingPage: 1},
    {featureId: 3, featureName: 'quoter-quotation-view', accessMode: 'W', landingPage: 0},
    {featureId: 4, featureName: 'quoter-inbox', accessMode: 'N', landingPage: 0},
    {featureId: 5, featureName: 'quoter-inbox-filter', accessMode: 'N', landingPage: 0},
    {featureId: 6, featureName: 'profile', accessMode: 'N', landingPage: 0},
    {featureId: 7, featureName: 'change-password-by-system', accessMode: 'W', landingPage: 0},
    {featureId: 8, featureName: 'change-forgotten-password', accessMode: 'N', landingPage: 0},
    {featureId: 9, featureName: 'quoter-history', accessMode: 'N', landingPage: 0},
    {featureId: 10, featureName: 'change-password-on-demand', accessMode: 'W', landingPage: 0}],
  id: 3,
  message: 'Usuario y contraseña correctos',
  officeId: 33,
  officeName: 'Comas',
  passwordToBeChanged: 0,
  roleId: 1,
  roleName: 'COTIZADOR',
  username: 'RRODRIGUEZ',
  immediateBossId: 2,
  employeeFirstSurName: 'Rodriguez',
  positionId: 1
};

describe('TemEvaluationServiceService', () => {
  let injector: TestBed;
  let service: TemEvaluationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ TemEvaluationService ]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(TemEvaluationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('request  getTemEvaluatio metod GET API', () => {
    it('return observable data of getTemEvaluation', () => {
      const id = 2;
      const mockData = {
          quotationId: 0,
          subproductId: 0,
          loanDays: 0,
          riskLevel: '',
          loanAmount: 0,
          basicSegmentId: 0,
          insuranceId: 0,
          subproductName: '',
          basicSegmentName: '',
          insuranceName: '',
          customerId: 0,
          customerName: '',
          minRate: 0,
          maxRate: 0,
          firstInstallment: 0,
          minRateApprover1: 0,
          minRateApprover2: 0,
          minRateApprover3: 0,
          minRateApprover4: 0,
          quoted_rate: '',
          inmmediateBoss: 0,
          positionId: 0,
          requested_rate: null,
        };
      service.getTemEvaluation(id, mockUserLoggedIn).subscribe(result => {
        expect(result).toBe(mockData);
      });

      const mockRequest = httpTestingController.expectOne(`${service.API_URL_QUOTATIONTEMEVALUATION}${id}`);
      expect(mockRequest.request.method).toBe('GET');

      mockRequest.flush(mockData);
    });
  });
  describe('request getTemEvaluationSustentation metod POST API', () => {
      it('return observable data of getTemEvaluationSustentation', () => {
        const id = 3;

        const mockData = [{
          quotationId: 0,
          comment: '',
          currentQuoterName: '',
          currentQuoterFirstSurName: '',
          roleNames: '',
          currentQuoterId: 0
        }];

        service.getTemEvaluationSustentation(id, mockUserLoggedIn).subscribe(result => {
          expect(result).toBe(mockData);
        });

        const mockRequest = httpTestingController.expectOne(`${service.API_URL_QUOTATIONTEMEVALUATIONSUSTENTATION}${id}`);
        expect(mockRequest.request.method).toBe('GET');

        mockRequest.flush(mockData);
      });
    });

  describe('request onLoginService metod POST API', () => {
        it('return observable data of onLoginService', () => {
          const mockParamDataTem = {
            quotationId: 0,
            subproductId: 0,
            loanDays: 0,
            riskLevel: '',
            loanAmount: 0,
            basicSegmentId: 0,
            insuranceId: 0,
            subproductName: '',
            basicSegmentName: '',
            insuranceName: '',
            customerId: 0,
            customerName: '',
            minRate: 0,
            maxRate: 0,
            firstInstallment: 0,
            minRateApprover1: 0,
            minRateApprover2: 0,
            minRateApprover3: 0,
            minRateApprover4: 0,
            quoted_rate: '',
            inmmediateBoss: 0,
            positionId: 0,
            requested_rate: null,  
          };
          const mockParamDatForm = {
            negotiatedRate: '',
            commentTemEvaluation: '',
            approvalLevel: 0,
            statusId: 0,
            inmediateBoss: '',
            approveRate: '',
            requestRate: '',
          };

          const mockData = {};


          service.postNewQuotationLifeCycle(mockParamDataTem, mockParamDatForm, mockUserLoggedIn).subscribe(result => {
            expect(result).toBe(mockData);
          });

          const mockReq = httpTestingController.expectOne(service.API_URL_NEWQUOTATIONLIFECYCLE);
          expect(mockReq.request.method).toBe('POST');
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
        });
      });
});
