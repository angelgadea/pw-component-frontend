import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { SystemErrorComponent } from './components/system-error/system-error.component';
// router
import { SystemErrorRoutingModule } from './system-error-routing.module';

@NgModule({
  declarations: [
    SystemErrorComponent
  ],
  imports: [
    CommonModule,
    SystemErrorRoutingModule
  ]
})
export class SystemErrorModule { }
