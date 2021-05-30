import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// interface
import { DataUser, PasswordUsers } from '../../models/login-model';
// microservice
import { IPBackend } from '../../../microservices/ip-development';
import { componentUserLogin} from '../../../microservices/components-backend';
import { endpointPassword } from '../../../microservices/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordBySystemService {

  API_URL_CHANGEPASSWORDBYSYSTEM = `${IPBackend}${componentUserLogin}${endpointPassword}`;

  public dataRequestPassword: Observable<any>;

  constructor(private http: HttpClient) {
  }

  onChangePassword(dataPassword: PasswordUsers, dataOfUser: DataUser) {
    const headers = new HttpHeaders()
      .set('userId', dataOfUser.id.toString())
      .set('name', dataOfUser.employeeName)
      .set('newPassword', dataPassword.newPassword)
      .set('userLoggedIn', dataOfUser.username);
    return this.dataRequestPassword = this.http.post(this.API_URL_CHANGEPASSWORDBYSYSTEM, '', { headers });
  }

}
