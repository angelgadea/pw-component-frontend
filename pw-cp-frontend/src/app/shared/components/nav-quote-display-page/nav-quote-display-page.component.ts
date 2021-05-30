import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// service
import { DataProductService } from '@core/services/quotation/data-product.service';
import { DataLoanService } from '@core/services/quotation/data-loan.service';
import { DataRateService } from '@core/services/quotation/data-rate.service';
import { DataUser } from '@core/models/login-model';

@Component({
  selector: 'app-nav-quote-display-page',
  templateUrl: './nav-quote-display-page.component.html',
  styleUrls: ['./nav-quote-display-page.component.css']
})
export class NavQuoteDisplayPageComponent implements OnInit {
  public stateProduct: boolean;
  public stateLoan: boolean;
  public stateRate: boolean;
  public dataUser: DataUser;

  constructor(private dataProductService: DataProductService,
              private dataLoanService: DataLoanService,
              private dataRateService: DataRateService,
              private router: Router) {
              this.dataUser = JSON.parse(sessionStorage.getItem('dataUser'));
              this.stateLoan = true;
              this.stateProduct = false;
              this.stateRate = true;
  }

  ngOnInit() { }

  stateNavigationNewQuotation() {
    this.dataProductService.stateProduct.next(this.stateProduct);
    this.dataLoanService.stateLoan.next(this.stateLoan);
    this.dataRateService.stateRate.next(this.stateRate);
    this.dataLoanService.activeLoan.next(true);
    this.dataProductService.activeProduct.next(true);
    this.dataRateService.activeRate.next(true);
    this.router.navigate(['/quote/new-quotation']);
  }

  stateNavigationViewQuote() {
    if (this.dataUser.roleName === 'COTIZADOR') {
      this.router.navigate(['/quote/quoter-inbox']);
    } else {
      this.router.navigate(['/approver/approver-inbox']);
    }
  }


}
