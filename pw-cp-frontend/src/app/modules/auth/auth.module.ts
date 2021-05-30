import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// router
import { AuthRoutingModule } from './auth-routing.module';
// components
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordBySystemComponent } from './components/change-password-by-system/change-password-by-system.component';
// interface
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordBySystemComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
