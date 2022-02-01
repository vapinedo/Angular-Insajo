import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { DocenteRoutingModule } from './docente-routing.module';

import { DocenteDetailComponent } from './pages/detail/docente-detail.component';

const modules = [
  CommonModule,
  SharedModule,
  DocenteRoutingModule
];

const components = [
  DocenteDetailComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class DocenteModule { }
