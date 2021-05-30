import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataLoanService } from './data-loan.service';

describe('DataLoanService', () => {
  let injector: TestBed;
  let service: DataLoanService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ DataLoanService ]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(DataLoanService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    // const service: DataLoanService = TestBed.get(DataLoanService);
    expect(service).toBeTruthy();
  });

  describe('request getDataLimitAmount metod GET API', () => {
    it('return observable data de getDataLimitAmount', () => {
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

      const mockParam = {
        productId: 1,
        currencyId: 1
      };
      const subproductId = 1;
      const currencyId = 1;

      const mockData = {
        id: 1, minAmount: 100, maxAmount: 10000
      };

      service.getDataLimitAmount(mockUserLoggedInData).subscribe(result => {
        expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(`${service.API_URL_LIMITAMOUNT}${subproductId}${currencyId}`);
      expect(mockRequest.request.method).toBe('GET');

      mockRequest.flush(mockData);
    });
  });

  describe('request getDataLimitPeriod metod GET API', () => {
    it('return observable data de getDataLimitPeriod', () => {
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

      const mockParam = {
        productId: 1,
        periodId: 1
      };
      const subproductId = 1;

      const mockData = {
        id: 1, minPeriod: 180, maxPeriod: 360
      };

      service.getDataLimitPeriod(mockUserLoggedInData).subscribe(result => {
        expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(`${service.API_URL_LIMITPERIOD}${subproductId}${mockParam.periodId}`);
      expect(mockRequest.request.method).toBe('GET');

      mockRequest.flush(mockData);
    });
  });

  describe('request getRateForClient metod POST API', () => {
    it('return observable data of getRateForClient', () => {
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

      const mockParam = {
        period: '',
        amount: '',
        currencyId: 1,
        currencyName: 'SOLES',
        limitMinAmount: 0,
        limitMaxAmount: 0,
        periodId: 2,
        periodName: 'MES',
        periodFactor: '',
        limitMinPeriod: '',
        limitMaxPeriod: '',
        warrantyId: 1,
        warrantyName: 'SIN GARANTIA',
        disbursementDate: '',
        payDay: 0,
        protectionInsurance: 1,
        protectionInsuranceName: 'SIN SEGURO'
      };

      const mockData = {
        id: 436,
        customerId: 1,
        minRate: 0.0207,
        maxRate: 0.05,
        rateOfficeManager: 0.0182,
        rateRegionalManager: 0.0182,
        rateDivisionManager: 0.0162,
        rateIndividualCreditManager: 0.0121,
        optimalRate: 0.04
      };

      service.getRateForClient(mockParam, mockUserLoggedInData).subscribe(result => {
        expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(service.API_URL_RATE);
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.cancelled).toBeFalsy();
      expect(mockRequest.request.responseType).toEqual('json');
    });
  });
});
