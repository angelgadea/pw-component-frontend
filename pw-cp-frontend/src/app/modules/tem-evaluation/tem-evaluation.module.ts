import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

// router
import { TemEvaluationRoutingModule } from './tem-evaluation-routing.module';
// module
import { SharedModule } from '../../shared/shared.module';
// component
import { TemEvaluationComponent } from './components/tem-evaluation/tem-evaluation.component';

@NgModule({
  declarations: [
  TemEvaluationComponent,
],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    TemEvaluationRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TemEvaluationModule { }
