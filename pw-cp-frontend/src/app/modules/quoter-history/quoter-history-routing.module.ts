import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { QuoterHistoryComponent } from './components/quoter-history/quoter-history.component';

const routes: Routes = [
  {
    path: '',
    component: QuoterHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuoterHistoryRoutingModule { }
