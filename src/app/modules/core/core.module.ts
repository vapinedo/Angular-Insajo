import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from './guards/auth-guard.service';
import { AdminGuardService } from './guards/admin-guard.service';
import { AdminOrDocenteGuardService } from './guards/admin-or-docente-guard.service';
import { AdminOrEstudianteGuardService } from './guards/admin-or-estudiante-guard.service';

import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { SidebarService } from './services/sidebar.service';
import { HelpersService } from './services/helpers.service';
import { StorageService } from './services/storage.service';
import { DatetimeService } from './services/datetime.service';
import { ValidatorsService } from './services/validators.service';
import { UsuarioFirebaseService } from './services/usuario-firebase.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuardService,
    AdminGuardService,
    AdminOrDocenteGuardService,
    AdminOrEstudianteGuardService,
    AuthService,
    MessageService,
    HelpersService,
    SidebarService,
    StorageService,
    DatetimeService,
    ValidatorsService,
    UsuarioFirebaseService
  ]
})
export class CoreModule { }
