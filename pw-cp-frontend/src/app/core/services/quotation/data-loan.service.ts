import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// interface
import { DataLimitAmount,
         DataLimitPeriod,
         DataLoan} from '../../models/data-loan-model';
import { DataProducts } from '../../models/data-product-model';
import { DataUser } from '../../models/login-model';
// microservice
import { IPBackend } from '../../../microservices/ip-development';
import { componentProduct,
         componentRate } from '../../../microservices/components-backend';
import { endpointSubproductAmountLimit,
         endpointSubproductCurrency,
         endpointSubproductPeriod,
         endpointSubproductPeriodLimit,
         endpointRate } from '../../../microservices/endpoints';
import { DataClient } from '../../models/data-client-model';
// service
import { DataRateService } from './data-rate.service';
import { DataClientService } from './data-client.service';
// configuration
import { currencyId, periodData } from '../../../config/configuration-file';

@Injectable({
  providedIn: 'root'
})
export class DataLoanService {
  API_URL_CURRENCY = `${IPBackend}${componentProduct}${endpointSubproductCurrency}`;
  API_URL_LIMITAMOUNT = `${IPBackend}${componentProduct}${endpointSubproductAmountLimit}`;
  API_URL_PERIOD = `${IPBackend}${componentProduct}${endpointSubproductPeriod}`;
  API_URL_LIMITPERIOD = `${IPBackend}${componentProduct}${endpointSubproductPeriodLimit}`;
  API_URL_RATE = `${IPBackend}${componentRate}${endpointRate}`;

  public dataLimitAmount: Observable<DataLimitAmount>;
  public dataLimitPeriod: Observable<DataLimitPeriod>;
  public dataRate: Observable<any>;
  public dataClient: DataClient = {
    clientBank: '',
    documentId: 0,
    numberOfDocument: '',
    documentName: '',
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

  public dataProduct: DataProducts;
  public dataClientResponse: any;

  public activeLoan = new BehaviorSubject(true);
  loan = this.activeLoan.asObservable();

  public stateLoan = new BehaviorSubject(true);
  state = this.stateLoan.asObservable();

  public stateReset = new BehaviorSubject(false);
  reset = this.stateReset.asObservable();

  public newCalculateRate = new BehaviorSubject(false);
  newCalculate = this.newCalculateRate.asObservable();

  public commercialProfileId = 0;

  constructor(private http: HttpClient,
              private dataRateService: DataRateService,
              private dataClientService: DataClientService) {
              this.addDataRate();
  }

  addDataRate() {
    this.dataRateService.data.subscribe((result: any) => this.dataClient.id = result.customerId);
  }

  addDataProduct(data: DataProducts) { this.dataProduct = data; }
  addDataClient(data: DataClient) {this.dataClient = data; }

  getDataLimitAmount(dataOfUser: DataUser) {
    const subproductId = this.dataProduct.productId;
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);
    return this.http.get<DataLimitAmount>(`${this.API_URL_LIMITAMOUNT}${subproductId}/${currencyId}`, {headers});
  }

  getDataLimitPeriod(dataOfUser: DataUser) {
    this.subscribeDataClientModificProfileId();
    const subproductId = this.dataProduct.productId;
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);
    return this.http.get<DataLimitPeriod>(`${this.API_URL_LIMITPERIOD}${subproductId}/${periodData.periodId}`, {headers});
  }

  subscribeDataClientModificProfileId() {
      if (this.dataProduct.productId === 1) {
        this.commercialProfileId = this.dataClient.comercialProfileEmpresarioId;
      } else if (this.dataProduct.productId === 2) {
        this.commercialProfileId = this.dataClient.comercialProfileSuperFacilId;
      }
  }

  getRateForClient(dataLoan: DataLoan, dataOfUser: DataUser) {
    const amount = Number(dataLoan.amount);
    const dataOfClient = {
      customerId: this.dataClient.id,
      fTop: dataOfUser.cTop,
      subproductId: this.dataProduct.productId,
      currencyId: dataLoan.currencyId,
      warrantyId: dataLoan.warrantyId,
      basicSegmentId: this.dataClient.segmentId,
      commercialProfileId: this.commercialProfileId,
      modeId: this.dataProduct.modeId,
      employeeId: dataOfUser.employeeId,
      riskLevel: this.dataClient.score,
      periodId: periodData.periodId,
      periodFactor: periodData.periodFactor,
      period: dataLoan.period,
      loanAmount: amount,
      officeId: dataOfUser.officeId,
      fullName: this.dataClient.fullName,
      documentType: this.dataClient.documentId,
      documentCode: this.dataClient.numberOfDocument,
      assignedRepresentativeId: dataOfUser.employeeId
    };
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username)
    .set('Content-type', 'application/json');
    return this.dataRate = this.http.post(this.API_URL_RATE, dataOfClient, {headers});
  }


}
