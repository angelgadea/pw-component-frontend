import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// interface
import { DataMode,
         DataProducts,
         DataProduct } from '@core/models/data-product-model';
// service
import { DataProductService } from '@core/services/quotation/data-product.service';
import { DataLoanService } from '@core/services/quotation/data-loan.service';
import { DataRateService } from '@core/services/quotation/data-rate.service';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
// models
import { DataUser } from '@core/models/login-model';
// file-configuration
import { statusCode } from '../../../../config/configuration-file';

@Component({
  selector: 'app-data-product',
  templateUrl: './data-product.component.html',
  styleUrls: ['./data-product.component.css']
})
export class DataProductComponent implements OnInit, OnDestroy {

  @ViewChild('productId', {static: true}) productId: ElementRef;

  public unsubscribe$ = new Subject();
  public objDataSubproduct: DataProduct[] = [];
  public objDataMode: DataMode[] = [];
  public disabledProduct: boolean;
  public dataProducts: DataProducts = {
    productId: 1,
    productName: '',
    modeId: 1,
    modeName: 'NUEVO',
  };
  public product: boolean;
  public disabledLoan: boolean;
  public dataOfUser: DataUser = {
    employeeId: 0,
    cTop: 0,
    employeeName: '',
    roleFeatureDtoList: [],
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

  constructor(private dataProductService: DataProductService,
              private dataLoanService: DataLoanService,
              private dataRateService: DataRateService,
              private quoterQuotationViewService: QuoterQuotationViewService,
              private route: Router) {
    this.readDataOfSessionStorage();
    this.disabledLoan = true;
    this.disabledProduct = true;
    this.product = false;
  }

  ngOnInit() {
    this.newQuotationResetDataProduct();
    this.activeContentProduct();
    this.onDataProduct();
  }

  // @HostListener('window:beforeunload')
   async ngOnDestroy() {
     this.unsubscribe$.next();
     this.unsubscribe$.complete();
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  newQuotationResetDataProduct() {
    this.dataProductService.reset.subscribe(result => {
      if (result === true) {
        this.disabledProduct = result;
        this.onDataProduct();
      } else {
        this.disabledProduct = true;
      }
    });
  }

  activeContentProduct() {
    if (this.disabledProduct === true) {
      this.dataProductService.product.subscribe(result => {      
        if (result === false) {         
          this.disabledProduct = result;
          this.dataLoanService.addDataProduct(this.dataProducts);
        } else {
          this.disabledProduct = true;
        }
      });
    }
  }

  onDataProduct() {
    this.dataProductService.getDataSubproducts(this.dataOfUser);
    this.subscribeDataSubproduct();
  }

  subscribeDataSubproduct() {
    this.dataProductService.dataSubproducts
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => this.objDataSubproduct = result,
         (error) => this.handleError(error));
  }

  resetProduct() {
    this.productId.nativeElement.value = 'Elegir';
  }

  onDataMode(productId: number) {
    this.dataProducts.productId = Number(productId);
    this.product = true;
    this.dataProductService.getDataMode(this.dataProducts, this.dataOfUser);
    this.dataProductService.dataMode
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result =>
      this.objDataMode = result,
      (error) => this.handleError(error)
    );
    this.activeContentLoan();
  }

  activeContentLoan() {
    if (this.product === true) {
      this.disabledLoan = false;
      this.dataLoanService.activeLoan.next(this.disabledLoan);
      this.dataLoanService.addDataProduct(this.dataProducts);
    }
    this.dataLoanService.addDataProduct(this.dataProducts);
    this.dataRateService.addDataProduct(this.dataProducts);
    this.quoterQuotationViewService.addDataProductOfView(this.dataProducts);
  }

  resetData() {
    this.dataProducts.productId = 1;
    this.dataProducts.productName = '';
    this.dataProducts.modeId = 1;
    this.dataProducts.modeName = 'NUEVO';
  }

  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }

}
