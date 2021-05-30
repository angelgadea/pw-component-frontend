import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// service
import { QuoterInboxService } from '@core/services/quoter-inbox/quoter-inbox.service';
import { TemEvaluationService } from '@core/services/tem-evaluation/tem-evaluation.service';
// interface
import { DataQuotation } from '@core/models/quoter-inbox';
// filets
import { statusCode, routePath } from '../../../../config/configuration-file';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
import { DataUser } from '@core/models/login-model';

@Component({
  selector: 'app-quoter-inbox',
  templateUrl: './quoter-inbox.component.html',
  styleUrls: ['./quoter-inbox.component.css']
})
export class QuoterInboxComponent implements OnInit, OnDestroy {

  public unsubscribe$ = new Subject();
  public filterQuotes: boolean;
  public dataOfUser: DataUser;
  public objDataQuotes: DataQuotation[];
  public objDataFilters: DataQuotation[];
  public searchQuotation: '';
  public parameterValueFilter: any;
  public valueId: any;
  public loading: boolean;
  public statusQuote: boolean;
  public routeRoot: any;
  public routerPathPage: any;
  public quotesLength: number;
  public page: any = 1;
  public newArray: any[] = [];
  public disabledBtnAddQuote: boolean;

  adk: any;

  constructor(private route: Router,
              private quoterInboxService: QuoterInboxService,
              private temEvaluationService: TemEvaluationService,
              private quoterQuotationViewService: QuoterQuotationViewService,
              private activeRoute: ActivatedRoute) {
    this.readDataOfSessionStorage();
    this.routeRoot = activeRoute.root;
    this.routerPathPage = this.routeRoot._routerState.snapshot.url;
    this.filterQuotes = false;
  }

  ngOnInit() {
    this.viewQuotationInbox();
  }

  // @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  viewQuoteStatus(idQuote: any) {
    this.valueId = 0;
  }

  viewQuote(idQuote: any) {
    this.valueId = idQuote;
  }

  viewQuotation(quotationId: string, status: number, currentApproverId: number, statusAbbreviation: string) {
    const id = String(quotationId);
    if (this.dataOfUser.roleName === 'COTIZADOR') {
      this.quoterQuotationViewService.getQuoteSummary(id, this.dataOfUser);
      this.quoterQuotationViewService.getFilesOfServer(id, this.dataOfUser);
      this.route.navigate(['/quoter-quotation-view']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && this.dataOfUser.id !== currentApproverId && statusAbbreviation) {
      this.quoterQuotationViewService.getQuoteSummary(id, this.dataOfUser);
      this.route.navigate(['/quoter-quotation-view']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && this.dataOfUser.id === currentApproverId && statusAbbreviation && status === 3) {
      this.quoterQuotationViewService.getQuoteSummary(id, this.dataOfUser);
      this.route.navigate(['/quoter-quotation-view']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && this.dataOfUser.id === currentApproverId && statusAbbreviation && status === 2) {
      this.quoterQuotationViewService.getQuoteSummary(id, this.dataOfUser);
      this.route.navigate(['/quoter-quotation-view']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && this.dataOfUser.id === currentApproverId && statusAbbreviation) {
      this.temEvaluationService.getTemEvaluation(id, this.dataOfUser);
      this.temEvaluationService.getTemEvaluationSustentation(id, this.dataOfUser);
      this.route.navigate(['/tem-evaluation']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && (status === 2 || status === 3 || status === 4 || status === 6 || status === 7)) {
      this.quoterQuotationViewService.getQuoteSummary(id, this.dataOfUser);
      this.route.navigate(['/quoter-quotation-view']);
    }
  }

  countPageQuote() {
    this.page++;
    this.viewQuotationInbox();
  }

  refreshQuote() {
    if (this.quotesLength === 0) {
      this.newArray = [];
      this.page = 1;
      this.viewQuotationInbox();
    } else if (this.disabledBtnAddQuote === true) {
        this.objDataQuotes = this.newArray;
        this.objDataFilters = this.newArray;
    } else {
      this.page = this.page + 1;
      this.viewQuotationInbox();
    }
  }

  viewQuotationInbox() {
    if (this.routerPathPage === routePath.quoterInbox || this.routerPathPage === routePath.approverInbox) {
      this.loading = true;
      this.quoterInboxService.getQuotationInbox(this.page, this.dataOfUser)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result.length === 0) {
            this.disabledBtnAddQuote = true;
            this.loading = false;
          } else {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < result.length; i++) {
                this.newArray.push(result[i]);
          }
          this.objDataQuotes = this.newArray;
          this.objDataFilters = this.newArray;
          this.disabledBtnAddQuote = false;
          this.searchQuotation = '';
          this.loading = false;
          this.quotesLength = this.newArray.length;
          }
        },
          (error) => {
            this.handleError(error);
            this.loading = false;
          });
    }
  }

  validateStatusQuote(data: any) {
    if (data.currentApproverId === this.dataOfUser.id && data.statusAbbreviation === 'PA') {
      this.statusQuote = true;
    } else {
      this.statusQuote = false;
    }
  }

  filterStateQuotes() {
    this.filterQuotes === false ? this.filterQuotes = true : this.filterQuotes = false;
  }

  selectApprover(approve: any) {
    this.parameterValueFilter = approve;
    console.log('desde selectAprover', this.parameterValueFilter);
  }

  filterState() {
    this.applyFilter(this.parameterValueFilter, this.objDataFilters);
    this.filterQuotes = false;
    console.log('filterState', this.parameterValueFilter, this.objDataFilters);
    }

  applyFilter(value: any, data: DataQuotation[]) {
    if (value === '2'  && (this.dataOfUser.roleName === 'APROBADOR' || this.dataOfUser.roleName === 'COTIZADOR')) {
      this.objDataQuotes = data.filter(resp => resp.statusId === 2 || resp.statusId === 3 || resp.statusId === 6 || resp.statusId === 7);
      this.quotesLength = this.objDataQuotes.length;
    } else if (value === '1' && this.dataOfUser.roleName === 'COTIZADOR') {
      this.objDataQuotes = data.filter(resp => resp.statusId === 1 || resp.statusId === 5);
      this.quotesLength = this.objDataQuotes.length;
    } else if (value === '4') {
      this.objDataQuotes = data.filter(resp => resp.statusId === 4);
      this.quotesLength = this.objDataQuotes.length;
    } else if (value === '1' && this.dataOfUser.roleName === 'APROBADOR') {
      const quotationPaOrange = data.filter(resp => (this.dataOfUser.id === resp.currentApproverId) && resp.statusAbbreviation === 'PA' );
      this.objDataQuotes = quotationPaOrange;
      this.quotesLength = this.objDataQuotes.length;
    } else if (value === '5' && this.dataOfUser.roleName === 'APROBADOR') {
      const quotationPaBlue = data.filter(resp => (this.dataOfUser.id !== resp.currentApproverId) && resp.statusAbbreviation === 'PA' );
      this.objDataQuotes = quotationPaBlue;
      this.quotesLength = this.objDataQuotes.length;
  }

  }
  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }

}
