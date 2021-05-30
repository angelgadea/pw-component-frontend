import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// component
import { ChangeForgottenPasswordComponent } from './components/change-forgotten-password/change-forgotten-password.component';
// router
import { ChangeForgottenPasswordRoutingModule } from './change-forgotten-password-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ ChangeForgottenPasswordComponent ],
  exports: [ ChangeForgottenPasswordComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ChangeForgottenPasswordRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChangeForgottenPasswordModule { }
