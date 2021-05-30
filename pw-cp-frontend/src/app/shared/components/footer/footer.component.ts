import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// service
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
import { QuoterHistoryService } from '@core/services/quoter-history/quoter-history.service';
import { TemEvaluationService } from '@core/services/tem-evaluation/tem-evaluation.service';
// interface
import { Data } from '@core/models/quoter-quotation-view-model';
import { DataUser } from '@core/models/login-model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  public unsubscribe$ = new Subject();
  public showData: Data;
  public negotiationActive: boolean;
  public downloadFilePdf: boolean;
  public fileDisbursement: boolean;
  public dataOfUser: DataUser = {
    employeeId: 0,
    cTop: 0,
    employeeName: '',
    roleFeatureDtoList: {},
    id: 0,
    message: '',
    officeId: 0,
    officeName: '',
    passwordToBeChanged: 0,
    roleId: 0,
    roleName: 'alfredo',
    username: '',
    immediateBossId: 0,
    employeeFirstSurName: '',
    positionId: 0,
  };
  public idQuote: any;

  statusIdApp = 6;
  statusIdAppMod = 7;

  constructor(private quoterQuotationViewService: QuoterQuotationViewService,
              private quoterHistoryService: QuoterHistoryService,
              private temEvaluationService: TemEvaluationService,
              private route: Router) {
    this.readDataOfSessionStorage();
    this.negotiationActive = false;
    this.downloadFilePdf = false;
  }

  ngOnInit() {
    this.subscribeDataQuotationView();
  }

  // @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  readDataOfSessionStorage() {
    return this.dataOfUser = JSON.parse(sessionStorage.getItem('dataUser'));
  }

subscribeDataQuotationView() {
    this.quoterQuotationViewService.quoteSummary
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: Data) => {
        this.showData = result;
        this.idQuote = result.quotationId;
        if (result.statusId === 2 || result.statusId === 3) {
          this.downloadFilePdf = true;
          this.negotiationActive = false;
          this.fileDisbursement = false;
        } else if (result.statusId === 4) {
          this.negotiationActive = true;
          this.downloadFilePdf = false;
          this.fileDisbursement = false;
        } else if (result.statusId === 6 || result.statusId === 7) {
          this.fileDisbursement = true;
        } else if (result.statusId === 5 || result.statusId === 1) {
          this.downloadFilePdf = false;
          this.fileDisbursement = false;
        }
      });
  }

  viewHistory() {
    this.quoterHistoryService.getQuotationHistory(this.idQuote, this.dataOfUser);
    this.quoterQuotationViewService.getFilesOfServer(this.idQuote, this.dataOfUser);
    this.quoterHistoryService.stateViewHistory.next(true);
    this.route.navigate(['/quoter-history']);
  }

  negotiateTem() {
  }

  downloadPDFFile() {
    if (this.showData.statusId === 2 || this.showData.statusId === 3) {
      this.temEvaluationService.postNewQuotationLifeCycleDownloadPDF(this.showData, this.dataOfUser);
      this.temEvaluationService.responseLifeCycle.subscribe(resp => {
        this.quoterQuotationViewService.getQuoteSummary(this.idQuote, this.dataOfUser);
        this.subscribeDataQuotationView();
        this.downloadPDF();
      });
    }  else {
      this.downloadPDF();
    }
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.autoTable({
      html: '#tabla-1',
      theme: 'plain',
      columnStyles: {
        0: { halign: 'center', textColor: '#111', fontSize: 15 },
      },
      margin: { top: 20 },
    });
    doc.autoTable({
      html: '#tabla0',
      theme: 'plain',
      headStyles: {
        fillColor: ['#CA005D'],
      },
      columnStyles: {
        0: { halign: 'left', textColor: '#222' },
        1: { halign: 'left', textColor: '#444' },
        2: { halign: 'left', textColor: '#444' },
        3: { halign: 'left', textColor: '#222' },
        4: { halign: 'left', textColor: '#444' },
        5: { halign: 'left', textColor: '#444' },
      },
      margin: { top: 20 },
    });
    doc.autoTable({
      html: '#tabla1',
      headStyles: {
        fillColor: ['#CA005D'],
      },
      columnStyles: {
        0: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5 },
        1: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5 },
        2: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5 },
        3: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5 },
        4: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5 },
      },
      alternateRowStyles: {
        textColor: '#222'
      },
      tableLineWidth: 2,
      tableLineColor: ['#CA005D'],
      margin: { top: 10 },
      footStyles: { fillColor: ['#c2c2c2'], halign: 'center', textColor: '#444' },
    });
    doc.autoTable({
      html: '#tabla2',
      headStyles: {
        fillColor: ['#CA005D'],
      },
      columnStyles: {
        0: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5 },
        1: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5 },
        2: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5 },
        3: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5 },
        4: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5 },
      },
      alternateRowStyles: {
        textColor: '#222'
      },
      tableLineWidth: 2,
      tableLineColor: ['#CA005D'],
      margin: { top: 10 },
    });
    doc.autoTable({
      html: '#tabla3',
      headStyles: {
        fillColor: ['#CA005D'],
      },
      columnStyles: {
        0: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5, textColor: '#222', fillColor: ['#ebebeb'], },
        1: { halign: 'center', lineColor: '#cdcdcd', lineWidth: 0.5, textColor: '#444', fillColor: ['#ebebeb'], },
      },
      tableLineWidth: 2,
      tableLineColor: ['#CA005D'],
      margin: { top: 10 },
    });
    doc.save('fichaResumenDeCotizacion.pdf');
  }


}
