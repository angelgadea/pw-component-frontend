import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

// module
import { SharedModule } from '../../shared/shared.module';
// router
import { QuoterInboxRoutingModule } from './quoter-inbox-routing.module';
// component
import { QuoterInboxComponent } from './components/quoter-inbox/quoter-inbox.component';

@NgModule({
  declarations: [
    QuoterInboxComponent,
  ],
  imports: [
    CommonModule,
    QuoterInboxRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuoterInboxModule { }
