import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// service
import { DataProductService } from '@core/services/quotation/data-product.service';
import { DataClientService } from '@core/services/quotation/data-client.service';
import { DataLoanService } from '@core/services/quotation/data-loan.service';
import { DataRateService } from '@core/services/quotation/data-rate.service';
// file-configuration
import { routePath } from 'src/app/config/configuration-file';

@Component({
  selector: 'app-nav-quotation',
  templateUrl: './nav-quotation.component.html',
  styleUrls: ['./nav-quotation.component.css']
})

export class NavQuotationComponent implements OnInit {
  public activeBtnNewQuotation: boolean;
  public activeBtnQuoteInbox: boolean;
  public resetData: boolean;
  public routeRoot: any;
  public routerPathPage: any;

  constructor(private router: Router,
              private dataClientService: DataClientService,
              private dataProductService: DataProductService,
              private dataLoanService: DataLoanService,
              private dataRateService: DataRateService,
              private activeRoute: ActivatedRoute) {
              this.resetData = true;
              this.routeRoot = activeRoute.root;
              this.routerPathPage = this.routeRoot._routerState.snapshot.url;
  }

  ngOnInit() {
    this.pageLoadNewQuotationNav();
    this.pageLoadQuoteInboxNav();
   }

  pageLoadNewQuotationNav() {
   if (this.routerPathPage === routePath.newQuotation) {
    this.activeBtnNewQuotation = true;
    this.activeBtnQuoteInbox = false;
    }
  }

  pageLoadQuoteInboxNav() {
    if (this.routerPathPage === routePath.quoterInbox) {
      this.activeBtnNewQuotation = false;
      this.activeBtnQuoteInbox = true;
    }
  }

  onClickQuotation() {
    this.activeBtnNewQuotation = true;
    this.activeBtnQuoteInbox = false;
    if (this.routerPathPage === routePath.newQuotation || this.routerPathPage === routePath.quoterInbox) {
      this.activeBtnNewQuotation = true;
      this.activeBtnQuoteInbox = false;
      this.dataClientService.stateReset.next(this.resetData);
      this.dataProductService.stateReset.next(this.resetData);
      this.dataProductService.activeProduct.next(true);
      this.dataLoanService.stateReset.next(this.resetData);
      this.dataLoanService.activeLoan.next(true);
      this.dataRateService.stateReset.next(this.resetData);
      this.router.navigate(['/quote/new-quotation/quotation']);
    }
  }

  onClickQuoteInbox() {
    this.activeBtnQuoteInbox = true;
    this.activeBtnNewQuotation = false;
    this.router.navigate(['/quote/quoter-inbox']);
    if (this.routerPathPage === routePath.quoterInbox) {
        this.activeBtnNewQuotation = false;
        this.activeBtnQuoteInbox = true;
      }
  }
}
