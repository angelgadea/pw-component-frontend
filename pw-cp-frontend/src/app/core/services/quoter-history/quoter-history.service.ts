import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

// Microservice
import { IPBackend } from '../../../microservices/ip-development';
import { componentRate } from '../../../microservices/components-backend';
import { endPointQuotationHistory } from '../../../microservices/endpoints';
// Interface
import { DataUser } from '../../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class QuoterHistoryService {

  API_URL_QUOTATIONHISTORY = `${IPBackend}${componentRate}${endPointQuotationHistory}`;

  public dataQuotationHistory: Observable<any>;

  public stateViewHistory = new BehaviorSubject(false);
  viewHistoryPage = this.stateViewHistory.asObservable();

  public stateTemHistory = new BehaviorSubject(true);
  temHistoryPage = this.stateTemHistory.asObservable();

  public stateFilePage = new BehaviorSubject(false);
  filePageOfHistory = this.stateFilePage.asObservable();

  constructor(private http: HttpClient) {
  }

  getQuotationHistory(quotationId: any, dataOfUser: DataUser) {
    const id = quotationId;
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);

    return this.dataQuotationHistory = this.http.get(`${this.API_URL_QUOTATIONHISTORY}${id}`, {headers});
  }
}
