import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { UsuarioRoutingModule } from './usuario-routing.module';

import { UsuarioAdminComponent } from './pages/admin/usuario-admin.component';
import { UsuarioCreateComponent } from './pages/create/usuario-create.component';
import { UsuarioUpdateComponent } from './pages/update/usuario-update.component';

const modules = [
  CommonModule,
  SharedModule,
  UsuarioRoutingModule
];

const components = [
  UsuarioAdminComponent,
  UsuarioCreateComponent,
  UsuarioUpdateComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class UsuarioModule { }
