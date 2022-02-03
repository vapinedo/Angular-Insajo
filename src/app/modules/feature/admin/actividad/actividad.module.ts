import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ActividadRoutingModule } from './actividad-routing.module';

import { ActividadAdminComponent } from './pages/admin/actividad-admin.component';
import { ActividadCreateComponent } from './pages/create/actividad-create.component';
import { ActividadUpdateComponent } from './pages/update/actividad-update.component';

const modules = [
  CommonModule,
  SharedModule,
  ActividadRoutingModule
];

const components = [
  ActividadAdminComponent,
  ActividadCreateComponent,
  ActividadUpdateComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class ActividadModule { }
