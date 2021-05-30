import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

// service
import { QuoterHistoryService } from '@core/services/quoter-history/quoter-history.service';
import { FileService } from '@core/services/file/file.service';

// file-configuration
import { routePath } from '../../../config/configuration-file';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  public dataUser: any;
  public routeRoot: any;
  public routerPathPage: any;
  public viewHistoryPage: boolean;
  public temHistoryPage: boolean;
  public filePage: boolean;
  public historyFilePage: boolean;

  constructor(private quoterHistoryService: QuoterHistoryService,
              private route: Router,
              private fileService: FileService,
              private activeRoute: ActivatedRoute) {
    this.dataUser = JSON.parse(sessionStorage.getItem('dataUser'));
    this.routeRoot = activeRoute.root;
    this.routerPathPage = this.routeRoot._routerState.snapshot.url;
    this.quoterHistoryService.viewHistoryPage.subscribe(result => this.viewHistoryPage = result );
    this.quoterHistoryService.temHistoryPage.subscribe(result => this.temHistoryPage = result );
    this.fileService.pathFile.subscribe(result => this.filePage = result);
    this.quoterHistoryService.filePageOfHistory.subscribe(result => this.historyFilePage = result);
  }

  ngOnInit() {}

  returnPage() {
    const roleName = this.dataUser.roleName;
    if (roleName === 'COTIZADOR' && this.routerPathPage === routePath.quoterHistory) {
      this.route.navigate(['/quoter-quotation-view']);
    } else if (roleName === 'COTIZADOR' && this.routerPathPage === routePath.viewQuotation) {
      this.route.navigate(['/quote/new-quotation/quotation']);
    } else if (roleName === 'APROBADOR' && this.routerPathPage === routePath.temEvaluation) {
      this.route.navigate(['/approver/approver-inbox']);
    } else if (roleName === 'APROBADOR' && this.routerPathPage === routePath.quoterHistory && this.viewHistoryPage === true) {
      this.quoterHistoryService.stateViewHistory.next(false);
      this.route.navigate(['/quoter-quotation-view']);
    } else if (roleName === 'APROBADOR' && this.routerPathPage === routePath.quoterHistory && this.temHistoryPage === false) {
      this.quoterHistoryService.stateTemHistory.next(true);
      this.route.navigate(['/tem-evaluation']);
    } else if (roleName === 'COTIZADOR' && this.historyFilePage === true) {
      this.quoterHistoryService.stateFilePage.next(false);
      this.route.navigate(['/quoter-history']);
    } else if (roleName === 'APROBADOR' && this.historyFilePage === true) {
      this.quoterHistoryService.stateFilePage.next(false);
      this.route.navigate(['/quoter-history']);
     } else if (roleName === 'COTIZADOR' && this.routerPathPage === routePath.fileQuotation) {
      this.route.navigate(['/quoter-quotation-view']);
    } else if (roleName === 'APROBADOR' && this.routerPathPage === routePath.fileQuotation && this.filePage === true) {
      this.fileService.stateRouteFile.next(false);
      this.route.navigate(['/tem-evaluation']);
    } else if (roleName === 'APROBADOR' && this.routerPathPage === routePath.fileQuotation) {
      this.route.navigate(['/quoter-quotation-view']);
    }
  }
}
