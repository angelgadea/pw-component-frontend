import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// microservices
import { IPBackend } from '../../../microservices/ip-development';
import { componentUserLogin } from '../../../microservices/components-backend';
import { endpointChangePassword } from '../../../microservices/endpoints';

// interface
import { DataUserOfPasswordChange } from '@core/models/change-password-on-demand';
import { DataUser } from '@core/models/login-model';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordOnDemandService {

  API_URL_CHANGEPASSWORDONDEMAND = `${IPBackend}${componentUserLogin}${endpointChangePassword}`;

  public dataRequestChangePassword: Observable<any>;

  constructor(private http: HttpClient) {
  }

  onUserChangePassword(dataPassword: DataUserOfPasswordChange, dataOfUser: DataUser) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('userId', dataOfUser.id.toString())
    .set('name', dataOfUser.employeeName)
    .set('currentPassword', dataPassword.currentPassword)
    .set('newPassword', dataPassword.newPassword)
    .set('userLoggedIn', dataOfUser.username);
    return this.dataRequestChangePassword = this.http.post(this.API_URL_CHANGEPASSWORDONDEMAND, '', {headers});
  }
}
