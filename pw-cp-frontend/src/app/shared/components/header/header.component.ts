import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// service
import { DataClientService } from '@core/services/quotation/data-client.service';
import { DataProductService } from '@core/services/quotation/data-product.service';
import { LoginService } from '@core/services/login/login.service';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
// interface
import { DataUser } from '@core/models/login-model';
import { Data } from '@core/models/quoter-quotation-view-model';
// file-configuration
import { statusCode, routePath } from '../../../config/configuration-file';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public unsubscribe$ = new Subject();
  public dataOfUser: DataUser = {
    employeeId: 0,
    employeeName: '',
    roleFeatureDtoList: '',
    id: 0,
    message: '',
    officeId: 0,
    officeName: '',
    passwordToBeChanged: 0,
    roleId: 0,
    roleName: '',
    username: '',
    cTop: 0,
    employeeFirstSurName: '',
    immediateBossId: 0,
    positionId: 0,
  };

  public showConfirm: boolean;
  public data: any;
  public showContainer: boolean;
  public activeProduct: boolean;
  public routeRoot: any;
  public routerPathPage: any;
  public pageApprover: boolean;
  public pageQuoter: boolean;
  public pageQuotationView: boolean;
  public showData: Data;
  public temHistoryPage: boolean;
  public viewQuotation: boolean;

  constructor(private route: Router,
              private dataClientService: DataClientService,
              private dataProductService: DataProductService,
              private loginService: LoginService,
              private quoterQuotationViewService: QuoterQuotationViewService,
              private activeRoute: ActivatedRoute) {
              this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
              this.showConfirm = false;
              this.showContainer = false;
              this.routeRoot = activeRoute.root;
              this.routerPathPage = this.routeRoot._routerState.snapshot.url;
              this.quoterQuotationViewService.temHistoryPage.subscribe(result => this.viewQuotation = result);
              this.disabledIconPath();
              this.subscribeDataQuote();
              this.subscribeTemHistory();
  }

  ngOnInit() {
    this.dataProductService.activeProduct.subscribe(result => this.activeProduct = result);
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showContent() {
    if (this.activeProduct === false) {
       this.dataClientService.dataClients.subscribe(result => {
        this.showContainer = true;
        this.data = result;
      }, (error) => {
        this.showContainer = true;
        this.data = error.error;
        this.handleError(error);
      });
    }
  }

  subscribeTemHistory() {
    this.quoterQuotationViewService.temHistoryPage
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => this.temHistoryPage = result);
  }

  subscribeDataQuote() {
    if (this.dataOfUser.roleName === 'APROBADOR' && routePath.viewQuotation === this.routerPathPage) {
      this.quoterQuotationViewService.quoteSummary
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: Data) => this.showData = result);
    } else {
    }
  }

  showSignOut() {
    if (this.dataOfUser.roleName === 'COTIZADOR' && routePath.quoterInbox === this.routerPathPage) {
      this.showConfirm = false;
      this.signOut();
    } else if (this.dataOfUser.roleName === 'COTIZADOR' && routePath.newQuotation === this.routerPathPage) {
      if (this.data) {
        this.showConfirm = true;
      } else {
        this.showConfirm = false;
        this.signOut();
      }
    } else {
      this.showConfirm = false;
      this.signOut();
    }
  }

  returnPage() {
    const route = this.routerPathPage;
    if (this.dataOfUser.roleName === 'APROBADOR' && this.viewQuotation === true) {
      this.quoterQuotationViewService.stateTemHistoryPage.next(false);
      this.route.navigate(['/tem-evaluation']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && routePath.viewQuotation === route && this.showData.statusId === 2) {
      this.route.navigate(['/approver/approver-inbox']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && routePath.viewQuotation === route && this.showData.statusId === 5) {
      this.route.navigate(['/approver/approver-inbox']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && routePath.viewQuotation === route && this.showData.statusId === 4) {
      this.route.navigate(['/approver/approver-inbox']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && routePath.viewQuotation === route && this.temHistoryPage === true) {
      this.route.navigate(['/tem-evaluation']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && routePath.viewQuotation === route && this.showData.statusId === 6) {
      this.route.navigate(['/approver/approver-inbox']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && routePath.viewQuotation === route && this.showData.statusId === 3) {
      this.route.navigate(['/approver/approver-inbox']);
    } else if (this.dataOfUser.roleName === 'APROBADOR' && routePath.viewQuotation === route && this.showData.statusId === 7) {
      this.route.navigate(['/approver/approver-inbox']);
    } else if (this.dataOfUser.roleName === 'COTIZADOR' && route === routePath.viewQuotation) {
      this.route.navigate(['/quote/quoter-inbox']);
    }
  }

  disabledIconPath() {
    const rolName = this.dataOfUser.roleName;
    if (rolName === 'APROBADOR' && this.routerPathPage === routePath.approverInbox) {
      this.pageApprover = true;
    } else if (rolName === 'APROBADOR' && this.routerPathPage === routePath.viewQuotation) {
      this.pageQuotationView = true;
    } else if (rolName === 'COTIZADOR' && this.routerPathPage === routePath.newQuotation) {
      this.pageQuoter = true;
    } else if (rolName === 'COTIZADOR' && this.routerPathPage === routePath.quoterInbox) {
      this.pageQuoter = true;
    } else if (rolName === 'COTIZADOR' && this.routerPathPage === routePath.viewQuotation) {
      this.pageQuotationView = true;
    }
  }
  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }

  signOut() {
    this.loginService.logOut();
  }

  notSignOut() {
    this.route.navigate(['quote/new-quotation']);
  }

}


