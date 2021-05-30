import { TestBed, getTestBed} from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { SystemParamsService } from './system-params.service';

describe('SystemParamsService', () => {
  let injector: TestBed;
  let service: SystemParamsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ SystemParamsService ]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(SystemParamsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('request  getSystemParams metod GET API', () => {
    it('return observable data of getSystemParams', () => {

      const mockData = 15;
      service.getSystemParams().subscribe(result => {
        expect(result).toBe(mockData);
      });

      const mockRequest = httpTestingController.expectOne(service.API_URL_SYSTEMPARAMS);
      expect(mockRequest.request.method).toBe('GET');

      mockRequest.flush(mockData);
    });
  });

});
