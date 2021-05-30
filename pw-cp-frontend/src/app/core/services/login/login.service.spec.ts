import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
 
import { LoginService } from '../../services/login/login.service';

describe('LoginService', () => {
  let injector: TestBed;
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, RouterTestingModule ],
    providers: [ LoginService ]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(LoginService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    // const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  describe('request onLoginService metod POST API', () => {
    it('return observable data of onLoginService', () => {
      const mockParam = {
        user: 'rrodriguez',
        password: 'Qwer1234*'
      };

      const mockData = {
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

      service.onLoginService(mockParam).subscribe(result => {
        expect(result).toBe(mockData);
      });

      const mockReq = httpTestingController.expectOne(`${service.API_URL_LOGIN}`);
      expect(mockReq.request.method).toBe('POST');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });
  });
});
