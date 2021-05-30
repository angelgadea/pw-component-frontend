import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// component
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavQuotationComponent } from './components/nav-quotation/nav-quotation.component';
import { NavQuoteDisplayPageComponent } from './components/nav-quote-display-page/nav-quote-display-page.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { NavApproverComponent } from './components/nav-approver/nav-approver.component';
// pipefilter
import { FilterSearchPipe } from './pipes/filter-search.pipe';
import { CustomAmountPipe } from './pipes/custom-amount.pipe';
import { FilePdfComponent } from './components/file-pdf/file-pdf.component';
import { StateQuotePipe } from './pipes/state-quote.pipe';
import { RemoveDotCurrencyPipe } from './pipes/remove-dot-currency.pipe';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    NavQuotationComponent,
    NavQuoteDisplayPageComponent,
    HeaderNavComponent,
    NavApproverComponent,
    FilterSearchPipe,
    CustomAmountPipe,
    FilePdfComponent,
    StateQuotePipe,
    RemoveDotCurrencyPipe,
    CapitalizeFirstLetterPipe
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    NavQuotationComponent,
    NavQuoteDisplayPageComponent,
    HeaderNavComponent,
    NavApproverComponent,
    FilterSearchPipe,
    CustomAmountPipe,
    FilePdfComponent,
    StateQuotePipe,
    RemoveDotCurrencyPipe,
    CapitalizeFirstLetterPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }


