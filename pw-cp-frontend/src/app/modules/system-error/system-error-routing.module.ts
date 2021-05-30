import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { SystemErrorComponent } from './components/system-error/system-error.component';

const routes: Routes = [
  {
    path: '',
    component: SystemErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemErrorRoutingModule { }
