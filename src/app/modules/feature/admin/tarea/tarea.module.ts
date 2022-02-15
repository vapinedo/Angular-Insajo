import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { TareaRoutingModule } from './tarea-routing.module';

import { TareaAdminComponent } from './pages/admin/tarea-admin.component';

const modules = [
  CommonModule,
  SharedModule,
  TareaRoutingModule
];

const components = [
  TareaAdminComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class TareaModule { }
