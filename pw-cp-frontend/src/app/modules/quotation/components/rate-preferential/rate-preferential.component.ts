import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataRateService } from '@core/services/quotation/data-rate.service';
import { DataUser } from '@core/models/login-model';

import Swal from 'sweetalert2';
import { statusCode, path } from 'src/app/config/configuration-file';
import { Router } from '@angular/router';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-rate-preferential',
  templateUrl: './rate-preferential.component.html',
  styleUrls: ['./rate-preferential.component.css']
})
export class RatePreferentialComponent implements OnInit, OnDestroy {

  enabledContentRatePreferential: boolean = false;
  dataRate: any = '';
  commentRatePreferential: string = '';
  showErrorSize: boolean;
  showDuplicateError: boolean;
  errorMaximumNumberFile: boolean;

  approvalLevel: any;
  approvalLevelPosition: any;

  disabledAttachFile: boolean;
  public listDataFiles: any[] = [];
  public sizekb = 5242880;
  public quantityFile = 0;

  disabledBtnSendRequest: boolean;

  dataOfUser: DataUser;

  public router = {
    path: '',
  };


  constructor(private serviceRate: DataRateService,
              private quoterQuotationViewService: QuoterQuotationViewService,
              private route: Router) { }

  ngOnInit() {
    this.disabledBtnSendRequest = true;
    this.serviceRate.sendMessageObservable$.subscribe(res => {
      this.enabledContentRatePreferential = res.disabledContent;
      this.dataRate = res.rate;
    });
    this.readDataOfSessionStorage();
  }

  async ngOnDestroy() {
    this.listDataFiles = [];
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  onRatePreferential() {
    if (this.dataRate.commentRatePreferential !== '' && this.dataRate !== '') {
      this.disabledBtnSendRequest = false;
    } else {
      this.disabledBtnSendRequest = true;
    }
  }

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
          if(this.listDataFiles.map(file => file.name).includes(file.nameFile)) {
            this.showErrorMessagePerSeconds('showDuplicateError');
            this.listDataFiles = this.getUnique(this.listDataFiles, 'name');
          } else {
            this.listDataFiles.push(dataFile[index]);
            this.quantityFile = this.listDataFiles.length;
          }
        } else {
          this.showErrorMessagePerSeconds('showErrorSize');
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
    if (this.serviceRate.saveFileInServer) {
      return this.serviceRate.sendObjectFiles(
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


  onQueryApprovalLevel() {
    this.validateTemNegociatedDecimal();
    this.serviceRate.getApprovalLevel(this.dataRate, this.dataOfUser);
    this.serviceRate.dataApprovalLevel
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


  onSaveNewQuotationPreferential() {
    this.serviceRate.postNewQuotation(this.dataOfUser, this.dataRate);
    this.serviceRate.dataNewQuotation
    .subscribe(result => {
      const idQuote = result.quotationId;
      if (result) {
        if (this.checkNumberFiles()) {
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

  checkNumberFiles() {
    if (this.listDataFiles.length >= 1) {
      return true;
    } else {
      return false;
    }
  }

  additionalFunctions(result) {
    this.serviceRate.sendQuotePendingApprovalEmail(result, this.dataOfUser);
    this.quoterQuotationViewService.getQuoteSummary(result.quotationId, this.dataOfUser);
    this.searchFeatureName();
    this.validateFeatureName();
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



  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }

}
