import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { LayoutQuoterQuotationViewComponent } from './components/layout-quoter-quotation-view/layout-quoter-quotation-view.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutQuoterQuotationViewComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuoterQuotationViewRoutingModule { }
