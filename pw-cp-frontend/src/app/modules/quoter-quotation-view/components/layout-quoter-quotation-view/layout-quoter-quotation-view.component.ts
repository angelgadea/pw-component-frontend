import { Component, OnInit } from '@angular/core';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';
import { Router } from '@angular/router';

import { statusCode } from 'src/app/config/configuration-file';
import { Data } from '@core/models/quoter-quotation-view-model';
import { DataRateService } from '../../../../core/services/quotation/data-rate.service';

@Component({
  selector: 'app-layout-quoter-quotation-view',
  templateUrl: './layout-quoter-quotation-view.component.html',
  styleUrls: ['./layout-quoter-quotation-view.component.css']
})
export class LayoutQuoterQuotationViewComponent implements OnInit {

  public loadingQuoteSummary: boolean;
  public abc: boolean;

  constructor(private quoterQuotationViewService: QuoterQuotationViewService,
    private dataRateService: DataRateService,
              private route: Router) {
  }

  ngOnInit() {
    this.subscribeQuoteSummary();
  }

  subscribeQuoteSummary() {
    this.loadingQuoteSummary = true;
      this.dataRateService.file.subscribe(result => { 
        this.abc = result;
      });
      this.quoterQuotationViewService.quoteSummary.subscribe((result: Data) => {
        if (result.quotationId === undefined ) {
          this.loadingQuoteSummary = true;
        } else {
          this.loadingQuoteSummary = false;
        }
      }, error => this.handleError(error));
  
  }

  subs() {
  }
 
  private handleError(error) {
    const status = error.status;
    if (statusCode.zero === status || statusCode.fiveHundred === status) {
      this.route.navigate(['/system-error']);
    }
  }


}
