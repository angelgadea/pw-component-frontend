import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

// interface
import { TemEvaluation, DataTemEvaluation } from '@core/models/tem-evaluation-model';
import { TemEvaluationSustentation } from '@core/models/tem-evaluation-model';
// service
import { TemEvaluationService } from '@core/services/tem-evaluation/tem-evaluation.service';
import { QuoterHistoryService } from '@core/services/quoter-history/quoter-history.service';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
import { FileService } from '@core/services/file/file.service';
// file-configuration
import { approverLevel, statusIdTem } from '../../../../config/configuration-file';
import { takeUntil, min } from 'rxjs/operators';

@Component({
  selector: 'app-tem-evaluation',
  templateUrl: './tem-evaluation.component.html',
  styleUrls: ['./tem-evaluation.component.css']
})
export class TemEvaluationComponent implements OnInit, OnDestroy {
  public unsubscribe$ = new Subject();
  public objTemEvaluation: TemEvaluation = {
    quotationId: 0,
    subproductId: 0,
    loanDays: 0,
    riskLevel: '',
    loanAmount: 0,
    basicSegmentId: 0,
    insuranceId: 0,
    subproductName: '',
    basicSegmentName: '',
    insuranceName: '',
    customerId: 0,
    customerName: '',
    minRate: 0,
    maxRate: 0,
    firstInstallment: 0,
    minRateApprover1: 0,
    minRateApprover2: 0,
    minRateApprover3: 0,
    minRateApprover4: 0,
    quoted_rate: '',
    inmmediateBoss: 0,
    positionId: 0,
    requested_rate: null
  };

  public objTemEvaluationSustentation: TemEvaluationSustentation = {
    quotationId: 0,
    comment: '',
    currentQuoterName: '',
    currentQuoterFirstSurName: '',
    roleNames: '',
    currentQuoterId: 0
  };

  public dataTemEvaluation: DataTemEvaluation = {
    negotiatedRate: '',
    commentTemEvaluation: '',
    approvalLevel: 0,
    statusId: 0,
    inmediateBoss: 0,
    approveRate: '',
    requestRate: '',
  };

  public loadingTem: boolean;

  public contentLoan: boolean;
  public contentInformation: boolean;
  public contentLivelihoods: boolean;
  public param: number;
  public dataOfUser: any;
  public stateQuoteHistory: boolean;
  public btnApprove: boolean;
  public btnRaise: boolean;
  public errorLimit: boolean;
  public modalError: boolean;
  public lengthFile: any;
  public idQuotation = '';

  public btnDateLoanWhite = false;
  public btnDateLoanFucsia = true;
  public btnSustentationWhite = false;
  public btnSustentationFucsia = true;
  public btnInformationWhite = false;
  public btnInformationFucsia = true;

  constructor(private route: Router,
              private temEvaluationService: TemEvaluationService,
              private quoterHistoryService: QuoterHistoryService,
              private quoterQuotationViewService: QuoterQuotationViewService,
              private fileService: FileService) {
    this.readDataOfSessionStorage();
    this.contentLoan = false;
    this.contentInformation = false;
    this.contentLivelihoods = false;
    this.btnApprove = false;
    this.btnRaise = false;
    this.errorLimit = false;
  }

