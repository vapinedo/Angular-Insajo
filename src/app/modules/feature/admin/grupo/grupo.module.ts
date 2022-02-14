import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { GrupoRoutingModule } from './grupo-routing.module';

import { GrupoAdminComponent } from './pages/admin/grupo-admin.component';
import { GrupoCreateComponent } from './pages/create/grupo-create.component';
import { GrupoUpdateComponent } from './pages/update/grupo-update.component';

const modules = [
  CommonModule,
  SharedModule,
  GrupoRoutingModule
];

const components = [
  GrupoAdminComponent,
  GrupoCreateComponent,
  GrupoUpdateComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class GrupoModule { }
