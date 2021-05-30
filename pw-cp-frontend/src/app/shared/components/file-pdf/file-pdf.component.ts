import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

// service
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
// interface
import { Data } from '@core/models/quoter-quotation-view-model';

@Component({
  selector: 'app-file-pdf',
  templateUrl: './file-pdf.component.html',
  styleUrls: ['./file-pdf.component.css']
})
export class FilePdfComponent implements OnInit, OnDestroy {
  public unsubscribe$ = new Subject();
  public showData: Data;
  public dateCurrent = '';
  public period = 0;
  public effectiveDate = '';
  public newFormatDateDisbursement = '';

  constructor(private quoterQuotationViewService: QuoterQuotationViewService ) {
    this.selectCurrentDateDefault();
    this.quoterQuotationViewService.quoteSummary
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((result: Data) => {
      this.showData = result;
      this.period = (result.loanDays) / 30;
      this.selectEffectiveDate(this.dateCurrent);
        });
    this.formatDateDisbursement();
  }

  ngOnInit() {
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectCurrentDateDefault() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month < 10 && day < 10) {
      this.dateCurrent = `${'0' + day}/${'0' + month}/${year}`;
    } else if (day < 10 && month > 10) {
      this.dateCurrent = `${'0' + day}/${month}/${year}`;
    } else if (day >= 10 && month < 10) {
      this.dateCurrent = `${day}/${'0' + month}/${year}`;
     } else {
      this.dateCurrent = `${day}/${month}/${year}`;
    }
  }

  selectEffectiveDate(dateEffective: any) {
    const formatDate = dateEffective.split('/').reverse().join('-');
    const dateSelect = moment(formatDate).format();
    const date = new Date(dateSelect);
    date.setDate(date.getDate() + 10);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10 && day < 10) {
      this.effectiveDate = `${'0' + day}/${'0' + month}/${year}`;
    } else if (day < 10 && month > 10) {
      this.effectiveDate = `${'0' + day}/${month}/${year}`;
    } else if (day >= 10 && month < 10) {
      this.effectiveDate =  `${day}/${'0' + month}/${year}`;
    } else {
      this.effectiveDate = `${day}/${month}/${year}`;
    }

  }
  formatDateDisbursement() {
    const year = this.showData.dateDisbursement.substr(0, 4);
    const month = this.showData.dateDisbursement.substr(5, 2);
    const day = this.showData.dateDisbursement.substr(8, 2);
    this.newFormatDateDisbursement = day + '/' + month + '/' + year;
  }

}
