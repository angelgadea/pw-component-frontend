import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '@core/services/login/login.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private loginService: LoginService,
              private route: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.loginService.logOut();
    this.route.navigate(['/authentication/login']);
  }

}
