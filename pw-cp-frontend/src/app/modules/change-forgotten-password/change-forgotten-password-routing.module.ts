import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { ChangeForgottenPasswordComponent } from './components/change-forgotten-password/change-forgotten-password.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeForgottenPasswordComponent
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChangeForgottenPasswordRoutingModule { }
