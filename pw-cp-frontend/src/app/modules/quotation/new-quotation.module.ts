import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

// components
import { DataClientComponent } from './components/data-client/data-client.component';
import { DataLoanComponent} from './components/data-loan/data-loan.component';
import { DataProductComponent } from './components/data-product/data-product.component';
import { DataRateComponent } from './components/data-rate/data-rate.component';
import { LayoutNewQuotationComponent } from './components/layout-new-quotation/layout-new-quotation.component';
// router
import { NewQuotationRoutingModule } from './new-quotation-routing.module';
// module
import { SharedModule } from '../../shared/shared.module';
import { RatePreferentialComponent } from './components/rate-preferential/rate-preferential.component';

@NgModule({
  declarations: [
    DataClientComponent,
    DataLoanComponent,
    DataProductComponent,
    DataRateComponent,
    LayoutNewQuotationComponent,
    RatePreferentialComponent
  ],
  imports: [
    CommonModule,
    NewQuotationRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewQuotationModule { }
