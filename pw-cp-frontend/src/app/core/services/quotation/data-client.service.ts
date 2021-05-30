import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// interface
import { DataDocumentType, DataClient } from '../../models/data-client-model';
import { DataUser } from '../../models/login-model';
// microservice
import { IPBackend } from '../../../microservices/ip-development';
import { componentCustomer } from '../../../microservices/components-backend';
import { endpointDocumentType, endpointIncomeRanges, endpointCustomer} from '../../../microservices/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DataClientService {
  API_URL_DOCTYPE = `${IPBackend}${componentCustomer}${endpointDocumentType}`;
  API_URL_CLIENT = `${IPBackend}${componentCustomer}${endpointCustomer}`;
  API_URL_INCOMERANGES = `${IPBackend}${componentCustomer}${endpointIncomeRanges}`;

  public dataClients: Observable<any>;

  public stateReset = new BehaviorSubject(true);
  reset = this.stateReset.asObservable();

  constructor(private http: HttpClient) {
  }

  getDocumentType(dataOfUser: DataUser) {
    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username);
    return this.http.get(this.API_URL_DOCTYPE, {headers}); 
  }

  getDataClient(dataClient: DataClient, dataOfUser: DataUser) {
    const documentId = dataClient.documentId;
    const numberOfDocument = dataClient.numberOfDocument;

    const headers = new HttpHeaders()
    .set('userLoggedIn', dataOfUser.username); 
    return this.dataClients = this.http.get(`${this.API_URL_CLIENT}${documentId}/${numberOfDocument}`, {headers});
  } 
  
}
