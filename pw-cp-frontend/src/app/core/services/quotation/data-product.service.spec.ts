import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataProductService } from './data-product.service';

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

describe('DataProductService', () => {
  let injector: TestBed;
  let service: DataProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule],
    providers: [ DataProductService]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(DataProductService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('request getDataSubproducts metod GET API', () => {
    it('return observable data of getDataSubproduct', () => {
      const mockParam = {
        productId: 1,
      };

      const mockData = [
        {id: 1, name: 'EMPRESARIO'},
        {id: 2, name: 'SUPER FACIL'}
      ];

      service.getDataSubproducts(mockUserLoggedInData).subscribe(result => {
        expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(`${service.API_URL_SUBPRODUCTS}${mockParam.productId}`);
      expect(mockRequest.request.method).toBe('GET');

      mockRequest.flush(mockData);
    });
  });

  describe('request getDataMode metod GET API', () => {
    it('return observable data de getDataMode', () => {
      const mockParam = {
        productId: 1,
        productName: '',
        modeId: 1,
        modeName: 'NUEVO',
      };

      const subProductId = mockParam.productId;

      const mockData = [
        {id: 1, name: 'LINEAL'}
      ];

      service.getDataMode(mockParam, mockUserLoggedInData).subscribe(result => {
        expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(`${service.API_URL_MODE}${subProductId}`);
      expect(mockRequest.request.method).toBe('GET');

      mockRequest.flush(mockData);
    });
  });
});
