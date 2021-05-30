import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// interface
import { DataClient } from '../../models/data-client-model';
import { DataProducts } from '../../models/data-product-model';
import { DataLoan } from '../../models/data-loan-model';
import { DataUser } from '../../models/login-model';
// service
import { DataRateService } from '../quotation/data-rate.service';
import { IPBackend } from 'src/app/microservices/ip-development';
import { componentRate } from 'src/app/microservices/components-backend';
import { endpointQuoteSummary, endpointShowFilesQuote } from 'src/app/microservices/endpoints';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '../../models/quoter-quotation-view-model';

@Injectable({
  providedIn: 'root'
})
export class QuoterQuotationViewService {

  API_URL_QUOTESUMMARY = `${IPBackend}${componentRate}${endpointQuoteSummary}`;
  API_URL_FILESERVER = `${IPBackend}${componentRate}${endpointShowFilesQuote}`;

  public dataClient: DataClient;
  public dataProducts: DataProducts;
  public dataLoan: DataLoan;
  public dataUserName: any; 
  public quoteSummary = new BehaviorSubject({});
  dataSummary = this.quoteSummary.asObservable();

  public stateTemHistoryPage = new BehaviorSubject(false);
  temHistoryPage = this.stateTemHistoryPage.asObservable();

  public listFileTheServer = new BehaviorSubject([]);
  listFile = this.listFileTheServer.asObservable();

  constructor(private dataRateService: DataRateService,
              private http: HttpClient) {
  }

  addDataClientOfView(data: DataClient) { this.dataClient = data; }
  addDataProductOfView(data: DataProducts) { this.dataProducts = data; }
  addDataLoanOfView(data: DataLoan) { this.dataLoan = data; }

  showQuotation(dataOfUser: DataUser) {
    this.dataRateService.dataNewQuotation.subscribe(result => {
        const idQuote = result.quotationId;
        this.getQuoteSummary(idQuote, dataOfUser);
    });
  }

  getQuoteSummary(idQuote: any, dataOfUser: DataUser) {
    this.dataUserName = dataOfUser.username;
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);

    return this.http.get<Data>(`${this.API_URL_QUOTESUMMARY}${idQuote}`, {headers})
            .subscribe(result => {
              this.quoteSummary.next(result);
            });
  }

  getFilesOfServer(idQuote: any, dataOfUser: DataUser) {
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);

    return this.http.get(`${this.API_URL_FILESERVER}${idQuote}`, {headers})
            .subscribe((result: any) => this.listFileTheServer.next(result));
  }

}
