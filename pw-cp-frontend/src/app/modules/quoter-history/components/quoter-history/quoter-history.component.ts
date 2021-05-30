import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Interface
import { QuotationHistory } from '@core/models/quotation-history-model';
// Service
import { QuoterHistoryService } from '@core/services/quoter-history/quoter-history.service';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
import { statusCode } from 'src/app/config/configuration-file';

@Component({
  selector: 'app-quoter-history',
  templateUrl: './quoter-history.component.html',
  styleUrls: ['./quoter-history.component.css']
})
export class QuoterHistoryComponent implements OnInit, OnDestroy {

 public unsubscribe$ = new Subject();

  public objQuotationHistory: [ QuotationHistory , {
    id: 0,
    quotationId: 0,
    currentQuoterId: 0,
    currentApproverId: 0,
    statusId: 0,
    comment: '',
    quotedRate: 0,
    requestedRate: 0,
    approvedRate: '',
    mostRecentEvent: 0,
    approvalLevel: 0,
    enabled: 0,
    creatorUser: '',
    creationDate: '',
    modifierUser: '',
    modificationDate: '',
    nameEmployee: '',
    firstSurnameEmployee: '',
    nameEmployeeApprover: '',
    firstSurnameEmployeeApprover: '',
    stateName: '',
    stateActionName: '',
    abbreviationStatus: '',
    positionId: '',
  }];
  public quotationHistoryId: QuotationHistory = {
    id: 0,
    quotationId: 0,
    currentQuoterId: 0,
    currentApproverId: 0,
    statusId: 0,
    comment: '',
    quotedRate: 0,
    requestedRate: 0,
    approvedRate: '',
    mostRecentEvent: 0,
    approvalLevel: 0,
    enabled: 0,
    creatorUser: '',
    creationDate: '',
    modifierUser: '',
    modificationDate: '',
    nameEmployee: '',
    firstSurnameEmployee: '',
    nameEmployeeApprover: '',
    firstSurnameEmployeeApprover: '',
    stateName: '',
    stateActionName: '',
    abbreviationStatus: '',
    positionId: '',
  };
  public quotationHistoryComment: any;
  public dataOfUser: any;
  public quantityQuotes = 0;
  public position: any;
  public viewHistoryPage: boolean;
  public fileLength = 0;
  public loadingHistory: boolean;

  constructor(private quoterHistoryService: QuoterHistoryService,
              private quoterQuotationViewService: QuoterQuotationViewService,
              private route: Router) {
    this.readDataOfSessionStorage();
    this.getQuotationHistoryC();
  }

  ngOnInit() {
  }

  // @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

  getQuotationHistoryC() {
    this.loadingHistory = true;
    this.quoterHistoryService.dataQuotationHistory
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result === undefined) {
        this.loadingHistory = true;
      } else {
        this.objQuotationHistory = result;
        this.quantityQuotes = (result.length) - 1;
        this.position = result[this.quantityQuotes];
        this.quotationHistoryId = result[0];
        this.loadingHistory = false;
      }
    }, error => {
      this.loadingHistory = false;
      this.handleError(error);
    });
    this.quoterQuotationViewService.listFile
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      this.fileLength = result.length;
    });
  }

  verComentario(quotationCommentId: any) {
    this.quotationHistoryComment = this.objQuotationHistory.filter(element => element.id === quotationCommentId);
    return this.quotationHistoryComment;
  }

  fileQuotation(quotationId: any) {
    this.quoterQuotationViewService.getFilesOfServer(quotationId, this.dataOfUser);
    this.quoterHistoryService.stateFilePage.next(true);
    this.route.navigate(['/files-quotation']);
  }

  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }

}
