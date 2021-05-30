import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import Swal from 'sweetalert2';

// service
import { DataLoanService } from '@core/services/quotation/data-loan.service';
import { DataRateService } from '@core/services/quotation/data-rate.service';

// interface
import { DataLoan,
         DataLimitAmount,
         DataLimitPeriod } from '@core/models/data-loan-model';
import { DataUser } from '@core/models/login-model';

// file-configuration
import { protectionInsurance, statusCode } from '../../../../config/configuration-file';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-data-loan',
  templateUrl: './data-loan.component.html',
  styleUrls: ['./data-loan.component.css']
})

export class DataLoanComponent implements OnInit, OnDestroy {

  @ViewChild('payday', {static: true}) payday: ElementRef;

  public unsubscribe$ = new Subject();
  public currentDate: any;
  public disabledLoan: boolean;
  public disabledBtnCalculateRate: boolean;
  public validatAmount: boolean;
  public validatPeriod: boolean;
  public objDataLimitAmount: DataLimitAmount = {
    minAmount: 0,
    maxAmount: 0
  };
  public objDataLimitPeriod: DataLimitPeriod = {
    id: 2,
    minPeriod: 1,
    maxPeriod: 36
  };
  public controlPeriod: boolean;
  public controlAmount: boolean;
  public disabledRate: boolean;
  public dataOfUser: DataUser;
  public dataLoan: DataLoan = {
    period: '',
    amount: '',
    currencyId: 1,
    currencyName: 'SOLES',
    limitMinAmount: 0,
    limitMaxAmount: 0,
    periodId: 2,
    periodName: 'MES',
    periodFactor: '',
    limitMinPeriod: '',
    limitMaxPeriod: '',
    warrantyId: 1,
    warrantyName: 'SIN GARANTIA',
    disbursementDate: '',
    payDay: 0,
    protectionInsurance: '1',
    protectionInsuranceName: 'SIN SEGURO'
  };

public formatDateSelect: string = '';
public formatDateCurrent: string = '';
public dateSelect: string = '';
public dateCurrent: string = '';
public dateSelectTime: number;
public dateCurrentTime: number;
public messageErrorDateDisbursement: boolean;
public formatDateSelectInput: string = '';

  constructor(private dataLoanService: DataLoanService,
              private dataRateService: DataRateService,
              private route: Router) {
    this.readDataOfSessionStorage();
    this.controlAmount = false;
    this.controlPeriod = false;
    this.disabledLoan = true;
    this.messageErrorDateDisbursement = false;
  }

