import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// service
import { LoginService } from '../../core/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private loginService: LoginService,
               private router: Router ) {}

  canActivate(): boolean {
    if (this.loginService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['authentication/login']);
      return false;
    }
  }

}
