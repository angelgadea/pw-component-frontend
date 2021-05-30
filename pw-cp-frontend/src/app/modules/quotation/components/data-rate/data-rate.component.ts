import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// service
import { DataRateService } from '@core/services/quotation/data-rate.service';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
import { DataLoanService } from '@core/services/quotation/data-loan.service';
// interface
import { DataRate } from '@core/models/data-rate-model';
import { DataLoan } from '@core/models/data-loan-model';
// file-configuration
import { path, statusCode } from '../../../../config/configuration-file';
import { DataUser } from '@core/models/login-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-rate',
  templateUrl: './data-rate.component.html',
  styleUrls: ['./data-rate.component.css']
})
export class DataRateComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public unsubscribe$ = new Subject();
  public disabledRate: boolean;
  public disabledBtnSaveQuotation: boolean;
  public checkboxRate: boolean;
  public enabledContentRatePreferential: boolean;
  public disabledBtnSendRequest: boolean;
  public errorMaxRate: boolean;
  public errorMinRate: boolean;
  public errorMaximumNumberFile: boolean;
  public dataRate: DataRate = {
    id: 0,
    customerId: 0,
    minRate: '',
    maxRate: '',
    rateOfficeManager: '',
    rateRegionalManager: '',
    rateDivisionManager: '',
    rateIndividualCreditManager: '',
    rateAgreed: '',
    typeOfCurrency: '',
    commentRatePreferential: null,
    installment: 0,
    approvalLevel: '',
    approvalLevelPosition: '',
    optimalRate: '',
  };

  public feature = {
    accessMode: '',
  };

  public router = {
    path: '',
  };

  public dataOfUser: DataUser;
  public dataLoan: DataLoan;
  public dataResponsNewQuote: any;
  public sizekb = 5242880;
  public listDataFiles: any[] = [];
  public quantityFile = 0;
  public temMaxApprover: any;
  public firstMinRate: any;
  public firstOptimalRates: any;
  public validateTem: boolean;
  public disabledAttachFile: boolean;
  public showErrorSize: boolean;
  public showDuplicateError: boolean;
  public modalLoadingDocument: boolean;

  constructor(
    private dataRateService: DataRateService,
              private dataLoanService: DataLoanService,
              private quoterQuotationViewService: QuoterQuotationViewService,
              private route: Router
              ) {
    this.readDataOfSessionStorage();
    this.disabledBtnSaveQuotation = true;
    this.checkboxRate = false;
    this.enabledContentRatePreferential = false;
    this.disabledBtnSendRequest = true;
    this.errorMaxRate = false;
    this.errorMinRate = false;
    this.disabledAttachFile = false;
    this.showErrorSize = false;
    this.errorMaximumNumberFile = false;
  }
  ngOnInit() {
    this.validateFeature();
    this.subscribeResetRate();
    this.subscribeDisabledRate();
    this.newCalculateRate();
  }

  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.listDataFiles = [];
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  subscribeDisabledRate() {
    this.dataRateService.rate.subscribe(result => {
      if (result === false) {
        this.disabledRate = result;
        this.subscribeDataRate();
      } else {
        this.resetRate();
        this.disabledBtnSaveQuotation = true;
        this.checkboxRate = false;
        this.enabledContentRatePreferential = false;
        this.disabledBtnSendRequest = true;
        this.errorMaxRate = false;
        this.errorMinRate = false;
        this.listDataFiles = [];
        this.quantityFile = 0;
      }
    });
  }

  subscribeResetRate() {
    this.dataRateService.state.subscribe(result => {
      this.resetRate();
      this.disabledRate = result;
      this.listDataFiles = [];
      this.quantityFile = 0;
    });
    this.dataRateService.reset.subscribe(result => {
      if (result === true) {
          this.resetRate();
          this.disabledRate = result;
          this.disabledBtnSaveQuotation = true;
          this.disabledBtnSendRequest = true;
          this.checkboxRate = false;
          this.enabledContentRatePreferential = false;
          this.errorMaxRate = false;
          this.errorMinRate = false;
          this.validateTem = false;
          this.listDataFiles = [];
          this.quantityFile = 0;
        }
    });
  }

  subscribeDataRate() {
    this.dataRateService.data.subscribe(
      (result: DataRate ) => {
      const data = {
        ...this.dataRate,
        maxRate: (result.maxRate * 100).toFixed(2),
        minRate: (result.minRate * 100).toFixed(2),
        optimalRate: (result.optimalRate * 100).toFixed(2),
        rateRegionalManager: (result.rateRegionalManager * 100).toFixed(2),
        rateOfficeManager: (result.rateOfficeManager * 100).toFixed(2),
        rateIndividualCreditManager: (result.rateIndividualCreditManager * 100).toFixed(2),
        rateDivisionManager: (result.rateDivisionManager * 100).toFixed(2),
        id: result.customerId
      };
      return this.dataRate = data;
    }, (error) => {
      this.handleError(error);
    });
    this.dataRateService.firstMinRate
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => this.firstMinRate = result);
    this.dataRateService.firstOptimalRate
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => this.firstOptimalRates = result);
  }

  validateFeature() {
    const feature = this.dataOfUser.roleFeatureDtoList;
    feature.forEach(element => {
      if (path.newQuotation === element.featureName) {
        return this.feature.accessMode = element.accessMode;
      }
    });
  }

  onShowBtnSaveQuotation() {
    let rateAgreed = this.dataRate.rateAgreed;
    let parseIntRate = rateAgreed.replace(/^0+/,'');
    this.dataRate.rateAgreed = parseIntRate;
    let rateAgreedFormat = this.dataRate.rateAgreed;
    const regexTem = /^[0-9]{1}\.?[0-9]{0,2}$/;
    const validatTem = regexTem.test(rateAgreedFormat);
    if (rateAgreedFormat !== '' ) {
      this.checkboxRate = true;
    } else if (rateAgreedFormat === '' || rateAgreedFormat === null) {
      this.validateAccessMode();
      this.disabledBtnSaveQuotation = true;
      this.enabledContentRatePreferential = false;
      this.dataRateService.sendMessageRatePreferential(this.enabledContentRatePreferential);
      this.errorMaxRate = false;
      this.errorMinRate = false;
      this.validateTem = false;
    }
    this.validateMinRate(validatTem);
    this.validateMaxRate(validatTem);
  }

  validateMaxRate(validatTem) {
    const rateAgreed = this.dataRate.rateAgreed;
    const maxRate = Number(this.dataRate.maxRate);
    const minRate = Number(this.dataRate.minRate);
    if (rateAgreed === null) {
      this.validateTem = false;
      this.errorMinRate = false;
      this.disabledBtnSaveQuotation = true;
      this.enabledContentRatePreferential = false;
      this.dataRateService.sendMessageRatePreferential(this.enabledContentRatePreferential);
      this.dataRate.commentRatePreferential = null;
    } else if (rateAgreed > maxRate && validatTem === true) {
      this.validateAccessMode();
      this.enabledContentRatePreferential = false;
      this.dataRateService.sendMessageRatePreferential(this.enabledContentRatePreferential);
      this.dataRate.commentRatePreferential = null;
      this.errorMaxRate = true;
      this.disabledBtnSaveQuotation = true;
      this.validateTem = false;
    } else if (rateAgreed <= maxRate && rateAgreed >= minRate && validatTem === true) {
      this.validateAccessMode();
      this.disabledBtnSaveQuotation = false;
      this.enabledContentRatePreferential = false;
      this.dataRateService.sendMessageRatePreferential(this.enabledContentRatePreferential);
      this.dataRate.commentRatePreferential = null;
      this.errorMaxRate = false;
      this.validateTem = false;
    } else if (validatTem === false) {
      this.validateTem = true;
      this.disabledBtnSaveQuotation = true;
      this.enabledContentRatePreferential = false;
      this.dataRateService.sendMessageRatePreferential(this.enabledContentRatePreferential);
      this.dataRate.commentRatePreferential = null;
    }
  }

  validateMaxTemApprover() {
    const minRateManagerCI = Number(this.dataRate.rateIndividualCreditManager);
    const minRateManagerD = Number(this.dataRate.rateDivisionManager);
    const minRateManagerR = Number(this.dataRate.rateRegionalManager);
    const minRateManagerA = Number(this.dataRate.rateOfficeManager);
    if (minRateManagerCI !== 0) {
      this.temMaxApprover = minRateManagerCI;
    } else if (minRateManagerD !== 0) {
      this.temMaxApprover = minRateManagerD;
    } else if (minRateManagerR !== 0) {
      this.temMaxApprover = minRateManagerR;
    } else if (minRateManagerA !== 0) {
      this.temMaxApprover = minRateManagerA;
    } else if (minRateManagerA === 0) {
      this.temMaxApprover = this.dataRate.minRate;
    }
  }

  validateMinRate(validatTem) {
    this.validateMaxTemApprover();
    const rateAgreed = this.dataRate.rateAgreed;
    if (rateAgreed === null) {
      this.validateTem = false;
      this.errorMinRate = false;
      this.disabledBtnSaveQuotation = true;
      this.enabledContentRatePreferential = false;
      this.dataRateService.sendMessageRatePreferential(this.enabledContentRatePreferential);
      this.dataRate.commentRatePreferential = null;
    } else if (rateAgreed >= this.temMaxApprover && validatTem === true) {
      this.errorMinRate = false;
      this.disabledBtnSaveQuotation = true;
      this.enabledContentRatePreferential = true;
      this.dataRateService.sendMessageRatePreferential(this.enabledContentRatePreferential, this.dataRate);
      this.validateTem = false;
    } else if (rateAgreed <= this.temMaxApprover && validatTem === true) {
      this.validateAccessMode();
      this.disabledBtnSaveQuotation = true;
      this.enabledContentRatePreferential = false;
      this.dataRateService.sendMessageRatePreferential(this.enabledContentRatePreferential);
      this.dataRate.commentRatePreferential = null;
      this.errorMaxRate = false;
      this.errorMinRate = true;
      this.validateTem = false;
    } else if (validatTem === false) {
      this.validateTem = true;
      this.disabledBtnSaveQuotation = true;
      this.enabledContentRatePreferential = false;
      this.dataRateService.sendMessageRatePreferential(this.enabledContentRatePreferential);
      this.dataRate.commentRatePreferential = null;
    }
  }

  validateAccessMode() {
    if (this.feature.accessMode === 'W' || this.feature.accessMode === 'N') {
      this.disabledBtnSaveQuotation = false;
    } else {
      this.disabledBtnSaveQuotation = true;
    }
  }

  onShowFirstInstallment(event: any) {
    const check = event.target.checked;
    this.dataRateService.getFirstInstallment(this.dataRate, this.dataOfUser);
    this.dataRateService.dataInstallment
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (this.dataRate.rateAgreed !== '' && this.dataRate.rateAgreed !== null && check === true) {
        this.dataRate.installment = result;
      } else if (check === false) {
        this.dataRate.installment = '000.00';
        this.dataRate.rateAgreed = '';
        this.disabledBtnSaveQuotation = true;
      }
    }, (error) => this.handleError(error));
  }

  onQueryApprovalLevel() {
    this.validateTemNegociatedDecimal();
    this.dataRateService.getApprovalLevel(this.dataRate, this.dataOfUser);
    this.dataRateService.dataApprovalLevel
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      this.dataRate.approvalLevel = result.approvalLevel;
      this.dataRate.approvalLevelPosition = result.approvalLevelPosition;
    }, (error) => this.handleError(error));
  }

  validateTemNegociatedDecimal() {
    const tem = this.dataRate.rateAgreed;
    const truncTem = tem.toString().indexOf('.');
    const resDecimal = String(tem).substring((truncTem + 1));
    if (truncTem === -1) {
      const term = Number(this.dataRate.rateAgreed);
      this.dataRate.rateAgreed = term.toFixed(2);
    } else if (truncTem === 1) {
      if (resDecimal.length === 1) {
        this.dataRate.rateAgreed = this.dataRate.rateAgreed + '0';
      } else {
        this.dataRate.rateAgreed = this.dataRate.rateAgreed;
      }
    }
  }

  onSaveNewQuotationAutonomy() {
    this.dataRateService.postNewQuotation(this.dataOfUser, this.dataRate);
    this.dataRateService.dataNewQuotation
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.dataRateService.sendQuotePendingApprovalEmail(result, this.dataOfUser);
        this.quoterQuotationViewService.getQuoteSummary(result.quotationId, this.dataOfUser);
        this.searchFeatureName();
        this.validateFeatureName();
      }
    });
  }

  onSaveNewQuotationPreferential() {
    this.dataRateService.postNewQuotation(this.dataOfUser, this.dataRate);
    this.dataRateService.dataNewQuotation
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      const idQuote = result.quotationId;
      if (result) {
        if(this.checkNumberFiles()) {
          this.sendFile(idQuote).then(response => {
            Swal.close();
            this.additionalFunctions(result);
           });
        } else {
          this.additionalFunctions(result);
        }
      }
    });
  }

  additionalFunctions(result) {
    this.dataRateService.sendQuotePendingApprovalEmail(result, this.dataOfUser);
    this.quoterQuotationViewService.getQuoteSummary(result.quotationId, this.dataOfUser);
    this.searchFeatureName();
    this.validateFeatureName();
  }

  onRatePreferential() {
    if (this.dataRate.commentRatePreferential !== '' && this.dataRate.rateAgreed !== '' &&
      this.feature.accessMode === 'W' || this.feature.accessMode === 'N') {
      this.disabledBtnSendRequest = false;
    } else {
      this.disabledBtnSendRequest = true;
    }
  }

  validateFeatureName() {
    if (this.router.path !== '') {
      this.route.navigate([this.router.path]);
    } else {
      this.route.navigate(['/page-not-found']);
    }
  }

  searchFeatureName() {
    const feature = this.dataOfUser.roleFeatureDtoList;
    feature.forEach(element => {
      if (path.viewQuotation === element.featureName) {
        this.router.path = `/${element.featureName}`;
      }
    });
  }

  newCalculateRate() {
    this.dataLoanService.newCalculate.subscribe(result => {
      if (result === true) {
        this.disabledRate = true;
        this.resetRate();
      } else {
        this.disabledRate = true;
      }
    });
  }
// Cuando adjunto los archivos
attachDataFile(dataFile: object) {
  const arrFiles = Object.values(dataFile).map(file => {
    return {
      sizeKB: file.size,
      nameFile: file.name
    };
  });
  this.disabledAttachFile = false;
  if (this.listDataFiles.length + arrFiles.length > 5) {
    if (this.listDataFiles.length === 5) {
      this.disabledAttachFile = true;
    }
    this.showErrorMessagePerSeconds("errorMaximumNumberFile");
  } else {
    arrFiles.forEach((file, index) => {
      if (this.sizekb > file.sizeKB) {
        this.showErrorSize = false;
        this.errorMaximumNumberFile = false;
        this.disabledAttachFile = false;
        if(this.listDataFiles.map(file=> file.name).includes(file.nameFile)) {
          this.showErrorMessagePerSeconds('showDuplicateError');
          this.listDataFiles = this.getUnique(this.listDataFiles, "name");
        } else {
          this.listDataFiles.push(dataFile[index]);
          this.quantityFile = this.listDataFiles.length;
        }
      } else {
        this.showErrorMessagePerSeconds("showErrorSize");
      }
    });
  }
}
showErrorMessagePerSeconds(condition) {
  this[`${condition}`] = true;
  setTimeout(() => {
    this[`${condition}`] = false;
  }, 3000);
}

getUnique(arr, comp) {
  const unique = arr
    .map(e => e[comp])
    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);
  return unique;
}

deleteFile(param: string) {
  const newDataFile = this.listDataFiles.filter(
    element => element.name !== param
  );
  this.listDataFiles = newDataFile;
  this.quantityFile = this.listDataFiles.length;
  this.disabledAttachFile = false;
}


sendFile(quotationId: any) {
  this.showLoadingFiles();
  if (this.dataRateService.saveFileInServer) {
    return this.dataRateService.sendObjectFiles(
      this.listDataFiles,
      this.dataOfUser,
      quotationId
    );
  } else {
    this.showLoadingFiles();
  }
}


showLoadingFiles() {
  Swal.fire({
    allowOutsideClick: false,
    icon: "info",
    text: "Cargando sus archivos",
    background: "#EEEDEB"
  });
  Swal.showLoading();
}

checkNumberFiles() {
  if (this.listDataFiles.length >= 1) {
    return true;
  } else {
    return false;
  }
}


  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }

  resetRate() {
    this.dataRate.id = 0;
    this.dataRate.minRate = '';
    this.dataRate.maxRate = '';
    this.dataRate.optimalRate = '';
    this.dataRate.installment = null;
    this.dataRate.rateAgreed = '';
    this.dataRate.typeOfCurrency = '';
    this.dataRate.commentRatePreferential = null;
    this.dataRate.rateAgreed = '';
    this.dataRate.approvalLevel = '';
    this.firstMinRate = '';
    this.firstOptimalRates = '';
  }
}
