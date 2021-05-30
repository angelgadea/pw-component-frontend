import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataClientService } from './data-client.service';

describe('DataClientService', () => {
  let injector: TestBed;
  let service: DataClientService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [DataClientService]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(DataClientService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: DataClientService = TestBed.get(DataClientService);
    expect(service).toBeTruthy();
  });

  describe('request documentType metod GET API', () => {
    it('return observable data of documentType', () => {
      const mockUserLoggedInData = {
        employeeId: 1,
        cTop: 1,
        employeeName: 'Ricardo',
        roleFeatureDtoList: [{ featureId: 1, featureName: 'login', accessMode: 'N', landingPage: 0 },
        { featureId: 2, featureName: 'new-quotation', accessMode: 'W', landingPage: 1 },
        { featureId: 3, featureName: 'quoter-quotation-view', accessMode: 'W', landingPage: 0 },
        { featureId: 4, featureName: 'quoter-inbox', accessMode: 'N', landingPage: 0 },
        { featureId: 5, featureName: 'quoter-inbox-filter', accessMode: 'N', landingPage: 0 },
        { featureId: 6, featureName: 'profile', accessMode: 'N', landingPage: 0 },
        { featureId: 7, featureName: 'change-password-by-system', accessMode: 'W', landingPage: 0 },
        { featureId: 8, featureName: 'change-forgotten-password', accessMode: 'N', landingPage: 0 },
        { featureId: 9, featureName: 'quoter-history', accessMode: 'N', landingPage: 0 },
        { featureId: 10, featureName: 'change-password-on-demand', accessMode: 'W', landingPage: 0 }],
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
      const mockData = [
        { id: 1, documentName: 'DNI' },
        { id: 2, documentName: 'RUC' },
        { id: 3, documentName: 'PASAPORTE' },
        { id: 4, documentName: 'CARNET DE EXTRANJERÍA' }
      ];

      service.getDocumentType(mockUserLoggedInData).subscribe(result => {
        expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(service.API_URL_DOCTYPE);
      expect(mockRequest.request.method).toBe('GET');
      expect(mockRequest.cancelled).toBeFalsy();
      expect(mockRequest.request.responseType).toEqual('json');
    });
  });

  describe('request getDataClientService metod GET API', () => {
    it('return observable data of getDataClient', () => {
      const mockUserLoggedInData = {
        employeeId: 1,
        cTop: 1,
        employeeName: 'Ricardo',
        roleFeatureDtoList: [{ featureId: 1, featureName: 'login', accessMode: 'N', landingPage: 0 },
        { featureId: 2, featureName: 'new-quotation', accessMode: 'W', landingPage: 1 },
        { featureId: 3, featureName: 'quoter-quotation-view', accessMode: 'W', landingPage: 0 },
        { featureId: 4, featureName: 'quoter-inbox', accessMode: 'N', landingPage: 0 },
        { featureId: 5, featureName: 'quoter-inbox-filter', accessMode: 'N', landingPage: 0 },
        { featureId: 6, featureName: 'profile', accessMode: 'N', landingPage: 0 },
        { featureId: 7, featureName: 'change-password-by-system', accessMode: 'W', landingPage: 0 },
        { featureId: 8, featureName: 'change-forgotten-password', accessMode: 'N', landingPage: 0 },
        { featureId: 9, featureName: 'quoter-history', accessMode: 'N', landingPage: 0 },
        { featureId: 10, featureName: 'change-password-on-demand', accessMode: 'W', landingPage: 0 }],
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
        clientBank: '',
        documentId: 1,
        numberOfDocument: '12345671',
        documentName: 'DNI',
        commercialProfileId: 0,
        creationDate: '',
        id: 0,
        linkage: '',
        fullName: '',
        segmentId: 0,
        segmentName: '',
        score: '',
        amount: 0,
        rate: 0,
        customerCode: '',
        comercialProfileEmpresarioId: 0,
        comercialProfileSuperFacilId: 0
      };

      const mockData = {
        id: 1,
        customerCode: 'CO12345678',
        fullName: 'TOMAS SUAREZ',
        documentType: 1,
        documentCode: '12345671',
        segmentId: 1,
        segmentName: 'BAJO',
        linkage: 1,
        channel: 'Oficina',
        riskLevel: 'C',
        creationDate: '2020-02-28T19:17:45.507+0000',
        officeId: 33,
        officeName: 'Comas',
        assignedRepresentativeId: 1,
        assignedRepresentativeName: null,
        rate: 5,
        amount: 45000,
        comercialProfileEmpresarioId: 1,
        comercialProfileSuperFacilId: 6,
        commercialProfileNameEmpresario: 'PEQUEÑO NO CLIENTE',
        commercialProfileNameSuperFacil: 'NUEVO/REINGRESO',
        newCustomer: 0
      };

      service.getDataClient(mockParam, mockUserLoggedInData).subscribe(result => {
        expect(result).toEqual(mockData);
      });

      const mockRequest = httpTestingController.expectOne(`${service.API_URL_CLIENT}${mockParam.documentId}/${mockParam.numberOfDocument}`);
      expect(mockRequest.request.method).toBe('GET');

      mockRequest.flush(mockData);
    });
  });


});
