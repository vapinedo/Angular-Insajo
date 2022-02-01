import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';

import { LoginComponent } from './pages/login/login.component';

const modules = [
  SharedModule,
  AuthRoutingModule
];

const components = [
  LoginComponent,
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class AuthModule { }