  ngOnInit() {
    this.subscribeResetState();
    this.activeContentLoan();
    this.selectCurrentDateDefault();
    this.dataLoan.disbursementDate = this.currentDate;
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  subscribeResetState() {
    this.dataLoanService.state.subscribe(result => {
      if (result === true) {
        this.disabledBtnCalculateRate = true;
        this.disabledLoan = result;
        this.resetLoan();
      }
    });
    this.dataLoanService.reset.subscribe(result => {
      if (result === true) {
        this.disabledBtnCalculateRate = true;
        this.disabledLoan = result;
        this.controlAmount = false;
        this.controlPeriod = false;
        this.resetPayday();
        this.selectCurrentDateDefault();
        this.dataLoan.disbursementDate = this.currentDate;
        this.resetLoan();
      } else {
        this.disabledLoan = true;
      }
    });
  }

  activeContentLoan() {
    this.dataLoanService.loan.subscribe(result => {
      this.disabledLoan = result;
      if (result === false) {
        this.onDataLimitAmount();
        this.onDataLimitPeriod();
      } else {
        this.disabledLoan = true;
      }
    });
  }

  onDataLimitAmount() {
    this.dataLoanService.getDataLimitAmount(this.dataOfUser);
    this.subscribeDataLimitAmount();
  }

  subscribeDataLimitAmount() {
    this.dataLoanService.getDataLimitAmount(this.dataOfUser)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      this.objDataLimitAmount = result;
    },
      (error) => this.handleError(error)
    );
  }

  onControlLimitAmount() {
    const regexTem = /^[0-9]{0,9}\.?[0-9]{0,2}$/;
    this.validatAmount = regexTem.test(this.dataLoan.amount);
    if ((this.dataLoan.amount >= this.objDataLimitAmount.minAmount)
      && (this.dataLoan.amount <= this.objDataLimitAmount.maxAmount) && this.validatAmount === true) {
      this.controlAmount = false;
    } else {
      this.controlAmount = true;
    }
    this.disabledBtnCalculate();
    this.recalculateRate();
  }

  onDataLimitPeriod() {
    this.dataLoanService.getDataLimitPeriod(this.dataOfUser);
    this.subscribeDataLimitPeriod();
  }

  subscribeDataLimitPeriod() {
    this.dataLoanService.getDataLimitPeriod(this.dataOfUser)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => this.objDataLimitPeriod = result,
      (error) => this.handleError(error)
    );
  }

  onControlLimitPeriod() {
    const period = this.dataLoan.period;
    const regexPeriod = /(^[0-9]{0,4}$)/g;
    this.validatPeriod = regexPeriod.test(period);
    if ((period >= this.objDataLimitPeriod.minPeriod) &&
      (period <= this.objDataLimitPeriod.maxPeriod) && this.validatPeriod === true) {
      this.controlPeriod = false;
    } else {
      this.controlPeriod = true;
    }
    this.disabledBtnCalculate();
    this.recalculateRate();
  }

  onDataWarranty(warrantyId: number) {
    const warranty = Number(warrantyId);
    this.dataLoan.warrantyId = warranty;
  }

  selectCurrentDateDefault() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month < 10 && day < 10) {
      this.currentDate = `${'0' + day}/${'0' + month}/${year}`;
    } else if (day < 10 && month > 10) {
      this.currentDate = `${'0' + day}/${month}/${year}`;
    } else if (day >= 10 && month < 10) {
      this.currentDate = `${day}/${'0' + month}/${year}`;
    } else {
      this.currentDate = `${day}/${month}/${year}`;
    }
  }
  selectDate(dateValue: any) {
    this.formatDateSelectInput  = dateValue.split('-').reverse().join('/');
    const formatDateCurrent = this.currentDate.split('/').reverse().join('-');
    const dateSelect = moment(dateValue).format();
    const dateCurrent = moment(formatDateCurrent).format();
    const dateSelectTime = new Date(dateSelect).getTime();
    const dateCurrentTime = new Date(dateCurrent).getTime();

    if (dateSelectTime >= dateCurrentTime) {
      this.dataLoan.disbursementDate = this.formatDateSelectInput;
      this.messageErrorDateDisbursement = false;

    } else {
      this.dataLoan.disbursementDate = this.dataLoan.disbursementDate;
      this.messageErrorDateDisbursement = true;
    }
    this.disabledBtnCalculate();
    this.recalculateRate();
  }

  selectPayday(payday: any) {
    this.dataLoan.payDay = payday;
    this.disabledBtnCalculate();
    this.recalculateRate();
  }

  resetPayday() {
    return this.payday.nativeElement.value = 'Elegir';
  }

  selectProtectionInsurance(paramValue: number) {
    this.dataLoan.protectionInsurance = paramValue;
    protectionInsurance.forEach(element => {
      if (paramValue === element.id) {
        this.dataLoan.protectionInsuranceName = element.value;
      }});
    this.disabledBtnCalculate();
    this.recalculateRate();
  }

  onCalculateRate() {
    this.dataLoanService.getRateForClient(this.dataLoan, this.dataOfUser);
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
      background: '#EEEDEB'
    });
    Swal.showLoading();
    this.dataLoanService.dataRate
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      Swal.close();
      if (result.minRate !== null) {
        this.dataRateService.dataRate.next(result);
        this.dataRateService.getFirstInstallmentMinRate(result, this.dataOfUser);
        this.dataRateService.getFirstInstallmentOptimalRate(result, this.dataOfUser);
        this.disabledBtnCalculateRate = true;
      } else {
        this.dataRateService.dataRate.next(result);
      }
    }, (error) => {
      Swal.close();
      this.handleError(error);
    });
    this.disabledRate = false;
    this.dataRateService.activeRate.next(this.disabledRate);
    this.dataRateService.addDataLoan(this.dataLoan);
    this.dataRateService.dataLoan.next(this.dataLoan);
  }

  disabledBtnCalculate() {

    this.formatDateSelect = this.formatDateSelectInput.split('/').reverse().join('-');
    this.formatDateCurrent = this.currentDate.split('/').reverse().join('-');
    this.dateSelect = moment(this.formatDateSelect).format();
    this.dateCurrent = moment(this.formatDateCurrent).format();
    this.dateSelectTime = new Date(this.dateSelect).getTime();
    this.dateCurrentTime = new Date(this.dateCurrent).getTime();

    if (this.dataLoan.amount !== '' && this.dataLoan.amount !== null && this.dataLoan.period !== '' && this.validatPeriod === true
    && this.dataLoan.period !== null && this.dataLoan.payDay !== 0 && this.dataLoan.protectionInsurance !== 0
    && (this.dateSelectTime >= this.dateCurrentTime)
    && (this.dataLoan.disbursementDate !== '' || this.dataLoan.disbursementDate != null )
    && this.dataLoan.amount.slice(-1) !== '.'
    && this.dataLoan.amount >= this.objDataLimitAmount.minAmount
    && (this.dataLoan.amount <= this.objDataLimitAmount.maxAmount)) {
    this.disabledBtnCalculateRate = false;
    } else {
    this.disabledBtnCalculateRate = true;
    }
  }



  recalculateRate() {
    if (this.dataLoan.amount === '' && this.controlAmount === true || this.controlPeriod === true
        || this.dataLoan.disbursementDate === '' || this.dataLoan.payDay === '') {
          this.disabledBtnCalculateRate = true;
          this.dataLoanService.newCalculateRate.next(true);
    }
  }

  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }

  resetLoan() {
    this.dataLoan.period = '';
    this.dataLoan.amount = '';
    this.dataLoan.currencyId = 1;
    this.dataLoan.currencyName = 'SOLES';
    this.dataLoan.limitMinAmount = 0;
    this.dataLoan.limitMaxAmount = 0;
    this.dataLoan.periodId = 2;
    this.dataLoan.periodName = 'MES';
    this.dataLoan.periodFactor = '';
    this.dataLoan.limitMinPeriod = '';
    this.dataLoan.limitMaxPeriod = '';
    this.dataLoan.warrantyId = 1;
    this.dataLoan.warrantyName = 'SIN GARANTIA';
    this.dataLoan.payDay = 0;
    this.dataLoan.protectionInsurance = '1';
    this.dataLoan.protectionInsuranceName = 'SIN SEGURO';
  }

}
