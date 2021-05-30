import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

// microservice
import { IPBackend } from '../../../microservices/ip-development';
import { componentRate } from '../../../microservices/components-backend';
import { endpointQuotationInbox } from '../../../microservices/endpoints';
// interface
import { DataUser } from '../../models/login-model';
import { DataQuotation } from '../../models/quoter-inbox';

@Injectable({
  providedIn: 'root'
})
export class QuoterInboxService {
  API_URL_QUOTATIONINBOX = `${IPBackend}${componentRate}${endpointQuotationInbox}`;

  constructor(private http: HttpClient) {
  }

  getQuotationInbox(pageNumber: any, dataOfUser: DataUser) {
    const page = pageNumber;
    const userId = dataOfUser.id;
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);

    return this.http.get<DataQuotation[]>(`${this.API_URL_QUOTATIONINBOX}${page}/${userId}`, {headers});
  }
}
