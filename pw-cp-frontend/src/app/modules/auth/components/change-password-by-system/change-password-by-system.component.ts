import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// service
import { ChangePasswordBySystemService } from '@core/services/change-password-by-system/change-password-by-system.service';
// interface
import { DataUser, PasswordUsers } from '@core/models/login-model';
// file-configuration
import { statusCode } from '../../../../config/configuration-file';

@Component({
  selector: 'app-change-password-by-system',
  templateUrl: './change-password-by-system.component.html',
  styleUrls: ['./change-password-by-system.component.css']
})

export class ChangePasswordBySystemComponent implements OnInit, OnDestroy {

  public unsubscribe$ = new Subject();
  public newPassword: boolean;
  public repeatPassword: boolean;
  public formError: boolean;
  public formStatus: boolean;
  public formInput: boolean;
  public showModal: boolean;
  public controlNewPassword: boolean;
  public controlRepeatPassword: boolean;
  public requestPassword = '';
  public dataOfUser: DataUser;
  public password: PasswordUsers = {
    newPassword: '',
    repeatPassword: ''
  };

  constructor(private changePasswordBySystemService: ChangePasswordBySystemService,
              private route: Router) {
    this.newPassword = false;
    this.repeatPassword = false;
    this.formError = false;
    this.formStatus = false;
    this.formInput = false;
    this.controlNewPassword = true;
    this.controlRepeatPassword = true;
  }

  ngOnInit() {
    this.readDataOfSessionStorage();
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  showNewPassword() {
    this.newPassword = !this.newPassword;
  }

  showRepeatPassword() {
    this.repeatPassword = !this.repeatPassword;
  }

  onControlNewPassword() {
    const regexp = (/^(?=.*\d)(?=.*[\u002a\u003f\u0023\u0025\u0026\u003d\u002b\u003c\u003e\u0028\u0029])(?=.*[A-Z])(?=.*[a-z])\S{8,20}$/);
    if (regexp.test(this.password.newPassword)) {
        this.controlNewPassword = true;
        this.controlRepeatPassword = false;
    } else {
      this.controlNewPassword = false;
      this.controlRepeatPassword = true;
    }
  }

  onConfirmPassword() {
    if (this.password.newPassword !== this.password.repeatPassword) {
      this.formError = true;
      this.formInput = true;
      this.formStatus = false;
    } else {
      this.formError = false;
      this.formInput = false;
    }
  }

  onChangePassword(form: NgForm) {
    const data = {
      ...this.password,
      newPassword: this.password.newPassword,
      repeatPassword: this.password.repeatPassword
    };
    if (form.valid && this.password.newPassword === this.password.repeatPassword) {
      this.changePasswordBySystemService.onChangePassword(data, this.dataOfUser);
      this.subscribePassword();
      this.showModal =  true;
      this.formStatus = false;
      this.formInput = false;
      this.formError = false;
    } else if (!form.valid) {
      this.formStatus = true;
      this.formInput = true;
      this.formError = false;
    }
  }

  subscribePassword() {
    this.changePasswordBySystemService.dataRequestPassword
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe( result => {
      this.requestPassword = result.message;
    }, (error) => {
      this.handleError(error);
    });
  }

  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }

}
