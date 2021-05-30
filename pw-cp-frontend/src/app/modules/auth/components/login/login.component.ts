import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

// service
import { LoginService } from '@core/services/login/login.service';
// models
import { Users } from '@core/models/login-model';
// file-configuration
import { path, statusCode } from '../../../../config/configuration-file';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public unsubscribe$ = new Subject();
  public isShowPassword: boolean;
  public formControl: boolean;
  public routeRoot: any;
  public routerPathPage: any;
  public dataUser: Users = {
    user: '',
    password: ''
  };
  public route = {
    path: ''
  };

  constructor( private router: Router,
               private loginService: LoginService) {
    this.isShowPassword = false;
    this.formControl = false;
  }

  ngOnInit() {}

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showPassword() {
    return this.isShowPassword = !this.isShowPassword;
  }

  onLogin( form: NgForm ) {
    const dataUsers = {
      ...this.dataUser,
          user: this.dataUser.user,
          password: this.dataUser.password
    };
    if (this.dataUser.user !== '' && this.dataUser.password && form.controls.password.status === 'VALID' && form.valid) {
      this.sendDataService(dataUsers);
    } else {
      this.formControl = true;
      this.dataUser.user = '';
      this.dataUser.password = '';
    }
  }

  sendDataService(dataUsers: Users) {
    this.loginService.onLoginService(dataUsers);
    this.formControl = false;
    this.loginService.dataOfUser
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      this.validateFeature(result);
      this.formControl = false;
      this.loginService.readLocalStorage();
      Swal.close();
    }, (error) => {
      this.handleError(error);
      }
    );
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
      background: '#ffffff'
    });
    Swal.showLoading();
  }


  validateFeature(result: any) {
    if (result.passwordToBeChanged === 1) {
      this.router.navigate(['authentication/change-password-by-system']);
    } else if (result.roleName === 'COTIZADOR') {
      this.validateFeatureNewQuote(result);
      this.featureNewQuotation();
    } else if (result.roleName === 'APROBADOR') {
      this.validateFeatureAprove(result);
      this.featureApprove();
    } else {
      this.router.navigate(['/authentication/login']);
    }
  }

  validateFeatureNewQuote(result: any) {
    const feature = result.roleFeatureDtoList;
    feature.forEach(element => {
    if (element.featureName === path.newQuotation && element.landingPage === 1) {
      this.route.path = `/${element.featureName}`;
      }
    });
  }

  featureNewQuotation() {
    if (this.route.path) {
      this.router.navigate([`${'quote'}/${this.route.path}`]);
    } else {
      this.router.navigate(['/page-not-found']);
    }
  }

  validateFeatureAprove(result: any) {
    const feature = result.roleFeatureDtoList;
    feature.forEach(element => {
    if (element.featureName === path.approverInbox && element.landingPage === 1) {
      this.route.path = `/${element.featureName}`;
      }
    });
  }

  featureApprove() {
    if (this.route.path) {
      this.router.navigate([`${'approver'}/${this.route.path}`]);
    } else {
      this.router.navigate(['/page-not-found']);
    }
  }

  private handleError(error) {
    const status = error.status;
    if (statusCode.fourHundred === status) {
      this.formControl = true;
      this.dataUser.user = '';
      this.dataUser.password = '';
      Swal.close();
    } else if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.router.navigate(['/system-error']);
      Swal.close();
    }
  }

}

