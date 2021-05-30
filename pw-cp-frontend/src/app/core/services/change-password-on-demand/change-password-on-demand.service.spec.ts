import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { ChangePasswordOnDemandService } from './change-password-on-demand.service';

describe('ChangePasswordOnDemandService', () => {
  let injector: TestBed;
  let service: ChangePasswordOnDemandService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule],
    providers: [ ChangePasswordOnDemandService]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(ChangePasswordOnDemandService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    // const service: ChangePasswordOnDemandService = TestBed.get(ChangePasswordOnDemandService);
    expect(service).toBeTruthy();
  });

  describe('request onUserChangePassword metod POST API', () => {
    it('return observable data of onUserChangePassword', () => {

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
        currentPassword: 'Qwer1234*',
        newPassword: 'Qwert12345*',
        repeatPassword: 'Qwert12345*'
      };

      const mockData = true;

      service.onUserChangePassword(mockParam, mockUserLoggedInData).subscribe(result => {
      expect(result).toEqual(mockData);
      });

      const monckRequest = httpTestingController.expectOne(service.API_URL_CHANGEPASSWORDONDEMAND);
      expect(monckRequest.request.method).toBe('POST');
      expect(monckRequest.cancelled).toBeFalsy();
      expect(monckRequest.request.responseType).toEqual('json');
    });
  });
});
