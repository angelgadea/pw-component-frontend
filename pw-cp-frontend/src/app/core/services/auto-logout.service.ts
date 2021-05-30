import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as store from 'store';

// service
import { LoginService } from './login/login.service';
import { SystemParamsService } from './system-params.service';

const checkIntervall = 1000;
const storeKey = 'lastAction';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  public minutesUntilAutoLogout = 35;

  public alertConfirmUser = new BehaviorSubject(false);
  alert = this.alertConfirmUser.asObservable();

  public disabledComponentRouter = new BehaviorSubject(false);
  disabled = this.alertConfirmUser.asObservable();

  public systemParams: any;
  public alertConfirm: boolean;
  public loggedIn: any;
  public disabledComponent: boolean;

  constructor(private ngZone: NgZone,
              private loginService: LoginService,
              private systemParamsService: SystemParamsService) {
            this.check();
            this.initListener();
            this.initInterval();
            this.alertConfirm = false;
            this.disabledComponent = false;
  }

  get lastAction() {
    // tslint:disable-next-line: radix
    return parseInt(store.get(storeKey));
  }

  set lastAction(value) {
    store.set(storeKey, value);
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, checkIntervall);
    });
  }

  reset() {
    this.lastAction = Date.now();
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastAction + this.minutesUntilAutoLogout * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;
    this.loggedIn = JSON.parse(sessionStorage.getItem('dataUser'));

    this.ngZone.run(() => {
      if (isTimeout && this.loggedIn !== null) {
        this.loginService.signOut();
        this.alertConfirm = true;
        this.disabledComponent = true;
        this.alertConfirmUser.next(this.alertConfirm);
        this.disabledComponentRouter.next(this.disabledComponent);
      }
    });
  }
}
