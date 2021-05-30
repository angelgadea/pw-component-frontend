import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { LayoutNewQuotationComponent } from './components/layout-new-quotation/layout-new-quotation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'quotation',
    pathMatch: 'full',

  },
  {
    path: 'quotation',
    component: LayoutNewQuotationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewQuotationRoutingModule { }
