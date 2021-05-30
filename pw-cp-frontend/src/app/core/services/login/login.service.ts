import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// interface
import { Users, DataUser } from '../../models/login-model';
// microservice
import { IPBackend } from '../../../microservices/ip-development';
import { componentUserLogin } from '../../../microservices/components-backend';
import { endpointLogin } from '../../../microservices/endpoints';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URL_LOGIN = `${IPBackend}${componentUserLogin}${endpointLogin}`;

  public dataOfUser: Observable<DataUser>;
  public dataUser: any;
  public loggedIn: Observable<any>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.readLocalStorage();
  }

  onLoginService(dataUsers: Users) {
    const headers = new HttpHeaders()
      .set('user', dataUsers.user)
      .set('password', dataUsers.password)
      .set('userLoggedIn', dataUsers.user);
    return this.dataOfUser = this.http.post<DataUser>(this.API_URL_LOGIN, '', {headers})
      .pipe(
        map(resp => {
        this.saveLocalStorageId(resp);
        return resp;
    }));
  }

  private saveLocalStorageId(resp) {
    this.dataUser = resp;
    return sessionStorage.setItem('dataUser', JSON.stringify(resp));
  }

  isAuthenticated(): boolean {
    if (this.loggedIn) {
      return true;
    } else {
      return false;
    }
  }

  readLocalStorage() {
    this.loggedIn = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  signOut() {
    if (this.loggedIn) {
      sessionStorage.clear();
    }
  }

  logOut() {
    if (this.loggedIn) {
      sessionStorage.clear();
      this.router.navigate(['/authentication/login']);
      location.reload();
    }
  }

}





