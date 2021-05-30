import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// interface
import { Data } from '@core/models/quoter-quotation-view-model';
import { QuoterQuotationViewService } from '@core/services/quoter-quotation-view/quoter-quotation-view.service';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.css']
})
export class HeaderContainerComponent implements OnInit, OnDestroy {

  public unsubscribe$ = new Subject();

  public showData: Data;
  public containerBottom: boolean;

  constructor(private quoterQuotationViewService: QuoterQuotationViewService) {
    this.subscribeDataQuotation();
  }

  ngOnInit() {}

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  subscribeDataQuotation() {
    this.quoterQuotationViewService.dataSummary
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((result: Data) => {
      this.showData = result;
    });
  }

}
