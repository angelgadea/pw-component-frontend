import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LayoutNewQuotationService } from '@core/services/quotation/layout-new-quotation.service';
import { DataClientService } from '@core/services/quotation/data-client.service';
import { statusCode } from 'src/app/config/configuration-file';
import { DataUser } from '@core/models/login-model';

@Component({
  selector: 'app-layout-new-quotation',
  templateUrl: './layout-new-quotation.component.html',
  styleUrls: ['./layout-new-quotation.component.css']
})
export class LayoutNewQuotationComponent implements OnInit, OnDestroy {

  public unsubscribe$ = new Subject();

  public stateNavigation: boolean;
  public dataOfUser: DataUser = {
    employeeId: 0,
    cTop: 0,
    employeeName: '',
    roleFeatureDtoList: {},
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
    positionId: 0,
  };

  public loadingQuotation: boolean;

  constructor(private layoutNewQuotationService: LayoutNewQuotationService,
              private dataClientService: DataClientService,
              private route: Router) {
    this.readDataOfSessionStorage();
    this.layoutNewQuotationService.state
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => this.stateNavigation = result);
  }

  ngOnInit() {
    this.subscribeDocumentType();
  }

  // @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  subscribeDocumentType() {
    this.loadingQuotation = true;
    this.dataClientService.getDocumentType(this.dataOfUser)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result === undefined) {
        this.loadingQuotation = true;
      } else {
        this.loadingQuotation = false;
      }
    }, (error) => {
      this.loadingQuotation = false;
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
