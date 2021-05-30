import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AutoLogoutService } from './auto-logout.service';

describe('AutoLogoutService', () => {
  let injector: TestBed;
  let service: AutoLogoutService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, RouterTestingModule ],
    providers: [ AutoLogoutService]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(AutoLogoutService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    // const service: AutoLogoutService = TestBed.get(AutoLogoutService);
    expect(service).toBeTruthy();
  });
});
