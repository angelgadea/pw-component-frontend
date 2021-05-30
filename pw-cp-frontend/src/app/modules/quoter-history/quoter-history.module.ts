import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// module
import { SharedModule } from '../../shared/shared.module';
// component
import { QuoterHistoryComponent } from './components/quoter-history/quoter-history.component';
// router
import { QuoterHistoryRoutingModule } from './quoter-history-routing.module';

@NgModule({
  declarations: [
    QuoterHistoryComponent
  ],
  imports: [
    CommonModule,
    QuoterHistoryRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuoterHistoryModule { }
