import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';

import { IPBackend } from '../../../../microservices/ip-development';
import { componentSystemParams } from '../../../../microservices/components-backend';
import { endpointDownloadFile } from '../../../../microservices/endpoints';
import { statusCode } from 'src/app/config/configuration-file';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit, OnDestroy {

  public unsubscribe$ = new Subject();

  public ApiUrl = `${IPBackend}${componentSystemParams}${endpointDownloadFile}`;

  public dataFiles: any[] = [];
  public quotationId: any;
  public loadingFilePage: boolean;

  public imageFile: string;
  public documentName: any;
  public isFilePdf: boolean;

  constructor(private quoterQuotationViewService: QuoterQuotationViewService,
              private route: Router) {
  }

  ngOnInit() {
    this.subscribeFile();
  }

  // @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  subscribeFile() {
    this.loadingFilePage = true;
    this.quoterQuotationViewService.listFile
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      this.dataFiles = result;
      if (result.length === 0) {
        this.loadingFilePage = true;
      } else {
        this.dataFiles = result;
        const allowedExtensions = /(.pdf)$/i;
        result.forEach(element => {
          if (allowedExtensions.exec(element.nameDocument)) {
            this.isFilePdf = true;
          } else {
            this.isFilePdf = false;
          }
        });
        result.forEach(element => this.quotationId = element.quotationId);
        this.loadingFilePage = false;
      }
    }, error => {
      this.loadingFilePage = false;
      this.handleError(error);
    });
  }

  imagenShow(idQuote: any) {
    this.dataFiles.forEach(element => {
      if (idQuote === element.id) {
        this.imageFile = element.nameDocument;
        this.documentName = element.nameDocument;
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
