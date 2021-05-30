import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

// service
import { ChangeForgottenPasswordService } from '@core/services/change-forgotten-password/change-forgotten-password.service';
// file-configuration
import { statusCode } from '../../../../config/configuration-file';

@Component({
  selector: 'app-change-forgotten-password',
  templateUrl: './change-forgotten-password.component.html',
  styleUrls: ['./change-forgotten-password.component.css']
})
export class ChangeForgottenPasswordComponent implements OnInit, OnDestroy {

  public unsubscribe$ = new Subject();
  public userForRestorePassword = {
    user: ''
  };
  public showModal: boolean;

  constructor(private changeForgottenPasswordService: ChangeForgottenPasswordService,
              private route: Router) {
    this.showModal = false;
  }

  ngOnInit() {}

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onUserRecoverPassword() {
    const user = {
      ...this.userForRestorePassword,
      user: this.userForRestorePassword.user
    };
    this.changeForgottenPasswordService.sendUserForRecoverPassword(user);
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    if (this.userForRestorePassword.user !== '' ) {
      this.showModal = false;
      this.changeForgottenPasswordService.userRecoverPassword
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.showModal = true;
        setTimeout(() => {
            Swal.close();
          }, 300);
      }, (error) => {
        this.showModal = true;
        this.handleError(error);
        Swal.close();
      });
    }
  }

  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }

}
