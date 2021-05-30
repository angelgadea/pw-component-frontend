import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// router
import { ChangePasswordOnDemandRoutingModule } from './change-password-routing.module';
// component
import { ChangePasswordOnDemandComponent } from './components/change-password-on-demand/change-password-on-demand.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ChangePasswordOnDemandComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChangePasswordOnDemandRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChangePasswordModule { }
