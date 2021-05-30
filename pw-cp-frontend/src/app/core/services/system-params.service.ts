import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// microservice
import { IPBackend } from '../../microservices/ip-development';
import { componentSystemParams } from '../../microservices/components-backend';
import { endpointSystemParams } from '../../microservices/endpoints';
// interface
import { DataUser } from '../models/login-model';

const sessionTimeout = 'FE_SESSION_TIMEOUT_IN_SECONDS';

@Injectable({
  providedIn: 'root'
})
export class SystemParamsService {
  API_URL_SYSTEMPARAMS = `${IPBackend}${componentSystemParams}${endpointSystemParams}${sessionTimeout}`;

  public systemParams: Observable<any>;
  public loggedIn: DataUser;
  public userNameActive = '';

  constructor(private http: HttpClient) {
    this.subscribeDataUser();
  }

  getSystemParams() {
    const headers = new HttpHeaders()
    .set('userLoggedIn', this.userNameActive);
    return this.http.get(this.API_URL_SYSTEMPARAMS, {headers});
  }

  subscribeDataUser() {
    this.loggedIn = JSON.parse(sessionStorage.getItem('dataUser'));
    if (this.loggedIn) {
      this.userNameActive = this.loggedIn.username;
    } else {
      this.userNameActive = '';
    }
  }

}
