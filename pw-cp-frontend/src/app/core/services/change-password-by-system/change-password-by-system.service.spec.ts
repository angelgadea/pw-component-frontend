import { TestBed, getTestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { ChangePasswordBySystemService } from './change-password-by-system.service';

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

describe('ChangePasswordBySystemService', () => {
  let injector: TestBed;
  let service: ChangePasswordBySystemService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule],
    providers: [ChangePasswordBySystemService]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(ChangePasswordBySystemService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    // const service: ChangePasswordBySystemService = TestBed.get(ChangePasswordBySystemService);
    expect(service).toBeTruthy();
  });

  describe('request onChnagePassword metod POST API', () => {
    it('return observable data of onChangePassword', () => {
      const mockParam = {
        newPassword: 'Qwer1234*',
        repeatPassword: 'Qwer1234*'
      };

      const mockData = {};

      service.onChangePassword(mockParam, mockUserLoggedInData).subscribe(result => {
      expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(service.API_URL_CHANGEPASSWORDBYSYSTEM);
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.cancelled).toBeFalsy();
      expect(mockRequest.request.responseType).toEqual('json');
    });
  });
});
