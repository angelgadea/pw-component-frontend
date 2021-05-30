import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { QuoterInboxComponent } from './components/quoter-inbox/quoter-inbox.component';

const routes: Routes = [
  {
    path: '',
    component: QuoterInboxComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuoterInboxRoutingModule { }
