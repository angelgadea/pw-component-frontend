import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { DataRateService } from './data-rate.service';

const mockUserLoggedInData = {
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

describe('DataRateService', () => {
  let injector: TestBed;
  let service: DataRateService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule],
    providers: [ DataRateService]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(DataRateService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    // const service: DataRateService = TestBed.get(DataRateService);
    expect(service).toBeTruthy();
  });

  describe('request getFirstInstallment metod POST API', () => {
    it('return observable data of getFirtInstallment', () => {
      const dataLoanSub = {
        disbursementDate: '20 / 03 / 2020'
      };

      const formatDate = this.dataLoanSub.disbursementDate.split('/').reverse().join('-');
      const mockParam = {
        id: 0,
        customerId: 0,
        minRate: '',
        maxRate: '',
        rateOfficeManager: '',
        rateRegionalManager: '',
        rateDivisionManager: '',
        rateIndividualCreditManager: '',
        rateAgreed: '',
        typeOfCurrency: '',
        commentRatePreferential: null,
        installment: 0,
        approvalLevel: '',
        approvalLevelPosition: '',
        optimalRate: '',
      };

      const mockData = 4560.12;

      service.getFirstInstallment(mockParam, mockUserLoggedInData).subscribe(result => {
        expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(service.API_URL_INSTALLMENT);
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.cancelled).toBeFalsy(),
      expect(mockRequest.request.responseType).toEqual('NUMBER');
    });
  });

  describe('request getApproverLevel metod POST API', () => {
    it('return observable data of getApproverLevel', () => {
      const mockParam = {
        id: 0,
        customerId: 0,
        minRate: '',
        maxRate: '',
        rateOfficeManager: '',
        rateRegionalManager: '',
        rateDivisionManager: '',
        rateIndividualCreditManager: '',
        rateAgreed: '',
        typeOfCurrency: '',
        commentRatePreferential: null,
        installment: 0,
        approvalLevel: '',
        approvalLevelPosition: '',
        optimalRate: '',
      };

      const mockData = {
        approvalLevel: 1,
        approvalLevelPosition: 'jefe de crédito'
      };

      service.getApprovalLevel(mockParam, mockUserLoggedInData).subscribe(result => {
        expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(service.API_URL_APPROVALLEVEL);
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.cancelled).toBeFalsy();
      expect(mockRequest.request.responseType).toEqual('json');
    });
  });

  describe('request postNewQuotation metod POST API', () => {
    it('return observable of postNewQuotation', () => {
      const mockParam = {
        id: 0,
        customerId: 0,
        minRate: '',
        maxRate: '',
        rateOfficeManager: '',
        rateRegionalManager: '',
        rateDivisionManager: '',
        rateIndividualCreditManager: '',
        rateAgreed: '',
        typeOfCurrency: '',
        commentRatePreferential: null,
        installment: 0,
        approvalLevel: '',
        approvalLevelPosition: '',
        optimalRate: '',
      };

      const mockData = {};

      service.postNewQuotation(mockUserLoggedInData, mockParam).subscribe(result => {
        expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(service.API_URL_NEWQUOTATION);
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.cancelled).toBeFalsy();
      expect(mockRequest.request.responseType).toEqual('json');
    });
  });
});
