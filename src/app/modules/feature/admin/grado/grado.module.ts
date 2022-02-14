import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { GradoRoutingModule } from './grado-routing.module';

import { GradoAdminComponent } from '@feature/admin/grado/pages/admin/grado-admin.component';
import { GradoCreateComponent } from '@feature/admin/grado/pages/create/grado-create.component';
import { GradoUpdateComponent } from '@feature/admin/grado/pages/update/grado-update.component';

const modules = [
  CommonModule,
  SharedModule,
  GradoRoutingModule
];

const components = [
  GradoAdminComponent,
  GradoCreateComponent,
  GradoUpdateComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class GradoModule { }
