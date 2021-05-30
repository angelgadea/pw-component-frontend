import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, from, Subject } from 'rxjs';

// microservice
import { IPBackend } from '../../../microservices/ip-development';
import {
  componentRate,
  componentEmail,
  componentSystemParams
} from '../../../microservices/components-backend';
import {
  endpointFirstQuota,
  endpointSaveQuotation,
  endpointSendRequest,
  endpointApprovallevel,
  endpointSendEmailQuotePending,
  endpointAttachFile,
  endpointSaveFileBD
} from '../../../microservices/endpoints';
// interface
import {
  DataForFirstInstallment,
  DataNewRequestQuotation,
  DataRate
} from '../../models/data-rate-model';
import { DataLoan } from '../../models/data-loan-model';
import { DataClient } from '../../models/data-client-model';
import { DataProducts } from '../../models/data-product-model';
import { DataUser } from '../../models/login-model';
// configuration
import { periodData } from '../../../config/configuration-file';
import { concatMap, mergeMap, delay, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataRateService {
  API_URL_APPROVALLEVEL = `${IPBackend}${componentRate}${endpointApprovallevel}`;
  API_URL_INSTALLMENT = `${IPBackend}${componentRate}${endpointFirstQuota}`;
  API_URL_NEWQUOTATION = `${IPBackend}${componentRate}${endpointSaveQuotation}`;
  API_URL_NEWREQUEST = `${IPBackend}${componentRate}${endpointSendRequest}`;
  API_URL_SENDQUOTEPENDINGEMAIL = `${IPBackend}${componentEmail}${endpointSendEmailQuotePending}`;
  API_URL_ATTACHFILE = `${IPBackend}${componentSystemParams}${endpointAttachFile}`;
  API_URL_SAVEFILEINSERVER = `${IPBackend}${componentRate}${endpointSaveFileBD}`;

  public dataApprovalLevel: Observable<any>;
  public dataInstallment: Observable<any>;
  public dataInstallmentMinRate: Observable<any>;
  public dataNewQuotation: Observable<any>;
  public dataNewRequest: Observable<any>;
  public filesBoolean: Observable<any>;

  public dataFiles = new BehaviorSubject(false);
  file = this.dataFiles.asObservable();

  public dataFilesComplete = new BehaviorSubject([]);
  filesComplete = this.dataFilesComplete.asObservable();

  public activeRate = new BehaviorSubject(true);
  rate = this.activeRate.asObservable();

  public dataLoan = new BehaviorSubject({});
  loanData = this.dataLoan.asObservable();

  public dataRate = new BehaviorSubject({});
  data = this.dataRate.asObservable();

  public stateRate = new BehaviorSubject(true);
  state = this.stateRate.asObservable();

  public stateReset = new BehaviorSubject(true);
  reset = this.stateReset.asObservable();

  public firstInstallmentMinRate = new BehaviorSubject(0);
  firstMinRate = this.firstInstallmentMinRate.asObservable();

  public firstInstallmentOptimaRate = new BehaviorSubject(0);
  firstOptimalRate = this.firstInstallmentOptimaRate.asObservable();

  public dataClient: DataClient;
  public dataProduct: DataProducts;
  public dataLoanSub: DataLoan;

  public dataForFirstInstallment: DataForFirstInstallment = {
    loanAmount: 0,
    periodId: 0,
    periodFactor: 0,
    period: 0,
    rate: 0
  };

  public dataNewRequestQuotation: DataNewRequestQuotation = {
    userId: 0,
    currencyId: 0,
    incomeRangeId: 0,
    modeId: 0,
    subproductId: 0,
    warrantyId: 0,
    customerId: 0,
    loanAmount: 0,
    period: 0,
    periodFactor: 0,
    quotedRate: 0,
    requestedRate: 0,
    creatorUser: '',
    comment: ''
  };

  public dateFirstQuote = '';
  private listFiles = [];
  public insuranceQuotes: any;
  public listArr = [];

    // rate preferential //

    sendMessageSubject = new Subject<any>();
    sendMessageObservable$ = this.sendMessageSubject.asObservable();

    // ------------------------//

  constructor(private http: HttpClient) { }

  addDataLoan(data) {
    this.dataLoanSub = data;
  }
  addDataClient(data) {
    this.dataClient = data;
  }
  addDataProduct(data) {
    this.dataProduct = data;
  }

  calculateDateFirstQuote() {
    const formatDate = this.dataLoanSub.disbursementDate
      .split('/')
      .reverse()
      .join('-');
    const payDay = Number(this.dataLoanSub.payDay);
    const date = new Date(formatDate);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const monthNew = month + 1;
    const year = date.getFullYear();
    if (payDay > day || payDay <= day) {
      if (month < 10 && payDay > 10) {
        this.dateFirstQuote = `${year}-${'0' + monthNew}-${payDay}`;
      } else if (payDay < 10 && month < 10) {
        this.dateFirstQuote = `${year}-${'0' + monthNew}-${'0' + payDay}`;
      } else if (payDay <= 10) {
        this.dateFirstQuote = `${year}-${'0' + monthNew}-${payDay}`;
      } else {
        this.dateFirstQuote = `${year}-${monthNew}-${payDay}`;
      }
    }
  }

 getFirstInstallment(dataR: DataRate, dataOfUser: DataUser) {
    this.calculateDateFirstQuote();
    if (this.dataLoanSub.protectionInsurance === '1') {
      this.insuranceQuotes = 0;
    } else if (this.dataLoanSub.protectionInsurance === '2') {
      this.insuranceQuotes = 8;
    } else if (this.dataLoanSub.protectionInsurance === '3') {
      this.insuranceQuotes = 10;
    }
    const formatDate = this.dataLoanSub.disbursementDate
      .split('/')
      .reverse()
      .join('-');
    const dataFirstInstallment = {
      dateDisbursement: formatDate,
      dateFirstQuote: this.dateFirstQuote,
      insuranceQuote: this.insuranceQuotes,
      loanAmount: Number(this.dataLoanSub.amount),
      quotedRate: dataR.rateAgreed / 100,
      quota: this.dataLoanSub.period
    };
    const headers = new HttpHeaders()
      .set('userLoggedIn', dataOfUser.username)
      .set('Cotent-Type', 'application/json');
    return (this.dataInstallment = this.http.post(
      this.API_URL_INSTALLMENT,
      dataFirstInstallment,
      { headers }
    ));
  }

  getFirstInstallmentMinRate(data: any, dataOfUser: DataUser) {
    this.calculateDateFirstQuote();
    if (this.dataLoanSub.protectionInsurance === '1') {
      this.insuranceQuotes = 0;
    } else if (this.dataLoanSub.protectionInsurance === '2') {
      this.insuranceQuotes = 8;
    } else if (this.dataLoanSub.protectionInsurance === '3') {
      this.insuranceQuotes = 10;
    }
    const minRates = Number(data.minRate);
    const formatDate = this.dataLoanSub.disbursementDate
      .split('/')
      .reverse()
      .join('-');
    const dataFirstInstallment = {
      dateDisbursement: formatDate,
      dateFirstQuote: this.dateFirstQuote,
      insuranceQuote: this.insuranceQuotes,
      loanAmount: Number(this.dataLoanSub.amount),
      quotedRate: minRates,
      quota: this.dataLoanSub.period
    };
    const headers = new HttpHeaders()
      .set('userLoggedIn', dataOfUser.username)
      .set('Cotent-Type', 'application/json');
    return this.http
      .post(this.API_URL_INSTALLMENT, dataFirstInstallment, { headers })
      .subscribe((result: any) => this.firstInstallmentMinRate.next(result));
  }

  getFirstInstallmentOptimalRate(data: any, dataOfUser: DataUser) {
    this.calculateDateFirstQuote();
    if (this.dataLoanSub.protectionInsurance === '1') {
      this.insuranceQuotes = 0;
    } else if (this.dataLoanSub.protectionInsurance === '2') {
      this.insuranceQuotes = 8;
    } else if (this.dataLoanSub.protectionInsurance === '3') {
      this.insuranceQuotes = 10;
    }
    const optimalRates = Number(data.optimalRate);
    const formatDate = this.dataLoanSub.disbursementDate
      .split('/')
      .reverse()
      .join('-');
    const dataFirstInstallment = {
      dateDisbursement: formatDate,
      dateFirstQuote: this.dateFirstQuote,
      insuranceQuote: this.insuranceQuotes,
      loanAmount: Number(this.dataLoanSub.amount),
      quotedRate: optimalRates,
      quota: this.dataLoanSub.period
    };
    const headers = new HttpHeaders()
      .set('userLoggedIn', dataOfUser.username)
      .set('Cotent-Type', 'application/json');
    return this.http
      .post(this.API_URL_INSTALLMENT, dataFirstInstallment, { headers })
      .subscribe((result: any) => this.firstInstallmentOptimaRate.next(result));
  }

  getApprovalLevel(data: DataRate, dataOfUser: DataUser) {
    const dataRequest = {
      quotedRate: data.rateAgreed,
      minRate: data.minRate,
      rateOfficeManager: data.rateOfficeManager,
      rateRegionalManager: data.rateRegionalManager,
      rateDivisionManager: data.rateDivisionManager,
      rateIndividualCreditManager: data.rateIndividualCreditManager
    };
    const headers = new HttpHeaders().set('userLoggedIn', dataOfUser.username);

    return (this.dataApprovalLevel = this.http.post(
      this.API_URL_APPROVALLEVEL,
      dataRequest,
      { headers }
    ));
  }

  postNewQuotation(dataOfUser: DataUser, dataR: DataRate) {
    const formatDate = this.dataLoanSub.disbursementDate
      .split('/')
      .reverse()
      .join('-');
    const formatdateNew = formatDate;
    const newQuotation = {
      currencyId: this.dataLoanSub.currencyId,
      modeId: this.dataProduct.modeId,
      subproductId: this.dataProduct.productId,
      warrantyId: this.dataLoanSub.warrantyId,
      customerId: dataR.id,
      loanAmount: this.dataLoanSub.amount,
      basigSegmentId: this.dataClient.segmentId,
      riskLevel: this.dataClient.score,
      insuranceId: this.dataLoanSub.protectionInsurance,
      period: this.dataLoanSub.period,
      periodId: periodData.periodId,
      deliveryDate: formatdateNew,
      payDay: this.dataLoanSub.payDay,
      approvalLevel: dataR.approvalLevel,
      periodFactor: periodData.periodFactor,
      creatorUser: dataOfUser.username,
      userId: dataOfUser.id,
      quotedRate: dataR.rateAgreed,
      immediateBoss: dataOfUser.immediateBossId,
      requestedRate: null,
      comment: dataR.commentRatePreferential,
      minRate: dataR.minRate,
      maxRate: dataR.maxRate,
      firstInstallment: dataR.installment,
      minRateApprover1: dataR.rateOfficeManager,
      minRateApprover2: dataR.rateRegionalManager,
      minRateApprover3: dataR.rateDivisionManager,
      minRateApprover4: dataR.rateIndividualCreditManager,
      officeId: dataOfUser.officeId,
      disbursementRate: this.dataClient.rate,
      disbursementAmount: this.dataClient.amount,
      optimalRate: dataR.optimalRate
    };
    const headers = new HttpHeaders().set('userLoggedIn', dataOfUser.username);
    return (this.dataNewQuotation = this.http.post(
      this.API_URL_NEWQUOTATION,
      newQuotation,
      { headers }
    ));
  }

  sendQuotePendingApprovalEmail(dataBody: any, dataOfUser: DataUser) {
    const headers = new HttpHeaders().set('userLoggedIn', dataOfUser.username);
    const body = {
      name: dataBody.approverUsername,
      customerName: dataBody.customerFullName,
      documentNumber: dataBody.documentCode,
      recipient: dataBody.approverEmail,
      quotatioId: dataBody.quotationId
    };

    return this.http.post(this.API_URL_SENDQUOTEPENDINGEMAIL, body, {
      headers
    });
  }

  sendObjectFiles(objectFile: any, dataOfUser: DataUser, quotatioId: any) {
    const customerId = String(this.dataClient.id);
    const formDataBodyArr = [];
    const headers = new HttpHeaders()
      .set('userLoggedIn', dataOfUser.username)
      .set('customerIdIn', customerId)
      .set('Accept', 'application/json');

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < objectFile.length; i++) {
      const formDataBody = new FormData();
      formDataBody.append('file', objectFile[i]);
      formDataBodyArr.push(formDataBody);
    }

    return new Promise((resolve, reject) => {
      this.sendPetitionMultiple(formDataBodyArr, headers).subscribe(
        result => {
          this.saveFileInServer(result, quotatioId, dataOfUser).subscribe(
            (resultSave: any) => {
              this.dataFiles.next(resultSave);
              this.listArr = [];
              this.listFiles = [];
              resolve(resultSave);
            }
          );
        },
        error => (error)
      );
    });
  }

  sendPetitionMultiple(arr, headers) {
    return from(arr)
      .pipe(
        mergeMap(formDataBody => {
          return  (
            this.http.post(this.API_URL_ATTACHFILE, formDataBody, { headers })
          ) as Observable<any>;
        })
      )
      .pipe(toArray());
  }

  saveFileInServer(dataFile: any, idQuote: any, dataOfUser: DataUser) {
    const headers = new HttpHeaders()
      .set('userLoggedIn', dataOfUser.username)
      .set('Content-Type', 'application/json');
    dataFile.forEach(element => {
      const body = {
        quotationId: idQuote,
        nameDocument: element.name
      };
      return this.listFiles.push(body);
    });

    return this.http.post(this.API_URL_SAVEFILEINSERVER, this.listFiles, {
      headers
    });
  }

    // --------------------------- //

    sendMessageRatePreferential(disabledContent?: boolean, rate?: any) {
      const data = {
        disabledContent,
        rate,
      };
      this.sendMessageSubject.next(data);
    }

}
