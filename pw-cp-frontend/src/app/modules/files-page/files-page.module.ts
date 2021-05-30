import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { FilesPageRoutingModule } from './files-page-routing.module';
import { FilesComponent } from './components/files/files.component';

@NgModule({
  declarations: [
    FilesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FilesPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilesPageModule { }
