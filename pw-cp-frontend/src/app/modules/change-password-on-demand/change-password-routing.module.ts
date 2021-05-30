import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { ChangePasswordOnDemandComponent } from './components/change-password-on-demand/change-password-on-demand.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordOnDemandComponent
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChangePasswordOnDemandRoutingModule { }
