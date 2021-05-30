import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AutoLogoutService } from './core/services/auto-logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public activeUser: boolean;
  public disabledComponent: boolean;

  constructor(private autoLogoutService: AutoLogoutService,
              private router: Router) {
    this.alertInactiveUser();
  }

  onActivate() {
    window.scroll(0, 0);
  }

  alertInactiveUser() {
    this.autoLogoutService.alert.subscribe(result => this.activeUser = result);
    this.autoLogoutService.disabled.subscribe(result => this.disabledComponent = result);
  }

  closeModal() {
    this.router.navigate(['authentication/login']);
    this.activeUser = false;
    location.reload();
  }

}

