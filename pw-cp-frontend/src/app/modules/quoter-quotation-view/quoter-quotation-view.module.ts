import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { QuoterQuotationViewComponent } from './components/quoter-quotation-view/quoter-quotation-view.component';
import { LayoutQuoterQuotationViewComponent } from './components/layout-quoter-quotation-view/layout-quoter-quotation-view.component';
import { QuoterQuotationViewRoutingModule } from './quoter-quotation-view-routing.module';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
// module
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    QuoterQuotationViewComponent,
    LayoutQuoterQuotationViewComponent,
    HeaderContainerComponent
  ],
  imports: [
    CommonModule,
    QuoterQuotationViewRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuoterQuotationViewModule { }
