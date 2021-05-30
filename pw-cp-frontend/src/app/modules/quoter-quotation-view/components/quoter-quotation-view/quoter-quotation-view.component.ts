import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// interface
import { Data } from '@core/models/quoter-quotation-view-model';
import { DataUser } from '@core/models/login-model';
// service
import { DataRateService } from '@core/services/quotation/data-rate.service';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
// file-configuration
import { statusCode } from '../../../../config/configuration-file';

@Component({
  selector: 'app-quoter-quotation-view',
  templateUrl: './quoter-quotation-view.component.html',
  styleUrls: ['./quoter-quotation-view.component.css']
})
export class QuoterQuotationViewComponent implements OnInit, OnDestroy {
  public unsubscribe$ = new Subject();
  public showData: Data;
  public containerBottom: boolean;
  public period = 0;
  public dataOfUser: DataUser;
  public habilytiContentRatePreferential: boolean;
  public lengthFiles: any;
  public idQuotation = 0;
  public stateServer: boolean;
  public loadingQuoteSummary: boolean;

  constructor(private quoterQuotationViewService: QuoterQuotationViewService,
              private dataRateService: DataRateService,
              private route: Router) {
    this.readDataOfSessionStorage();
  }

  ngOnInit() {
    this.loadingQuoteSummary = true;
    setTimeout(() => {
      this.subscribeDataQuotationView();
    }, 1000);
  }

  // @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.stateServer = false;
    this.dataRateService.dataFiles.next(false);
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  subscribeDataQuotationView() {
    this.loadingQuoteSummary = true;
    this.quoterQuotationViewService.quoteSummary
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: Data) => {
        if (result.quotationId === undefined) {
          this.loadingQuoteSummary = true;
        } else {
          this.loadingQuoteSummary = false;
          this.idQuotation = result.quotationId;
          this.showData = result;
          this.period = (result.loanDays) / 30;
          if (result.comment === null) {
            this.habilytiContentRatePreferential = false;
            this.containerBottom = true;
          } else if (result.comment === '') {
            this.habilytiContentRatePreferential = false;
            this.containerBottom = true;
          } else {
            this.habilytiContentRatePreferential = true;
          }
        }
        this.subscribeFileInServer();
      }, error => this.handleError(error));
  }

  subscribeFileInServer() {
    this.dataRateService.file
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.quoterQuotationViewService.getFilesOfServer(this.idQuotation, this.dataOfUser);
        if (result === true) {
          this.quoterQuotationViewService.listFile
            .subscribe(result => {
              this.lengthFiles = result.length;
            });
        } else {
          this.quoterQuotationViewService.listFile
              .subscribe(result => {
              this.lengthFiles = result.length;
            });
        }
      });
  }

  filesQuotation() {
    this.quoterQuotationViewService.getFilesOfServer(this.idQuotation, this.dataOfUser);
    this.route.navigate(['/files-quotation']);
  }

  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }
}


