import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

// interface
import { DataUserOfPasswordChange } from '@core/models/change-password-on-demand';
import { DataUser } from '@core/models/login-model';
// service
import { ChangePasswordOnDemandService } from '@core/services/change-password-on-demand/change-password-on-demand.service';
import { LoginService } from '@core/services/login/login.service';
// file-configuration
import { statusCode } from '../../../../config/configuration-file';

@Component({
  selector: 'app-change-password-on-demand',
  templateUrl: './change-password-on-demand.component.html',
  styleUrls: ['./change-password-on-demand.component.css']
})
export class ChangePasswordOnDemandComponent implements OnInit, OnDestroy {

  public unsubscribe$ = new Subject();
  public dataOfUser: DataUser = {
    employeeId: 0,
    cTop: 0,
    employeeName: '',
    roleFeatureDtoList: [],
    id: 0,
    message: '',
    officeId: 0,
    officeName: '',
    passwordToBeChanged: 0,
    roleId: 0,
    roleName: '',
    username: '',
    immediateBossId: 0,
    employeeFirstSurName: '',
    positionId: 0
  };

  public currentPassword: boolean;
  public newPassword: boolean;
  public repeatPassword: boolean;
  public showModal: boolean;
  public incorrectPassword: boolean;
  public invalidPassword: boolean;
  public passwordNotMatch: boolean;
  public requestPassword: string;
  public sendRequest: string;
  public dataUserOfPasswordChange: DataUserOfPasswordChange = {
    currentPassword: '',
    newPassword: '',
    repeatPassword: ''
  };

  constructor(private changePasswordService: ChangePasswordOnDemandService,
              private route: Router,
              private loginService: LoginService) {
    this.currentPassword = false;
    this.newPassword = false;
    this.repeatPassword = false;
    this.incorrectPassword = false;
    this.invalidPassword = false;
    this.passwordNotMatch = false;
    this.showModal = false;
  }

  ngOnInit() { this.readDataOfSessionStorage(); }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  showCurrentPassword() {
    this.currentPassword = !this.currentPassword;
  }

  showNewPassword() {
    this.newPassword = !this.newPassword;
  }

  showRepeatPassword() {
    this.repeatPassword = !this.repeatPassword;
  }

  onNewPassword() {
    const regexp = (/^(?=.*\d)(?=.*[\u002a\u003f\u0023\u0025\u0026\u003d\u002b\u003c\u003e\u0028\u0029])(?=.*[A-Z])(?=.*[a-z])\S{8,20}$/);
    if (regexp.test(this.dataUserOfPasswordChange.newPassword)) {
      this.invalidPassword = false;
    } else {
      this.invalidPassword = true;
    }
  }

  onRepeatPassword() {
    // const repeatPassword = this.dataUserOfPasswordChange.repeatPassword.length;

    if (this.dataUserOfPasswordChange.newPassword !== this.dataUserOfPasswordChange.repeatPassword) {
      this.passwordNotMatch = true;
    } else {
      this.passwordNotMatch = false;
    }

    // else if (repeatPassword < 2) {
    //   this.passwordNotMatch = true;
    // }
  }

  saveChangePassword(form: NgForm) {
    const data = {
      ...this.dataUserOfPasswordChange,
      currentPassword: this.dataUserOfPasswordChange.currentPassword,
      newPassword: this.dataUserOfPasswordChange.newPassword
    };
    if (form.valid && this.dataUserOfPasswordChange.newPassword === this.dataUserOfPasswordChange.repeatPassword) {
      this.changePasswordService.onUserChangePassword(data, this.dataOfUser);
      this.subscribeData();
    } else if (!form.valid) {
      this.showModal = false;
      this.passwordNotMatch = true;
      this.incorrectPassword = true;
      this.invalidPassword = true;
   }
  }

  subscribeData() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.changePasswordService.dataRequestChangePassword
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe( result => {
      this.requestPassword =  result.message;
      this.incorrectPassword = false;
      Swal.close();
      this.showModal = true;
    }, (error) => {
      this.showModal = false;
      this.incorrectPassword = true;
      this.dataUserOfPasswordChange.currentPassword = '';
      this.dataUserOfPasswordChange.newPassword = '';
      this.dataUserOfPasswordChange.repeatPassword = '';
      Swal.close();
      this.handleError(error);
      });
  }

  logOut() {
    this.loginService.logOut();
  }

  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }
  validateCurrentPassword(event: any) {
    const currentPassword = this.dataUserOfPasswordChange.currentPassword;
    if (currentPassword === event.target.value) {
      this.incorrectPassword = false;
    } else {
      this.incorrectPassword = true;
    }
  }
}
