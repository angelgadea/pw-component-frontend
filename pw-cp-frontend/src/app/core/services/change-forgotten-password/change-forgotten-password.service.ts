import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// microservice
import { IPBackend } from '../../../microservices/ip-development';
import { componentUserRecoverPassword } from '../../../microservices/components-backend';
import { endpointRecoverPassword } from '../../../microservices/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ChangeForgottenPasswordService {
  API_URL_USERECOVERPASSWORD = `${IPBackend}${componentUserRecoverPassword}${endpointRecoverPassword}`;

  public userRecoverPassword: Observable<any>;

  constructor(private http: HttpClient) {
  }

  sendUserForRecoverPassword(user: any) {
    const data = user.user;
    const headers = new HttpHeaders()
    .set('userLoggedIn', user.user);
    return this.userRecoverPassword = this.http.get(`${this.API_URL_USERECOVERPASSWORD}/${data}`, {headers});
  }
}
