import { Component, OnInit } from '@angular/core';
import { LoginService } from '@core/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-error',
  templateUrl: './system-error.component.html',
  styleUrls: ['./system-error.component.css']
})
export class SystemErrorComponent implements OnInit {

  public dataOfUser: any;

  constructor(private loginService: LoginService,
              private route: Router) {
    this.readLocalStorage();
   }

  ngOnInit() {
  }

  readLocalStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  logOut() {
    if (!this.dataOfUser) {
        this.route.navigate(['/authentication/login']);
    } else {
      sessionStorage.clear();
      this.route.navigate(['/authentication/login']);
    }
  }

}
