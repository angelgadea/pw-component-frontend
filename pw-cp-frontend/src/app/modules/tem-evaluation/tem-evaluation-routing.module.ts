import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { TemEvaluationComponent } from './components/tem-evaluation/tem-evaluation.component';

const routes: Routes = [
  {
    path: '',
    component: TemEvaluationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TemEvaluationRoutingModule { }