  ngOnInit() {
    this.getTemEvaluationC();
    this.getTemEvaluationSustentationC();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  viewContentOfLoan() {
    this.contentLoan === false ? this.contentLoan = true : this.contentLoan = false;
    this.btnDateLoanFucsia === true ? this.btnDateLoanFucsia = false : this.btnDateLoanFucsia = true;
    this.btnDateLoanWhite === false ? this.btnDateLoanWhite = true : this.btnDateLoanWhite = false;
    this.errorLimit = false;
  }

  viewContentInformation() {
    this.contentInformation === false ? this.contentInformation = true : this.contentInformation = false;
    this.btnInformationFucsia === true ? this.btnInformationFucsia = false : this.btnInformationFucsia = true;
    this.btnInformationWhite === false ? this.btnInformationWhite = true : this.btnInformationWhite = false;
    this.errorLimit = false;
  }

  viewContentLivelihoods() {
    this.contentLivelihoods === false ? this.contentLivelihoods = true : this.contentLivelihoods = false;
    this.btnSustentationFucsia === true ? this.btnSustentationFucsia = false : this.btnSustentationFucsia = true;
    this.btnSustentationWhite === false ? this.btnSustentationWhite = true : this.btnSustentationWhite = false;
    this.errorLimit = false;
    this.quoterQuotationViewService.getFilesOfServer(this.idQuotation, this.dataOfUser);
  }

  getTemEvaluationC() {
    this.loadingTem = true;
    this.temEvaluationService.dataTemEvaluation
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result.quotationId === undefined) {
          this.loadingTem = true;
        } else {
          this.loadingTem = false;
          this.objTemEvaluation = result;
          this.idQuotation = result.quotationId;
        }
      });
  }

  getTemEvaluationSustentationC() {
    this.temEvaluationService.dataTemEvaluationSustentation
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.objTemEvaluationSustentation = result[0];
      });
    this.quoterQuotationViewService.listFile
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result =>
        this.lengthFile = result.length);
  }

  fileQuotation() {
    this.quoterQuotationViewService.getFilesOfServer(this.idQuotation, this.dataOfUser);
    this.fileService.stateRouteFile.next(true);
    this.route.navigate(['/files-quotation']);
  }

  viewQuotationHistory() {
    const id = String(this.idQuotation);
    if (this.dataOfUser.roleName === 'APROBADOR') {
      this.quoterHistoryService.getQuotationHistory(id, this.dataOfUser);
      this.quoterHistoryService.stateTemHistory.next(false);
      this.route.navigate(['/quoter-history']);
    }
  }

  viewQuotation() {
    const id = String(this.idQuotation);
    if (this.dataOfUser.roleName === 'APROBADOR') {
      this.quoterQuotationViewService.getQuoteSummary(id, this.dataOfUser);
      this.quoterQuotationViewService.stateTemHistoryPage.next(true);
      this.route.navigate(['/quoter-quotation-view']);
    }
  }

  validateTemNegociated() {
    const temEntered = this.dataTemEvaluation.negotiatedRate;
    const regexTem = /^[0-9]{1}\.?[0-9]{0,2}$/;
    const validatTem = regexTem.test(temEntered);
    this.validateTemHeadOfCredit(validatTem);
    this.validateTemAgencyManager(validatTem);
    this.validateTemRegionalManager(validatTem);
    this.validateTemDivisionalManager(validatTem);
    this.validateTemCreditIndividualManager(validatTem);
  }

  validateMaxTemApprover() {
  }


  validateTemHeadOfCredit(validatTem) {
    const dataTem = this.objTemEvaluation;
    const temEntered = parseFloat(this.dataTemEvaluation.negotiatedRate);
    console.log(temEntered);

    const minRate = dataTem.minRate;
    const maxRate = dataTem.maxRate;
    const approveOne = dataTem.minRateApprover1 === 0 ? minRate : dataTem.minRateApprover1;
    const approveTwo = dataTem.minRateApprover2 === 0 ? (approveOne === minRate ? minRate : approveOne) : dataTem.minRateApprover2;
    const approveThree = dataTem.minRateApprover3 === 0 ? (approveTwo === minRate ? minRate : approveTwo) : dataTem.minRateApprover3;
    const approveFour = dataTem.minRateApprover4 === 0 ? (approveThree === minRate ? minRate : approveThree) : dataTem.minRateApprover4;


    if (this.dataOfUser.positionId === 2) {
      if (temEntered < approveFour || temEntered > maxRate && validatTem === true) {
        this.errorLimit = true;
        this.btnApprove = false;
        this.btnRaise = false;
      } else if (temEntered === 0) {
        this.errorLimit = false;
        this.btnApprove = false;
        this.btnRaise = false;
      } else if (temEntered === this.objTemEvaluation.quoted_rate && temEntered >= minRate && temEntered <= maxRate && validatTem === true) {
        this.btnApprove = true;
        this.btnRaise = false;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateAutonomy;
        this.dataTemEvaluation.statusId = statusIdTem.approveId;
      } else if (temEntered >= minRate && temEntered <= maxRate && validatTem === true) {
        this.btnApprove = true;
        this.btnRaise = false;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateAutonomy;
        this.dataTemEvaluation.statusId = statusIdTem.approveModId;
      } else if (temEntered <= minRate && temEntered >= approveOne && validatTem === true) {
        this.btnApprove = false;
        this.btnRaise = true;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateOfficeManager;
        this.dataTemEvaluation.statusId = statusIdTem.pendingApproverEleId;
      } else if (temEntered <= approveOne && temEntered >= approveTwo && validatTem === true) {
        this.btnApprove = false;
        this.btnRaise = true;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateRegionalManager;
        this.dataTemEvaluation.statusId = statusIdTem.pendingApproverEleId;
      } else if (temEntered <= approveTwo && temEntered >= approveThree && validatTem === true) {
        this.btnApprove = false;
        this.btnRaise = true;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateDivisionManager;
        this.dataTemEvaluation.statusId = statusIdTem.pendingApproverEleId;
      } else if (temEntered <= approveThree && temEntered >= approveFour && validatTem === true) {
        this.btnApprove = false;
        this.btnRaise = true;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateIndividualCreditManager;
        this.dataTemEvaluation.statusId = statusIdTem.pendingApproverEleId;
      } else {
        this.errorLimit = true;
        this.btnApprove = false;
        this.btnRaise = false;
      }
    }
  }




  validateTemAgencyManager(validatTem) {
    const dataTem = this.objTemEvaluation;
    const temEntered = parseFloat(this.dataTemEvaluation.negotiatedRate);
    const minRate = dataTem.minRate;
    const maxRate = dataTem.maxRate;
    const approveOne = dataTem.minRateApprover1;
    const approveTwo = dataTem.minRateApprover2 === 0 ? approveOne : dataTem.minRateApprover2;
    const approveThree = dataTem.minRateApprover3 === 0 ? (approveTwo === approveOne ? approveOne : approveTwo) : dataTem.minRateApprover3;
    const approveFour = dataTem.minRateApprover4 === 0 ? (approveThree === approveOne ? approveOne : approveThree) : dataTem.minRateApprover4;
    if (this.dataOfUser.positionId === 3) {
      if (temEntered < approveFour || temEntered > maxRate && validatTem === true) {
        this.errorLimit = true;
        this.btnApprove = false;
        this.btnRaise = false;
      } else if (temEntered === 0) {
        this.errorLimit = false;
        this.btnApprove = false;
        this.btnRaise = false;
      } else if (temEntered >= approveOne && this.objTemEvaluation.quoted_rate && validatTem === true) {
        this.btnRaise = false;
        this.btnApprove = true;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateOfficeManager;
        this.dataTemEvaluation.statusId = statusIdTem.approveId;
      } else if (temEntered <= approveOne && temEntered >= approveTwo && validatTem === true) {
        this.btnRaise = true;
        this.btnApprove = false;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateRegionalManager;
        this.dataTemEvaluation.statusId = statusIdTem.pendingApproverEleId;
      } else if (temEntered <= approveTwo && temEntered >= approveThree && validatTem === true) {
        this.btnRaise = true;
        this.btnApprove = false;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateDivisionManager;
        this.dataTemEvaluation.statusId = statusIdTem.pendingApproverEleId;
      } else if (temEntered <= approveThree && temEntered >= approveFour && validatTem === true) {
        this.btnRaise = true;
        this.btnApprove = false;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateIndividualCreditManager;
        this.dataTemEvaluation.statusId = statusIdTem.pendingApproverEleId;
      } else {
        this.errorLimit = true;
        this.btnApprove = false;
        this.btnRaise = false;
      }
    }
  }

  validateTemRegionalManager(validatTem) {
    const dataTem = this.objTemEvaluation;
    const temEntered = parseFloat(this.dataTemEvaluation.negotiatedRate);
    const maxRate = dataTem.maxRate;
    const approveOne = dataTem.minRateApprover1;
    const approveTwo = dataTem.minRateApprover2;
    const approveThree = dataTem.minRateApprover3 === 0 ? approveTwo : dataTem.minRateApprover3;
    const approveFour = dataTem.minRateApprover4 === 0 ? (approveThree === approveTwo ? approveTwo : approveThree) : dataTem.minRateApprover4;

    if (this.dataOfUser.positionId === 4) {
      if (temEntered < approveFour || temEntered > maxRate && validatTem === true) {
        this.errorLimit = true;
        this.btnApprove = false;
        this.btnRaise = false;
      } else if (temEntered === 0) {
        this.errorLimit = false;
        this.btnApprove = false;
        this.btnRaise = false;
      } else if (temEntered >= approveTwo && this.objTemEvaluation.quoted_rate && validatTem === true) {
        this.btnRaise = false;
        this.btnApprove = true;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateRegionalManager;
        this.dataTemEvaluation.statusId = statusIdTem.approveId;
      } else if (temEntered <= approveTwo && temEntered >= approveThree && validatTem === true) {
        this.btnRaise = true;
        this.btnApprove = false;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateDivisionManager;
        this.dataTemEvaluation.statusId = statusIdTem.pendingApproverEleId;
      } else if (temEntered <= approveThree && temEntered >= approveFour && validatTem === true) {
        this.btnRaise = true;
        this.btnApprove = false;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateIndividualCreditManager;
        this.dataTemEvaluation.statusId = statusIdTem.pendingApproverEleId;
      } else {
        this.errorLimit = true;
        this.btnApprove = false;
        this.btnRaise = false;
      }
    }
  }

  validateTemDivisionalManager(validatTem) {
    const dataTem = this.objTemEvaluation;
    const temEntered = parseFloat(this.dataTemEvaluation.negotiatedRate);
    const maxRate = dataTem.maxRate;
    const approveTwo = dataTem.minRateApprover2;
    const approveThree = dataTem.minRateApprover3;
    const approveFour = dataTem.minRateApprover4 === 0 ? approveThree : dataTem.minRateApprover4;

    if (this.dataOfUser.positionId === 5) {
      if (temEntered < approveFour || temEntered > maxRate && validatTem === true) {
        this.errorLimit = true;
        this.btnApprove = false;
        this.btnRaise = false;
      } else if (temEntered === 0) {
        this.errorLimit = false;
        this.btnApprove = false;
        this.btnRaise = false;
      } else if (temEntered >= approveThree && this.objTemEvaluation.quoted_rate && validatTem === true) {
        this.btnRaise = false;
        this.btnApprove = true;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateDivisionManager;
        this.dataTemEvaluation.statusId = statusIdTem.approveId;
      } else if (temEntered <= approveThree && temEntered >= approveFour && validatTem === true) {
        this.btnRaise = true;
        this.btnApprove = false;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateIndividualCreditManager;
        this.dataTemEvaluation.statusId = statusIdTem.pendingApproverEleId;
      } else {
        this.errorLimit = true;
        this.btnApprove = false;
        this.btnRaise = false;
      }
    }
  }

  validateTemCreditIndividualManager(validatTem) {
    const dataTem = this.objTemEvaluation;
    const temEntered = parseFloat(this.dataTemEvaluation.negotiatedRate);
    const approveThree = dataTem.minRateApprover3;
    const approveFour = dataTem.minRateApprover4;
    const maxRate = dataTem.maxRate;
    if (this.dataOfUser.positionId === 6) {
      if ((temEntered >= approveFour && temEntered <= maxRate) && this.objTemEvaluation.quoted_rate && validatTem === true) {
        this.btnRaise = false;
        this.btnApprove = true;
        this.errorLimit = false;
        this.dataTemEvaluation.approvalLevel = approverLevel.rateIndividualCreditManager;
        this.dataTemEvaluation.statusId = statusIdTem.approveId;
      } else {
        this.errorLimit = true;
        this.btnApprove = false;
        this.btnRaise = false;
      }
    }
  }

  approveModal() {
    if (this.dataTemEvaluation.negotiatedRate !== '') {
      this.modalError = false;
    } else {
      this.modalError = true;
    }
    this.validateTemNegociatedDecimal();
  }

  raiseModal() {
    if (this.dataTemEvaluation.negotiatedRate !== '') {
      this.modalError = false;
      this.validateTemNegociatedDecimal();
    } else {
      this.modalError = true;
    }
  }

  rejectModal() {
    if (this.dataTemEvaluation.negotiatedRate !== '' && this.errorLimit !== true) {
      this.modalError = false;
      this.validateTemNegociatedDecimal();
    } else {
      this.modalError = true;
    }
  }

  validateTemNegociatedDecimal() {
    const tem = this.dataTemEvaluation.negotiatedRate;
    const truncTem = tem.toString().indexOf('.');
    const resDecimal = String(tem).substring((truncTem + 1));
    const deleteZero = tem.slice(-1);

    if (deleteZero === '.') {
      this.dataTemEvaluation.negotiatedRate = tem.substring(0, 1) + '.00';
    } else if (truncTem === -1) {
      const term = Number(this.dataTemEvaluation.negotiatedRate);
      this.dataTemEvaluation.negotiatedRate = term.toFixed(2);
    } else if (truncTem === 1) {
      if (resDecimal.length === 1) {
        this.dataTemEvaluation.negotiatedRate = this.dataTemEvaluation.negotiatedRate + '0';
      } else {
        this.dataTemEvaluation.negotiatedRate = this.dataTemEvaluation.negotiatedRate;
      }
    }
  }

  approveRate() {
    const temNegotiatedRate = Number(this.dataTemEvaluation.negotiatedRate).toFixed(2);
    const quotedRate = Number(this.objTemEvaluation.quoted_rate).toFixed(2);
    if (temNegotiatedRate !== quotedRate) {
      this.dataTemEvaluation.statusId = 3;
    } else {
      this.dataTemEvaluation.statusId = 2;
    }
    this.modalError = false;
    this.dataTemEvaluation.inmediateBoss = this.objTemEvaluation.inmmediateBoss;
    this.dataTemEvaluation.approveRate = temNegotiatedRate;
    this.dataTemEvaluation.requestRate = this.objTemEvaluation.requested_rate;
    const dataTem = this.objTemEvaluation;
    const dataTemForm = this.dataTemEvaluation;
    this.temEvaluationService.postNewQuotationLifeCycle(dataTem, dataTemForm, this.dataOfUser);
    this.temEvaluationService.responseLifeCycle
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) {
          this.quoterQuotationViewService.getQuoteSummary(this.objTemEvaluation.quotationId, this.dataOfUser);
          this.route.navigate(['/quoter-quotation-view']);
        }
      });
  }


  raiseRate() {
    const temNegotiatedRate = Number(this.dataTemEvaluation.negotiatedRate).toFixed(2);
    const quotedRate = Number(this.objTemEvaluation.quoted_rate).toFixed(2);
    if (temNegotiatedRate === quotedRate) {
      this.objTemEvaluation.quoted_rate = this.dataTemEvaluation.negotiatedRate;
      this.dataTemEvaluation.requestRate = null;
      this.dataTemEvaluation.approveRate = null;
    } else {
      this.dataTemEvaluation.requestRate = temNegotiatedRate;
      this.dataTemEvaluation.approveRate = null;
    }
    this.dataTemEvaluation.inmediateBoss = this.objTemEvaluation.inmmediateBoss;
    const dataTem = this.objTemEvaluation;
    const dataTemForm = this.dataTemEvaluation;
    this.temEvaluationService.postNewQuotationLifeCycle(dataTem, dataTemForm, this.dataOfUser);
    this.temEvaluationService.responseLifeCycle
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) {
          this.quoterQuotationViewService.getQuoteSummary(this.objTemEvaluation.quotationId, this.dataOfUser);
          this.route.navigate(['/quoter-quotation-view']);
        }
      });
  }

  toRefuseRate() {
    this.dataTemEvaluation.statusId = statusIdTem.rejectedId;
    this.dataTemEvaluation.requestRate = this.objTemEvaluation.requested_rate;
    this.dataTemEvaluation.approveRate = null;
    this.dataTemEvaluation.inmediateBoss = null;
    const dataTem = this.objTemEvaluation;
    const dataTemForm = this.dataTemEvaluation;
    this.temEvaluationService.postNewQuotationLifeCycle(dataTem, dataTemForm, this.dataOfUser);
    this.temEvaluationService.responseLifeCycle
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) {
          this.quoterQuotationViewService.getQuoteSummary(this.objTemEvaluation.quotationId, this.dataOfUser);
          this.route.navigate(['/quoter-quotation-view']);
        }
      });
  }

}
